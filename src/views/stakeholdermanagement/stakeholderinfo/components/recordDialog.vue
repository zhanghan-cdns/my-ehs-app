<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="'新增' + title"
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
            <el-form-item label="违章相关方" prop="illegal">
              <el-select v-model="ruleForm.illegal" style="width: 100%">
                <el-option label="一" value="shanghai"></el-option>
                <el-option label="二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="违章日期" prop="value1">
                  <el-date-picker
                    style="width: 100%"
                    v-model="ruleForm.value1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="违章人姓名">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="项目名称" prop="projectName">
              <el-select v-model="ruleForm.projectName" style="width: 100%">
                <el-option label="一" value="shanghai"></el-option>
                <el-option label="二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考评内容" prop="evaluation">
              <el-select v-model="ruleForm.evaluation" style="width: 100%">
                <el-option label="一" value="shanghai"></el-option>
                <el-option label="二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="扣分分值" prop="score">
                  <el-input v-model="ruleForm.score"></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="罚款金额(元)" prop="fines">
                  <el-input v-model="ruleForm.fines"></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="评定人">
                  <el-input
                    v-model="ruleForm.toAssess"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="处理结果">
                  <el-input
                    v-model="ruleForm.results"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>

            <el-form-item label="备注">
              <el-input v-model="ruleForm.note" type="textarea"></el-input>
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
  name: "recordDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        illegal: "",
        projectName: "",
        evaluation: "",
        value1: "",
        name: "",
        score: "",
        fines: "",
        toAssess: "",
        results: "",
        note: "",
      },
      rules: {
        illegal: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        value1: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        evaluation: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        score: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        fines: [{ required: true, message: "此项为必填项", trigger: "blur" }],
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
    title: {
      type: String,
      default: "相关方违章信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
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
      this.resetForm()
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
/deep/.el-form-item__error{
    padding-top: 0;
}
.Btn el-button{
    width: 260px;
}
</style>
