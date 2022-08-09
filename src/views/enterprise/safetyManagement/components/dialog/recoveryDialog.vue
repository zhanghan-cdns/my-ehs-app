<template>
  <!-- 恢复弹窗 -->
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
        <form-recovery-info
          :row="row"
          ref="recoveryFormRef"
        ></form-recovery-info>
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
import formRecoveryInfo from "../operationForm/formRecoveryInfo.vue";
import { recoveryCreateAPI } from "@/api/enterprise/safetyManagement/public/recovery";

export default {
  components: {
    formRecoveryInfo,
  },

  data() {
    return {
      icon: "icon-bianji2",
      title: "新增设备恢复信息",
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
      this.$refs.recoveryFormRef.$refs.recoveryFormRef.validate(
        async (valid) => {
          if (valid) {
            let recoveryForm = this.$refs.recoveryFormRef.recoveryForm;
            let params = {
              facilityId: this.row.id,
              facilityName: this.row.facilityName,
              ...recoveryForm,
            };
            const res = await recoveryCreateAPI(params);
            if (res && res.code !== 200) {
              return this.$message.error("保存失败");
            }
            this.close();
            this.$message.success("保存成功");
          }
        }
      );
    },

    // 重置表单
    resetForm() {
      this.$refs.recoveryFormRef.$refs.recoveryFormRef.resetFields();
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
