<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="'新增' + title"
      width="800px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-form-item label="承包商(多选)" prop="contractor">
              <el-button
                type="success"
                v-model="ruleForm.contractor"
                @click="chooseContractor"
                >选择承包商</el-button
              >
            </el-form-item>
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="ruleForm.projectType" style="width: 100%">
                <el-option label="一" value="shanghai"></el-option>
                <el-option label="二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="服务项目内容" prop="remark">
              <el-input
                v-model="ruleForm.remark"
                type="textarea"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker
                    style="width: 100%"
                    v-model="ruleForm.startTime"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="endingTime">
                  <el-date-picker
                    style="width: 100%"
                    v-model="ruleForm.endingTime"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目负责人" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="项目合同资金(万元)"
                  style="line-height: 20px"
                  class="projectFund"
                  prop="projectContractFunds"
                >
                  <el-input v-model="ruleForm.projectContractFunds"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商务合同" prop="test">
              <render-upload></render-upload>
            </el-form-item>
            <el-form-item label="安全合同">
              <render-upload></render-upload>
            </el-form-item>
            <el-form-item label="施工方案">
              <render-upload></render-upload>
            </el-form-item>
            <el-form-item label="技术措施">
              <render-upload></render-upload>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input v-model="ruleForm.note"></el-input>
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

    <choose-dialog
      ref="chooseRef"
      :dictConfig="{}"
      @updatePub="updatePub"
    ></choose-dialog>
  </div>
</template>
<script>
import chooseDialog from "./chooseDialog.vue";
import { projectmanageCreateAPI } from "@/api/stakeholdermanagement/index";
export default {
  name: "recordDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        contractor: "",
        projectType: "",
        projectName: "",
        remark: "",
        startTime: "",
        endingTime: "",
        name: "",
        projectFund: "",
        note: "",
        test: "",
      },
      rules: {
        projectName: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        // contractor: [
        //   { required: true, message: "请选择承包商", trigger: "blur" },
        // ],
      },
    };
  },

  components: {
    chooseDialog,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "项目信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    chooseContractor() {
      this.$refs.chooseRef.open();
    },
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      this.isDisabled = type === "xinzeng" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate( (valid) => {
        if (valid) {
          let params={
            ...this.ruleForm
          }
          projectmanageCreateAPI(params).then((res) => {
            this.$message.success("新增成功!");
            this.close();
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
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
.form {
  padding: 20px;
}
/deep/.projectFund .el-form-item__label {
  line-height: 20px;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
.el-upload-dragger .el-upload__text {
  margin-top: -40px;
}
/deep/ .el-button--success {
  background-color: #1cb392;
  border-color: #1cb392;
}
/deep/ .el-button--success:hover {
  background-color: #63d1b9;
  border-color: #63d1b9;
}
</style>
