<template>
  <div>
    <div class="form-title">
      <i class="iconfont icon-fujiaxinxi form-title-icon"></i
      ><span class="form-title-name">附加信息</span>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      stretch
      type="border-card"
    >
      <el-tab-pane label="监测指标" name="monitor">监测指标</el-tab-pane>
      <el-tab-pane label="巡检内容" name="inspection">
        <form-inspection-info ref="inspectionFormRef"></form-inspection-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitInspectionForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="检查内容" name="inspect" v-if="type !== 'bianji'">
        <form-inspect-info ref="inspectFormRef" :row="row"></form-inspect-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitInspectForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="检测内容" name="test" v-if="type !== 'bianji'">
        <form-test-info ref="testFormRef" :row="row"></form-test-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitTestForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备保养" name="maintain" v-if="type !== 'bianji'">
        <form-maintain-info
          ref="maintainFormRef"
          :row="row"
        ></form-maintain-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitMaintainForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备维修" name="repair" v-if="type !== 'bianji'">
        <form-repair-info ref="repairFormRef" :row="row"></form-repair-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitRepairForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备停用" name="stop" v-if="type !== 'bianji'">
        <form-stop-info ref="stopFormRef" :row="row"></form-stop-info>
        <div class="btn-submit">
          <el-button type="primary" :size="size" @click="submitStopForm"
            >确定</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import formInspectionInfo from "../operationForm/formInspectionInfo.vue";
import formInspectInfo from "../operationForm/formInspectInfo.vue";
import formTestInfo from "../operationForm/formTestInfo.vue";
import formMaintainInfo from "../operationForm/formMaintainInfo.vue";
import formRepairInfo from "../operationForm/formRepairInfo.vue";
import formStopInfo from "../operationForm/formStopInfo.vue";
import {
  inspectionListAllAPI,
  inspectionCreateListAPI,
  inspectionUpdateAPI,
} from "@/api/enterprise/safetyManagement/public/inspection";
import { inspectCreateAPI } from "@/api/enterprise/safetyManagement/public/inspect";
import { testCreateAPI } from "@/api/enterprise/safetyManagement/public/test";
import { maintainCreateAPI } from "@/api/enterprise/safetyManagement/public/maintain";
import { repairCreateAPI } from "@/api/enterprise/safetyManagement/public/repair";
import { stopCreateAPI } from "@/api/enterprise/safetyManagement/public/stop";
import { personToObject } from "@/util/tool";

export default {
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },

  components: {
    formInspectionInfo,
    formInspectInfo,
    formTestInfo,
    formMaintainInfo,
    formRepairInfo,
    formStopInfo,
  },

  data() {
    return {
      size: "small",
      activeName: "monitor",
    };
  },

  created() {},

  watch: {
    row: {
      handler(newVal) {
        console.log(newVal, "newVal");
        console.log(this.type, "type");
        if (newVal) {
          this.row = newVal;
        }
        if (this.type === "bianji") {
          this.getInspectionDetail(this.row.id);
        }
      },
      immediate: true, // 重点
      deep: true, // 重点
    },
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab.name, "tab");
    },

    // 获取巡检信息详情
    async getInspectionDetail(id) {
      const res = await inspectionListAllAPI({ facilityId: id });
      console.log(res, "resinspection");
      if (res.code !== 200) return this.$message.error("获取巡检信息失败");
      this.$refs.inspectionFormRef.inspectionForm.createList = res.data;
    },

    submitInspectionForm() {
      if (this.type === "bianji") {
        this.submitInspectionUpdateForm();
      } else {
        this.submitInspectionCreateForm();
      }
    },

    // 更新巡检内容表单
    submitInspectionUpdateForm() {
      this.$refs.inspectionFormRef.$refs.inspectionFormRef.validate(
        async (valid) => {
          if (valid) {
            let inspectionForm = this.$refs.inspectionFormRef.inspectionForm;
            for (let i = 0; i < inspectionForm.createList.length; i++) {
              inspectionForm.createList[i].facilityId = this.row.id;
            }
            let params = inspectionForm.createList;
            const res = await inspectionUpdateAPI(params);
            if (res && res.code !== 200) {
              return this.$message.error("编辑巡检内容失败");
            }
            this.$message.success("编辑巡检内容成功");
            this.$refs.inspectionFormRef.$refs.inspectionFormRef.resetFields();
          }
        }
      );
    },

    // 提交巡检内容表单
    submitInspectionCreateForm() {
      this.$refs.inspectionFormRef.$refs.inspectionFormRef.validate(
        async (valid) => {
          if (valid) {
            let inspectionForm = this.$refs.inspectionFormRef.inspectionForm;
            for (let i = 0; i < inspectionForm.createList.length; i++) {
              inspectionForm.createList[i].facilityId = this.row.id;
            }
            let params = inspectionForm.createList;
            const res = await inspectionCreateListAPI(params);
            if (res && res.code !== 200) {
              return this.$message.error("新增巡检内容失败");
            }
            this.$message.success("新增巡检内容成功");
            this.$refs.inspectionFormRef.$refs.inspectionFormRef.resetFields();
          }
        }
      );
    },

    // 提交检查内容表单
    submitInspectForm() {
      this.$refs.inspectFormRef.$refs.inspectFormRef.validate(async (valid) => {
        if (valid) {
          let inspectForm = this.$refs.inspectFormRef.inspectForm;
          inspectForm.checkManName = personToObject(inspectForm.checkManName);
          let params = {
            facilityId: this.row.id,
            facilityName: this.row.facilityName,
            ...inspectForm,
          };
          const res = await inspectCreateAPI(params);
          if (res && res.code !== 200) {
            return this.$message.error("新增检查内容失败");
          }
          this.$message.success("新增检查内容成功");
          this.$refs.inspectFormRef.$refs.inspectFormRef.resetFields();
        }
      });
    },

    // 提交检测内容表单
    submitTestForm() {
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
            return this.$message.error("保存检测内容失败");
          }
          this.$message.success("保存检测内容成功");
          this.$refs.testFormRef.$refs.testFormRef.resetFields();
        }
      });
    },

    // 提交保养内容表单
    submitMaintainForm() {
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
            this.$refs.maintainFormRef.$refs.maintainFormRef.resetFields();
          }
        }
      );
    },

    // 提交维修内容表单
    submitRepairForm() {
      this.$refs.repairFormRef.$refs.repairFormRef.validate(async (valid) => {
        if (valid) {
          let repairForm = this.$refs.repairFormRef.repairForm;
          repairForm.chargeManName = personToObject(repairForm.chargeManName);
          let params = {
            facilityId: this.row.id,
            facilityName: this.row.facilityName,
            ...repairForm,
          };
          const res = await repairCreateAPI(params);
          if (res && res.code !== 200) {
            return this.$message.error("保存维修内容失败");
          }
          this.$message.success("保存维修内容成功");
          this.$refs.repairFormRef.$refs.repairFormRef.resetFields();
        }
      });
    },

    // 提交停用内容表单
    submitStopForm() {
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
            return this.$message.error("保存停用内容失败");
          }
          this.$message.success("保存停用内容成功");
          this.$refs.stopFormRef.$refs.stopFormRef.resetFields();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-title {
  margin: 10px 0px;
  .form-title-icon {
    font-size: 26px;
    vertical-align: sub;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
  }
}

/deep/ .el-tabs__nav .is-top {
  margin-top: 0px !important;
}

.btn-submit {
  text-align: right;
}
</style>>
