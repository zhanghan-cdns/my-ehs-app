<template>
  <!-- 监测弹窗 -->
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
        <form-monitor-info :row="row" ref="monitorFormRef"></form-monitor-info>
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
import formMonitorInfo from "../operationForm/formMonitorInfo.vue";
// import { monitorCreateAPI } from "@/api/enterprise/safetyManagement/public/monitor";

export default {
  components: {
    formMonitorInfo,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      icon: "icon-bianji2",
      title: "新增设备监测信息",
      openEdit: false,
      width: "260px",
      size: "small",
      row: {},
    };
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
      //   let monitorForm = this.$refs.monitorFormRef.monitorForm;
      //   let params = { facilityId: this.row.id, ...monitorForm };
      //   console.log(params, "params");
      //   const res = await monitorCreateAPI(params);
      //   console.log(res, "res");
      //   if(res && res.code!==200) {
      //     return this.$message.error('保存失败')
      //   }
      //   this.close()
      //   this.$message.success('保存成功')
    },

    // 重置表单
    resetForm() {
      this.$refs.monitorFormRef.$refs.monitorFormRef.resetFields();
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
