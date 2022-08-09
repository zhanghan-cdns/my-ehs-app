<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1117px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="left"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="baseInfo">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>基础信息</span
            >
            <view-base-info ref="baseFormRef"></view-base-info>
            <view-special-add-info
              v-if="menu === 'specialEquipment'"
              ref="specialFormRef"
            ></view-special-add-info>
            <view-production-add-info
              v-if="menu === 'productionEquipment'"
              ref="productionFormRef"
            ></view-production-add-info>
            <view-safety-add-info
              v-if="menu === 'safetyFacilities'"
              ref="safetyFormRef"
            ></view-safety-add-info>
            <view-storage-add-info
              v-if="menu === 'storageTank'"
              ref="storageFormRef"
            ></view-storage-add-info>
          </el-tab-pane>
          <el-tab-pane name="monitor">
            <span slot="label"
              ><i class="icon-jiance1 tab-icon"></i>监测指标</span
            >
            监测指标
          </el-tab-pane>
          <el-tab-pane name="inspection">
            <span slot="label"
              ><i class="icon-xunjian tab-icon"></i>巡检信息</span
            >
            巡检信息
          </el-tab-pane>
          <el-tab-pane name="alarm">
            <span slot="label"
              ><i class="icon-baojing tab-icon"></i>报警信息</span
            >
            报警信息
          </el-tab-pane>
          <el-tab-pane name="inspect">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>检查信息</span
            >
            <view-inspect-info ref="inspectInfoRef"></view-inspect-info>
          </el-tab-pane>
          <el-tab-pane name="test">
            <span slot="label"
              ><i class="icon-jiance tab-icon"></i>检测信息</span
            >
            <view-test-info ref="testInfoRef"></view-test-info>
          </el-tab-pane>
          <el-tab-pane name="maintain">
            <span slot="label"
              ><i class="icon-baoyang tab-icon"></i>保养信息</span
            >
            <view-maintain-info ref="maintainInfoRef"></view-maintain-info>
          </el-tab-pane>
          <el-tab-pane name="repair">
            <span slot="label"
              ><i class="icon-weixiu tab-icon"></i>维修信息</span
            >
            <view-repair-info ref="repairInfoRef"></view-repair-info>
          </el-tab-pane>
          <el-tab-pane name="stop">
            <span slot="label"
              ><i class="icon-tingyong tab-icon"></i>停用信息</span
            >
            <view-stop-info ref="stopInfoRef"></view-stop-info>
          </el-tab-pane>
          <el-tab-pane name="recovery">
            <span slot="label"
              ><i class="icon-huifu tab-icon"></i>恢复信息</span
            >
            <view-recovery-info ref="recoveryInfoRef"></view-recovery-info>
          </el-tab-pane>
          <el-tab-pane name="scrap">
            <span slot="label"
              ><i class="icon-baofei tab-icon"></i>报废信息</span
            >
            <view-scrap-info ref="scrapInfoRef"></view-scrap-info>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import viewBaseInfo from "./viewInfo/viewBaseInfo.vue";
