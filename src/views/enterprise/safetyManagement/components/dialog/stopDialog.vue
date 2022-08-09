<template>
  <!-- 停用弹窗 -->
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
        <form-stop-info :row="row" ref="stopFormRef"></form-stop-info>
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
import formStopInfo from "../operationForm/formStopInfo.vue";
import { stopCreateAPI } from "@/api/enterprise/safetyManagement/public/stop";
import { personToObject } from "@/util/tool";

export default {
  components: {
    formStopInfo,
  },

  data() {
    return {
      icon: "icon-bianji2",
      title: "新增设备停用信息",
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
      this.$refs.stopFormRef.$refs.stopFormRef.validate(async (valid) => {
        if (valid) {
          let stopForm = this.$refs.stopFormRef.stopForm;
          stopForm.stopManName = personToObject(stopForm.stopManName);
          let params = {
            facilityId: this.row.id,
            facilityName: this.row.facilityName,
            ...stopForm,
          };
          const res = await stopCreateAPI(params);
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
      this.$refs.stopFormRef.$refs.stopFormRef.resetFields();
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
