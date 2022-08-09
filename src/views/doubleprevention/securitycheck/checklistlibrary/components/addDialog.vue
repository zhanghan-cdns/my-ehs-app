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
            <el-row>
              <el-col :span="12">
                <el-form-item label="检查类型" prop="type">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.type"
                    placeholder="请选择检查类型"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查单元" prop="unit">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.unit"
                    placeholder="请选择检查单元"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查方式" prop="way">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.way"
                    placeholder="请选择检查方式"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="检查内容" prop="content">
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                placeholder="请输入检查内容"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <el-form-item label="依据" prop="basis">
              <el-input
                v-model="ruleForm.basis"
                type="textarea"
                placeholder="请输入依据"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="ruleForm.note"
                type="textarea"
                placeholder="请输入备注"
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
      openEdit: false,
      isDisabled: "",
      ruleForm: {
        type: "",
        unit: "",
        way: "",
        content: "",
        basis: "",
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
      default: "新增检查表库",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增检查表库";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑检查表库";
        this.isDisabled = false;
      } 
      this.openEdit = true;
    },
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
    close() {
      this.openEdit = false;
      this.resetForm();
    },
  },
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
  close() {
    this.openEdit = false;
    this.resetForm();
  },
};
</script>

<style scoped lang="scss">
/deep/.el-col {
  margin-bottom: -10px;
}
/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
</style>
