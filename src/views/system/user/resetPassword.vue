<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="700px"
      height="50%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="200px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="24">
                <el-form-item label="新密码" prop="newPassword" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    type="password"
                    v-model="form.newPassword"
                    placeholder="请输入新密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="确认新密码" prop="confirmPassword" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    type="password"
                    v-model="form.confirmPassword"
                    placeholder="请输入确认密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {resetPasswordDataAPI} from "@/api/system/user";
// import { copyObj } from '@/util/index'

export default {
  data() {
    return {
      openEdit: false,
      roleList: [],
      form: {
        userId: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "用户编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
  },
  methods: {
     open(row) {
        this.openEdit = true;
        if(row && row.id){
          this.form = {
            userId: row.id,
            newPassword: '',
            confirmPassword: ''
          }
        }
    },
    close() {
      this.openEdit = false;
    },
    // 保存
    submitForm(formName) {
      if(this.form.newPassword != this.form.confirmPassword){
        return this.$message.warning('新密码与确认密码不一致！')
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          resetPasswordDataAPI(this.form).then((res)=>{
            this.$message.success('重置密码成功!')
            this.$emit("refreshDataList");
            this.close()
          })
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>