import viewSpecialAddInfo from "./viewInfo/viewSpecialAddInfo.vue";
import viewProductionAddInfo from "./viewInfo/viewProductionAddInfo.vue";
import viewSafetyAddInfo from "./viewInfo/viewSafetyAddInfo.vue";
import viewStorageAddInfo from "./viewInfo/viewStorageAddInfo.vue";
import viewInspectInfo from "./viewInfo/viewInspectInfo.vue";
import viewTestInfo from "./viewInfo/viewTestInfo.vue";
import viewMaintainInfo from "./viewInfo/viewMaintainInfo.vue";
import viewRepairInfo from "./viewInfo/viewRepairInfo.vue";
import viewStopInfo from "./viewInfo/viewStopInfo.vue";
import viewRecoveryInfo from "./viewInfo/viewRecoveryInfo.vue";
import viewScrapInfo from "./viewInfo/viewScrapInfo.vue";
import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";
import { specialEquipmentViewAPI } from "@/api/enterprise/safetyManagement/specialEquipment/index";
import { productionEquipmentViewAPI } from "@/api/enterprise/safetyManagement/productionEquipment/index";
import { safetyFacilitiesViewAPI } from "@/api/enterprise/safetyManagement/safetyFacilities/index";
import { storageTankViewAPI } from "@/api/enterprise/safetyManagement/storageTank/index";
import { inspectListAllAPI } from "@/api/enterprise/safetyManagement/public/inspect";
import { maintainListAllAPI } from "@/api/enterprise/safetyManagement/public/maintain";
import { recoveryListAllAPI } from "@/api/enterprise/safetyManagement/public/recovery";
import { repairListAllAPI } from "@/api/enterprise/safetyManagement/public/repair";
import { scrapListAllAPI } from "@/api/enterprise/safetyManagement/public/scrap";
import { stopListAllAPI } from "@/api/enterprise/safetyManagement/public/stop";
import { testListAllAPI } from "@/api/enterprise/safetyManagement/public/test";

