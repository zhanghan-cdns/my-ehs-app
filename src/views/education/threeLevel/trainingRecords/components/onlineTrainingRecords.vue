<template>
  <basic-dialog
    title="线上培训记录"
    icon="icon-fujiaxinxi"
    :width="'80%'"
    :height="'80%'"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="考试记录" name="examinationRecords">
            <div class="role_operation_box">
              <header-search
                :searchItem="searchItem"
                :searchData="searchData"
              />
              <header-button
                @headerButtonClick="headerButtonMethods"
                :headerButtonList="['chaxun']"
              />
            </div>
            <dom-size-listen
              style="flex: 1"
              v-model="sizeCon"
              class="table_wrap"
            >
              <render-table
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </el-tab-pane>
          <el-tab-pane label="学时数统计" name="durationStatistics">
            <div class="role_operation_box" style="justify-content: flex-end">
              <header-button
                @headerButtonClick="headerButtonMethods"
                :headerButtonList="['chaxun']"
              />
            </div>
            <render-table
              :height="sizeCon.height"
              :data="tableData2"
              :columns="columns2"
            />
            <basicPager :page="page2" @pageChange="pageChange2"></basicPager>
          </el-tab-pane>
        </el-tabs>
        <test-paper ref="testPaperRef"></test-paper>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  examListAPI,
  durationStatisticsAPI,
  deleteAPI,
} from "@/api/education/threeLevel/onlineTrainingRecords";
import testPaper from "./testPaper.vue";
export default {
  mixins: [tableMixins],
  components: { testPaper },
  data() {
    return {
      openFlag: false,
      page: {
        currentPage: 1,
        pageSize: 15,
        totalResult: 0,
      },
      page2: {
        currentPage: 1,
        pageSize: 15,
        totalResult: 0,
      },
      searchData: {},
      searchItem: [
        {
          prop: "courseName ",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "examResult",
          type: "Select",
          placeholder: "考试结果",
          disabled: false,
          width: "200px",
          children: [
            {
              label: "合格",
              value: 1,
            },
            {
              label: "不合格",
              value: 0,
            },
          ],
        },
      ],
      personName: "", //统计页
      activeName: "examinationRecords",
      columns: [
        // {
        //   type: "checkbox",
        //   width: 50,
        //   align: "center",
        //   fixed: "left",
        // },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "userName",
          title: "员工名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "trainLevelName",
          title: "课程类别",
          align: "center",
        },
        {
          field: "createTime",
          title: "考试时间",
          align: "center",
        },
        {
          field: "achievement",
          title: "考试成绩",
          align: "center",
        },
        {
          field: "ksjg",
          title: "考试结果",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.examResult == 0) {
              return <div class="unqualified">不合格</div>;
            } else if (row.examResult == 1) {
              return <div class="qualified">合格</div>;
            }
          },
        },
        {
          field: "useTime",
          title: "用时（分钟）",
          align: "center",
        },
        {
          field: "id",
          title: "试卷标识",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
               operateButtonList={["chakan", "shanchu"]}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      tableData: [],
      tableData2: [],
      columns2: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "personName",
          title: "员工名称",
          align: "center",
        },
        {
          field: "learnDurationOne",
          title: "厂级培训学时数(分钟)",
          align: "center",
        },
        {
          field: "learnDurationTwo",
          title: "车间级培训学时数(分钟)",
          align: "center",
        },
        {
          field: "learnDurationThree",
          title: "班组级培训学时数(分钟)",
          align: "center",
        },
        {
          field: "learnSum",
          title: "累计学时数(分钟)",
          align: "center",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    open(row) {
      this.personId = row.personId;
      this.openFlag = true;
      this.getList();
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    //页码切换
    pageChange2(data) {
      this.page2.pageSize = data.pageSize;
      this.page2.currentPage = data.currentPage;
      this.getList();
    },
    getList() {
      let params = {
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        personId: this.personId,
      };
      examListAPI(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.content;
          this.page.totalResult = res.data.totalElements;
          this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
        }
      });
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        if (this.activeName == "durationStatistics") {
          this.durationStatistics();
        } else {
          this.getList();
        }
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.testPaperRef.open(row.id);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
    },
    //tab切换
    handleClick(tab) {
      console.log(this.activeName);
      if (tab.paneName == "durationStatistics") {
        this.durationStatistics();
      }
    },
    // 培训时长统计
    durationStatistics() {
      let params = {
        personName: this.personName,
        "queryParams[pageNum]": this.page2.currentPage,
        "queryParams[pageSize]": this.page2.pageSize,
        personId: this.personId,
      };
      durationStatisticsAPI(params).then((res) => {
        if (res.code == 200) {
          this.tableData2 = res.data.content;
          this.page2.totalResult = res.data.totalElements;
          this.page2.currentPage = res.data.totalPages ? res.data.totalPages : 1;
        }
      });
    },
    //删除
    deleteTable(id) {
      let params = {
        ids: id,
      };
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAPI(params).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.getList();
              console.log(res);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.wrap {
  padding: 20px;
  background: white;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
/deep/.el-tabs__nav-wrap::after {
  background-color: #1890ff;
  height: 1px;
}
/deep/ .el-tabs__nav > {
  .is-active {
    background: url("../../../../../assets/images/education/tab_bg.png")
      no-repeat center/contain;
    color: white;
  }
  .el-tabs__item {
    min-width: 126px;
    text-align: center;
    padding: 0 !important;
    margin: 0 10px;
  }
  .el-tabs__active-bar {
    background-color: transparent;
  }
}
/deep/.qualified,
.unqualified {
  color: #52c41a;
  border: 1px solid #52c41a;
  width: 58px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
/deep/.unqualified {
  color: #ff4646;
  border: 1px solid #ff4646;
}
/deep/.el-tabs {
  height: 100%;
  .el-tabs__content {
    height: calc(100% - 65px);
  }
  .el-tab-pane {
    height: 100%;
    .table_wrap {
      height: calc(100% - 120px);
    }
  }
}
</style>
