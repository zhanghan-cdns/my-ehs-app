<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1195px"
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
            <base-info ref="baseInfoRef" :type="type" :row="row"></base-info>
          </el-tab-pane>
          <el-tab-pane name="warnInfo">
            <span slot="label"
              ><i class="icon-baojing tab-icon"></i>报警信息</span
            >
            <warn-info ref="warnInfoRef" :row="row"></warn-info>
          </el-tab-pane>
          <el-tab-pane name="historyInfo">
            <span slot="label"
              ><i class="icon-lishijilu-copy tab-icon"></i>历史查看</span
            >
            <history-info ref="historyInfoRef" :row="row"></history-info>
          </el-tab-pane>
          <el-tab-pane name="historyChart">
            <span slot="label"
              ><i class="icon-a-fujiajiben tab-icon"></i>历史波动图</span
            >
            <history-chart ref="historyChartRef"></history-chart>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import baseInfo from "./baseInfo.vue";
import warnInfo from "./warnInfo.vue";
import historyInfo from "./historyInfo.vue";
import historyChart from "./historyChart.vue";

export default {
  components: { baseInfo, warnInfo, historyInfo, historyChart },

  data() {
    return {
      icon: "icon-chakan2",
      title: "",
      openEdit: false,
      activeName: "baseInfo",
      row: {},
      type: "",
    };
  },

  created() {},

  methods: {
    open(row, type) {
      this.activeName = "baseInfo";
      this.openEdit = true;
      this.type = type;
      switch (type) {
        case "storageTank":
          this.title = "查看储罐实时监测信息";
          break;
        case "gas":
          this.title = "查看气体实时监测信息";
          break;
        case "workmanship":
          this.title = "查看高危工艺实时监测信息";
          break;
      }
      if (row) {
        this.row = row;
        this.getBaseInfoData();
      }
    },

    close() {
      this.openEdit = false;
    },

    handleClick(tab) {
      switch (tab.name) {
        case "baseInfo":
          this.getBaseInfoData();
          break;
        case "warnInfo":
          this.getWarnInfoData();
          break;
        case "historyInfo":
          this.getHistoryInfoData();
          break;
        case "historyChart":
          this.getHistoryChartData();
          break;
      }
    },

    getBaseInfoData() {
      this.$nextTick(() => {
        // 获取实时数据
        this.$refs.baseInfoRef.getRealData(this.row.mon_id);

        // 获取图表数据
        this.$refs.baseInfoRef.getTableData(this.row.index_code);

        // 获取基础信息
        switch (this.type) {
          case "storageTank":
            this.$refs.baseInfoRef.getBaseData(this.row.st_id);
            break;
          case "gas":
            this.$refs.baseInfoRef.getBaseData(this.row.gd_id);
            break;
          case "workmanship":
            this.$refs.baseInfoRef.getBaseData(this.row.process_id);
            break;
        }
      });
    },

    getWarnInfoData() {
      this.$refs.warnInfoRef.getTableData(this.row.mon_id);
    },

    getHistoryInfoData() {
      this.$refs.historyInfoRef.getTableData(this.row.index_code);
    },

    getHistoryChartData() {
      // 获取实时数据
      this.$refs.historyChartRef.getRealData(this.row.mon_id);
      // 获取图表数据
      this.$refs.historyChartRef.getTableData(this.row.index_code);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
  height: 95%;
  padding: 24px;
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