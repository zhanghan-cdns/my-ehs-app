<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="900px"
      height="90%"
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
            label-width="140px"
            class="demo-ruleForm"
          >
            <!-- 演练记录 -->
            <el-form-item label="演练记录" prop="records">
              <el-select style="width: 100%" v-model="ruleForm.records">
                <el-option value="1">1</el-option>
              </el-select>
            </el-form-item>
            <!-- 整改人员 -->
            <el-form-item label="整改人员">
              <el-input v-model="ruleForm.personnel"></el-input>
            </el-form-item>
            <!-- 演练中存在的问题 -->
            <el-form-item label="演练中存在的问题">
              <el-input
                v-model="ruleForm.question"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 整改内容 -->
            <el-form-item label="整改内容">
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <!-- 上传照片 -->
            <el-form-item label="上传照片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <!-- 附件 -->
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </el-form-item>
            <!-- 备注 -->
            <el-form-item label="备注">
              <el-input
                v-model="ruleForm.note"
                type="textarea"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div class="Btn">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="resetForm">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
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
  name: "addDialog",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        records: "",
        personnel: "",
        question: "",
        content: "",
        note: "",
      },
      rules: {
        records: [{ required: true, message: "此项为必选项", trigger: "blur" }],
      },
      rectification: "1",
      Evaluationstate: "1",
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
      default: "添加演练整改信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 上传照片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    open(type, row) {
      this.isDisabled = false;
      this.openEdit = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          console.log("success");
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    close() {
      this.openEdit = false;
    },
  },

  resetForm() {
    this.$refs.ruleForm.resetFields();
  },
  close() {
    this.openEdit = false;
    this.resetForm();
  },
};
</script>

<style scoped lang="scss">
.el-upload__text {
  margin-top: -40px;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
/deep/.spical .el-form-item__label {
  line-height: 20px;
}
</style>
