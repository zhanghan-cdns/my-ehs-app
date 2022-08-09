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
            <el-form-item label="违章相关方" prop="illegal">
              <el-input v-model="ruleForm.illegal"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="违章日期" prop="value1">
                  <el-input v-model="ruleForm.value1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="违章人姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="考评内容" prop="evaluation">
              <el-input v-model="ruleForm.evaluation"></el-input>
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
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "informationDialog",
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
    open() {
      this.openEdit = true;
      console.log(this.openEdit);
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
