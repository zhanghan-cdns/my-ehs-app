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
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查单元" prop="unit">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.type"
                    placeholder="请选择检查单元"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查方式" prop="way">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.type"
                    placeholder="请选择检查方式"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="检查内容" prop="content">
              <el-select
                style="width: 100%"
                v-model="ruleForm.type"
                placeholder="请输入检查内容"
                :autosize="{ minRows: 3}"
                disabled
              >
              </el-select>
            </el-form-item>
            <el-form-item label="依据" prop="basis">
              <el-select
                style="width: 100%"
                v-model="ruleForm.type"
                placeholder="请选择依据"
                :autosize="{ minRows: 3}"
                disabled
              >
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="ruleForm.note"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 3}"
                disabled
              ></el-input>
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
      default: "查看检查表库",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      console.log(this.isDisabled);
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
    },
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
