<template>
  <!-- 检测弹窗 -->
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <form-test-info :row="row" ref="testFormRef"></form-test-info>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button type="success" @click="resetForm()">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import formTestInfo from "../operationForm/formTestInfo.vue";
import { testCreateAPI } from "@/api/enterprise/safetyManagement/public/test";
import { personToObject } from "@/util/tool";

export default {
  components: {
    formTestInfo,
  },

  data() {
    return {
      icon: "icon-bianji2",
      title: "新增设备检测信息",
      openEdit: false,
      width: "260px",
      size: "small",
      row: {},
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    open(row) {
      console.log(row, "row");
      this.openEdit = true;
      this.row = row;
    },

    close() {
      this.openEdit = false;
      this.resetForm();
    },

    // 提交菜单
    submitForm() {
      this.$refs.testFormRef.$refs.testFormRef.validate(async (valid) => {
        if (valid) {
          let testForm = this.$refs.testFormRef.testForm;
          testForm.testManName = personToObject(testForm.testManName);
          let params = {
            facilityId: this.row.id,
            facilityName: this.row.facilityName,
            ...testForm,
          };
          const res = await testCreateAPI(params);
          if (res && res.code !== 200) {
            return this.$message.error("保存失败");
          }
          this.close();
          this.$message.success("保存成功");
        }
      });
    },

    // 重置表单
    resetForm() {
      this.$refs.testFormRef.$refs.testFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}
/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
