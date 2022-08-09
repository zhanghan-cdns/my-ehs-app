<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane name="ruleFile">
        <span slot="label"
          ><i class="icon-jichuxinxi1 tab-icon"></i>规程规章文件</span
        >
        <rule-file></rule-file>
      </el-tab-pane>
      <el-tab-pane name="revisionRecord">
        <span slot="label"
          ><i class="icon-jichuxinxi1 tab-icon"></i>修订记录</span
        >
        <revision-record
          ref="revisionRecordRef"
          :selectRowData="selectRowData"
        ></revision-record>
      </el-tab-pane>
      <el-tab-pane name="reviewList">
        <span slot="label"
          ><i class="icon-jichuxinxi1 tab-icon"></i>评审信息</span
        >
        <review-list
          ref="reviewListRef"
          :selectRowData="selectRowData"
        ></review-list>
      </el-tab-pane>
      <el-tab-pane name="cancelInfo">
        <span slot="label"
          ><i class="icon-jichuxinxi1 tab-icon"></i>作废记录信息</span
        >
        <cancel-info
          ref="cancelInfoRef"
          :selectRowData="selectRowData"
        ></cancel-info>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ruleFile from "./ruleFile.vue";
import revisionRecord from "./revisionRecord.vue";
import reviewList from "./reviewList.vue";
import cancelInfo from "./cancelInfo.vue";

export default {
  components: {
    ruleFile,
    revisionRecord,
    reviewList,
    cancelInfo,
  },

  props: {
    selectRowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      activeName: "ruleFile",
    };
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "ruleFile":
          break;
        case "revisionRecord":
          break;
        case "reviewList":
          break;
        case "cancelInfo":
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__nav .is-top {
  margin-top: 0px !important;
}

/deep/ .el-tabs__item {
  padding: 0px;
}

/deep/ .el-tabs__active-bar {
  background-color: transparent;
}

/deep/ .el-tabs__item.is-active {
  background-color: rgba(64, 158, 255, 0.09);
}

/deep/ .el-tabs__nav-wrap::after {
  background-color: #c6e2ff;
}

/deep/ .el-tabs__content {
  overflow: scroll;
}

.tab-icon {
  margin-right: 10px;
}
</style>