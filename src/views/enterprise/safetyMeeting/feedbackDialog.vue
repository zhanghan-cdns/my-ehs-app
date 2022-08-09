<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="'督办' + title"
      width="600px"
      height="30%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
      <el-form-item label="督办事项反馈" prop="place">
              <el-input
                :size="size"
                type="textarea"
                :isDisabled="isDisabled"
                v-model="form.place"
              ></el-input>
            </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        place: "",
      },
      rules: {
        place: [{ required: true, message: "此处为必填项", trigger: "blur" }],
      },
      rowData: {},
      value1: "",
      value2: "",
      theme: "",
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
      default: "事项反馈",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    selectBlur(e) {
      // 意见类型
      if (e.target.form.theme !== "") {
        this.theme = e.target.form.theme + "(其他)";
        this.$forceUpdate(); // 强制更新
      }
    },
    selectChange(val) {
      this.form.theme = val;
      this.$forceUpdate();
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
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
            // if (this.rowData.id) this.modify();
            // else this.add();
            console.log(this.form.place);
          console.log("success")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
// /deep/ .el-form-item {
//   margin-bottom: 20px !important;
// }
/deep/ .el-textarea__inner{
    width: 90%;
}
/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
