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
                <el-form-item label="大类" prop="type">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.type"
                    placeholder="请选择检查类型"
                  >
                  <el-option label="人的不安全行为" value="people"></el-option>
                  <el-option label="物的不安全行为" value="thing"></el-option>
                  <el-option label="不良作业环境" value="environment"></el-option>
                  <el-option label="管理缺陷" value="Management"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="小类" prop="unit">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.unit"
                    placeholder="请选择小类"
                  >
                
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="隐患级别" prop="way">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.way"
                    placeholder="请选择隐患级别"
                  >
                       <el-option label="一般隐患" value="general"></el-option>
                  <el-option label="重大隐患" value="major"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="隐患描述" prop="content">
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                placeholder="请输入隐患描述"
                :autosize="{ minRows: 3}"

              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="ruleForm.note"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 3}"
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
      default: "新增隐患排查检查表库",
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
        this.title = "新增隐患排查检查表库";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑隐患排查检查表库";
        this.isDisabled = false;
      } 
      this.openEdit = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          console.log("success");
          this.close()
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
/deep/.el-col {
  margin-bottom: -10px;
}
/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
</style>
