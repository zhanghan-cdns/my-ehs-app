<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1200"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="left"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="qualificationInformation">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>资质信息表</span
            >
            <qualification-information :operateButtonList='["chakan", "bianji", "shanchu"]' :headerButtonList="['chaxun','xinzeng']"></qualification-information>
          </el-tab-pane>
          <el-tab-pane name="distinguish">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>作业人员表</span
            >
            <operators-list :operateButtonList='["chakan", "bianji", "shanchu"]' :headerButtonList="['chaxun','xinzeng']"></operators-list>
          </el-tab-pane>
          <el-tab-pane name="constructionTeam">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>施工队伍</span
            >
            <construction-team :operateButtonList='["chakan", "bianji", "shanchu"]' :headerButtonList="['chaxun','xinzeng']"></construction-team>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import qualificationInformation from "./qualificationInformation";
import operatorsList from "./operatorsList";
import constructionTeam from "./constructionTeam";
export default {
  components: {
    qualificationInformation,
    operatorsList,
    constructionTeam
  },

  data() {
    return {
      icon:"icon-xinzeng",
      title:"添加关联信息",
      openFlag: false,
      activeName: "qualificationInformation",
    };
  },

  created() {},

  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "laws":
          break;
        case "distinguish":
          break;
        case "approval":
          break;
      }
    },

    open(type) {
      this.openFlag = true;
    },
    close() {
      this.openFlag = false;
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
