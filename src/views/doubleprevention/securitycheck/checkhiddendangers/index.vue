  <template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="任务分配" name="first">
            <first-tab ref="firstTabRef"></first-tab>
          </el-tab-pane>
          <el-tab-pane label="我的任务" name="second">
            <second-tab ref="secondTabRef"></second-tab>
          </el-tab-pane> </el-tabs></template
    ></list-container>
  </div>
</template>
<script>
import firstTab from "./components/firstTab";
import secondTab from "./components/secondTab";
export default {
  components: { firstTab, secondTab },
  data() {
    return {
      activeName: "first",
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      if (tab.label == "任务分配") {
        // getTableData
        this.$refs.firstTabRef.getTableData();
      } else {
        this.$refs.secondTabRef.getTableData();
      }
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/ .el-tabs__content {
  flex: 1;
}
/deep/ .el-tab-pane {
  height: 100%;
}
/deep/ .el-tabs {
  .el-tabs__header {
    padding:10px 0px 0px 23px;
    background: none;
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__active-bar {
            display: none;
          }
          .el-tabs__item {
            font-size: 14px;
            color: #4a80fc;
            width: 80px;
            height: 32px;
            line-height: 32px;
            padding:0;
            background: #f0f5ff;
            border-radius: 4px;
            text-align: center;
            margin-right: 15px;
            border: 1px solid #4A80FC;
          }
          .el-tabs__item.is-active {
            color: #ffffff;
            background: #5090ff;
          }
        }
      }
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
