<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      title="变更验收"
      width="60%"
      height="81%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="recordsForm">
          <div class="content">
            <i
              class="iconfont icon-fujiaxinxi"
              style="color: #409eff; margin-right: 5px"
            ></i>
            <span> 验收申请</span>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="变更项目">
              <el-select v-model="ruleForm.change" placeholder="请选择变更项目" style="width: 100%">
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="组织人" class="middle">
                  <el-input placeholder="请选择组织人" v-model="ruleForm.lender"></el-input>
                  <el-button>
                    <i class="iconfont icon-tianjia"></i> 选择</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织验收部门">
                  <el-input placeholder="根据验收人自动带出" v-model="ruleForm.acceptance"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验收人" class="middle">
                  <el-input placeholder="请选择验收人" v-model="ruleForm.acceptancePer"></el-input>
                  <el-button>
                    <i class="iconfont icon-tianjia"></i> 选择</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验收人所在部门">
                  <el-input placeholder="根据组织人自动带出" v-model="ruleForm.lenderPer"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="附件资料">
              <render-upload ></render-upload>
            </el-form-item>
            <el-form-item label="培训照片">
              <basic-upload></basic-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div class="Btn">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="resetForm()">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "applyDialog",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      openEdit: false,
      isDisabled: "",
      ruleForm:{
        change:'',
        lender:'',
        acceptance:'',
        acceptancePer:'',
        lenderPer:"",
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.close();
          console.log(this.ruleForm);
          console.log("success");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.resetForm();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/form.scss";
/deep/.el-upload-dragger{
  margin-top: 10px;
}
/deep/.el-upload-dragger{
  border: none;
}
.content {
  border-bottom: 1px solid #409eff;
  height: 30px;
  line-height: 30px;
  margin: 0 15px;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  font-weight: bold;
}
/deep/ .el-upload-dragger .el-upload__text {
  margin-top: -40px;
}
.middle {
  display: flex;
}
.middle .el-input {
  width: 75%;
}
.middle .el-button {
  margin-left: 12px;
  color: #409eff;
  padding: 10px 12px;
}
.middle .i {
  color: #409eff;
  width: 18px;
}
/deep/ .el-form-item__label {
  line-height: 58px;
  font-weight: bold;
}
.demo-ruleForm {
  padding: 20px;
}
/deep/ .vxe-modal--content {
  background: #efeef1;
}
.recordsForm {
  // height: 100%;
  background: rgb(255, 255, 255);
}
/deep/.el-col {
  margin-bottom: 0px;
}
/deep/.el-form-item__error {
  padding-top: 0;
}
.Btn el-button {
  width: 260px;
}
</style>
