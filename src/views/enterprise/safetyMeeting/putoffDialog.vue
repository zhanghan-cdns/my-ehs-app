<template>
  <div>
    <basic-dialog
      icon="
      icon-xinzengfabu
      "
      :title="'推迟' + title"
      width="600px"
      height="32%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
        style="margin-top:30px"
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item label="推迟时间" prop="value1">
            <el-date-picker
              v-model="form.value1"
              type="datetime"
              placeholder="选择日期时间"
            style="width:90%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="推迟原因" prop="place">
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
        value1:''
      },
      rules: {
        value1: [{ required: true, message: "此处为必填项", trigger: "blur" }],
        place: [{ required: true, message: "此处为必填项", trigger: "blur" }],
      },
      rowData: {},
     
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
      default: "会议",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
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

    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // if (this.rowData.id) this.modify();
          // else this.add();
          console.log(this.form.value1);
          console.log(this.form.place);
          console.log("success");
          this.close();
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
/deep/ .el-textarea__inner {
  width: 90%;
}
/deep/ .el-form-item__error {
  line-height: 2px;
}

</style>