export default {
  components: {
    viewSpecialAddInfo,
    viewProductionAddInfo,
    viewSafetyAddInfo,
    viewStorageAddInfo,
    viewInspectInfo,
    viewBaseInfo,
    viewTestInfo,
    viewMaintainInfo,
    viewRepairInfo,
    viewStopInfo,
    viewRecoveryInfo,
    viewScrapInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看设备设施信息",
      openEdit: false,
      activeName: "baseInfo",
      row: {},
      type: "",
      menu: "",
      menuList: [
        "specialEquipment",
        "productionEquipment",
        "safetyFacilities",
        "storageTank",
      ],
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab.name, "tab");
      switch (tab.name) {
        case "inspect":
          this.getInspectTableData(this.row.id);
          break;
        case "test":
          this.getTestTableData(this.row.id);
          break;
        case "maintain":
          this.getMaintainTableData(this.row.id);
          break;
        case "repair":
          this.getRepairTableData(this.row.id);
          break;
        case "stop":
          this.getStopTableData(this.row.id);
          break;
        case "recovery":
          this.getRecoveryTableData(this.row.id);
          break;
        case "scrap":
          this.getScrapTableData(this.row.id);
          break;
      }
    },

    open(row, type, menu) {
      this.openEdit = true;
      this.type = type;
      this.menu = menu;
      if (row && row.id) {
        this.row = row;
        this.getDetail(row.id);
      }
    },

    close() {
      this.openEdit = false;
      this.activeName = "baseInfo";
    },

    // 获取基本信息详情
    async getDetail(id) {
      let res = {};
      if (this.menu === "information") {
        res = await informationViewAPI({ id });
      } else if (this.menu === "specialEquipment") {
        res = await specialEquipmentViewAPI({ id });
      } else if (this.menu === "productionEquipment") {
        res = await productionEquipmentViewAPI({ id });
      } else if (this.menu === "safetyFacilities") {
        res = await safetyFacilitiesViewAPI({ id });
      } else if (this.menu === "storageTank") {
        res = await storageTankViewAPI({ id });
      }

      if (res && res.code !== 200)
        return this.$message.error("获取详情信息失败");

      if (res.data) {
        // 回显基础信息
        if (this.menuList.includes(this.menu)) {
          this.$refs.baseFormRef.baseForm = res.data.productionFacilities;
          this.setBaseFormSelect(
            this.$refs.baseFormRef.baseForm,
            res.data.productionFacilities
          );
        } else {
          this.$refs.baseFormRef.baseForm = res.data;
          this.setBaseFormSelect(this.$refs.baseFormRef.baseForm, res.data);
        }

        // 回显附加信息
        if (this.menu === "specialEquipment") {
          this.$refs.specialFormRef.specialForm = res.data;
          this.setSpecialFormSelect(
            this.$refs.specialFormRef.specialForm,
            res.data
          );
        } else if (this.menu === "productionEquipment") {
          this.$refs.productionFormRef.productionForm = res.data;
          this.setProductionFormSelect(
            this.$refs.productionFormRef.productionForm,
            res.data
          );
        } else if (this.menu === "safetyFacilities") {
          this.$refs.safetyFormRef.safetyForm = res.data;
          this.setSafetyFormSelect(
            this.$refs.safetyFormRef.safetyForm,
            res.data
          );
        } else if (this.menu === "storageTank") {
          this.$refs.storageFormRef.storageForm = res.data;
          this.setStorageFormSelect(
            this.$refs.storageFormRef.storageForm,
            res.data
          );
          // 储罐关联表单字段回显
          if (res.data.tankFarmDevice && res.data.material) {
            this.$refs.storageFormRef.tankFarmDevice =
              res.data.tankFarmDevice.storageName;
            this.$refs.storageFormRef.storageMedium =
              res.data.material.materialName;
            this.$refs.storageFormRef.casNumber = res.data.material.casNumber;
            this.$refs.storageFormRef.materialState = res.data.material
              .materialForm
              ? res.data.material.materialForm.key
              : "";
            this.$refs.storageFormRef.subCategory = res.data.material.category
              ? res.data.material.category.key
              : "";
          }
        }
      }
    },

    // 设置基本信息下拉回显
    setBaseFormSelect(form, data) {
      form.menuDifferent = data.menuDifferent ? data.menuDifferent.key : "";
    },

    setSpecialFormSelect(form, data) {
      form.equipmentType = data.equipmentType ? data.equipmentType.key : "";
    },

    setProductionFormSelect(form, data) {
      form.equipmentCategory = data.equipmentCategory
        ? data.equipmentCategory.key
        : "";
    },

    setSafetyFormSelect(form, data) {
      form.categories = data.categories ? data.categories.key : "";
      form.smallClass = data.smallClass ? data.smallClass.value : "";
    },

    setStorageFormSelect(form, data) {
      form.storageForm = data.storageForm ? data.storageForm.key : "";
      form.storageStructure = data.storageStructure
        ? data.storageStructure.key
        : "";
      form.locationCla = data.locationCla ? data.locationCla.key : "";
    },

    async getInspectTableData(id) {
      const res = await inspectListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取检查信息列表失败");
      this.$refs.inspectInfoRef.tableData = res.data;
    },

    async getTestTableData(id) {
      const res = await testListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取检测信息列表失败");
      this.$refs.testInfoRef.tableData = res.data;
    },

    async getMaintainTableData(id) {
      const res = await maintainListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取保养信息列表失败");
      this.$refs.maintainInfoRef.tableData = res.data;
    },

    async getRepairTableData(id) {
      const res = await repairListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取维修信息列表失败");
      this.$refs.repairInfoRef.tableData = res.data;
    },

    async getStopTableData(id) {
      const res = await stopListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取停用信息列表失败");
      this.$refs.stopInfoRef.tableData = res.data;
    },

    async getRecoveryTableData(id) {
      const res = await recoveryListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取恢复信息列表失败");
      this.$refs.recoveryInfoRef.tableData = res.data;
    },

    async getScrapTableData(id) {
      const res = await scrapListAllAPI({ facilityId: id });
      if (res.code !== 200) return this.$message.error("获取报废信息列表失败");
      this.$refs.scrapInfoRef.tableData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
  height: 100%;
  overflow: scroll;
}

/deep/ .el-tabs--left .el-tabs__item.is-left {
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0px 10px 20px 0px;
}

/deep/ .el-tabs .is-active {
  background: rgba(70, 133, 249, 0.09);
}

.tab-icon {
  font-size: 18px !important;
  vertical-align: bottom;
  margin-right: 10px;
}

/deep/ .el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}
</style>