<template>
  <!-- 保养弹窗 -->
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
        <form-maintain-info
          :row="row"
          ref="maintainFormRef"
        ></form-maintain-info>
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
import formMaintainInfo from "../operationForm/formMaintainInfo.vue";
import { maintainCreateAPI } from "@/api/enterprise/safetyManagement/public/maintain";
import { personToObject } from "@/util/tool";

export default {
  components: {
    formMaintainInfo,
  },

  data() {
    return {
      icon: "icon-bianji2",
      title: "新增设备保养信息",
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
    async submitForm() {
      this.$refs.maintainFormRef.$refs.maintainFormRef.validate(
        async (valid) => {
          if (valid) {
            let maintainForm = this.$refs.maintainFormRef.maintainForm;
            maintainForm.chargeManName = personToObject(
              maintainForm.chargeManName
            );
            let params = {
              facilityId: this.row.id,
              facilityName: this.row.facilityName,
              ...maintainForm,
            };
            const res = await maintainCreateAPI(params);
            if (res && res.code !== 200) {
              return this.$message.error("保存保养内容失败");
            }
            this.$message.success("保存保养内容成功");
            this.close();
          }
        }
      );
    },

    // 重置表单
    resetForm() {
      this.$refs.maintainFormRef.$refs.maintainFormRef.resetFields();
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
