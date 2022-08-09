
<template>
  <div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row>
        <el-col span="24">
          <el-form-item label="是否通过" prop="pass">
            <el-radio-group v-model="form.pass">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="审批意见" prop="approvalComments">
            <el-input
              placeholder="请输入审批意见"
              type="textarea"
              :rows="6"
              clearable
              v-model="form.approvalComments"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="线上签字" prop="onlineSignature">
            <img
              v-if="form.onlineSignature && form.onlineSignature !== ''"
              :src="form.onlineSignature"
              style="width: 133px; height: 50px"
            />
            <button-select v-else @click="sign">签字</button-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center; margin-top: 50px">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="warning" @click="close">取消</el-button>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        pass: 1,
        approvalComments: "",
        onlineSignature: "",
      },
      rules: {},
    };
  },
  methods: {
    sign() {
      this.$refs.signDialogRef.open();
    },

    getSignImg(imgSrc) {
      this.form.onlineSignature = imgSrc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
</style>