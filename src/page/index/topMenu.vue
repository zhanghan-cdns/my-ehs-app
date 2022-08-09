<template>
  <div class="avue-logo">
    <nav class="top-menu-box">
      <div class="top-menu-item" v-for="item in topMenu" :key="item.id" @click="selectTopMent('topMenu',item.id)">
        <div class="inner-item" :class="menuActive==item.id?'inner-item-active':''">
          <el-tooltip
            :open-delay="500"
            :content="item.name"
            placement="bottom"
          >
            <i class="iconfont" :class="item.icon?item.icon:'icon-caidan'"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="top-menu-item" @click="setShrinkMenu" v-if="arrowMenu">
        <div class="inner-item inner-item-arrow">
          <i class="iconfont" :class="collapse?'icon-zhankai':'icon-shousuo'"></i>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="collapse" class="top-menu-box">
          <div class="top-menu-item" v-for="item in leftoverMenu" :key="item.id"
               @click="selectTopMent('leftoverMenu',item.id)">
            <div class="inner-item" :class="menuActive==item.id?'inner-item-active':''">
              <el-tooltip
                :open-delay="2000"
                :content="item.name"
                placement="bottom"
              >
                <i class="iconfont" :class="item.icon"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </nav>

  </div>
</template>

<script>
/**
 * 此组件已经废弃
 * 原左侧顶部菜单
 */
import {mapGetters} from "vuex";
import {searchTreeParentId} from '@/util/index';

export default {
  inject: ["index"],
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //系统图标路径
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ],
      collapse: false,
      menuData: [],
      topMenu: [],
      leftoverMenu: [],
      arrowMenu: false,
      menuActive: ''//显示菜单
    };
  },
  created() {

  },
  computed: {
    ...mapGetters(["menu", "menuAll",'menuChildren']),
  },
  mounted() {
    this.$EventBus.$on("initMenu",()=>{
      this.initMenu()
    });
  },
  methods: {
    //初始化顶级菜单
    initMenu() {
      // 传入菜单
      this.menuData = this.menu || this.menuData
      // 获取缓存的topMenuId
      let cacheMenuId = window.sessionStorage.getItem("topMenuId")
      this.menuActive = (cacheMenuId ? cacheMenuId : this.menuData[0] && this.menuData[0].id) || ""
      // 将菜单分割成上下两部分
      if (this.menuData && this.menuData.length > 4) {
        this.arrowMenu = true
        this.topMenu = this.menuData.slice(0, 4)
        this.leftoverMenu = this.menuData.slice(4, this.menuData.length)
      } else {
        this.topMenu = this.menuData
        this.arrowMenu = false
      }
      this.selectTopMent(this.menu, this.menuActive)
    },
    //设置收缩菜单
    setShrinkMenu() {
      this.collapse = !this.collapse
    },
    //  选中菜单
    selectTopMent(curList, menuId) {
      this.menuActive = menuId
      // 缓存topMenuId
      window.sessionStorage.setItem("topMenuId", menuId)
      // 根据id寻找菜单
      let menus = searchTreeParentId(this.menuData, menuId);
      if(Array.isArray(menus)&&menus.length>0) this.index.getcurrentMenu(menus[0].children)

    }

  },
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-active {
  transition: opacity 2.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.avue-logo {
  //position: fixed;
  top: 64px;
  left: 0;
  width: 240px;
  //height: 15%;
  line-height: 64px;
  background-color: #20222a;
  background: rgb(20, 65, 130);
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgb(2, 38, 91);
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgb(30, 85, 167);

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background: rgb(2, 38, 91);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
  }

  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}

.level_popper {
  color: #fff !important;
  background: #144182 !important;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px !important;
}
</style>
<style lang="scss" scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.cursor {
  cursor: pointer;
}

.top-menu-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .top-menu-item {
    height: 40px;
    box-sizing: border-box;
    width: 20%;
    padding: 4px;

    .inner-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      cursor: pointer;
    }

    .inner-item-active {
      background: #4491FF;
    }

    .inner-item-arrow {
      background: #356BB8;
    }
  }

  .top-menu-active {

  }
}
</style>
