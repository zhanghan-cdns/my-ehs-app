<template>
  <div class="main_box">
    <el-form :model="phoneLoginForm" ref="loginForm" class="login-form">
      <el-form-item>
        <el-input
          v-model="phoneLoginForm.phone"
          placeholder="请输入绑定的手机号"
        >
          <div slot="prepend">86+</div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="14">
            <el-input
              v-model="phoneLoginForm.captcha"
              style="width: 90%"
              placeholder="验证码"
            ></el-input>
          </el-col>
          <el-col :span="10">
          </el-col>
        </el-row>
      </el-form-item>
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
  </div>
</template>
<script>

export default {
  data() {
    return {
      phoneLoginForm: {
        phone: "",
        captcha: "",
      },
    };
  },
  methods: {
    // 发送验证码
    handleSendCode() {},
    // 登录
    handleLogin() {},
  },
};
</script>

<style scoped lang='scss'>
.main_box {
  height: 265px;
  width: 100%;
}
</style>
