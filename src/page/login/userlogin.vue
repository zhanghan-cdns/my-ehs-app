<template>
  <el-form
    class="login-form"
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <!-- <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.tenantId"
        :placeholder="$t('login.tenantId')"
      >
        <i slot="suffix" class="icon-quanxian" />
      </el-input>
    </el-form-item> -->
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        :placeholder="$t('login.username')"
      >
        <i slot="prefix" class="icon-yonghu" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        :placeholder="$t('login.password')"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        />
        <i slot="prefix" class="icon-ziyuanxhdpi" />
      </el-input>
    </el-form-item>
    <el-form-item v-if="this.website.captchaMode" prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input v-model="loginForm.code" :placeholder="$t('login.code')">
            <i slot="prefix" class="icon-yanzhengma2" />
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <div
              class="login-code-img"
              style="font-size: 20px"
              @click="generateCdoe"
            >
              <span
                v-for="(item, index) in captchaCode"
                :key="index"
                :style="`color:${item.color}`"
                >{{ item.str }}</span
              >
            </div>
            <!-- <img
              :src="loginForm.image"
              class="login-code-img"
              @click="refreshCode"
            /> -->
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="passwordMethods">
      <div>
        <el-checkbox v-model="remember">记住密码</el-checkbox>
      </div>
      <div class="forgetPassword" @click="findPassword">忘记密码?</div>
    </div>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >{{ $t("login.submit") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { getTopUrl, randomCaptchaCode } from "@/util/util";
import { getUserType } from "@/util/auth";
export default {
  name: "userlogin",
  data() {
    return {
      // 验证码
      captchaCode: randomCaptchaCode(),
      tenantMode: this.website.tenantMode,
      loginForm: {
        //租户ID
        tenantId: "000000",
        //用户名
        username: "",
        //密码
        password: "",
        //账号类型
        type: "account",
        //验证码的值
        code: "",
        //验证码的索引
        key: "",
        //预加载白色背景
        image:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      },
      loginRules: {
        tenantId: [
          { required: false, message: "请输入租户ID", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
      remember: false,
      passwordType: "password",
    };
  },
  watch: {
    remember(val) {
      if (!val) {
        window.localStorage.removeItem("remember");
      }
    },
  },
  created() {
    // this.getTenant();
    // this.refreshCode();
    this.rememberPassword();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"]),
  },
  props: [],
  methods: {
    // 前端生成验证码
    generateCdoe() {
      this.captchaCode = randomCaptchaCode();
    },
    // 找回密码
    findPassword() {},
    // 记住密码
    rememberPassword() {
      let remember = JSON.parse(window.localStorage.getItem("remember"));
      if (remember) {
        this.loginForm = {
          ...this.loginForm,
          username: remember.username,
          password: remember.password,
        };
        this.remember = true;
      }
    },
    refreshCode() {
      // getCaptcha().then((res) => {
      //   this.loginForm.key = res.key;
      //   this.loginForm.image = res.image;
      // });
    },
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      if (
        this.loginForm.code.toLocaleLowerCase() !==
          this.captchaCode
            .map((item) => item.str)
            .join("")
            .toLocaleLowerCase() &&
        this.website.captchaMode
      ) {
        this.generateCdoe();
        return this.$message.error("验证码错误,请重新输入");
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.remember) {
            const { username, password } = this.loginForm;
            let obj = {
              username: username,
              password: password,
            };
            window.localStorage.setItem("remember", JSON.stringify(obj));
          }
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
          });
          this.$store
            .dispatch("LoginByUsername", {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then(() => {
              this.$store.dispatch("getCurrentUserInfo").then(() => {
                console.log(
                  `当前登录角色为${getUserType()}是${
                    getUserType() === 2 ? "企业端" : "非企业端"
                  }`
                );
                // 1是政府 2是企业
                this.$router.push({ path: this.tagWel.value });
                loading.close();
              });
            });
        }
      });
    },
    getTenant() {
      // let domain = getTopUrl();
      // // 临时指定域名，方便测试
      // //domain = "https://bladex.vip";
      // info(domain).then((res) => {
      //   const data = res.data;
      //   if (data.success && data.data.tenantId) {
      //     this.tenantMode = false;
      //     this.loginForm.tenantId = data.data.tenantId;
      //     this.$parent.$refs.login.style.backgroundImage = `url(${data.data.backgroundUrl})`;
      //   }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.passwordMethods {
  display: flex;
  justify-content: space-between;
  color: #606266;
  margin-bottom: 10px;
  .forgetPassword {
    font-size: 14px;
    cursor: pointer;
  }
}
/deep/ .el-input__inner {
  border: none;
  border-bottom: 1px solid;
}
</style>
