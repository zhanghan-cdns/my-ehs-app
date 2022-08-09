<template>
  <div
    class="login-container"
    :style="`background:url(${
      sysconfig ? imgUrl + sysconfig.bgPic1 : website.bgPic1
    }) no-repeat;background-size: 100% 100%;`"
    ref="login"
    @keyup.enter.native="handleLogin"
  >
    <div class="login-title_info">
      <img :src="sysconfig ? imgUrl + sysconfig.logo : website.logo" alt="" />
      <div style="margin-left: 20px">
        {{ sysconfig ? sysconfig.sysName : website.title }}
      </div>
    </div>
    <div class="login-border" v-show="!findPassword">
      <div
        class="login-left-bg"
        :style="`background:url(${
          sysconfig ? imgUrl + sysconfig.bgPic2 : website.bgPic2
        })`"
      ></div>
      <div class="login-main">
        <div style="height: 90px"></div>
        <div class="login-register">
          <div class="welcome-txt">欢迎登录</div>
          <div class="register-txt">
            <div>还没有账号？</div>
            <div @click="goRegister">去注册</div>
          </div>
        </div>
        <userLogin
          v-if="activeName === 'user'"
          @find="handleFindPassword"
        ></userLogin>
        <codeLogin v-else-if="activeName === 'code'"></codeLogin>
        <thirdLogin v-else-if="activeName === 'third'"></thirdLogin>
        <Qrcode v-else-if="activeName === 'qrcode'"></Qrcode>
        <PhoneLogin v-else-if="activeName === 'phone'"></PhoneLogin>
        <div
          style="color: #000; text-align: center; cursor: pointer"
          @click="
            activeName === 'user'
              ? (activeName = 'qrcode')
              : (activeName = 'user')
          "
        >
          {{ activeName === "user" ? "点击下载APP" : "返回登录" }}
          <svg-icon
            v-show="activeName === 'user'"
            icon-class="APP"
            style="width: 23px; height: 18px; color: rgb(24, 144, 255)"
          ></svg-icon>
        </div>
      </div>
    </div>
    <div class="login_copyright">
      V2020.1230.1.0@ 版权所有
      {{ sysconfig ? sysconfig.copyright : website.copyright }}
    </div>
  </div>
</template>
<script>
import { systemConfigAPI } from "@/api/system/config";
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
import { validatenull } from "@/util/validate";
import topLang from "@/page/index/top/top-lang";
import topColor from "@/page/index/top/top-color";
import { getQueryString, getTopUrl } from "@/util/util";
import ForgetPassword from "@/page/login/forgetpassword";
import Qrcode from "@/page/login/qrcode.vue";
import PhoneLogin from "@/page/login/phoneLogin.vue";
import { IMG_URL } from "@/router/axios";
import {
  setSystemConfigInfo,
  getSystemConfigInfo,
  setSystemConfigParams,
} from "@/util/auth";
export default {
  name: "login",
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topLang,
    topColor,
    ForgetPassword,
    Qrcode,
    PhoneLogin,
  },
  data() {
    return {
      imgUrl:IMG_URL,
      time: "",
      sysconfig: getSystemConfigInfo(),
      activeName: "user",
      socialForm: {
        tenantId: "000000",
        source: "",
        code: "",
        state: "",
      },
      findPassword: false,
    };
  },
  watch: {
    $route() {
      this.handleLogin();
    },
  },
  created() {
    this.getSysConfig().then(() => {
      this.handleLogin();
      this.getTime();
    });
  },
  mounted() {},
  computed: {
    ...mapGetters(["website", "tagWel"]),
  },
  props: [],
  methods: {
    // 获取系统配置接口 缓存本地
    async getSysConfig() {
      const res = await systemConfigAPI();
      if (res.code === 200 && res.data) {
        let params = setSystemConfigParams(res)
        this.sysconfig = params;
        setSystemConfigInfo(JSON.stringify(params));
      }
    },
    //  去注册
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    getTime() {
      setInterval(() => {
        this.time = dateFormat(new Date());
      }, 1000);
    },
    handleLogin() {
      const topUrl = getTopUrl();
      const redirectUrl = "/oauth/redirect/";
      this.socialForm.source = getQueryString("source");
      this.socialForm.code = getQueryString("code");
      this.socialForm.state = getQueryString("state");
      if (
        validatenull(this.socialForm.source) &&
        topUrl.includes(redirectUrl)
      ) {
        let source = topUrl.split("?")[0];
        source = source.split(redirectUrl)[1];
        this.socialForm.source = source;
      }
      if (
        !validatenull(this.socialForm.source) &&
        !validatenull(this.socialForm.code) &&
        !validatenull(this.socialForm.state)
      ) {
        // const loading = this.$loading({
        //   lock: true,
        //   text: "第三方系统登录中,请稍后。。。",
        //   spinner: "el-icon-loading",
        // });
        // this.$store
        //   .dispatch("LoginBySocial", this.socialForm)
        //   .then(() => {
        //     window.location.href = topUrl.split(redirectUrl)[0];
        //     this.$router.push({ path: this.tagWel.value });
        //     loading.close();
        //   })
        //   .catch(() => {
        //     loading.close();
        //   });
      }
    },
    // 切换登录方式
    changeLoginMethods(value) {
      this.activeName = value;
    },
    // 跳转注册页面
    handleRegister() {
      this.$router.push("/register");
    },
    //找回密码
    handleFindPassword(val) {
      this.findPassword = val;
    },
    // 点击第三方登录
    handleOtherLoginMethods(value) {
      if (value === "phone") {
        this.activeName = value;
      } else if (value === "pc") {
        this.activeName = "user";
      }
    },
    goBackLogin() {
      this.activeName = "user";
      this.findPassword = false;
    },
  },
};
</script>
<style scoped lang="scss">
.marginLeft10 {
  margin-left: 10px;
}
.cursor {
  cursor: pointer;
}
.hoverFont {
  &:hover {
    color: #0067c4;
  }
}
</style>
<style lang="scss">
@import "@/styles/login.scss";
</style>
