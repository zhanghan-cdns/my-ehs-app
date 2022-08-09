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
      <header-button @headerButtonClick="headerButtonMethods" />
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
              <el-input v-model="ruleForm.contractor" disabled></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="违章日期" prop="violationDate">
                  <el-input v-model="ruleForm.violationDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="违章人姓名" prop="violationName">
                  <el-input v-model="ruleForm.violationName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName" disabled></el-input>
            </el-form-item>
            <el-form-item label="考评内容" prop="assessmentContent">
              <el-input v-model="ruleForm.assessmentContent" disabled></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="扣分分值" prop="pointsDeducted">
                  <el-input v-model="ruleForm.pointsDeducted" disabled></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="罚款金额(元)" prop="amountOfFine">
                  <el-input v-model="ruleForm.amountOfFine" disabled></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="评定人">
                  <el-input
                    v-model="ruleForm.rater"
                    disabled
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="处理结果">
                  <el-input
                  disabled
                    v-model="ruleForm.handleResult"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>

            <el-form-item label="备注">
              <el-input v-model="ruleForm.remark" disabled type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";

import { informationUrlViewAPI } from "@/api/stakeholdermanagement/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "informationDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        contractor: "",
        projectName: "",
        evaluation: "",
        violationDate: "",
        violationName: "",
        pointsDeducted: "",
        amountOfFine: "",
        rater: "",
        handleResult: "",
        remark: "",
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
      default: "查看相关方违章信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(row) {
      this.openEdit = true; 
      this.ruleForm=row
      console.log(row);
    },
    close() {
      this.openEdit = false;
    },
  },
  destroyed() {
    this.openEdit = false;
    console.log(1);
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
