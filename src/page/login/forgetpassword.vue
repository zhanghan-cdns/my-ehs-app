  <template>
  <div class="login-main">
    <div class="back" @click="backPreviousStep">
      <img src="../../assets/images/back.png" alt="" />
    </div>
    <h3 class="login-title">
      <!-- {{ $t("login.title") }}{{ website.title }} -->
      <!-- <top-lang></top-lang> -->
      找回密码
    </h3>
    <el-form :model="forgetForm" ref="loginForm" class="login-form">
      <el-form-item style="margin-top: 50px" v-if="step === 1">
        <el-input
          v-model="forgetForm.username"
          placeholder="请输入需要找回的用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item v-if="step === 1">
        <el-button
          type="primary"
          size="small"
          @click.native.prevent="handleNextStep"
          class="login-submit"
          >下一步
        </el-button>
      </el-form-item>
      <el-form-item v-if="step === 2">
        <el-input v-model="forgetForm.originalPhone" disabled></el-input>
      </el-form-item>
      <el-form-item v-if="step === 2">
        <el-input v-model="forgetForm.phone" placeholder="请输入绑定的手机号">
          <div slot="prepend">86+</div>
        </el-input>
      </el-form-item>
      <el-form-item v-if="step === 2">
        <el-row>
          <el-col :span="14">
            <el-input
              v-model="forgetForm.captcha"
              style="width: 90%"
              placeholder="验证码"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="step === 2">
        <el-button
          type="primary"
          size="small"
          @click.native.prevent="handleNextStep2"
          class="login-submit"
          >下一步
        </el-button>
      </el-form-item>
      <el-form-item v-if="step === 3">
        <el-input
          v-model="forgetForm.oldPassword"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="step === 3">
        <el-input
          v-model="forgetForm.newPassword"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="step === 3">
        <el-button
          type="primary"
          size="small"
          @click.native.prevent="handleFindPassword"
          class="login-submit"
          >找回密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      forgetForm: {
        username: "",
        phone: "",
        originalPhone: "138********898", //原始手机
        oldPassword: "", //旧密码
        newPassword: "", //新密码
      },
      // 步骤123
      step: 1,
    };
  },
  methods: {
    // 第一步
    handleNextStep() {
      this.step = 2;
    },
    // 第二步
    handleNextStep2() {
      this.step = 3;
    },
    // 找回密码
    handleFindPassword() {},
    // 发送验证码
    handleSendCode() {
      console.log("发送验证码");
    },
    // 返回方法
    backPreviousStep() {
      this.step = this.step - 1;
      if(this.step <= 0){
        this.$emit('back')
      }
    },
  },
};
</script>

  <style scoped lang='scss'>
.back {
  cursor: pointer;
  position: absolute;
  left: -15%;
  top: 15px;
}
</style>
