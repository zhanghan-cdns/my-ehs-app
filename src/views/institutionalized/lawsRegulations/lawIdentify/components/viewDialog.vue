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
          <el-tab-pane name="laws">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>法律法规信息</span
            >
            <view-laws-info ref="viewLawsInfoRef"></view-laws-info>
          </el-tab-pane>
          <el-tab-pane name="distinguish">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>识别信息</span
            >
            <view-distinguish-info
              ref="viewDistinguishInfoRef"
            ></view-distinguish-info>
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
import viewLawsInfo from "@/views/institutionalized/lawsRegulations/standardLibrary/components/viewLawsInfo.vue";
import viewDistinguishInfo from "@/views/institutionalized/lawsRegulations/standardLibrary/components/viewDistinguishInfo.vue";
import approvalInfo from "./approvalInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";
import { inspectListAllAPI } from "@/api/enterprise/safetyManagement/public/inspect";

export default {
  components: {
    viewLawsInfo,
    viewDistinguishInfo,
    approvalInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看信息",
      openEdit: false,
      activeName: "laws",
      row: {},
    };
  },

  created() {},

  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "laws":
          // this.getLawsInfo(this.row.id);
          break;
        case "distinguish":
          // this.getDistinguishInfo(this.row.id);
          break;
        case "approval":
          break;
      }
    },

    open(row) {
      this.openEdit = true;
      this.activeName = "laws";
      if (row && row.id) {
        this.row = row;
      }
    },

    created() {},

    close() {
      this.openEdit = false;
      // this.activeName = "laws";
    },

    // 获取法律法规信息
    async getLawsInfo() {
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
