<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1259"
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
          <el-tab-pane name="institutional">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>制度信息</span
            >
            <institutional-info ref="institutionalInfoRef"></institutional-info>
          </el-tab-pane>
          <el-tab-pane name="approval">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>审批信息</span
            >
            <approval-info ref="approvalInfoRef"></approval-info>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import institutionalInfo from "./institutionalInfo.vue";
import approvalInfo from "@/views/institutionalized/lawsRegulations/lawIdentify/components/approvalInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";
import { inspectListAllAPI } from "@/api/enterprise/safetyManagement/public/inspect";

export default {
  components: {
    institutionalInfo,
    approvalInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看安全管理制度信息信息",
      openEdit: false,
      activeName: "institutional",
      row: {},
    };
  },

  created() {},

  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "institutional":
          // this.getLawsInfo(this.row.id);
          break;
        case "approval":
          break;
      }
    },

    open(row) {
      this.openEdit = true;
      this.activeName = "institutional";
      if (row && row.id) {
        this.row = row;
      }
    },

    created() {},

    close() {
      this.openEdit = false;
    },

    // 获取法律法规信息
    async getInstitutionalInfo() {
      const res = await informationViewAPI();
      if (res && res.code === 200) {
        this.$refs.viewLawsInfoRef.form = res.data;
      }
    },

    // 获取识别信息
    async getDistinguishInfo() {
      const res = await inspectListAllAPI();
      if (res && res.code === 200) {
        this.$refs.viewDistinguishInfoRef.form = res.data;
      }
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
  text-align: left;
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