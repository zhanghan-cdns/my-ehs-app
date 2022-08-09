<template>
  <div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
    >
      <div class="form-title">
        <i class="iconfont icon-bianji form-title-icon"></i
        ><span class="form-title-name">审批信息</span>
      </div>
      <el-row>
        <el-col span="24">
          <el-form-item label="审批意见" prop="spyj">
            <el-input
              type="textarea"
              :rows="3"
              clearable
              v-model="form.zy"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="是否通过" prop="sftg">
            <el-radio-group v-model="form.sftg">
              <el-radio :label="0">通过</el-radio>
              <el-radio :label="1">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="审批人签字" prop="qzcd">
            <el-image
              v-if="form.signImg !== ''"
              style="width: 133px; height: 50px"
              :src="form.signImg"
              :fit="fit"
            ></el-image>
            <el-button
              type="primary"
              size="small"
              style="margin-left: 10px"
              @click="sign"
            >
              <span v-if="form.signImg === ''">签字</span>
              <span v-else>重新签字</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center">
      <el-button type="warning" @click="approval">审批</el-button>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
import signDialog from "./signDialog.vue";

export default {
  components: {
    signDialog,
  },

  data() {
    return {
      icon: "icon-bianji",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      form: {
        spyj: "",
        sftg: 0,
        signImg: "",
      },
      rules: {},
    };
  },

  created() {},

  methods: {
    sign() {
      this.$refs.signDialogRef.open();
    },

    getSignImg(resultImg) {
      this.form.signImg = resultImg;
      console.log(this.form.signImg);
    },

    approval() {
      this.$emit("approval", this.form);
    },

    reset() {
      this.form = {
        spyj: "",
        sftg: 0,
        signImg: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

.form-title {
  margin: 30px 72px;
  .form-title-icon {
    font-size: 20px;
    color: #0a8def;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 11px;
  }
}
</style>
