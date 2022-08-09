<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="900px"
      height="65%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="recordsForm">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="违章相关方" prop="contractor">
              <el-select v-model="ruleForm.contractor" style="width: 100%">
                <el-option
                  v-for="item in unitNames"
                  :key="item.value"
                  :value="item.unitName"
                  :label="item.label"
                >
                  {{ item.unitName }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="违章日期" prop="violationDate">
                  <el-date-picker
                    style="width: 100%"
                    v-model="ruleForm.violationDate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="违章人姓名">
                  <el-input v-model="ruleForm.violationName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="项目名称" prop="projectName">
              <el-select v-model="ruleForm.projectName" style="width: 100%">
                <el-option
                  v-for="item in projects"
                  :key="item.value"
                  :value="item.projectName"
                  :label="item.label"
                >
                {{item.projectName}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考评内容" prop="assessmentContent">
              <el-input v-model="ruleForm.assessmentContent"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="扣分分值" prop="pointsDeducted">
                  <el-input
                    v-model="ruleForm.pointsDeducted"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="罚款金额(元)" prop="amountOfFine">
                  <el-input
                    v-model="ruleForm.amountOfFine"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="评定人">
                  <el-input v-model="ruleForm.rater"></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="处理结果">
                  <el-input
                    v-model="ruleForm.handleResult"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>

            <el-form-item label="备注">
              <el-input v-model="ruleForm.remark" type="textarea"></el-input>
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
import {
  informationUrlCreateAPI,
  informationUrlrelateAPI,
  projectmanageAllAPI,
} from "@/api/stakeholdermanagement/index";
export default {
  name: "recordDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        contractor: "",
        projectName: "",
        assessmentContent: "",
        violationDate: "",
        violationName: "",
        pointsDeducted: "",
        amountOfFine: "",
        rater: "",
        handleResult: "",
        remark: "",
      },
      projects: {},
      unitNames: {},
      rules: {
        contractor: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        violationDate: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        assessmentContent: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        pointsDeducted: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        amountOfFine: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
      },
    };
  },

  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    // title: {
    //   type: String,
    //   default: "新增相关方违章信息",
    // },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
    this.test();
  },
  methods: {
    async test() {
      const Related = await informationUrlrelateAPI();
      console.log('违章相关方',Related);
      this.unitNames = Related.data;
      const project = await projectmanageAllAPI();
       this.projects = project.data;
      console.log('项目名称',project);
      console.log('项目名称',project.data);
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            ...this.ruleForm,
          };
          informationUrlCreateAPI(params).then((res) => {
            this.$message.success("新增成功");
            this.close();
            this.$emit("refresh");
          });
          // console.log(this.ruleForm);
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
    // open(row, type) {
    //   this.openEdit = true;
    //   // this.form.id = row.id;
    //   this.isDisabled = type === "chakan" ? true : false;
    //   if (row && row.id) {
    //     this.rowData = row;
    //     this.getDetail(row.id);
    //   } else {
    //     this.form = {};
    //   }
    // },
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "添加相关方违章历史";
        this.isDisabled = false;
      } else if (type == "bianji") {
        // this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑相关方违章历史";
        this.isDisabled = false;
      }
      else if (type == "chakan") {
        // this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "查看相关方违章历史";
        this.isDisabled = false;
      }
      this.openEdit = true;
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
.recordsForm {
  padding: 30px 50px 0 20px;
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
