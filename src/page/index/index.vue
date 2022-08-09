<template>
  <div :class="{ 'avue--collapse': isCollapse }" class="avue-contail">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top ref="top"/>
    </div>
    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar ref="sidebar"/>
      </div>
      <div class="avue-main">
        <!-- 顶部菜单   -->
        <header-menu ref="headerMenuRef"></header-menu>
        <!-- 顶部标签卡 -->
        <tags/>
        <transition name="fade-scale">
          <search v-show="isSearch" class="avue-view"></search>
        </transition>
        <!-- 主体视图层 -->
        <div
          v-show="!isSearch"
          id="avue-view"
          style="
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 10px;
          "
        >
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="avue-view"/>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" class="avue-view"/>
          <div class="bottom_info">
            <div class="bottom_left_info">当前版本 V2.0.2102.0116111</div>
            <div class="bottom_middle_info">
              &copy;版权所有
              {{ sysconfig ? sysconfig.copyright : website.title }}

            </div>
            <div class="bottom_right_info">
              技术支持:江苏中安联科信息科技有限公司
              <i class="iconfont icon-xinhao2-copy" style="color: #30de30"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="avue-shade" @click="showCollapse"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import tags from "./tags";
import search from "./search";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import {validatenull} from "@/util/validate";
import {calcDate} from "@/util/date.js";
import {getStore} from "@/util/store.js";
import {getSystemConfigInfo} from "@/util/auth";
import headerMenu from "@/page/index/headerMenu";

export default {
  components: {
    top,
    tags,
    search,
    sidebar,
    headerMenu
  },
  name: "index",
  provide() {
    return {
      index: this,
    };
  },
  data() {
    return {
      sysconfig: getSystemConfigInfo(),
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
    };
  },
  created() {
    //实时检测刷新token
    this.refreshToken();
    this.openMenu();
  },
  mounted() {
    this.init();
  },
  computed: mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu"]),
  props: [],
  methods: {
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    // 初始化
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
      // this.$store.dispatch("FlowRoutes").then(() => {});
    },
    //打开菜单
    openMenu(item = {}) {
      this.$store.dispatch("GetMenu", item.id).then((data) => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
        //当点击顶部菜单后默认打开第一个菜单
        this.$refs.headerMenuRef.initMenu();
        /*if (!this.validatenull(item)) {
            let itemActive = {},
              childItemActive = 0;
            if (item.path) {
              itemActive = item;
            } else {
              if (this.menu[childItemActive].length === 0) {
                itemActive = this.menu[childItemActive];
              } else {
                itemActive = this.menu[childItemActive].children[childItemActive];
              }
            }
            this.$store.commit('SET_MENU_ID', item);
            this.$router.push({
              path: this.$router.$avueRouter.getPath({
                name: (itemActive.label || itemActive.name),
                src: itemActive.path
              }, itemActive.meta)
            });
          }*/
      });
    },
    // 定时检测token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token =
          getStore({
            name: "token",
            debug: true,
          }) || {};
        // console.log(token,'token')
        const date = calcDate(token, new Date().getTime());
        // console.log(date,'date')
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("refreshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000);
    },
    // 获取当前菜单
    getcurrentMenu(menus) {
      this.$store.commit('SET_MENU_CHILDREN', menus)
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .avue-view {
  //height: calc(100% - 62px);
  height: calc(100% - 106px);
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1;
}

.avue-header {
  padding-left: 0;
}

.bottom_info {
  height: 25px;
  background: #ccc;
  margin-top: 6px;
  display: flex;
  justify-content: space-around;
  color: #fff;
  padding: 0 10px;

  .bottom_left_info {
    width: 20%;
  }

  .bottom_middle_info {
    flex: 1;
    text-align: center;
  }

  .bottom_right_info {
    width: 20%;
    text-align: right;
  }
}

</style>
