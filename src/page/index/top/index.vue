<template>
  <div class="avue-top">
    <div style="color: #fff; display: flex">
      <div style="padding: 10px 0" @click="setCollapse">
        <img
          style="width: 40px; height: 40px; line-height: 40px"
          :src="sysConfig ? imgUrl + sysConfig.logo : website.logo"
          alt=""
        />
      </div>
      <div style="margin-left: 10px; font-family: 'YSBTH'; font-size: 35px">
        {{ systemName }}{{ systemTypeName }}
      </div>
    </div>
    <div class="top-bar__right">
      <!-- 应用 -->
      <!-- <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="
          isApplication ? $t('navbar.application') : $t('navbar.application')
        "
        placement="bottom"
      >
        <div class="top-bar__item">
          <svg-icon icon-class="yingyong" class="svg_icon"></svg-icon>
        </div>
      </el-tooltip> -->
      <!-- 铃铛 -->
      <!-- <el-tooltip
        effect="dark"
        :content="$t('navbar.notice')"
        placement="bottom"
      >
        <div class="top-bar__item top-bar__item--show">
          <top-notice></top-notice>
        </div>
      </el-tooltip> -->
      <!-- 全屏 -->
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="
          isFullScren ? $t('navbar.screenfullF') : $t('navbar.screenfull')
        "
        placement="bottom"
      >
        <div class="top-bar__item" @click="handleScreen">
          <svg-icon
            :icon-class="isFullScren ? 'tuichuquanping' : 'quanping'"
            class="svg_icon"
          ></svg-icon>
        </div>
      </el-tooltip>
      <!-- 大数据 -->
      <el-tooltip
        v-if="(showDebug && userType == 1) || userType == 0||userType == 2"
        effect="dark"
        :content="$t('navbar.bigData')"
        placement="bottom"
      >
        <div class="top-bar__item" @click="getBigDataPage">
          <svg-icon
            icon-class="dashuju"
            style="width: 25px; height: 25px; margin-top: 18px"
          ></svg-icon>
        </div>
      </el-tooltip>
      <span>{{ currentDate }}</span>
      <span style="margin: 0 5px">{{ week }}</span>
      <span>{{ currentTime }}</span>
      <img class="top-bar__img" :src="userInfo.avatar" />
      <div class="nick">
        {{ currentUserInfo ? currentUserInfo.nickName : "用户名不存在" }}
      </div>
      <!-- 下拉弹框信息 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <i style="color: #fff" class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{ $t("navbar.dashboard") }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">{{
              $t("navbar.userinfo")
            }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided
            >{{ $t("navbar.logOut") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { resetRouter } from "@/router/router";
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topNotice from "./top-notice";
import topLang from "./top-lang";
import dayjs from "dayjs";
import { getSystemConfigInfo, getUserType } from "@/util/auth";
import { IMG_URL } from "@/router/axios";

export default {
  name: "avue-top",
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topNotice,
    topLang,
  },
  data() {
    return {
      imgUrl:IMG_URL,
      timer: "",
      currentDate: "",
      currentTime: "",
      sysConfig: getSystemConfigInfo(),
      week: "",
      userType: getUserType(),
    };
  },
  mounted() {
    listenfullscreen(this.setScreen);
    this.timer = setInterval(() => {
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      this.currentDate = dayjs().format("YYYY/MM/DD ");
      this.currentTime = dayjs().format("HH:mm:ss");
      this.week = weeks[dayjs().format("d")];
    }, 1000);
  },
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
      "isApplication",
      "currentUserInfo",
    ]),
    // 系统名称
    systemName() {
      if (this.userType === 0 || this.userType === 1 || this.userType === 2) {
        return this.sysConfig ? this.sysConfig.sysName : this.website.title;
      } else if (this.userType == 3) {
        return "网格化管理系统";
      } else if (this.userType == 4) {
        return "桥长管理系统";
      }
    },
    // 系统类型名
    systemTypeName() {
      if (this.userType == 1) {
        return "(政府端)";
      } else if (this.userType == 0) {
        return "(管理端)";
      } else if (this.userType == 2) {
        return "(企业端)";
      } else if (this.userType == 3) {
        return "(网格端)";
      } else if (this.userType == 4) {
        return "(桥长端)";
      }
    },
  },
  methods: {

    getBigDataPage() {

    },
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          resetRouter();
          window.sessionStorage.removeItem("saber-token");
          window.sessionStorage.removeItem("vuex");
          // window.sessionStorage.removeItem('system-config')
          this.$router.push({ path: "/login" });
        });
      });
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "YSBTH";
  src: url("../../../assets/font/YSBTH.ttf");
}
.avue-top {
  //border-bottom: 1px solid rgb(2, 38, 91);
  background: url("../../../assets/images/top_bg.png") no-repeat;
  background-size: 100% 100%;
  .top-bar__right {
    color: #fff;
    font-size: 16px;
  }
  .nick {
    font-size: 12px;
    padding: 1px 10px;
    border-radius: 8px;
    background: #5172a2;
    height: 20px;
    line-height: 20px;
    margin: 0;
  }
  .iconfont {
    color: #fff;
    font-size: 26px;
  }
  .svg_icon {
    width: 20px;
    height: 20px;
  }
}
</style>
