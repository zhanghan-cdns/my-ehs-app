<template>
  <list-container>
    <template #left>

    </template>
    <template #right>
      <div class="firstTab">
        <div class="header">
          <div>
            <el-date-picker
              v-model="value1"
              placeholder="选择日期"
              style="margin-right: 5px; width: 220px"
              type="date"
            >
            </el-date-picker>
            <el-input
              v-model="query.hiddenFactors"
              clearable
              placeholder="请输入请输入岗位人员姓名"
              style="margin-right: 5px; width: 220px"
            ></el-input>
            <el-date-picker
              v-model="value1"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              style="margin-right: 5px; width: 270px"
              type="datetimerange"
            >
            </el-date-picker>
          </div>
          <div style="text-align: right; margin: 10px 0px">
            <el-button
              class="export_btn primary_btn"
              size="small"
              @click="headerButtonMethods('pinggu')"
            >
              <i class="iconfont icon-daochu" style="font-size: 13px"></i
              >效果评估设置
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="headerButtonMethods('chaxun')"
            >
              <i class="iconfont icon-chaxun" style="font-size: 13px"></i>查询
            </el-button>
            <el-button
              class="export_btn primary_btn"
              size="small"
              @click="headerButtonMethods('daochu')"
            >
              <i class="iconfont icon-daochu" style="font-size: 13px"></i>导出
            </el-button>
          </div>
        </div>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
            @cell-click="cellClick"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
        <!-- 评估设置 -->
        <assessment-setting
          ref="assessmentSettingRef"
          @refreshDataList="getTableData"
        ></assessment-setting>
        <!-- 奖励设置 -->
        <reward-setting ref="rewardSettingRef"></reward-setting>
        <!-- 惩罚设置 -->
        <punishment-setting ref="punishmentSettingRef"></punishment-setting>
        <!-- 查看评估 -->
        <view-performance-evaluation ref="viewPerformanceEvaluationRef"></view-performance-evaluation>
        <!-- 查看效果评估记录 -->
        <view-assessment-record ref="viewAssessmentRecordRef"></view-assessment-record>
      </div>
    </template>
  </list-container>

</template>
<script>
import assessmentSetting from "./components/assessmentSetting";
import rewardSetting from "./components/rewardSetting";
import viewPerformanceEvaluation from "./components/viewPerformanceEvaluation";
import viewAssessmentRecord from "./components/viewAssessmentRecord";
import punishmentSetting from "./components/punishmentSetting";

export default {
  components: {assessmentSetting, rewardSetting, viewPerformanceEvaluation, punishmentSetting, viewAssessmentRecord},
  data() {
    return {
      hiddenFactorsList: [],
      readImage: {
        open: false,
        title: "",
        imgSrc: "",
      },
      sizeCon: {
        height: "280px",
      },
      query: {
        hiddenFactors: "",
      },
      tableData: [{sourceOfHiddenDanger: "1"}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "sourceOfHiddenDanger",
          title: "日期",
          align: "center",
        },
        {
          field: "hazardDiscoveryTime",
          title: "岗位",
          align: "center",
        },
        {
          field: "inspectionDepartment",
          title: "岗位人员",
          align: "center",
        },
        {
          field: "inspector",
          title: "A : 任务排查完成率",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "B : 排查隐患发现率",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "C : 隐患逾期整改率",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "D : 隐患整改率",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "总得分",
          align: "center",
        },
        {
          field: "correctionDate",
          title: "效果评估",
          align: "center",
          render: (h, {row}) => {
            return (
              <div
                style="border:1px solid #597EF7;padding:2px;"
                onClick={(e) => this.downCheckNum(e, row)}
              >
              </div>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
      ],
      operateButtonList: ["jiangli", "chengfa"],
    };
  },
  created() {
    // this.getTableData();
  },
  methods: {
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
          this.getTableData();
          break;
        case "chongzhi":
          this.query.hiddenFactors = "";
          this.getTableData();
          break;
        case "daochu":
          break;
        case "pinggu":
          this.$refs.assessmentSettingRef.open();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewPerformanceEvaluationRef.open(row);
          break;
        case "bianji":
          this.$refs.assessmentSettingRef.open(row);
          break;
        case "jiangli":
          this.$refs.rewardSettingRef.open(row);
          break;
        case "chengfa":
          this.$refs.punishmentSettingRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteHiddenDangerDataAPI({ids: id}).then((res) => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await hiddenDangerListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    // 流程图查看
    handleReadImage(processInstanceId) {
      this.readImage.title = "查看审批流程";
      this.readImage.open = true;
      createDiagram(processInstanceId).then((res) => {
        // 将返回的文件流数据转化为路径
        this.readImage.imgSrc = window.URL.createObjectURL(
          new Blob([res], {type: "image/jpeg"})
        );
      });
    },
    downCheckNum(e, row) {
      //查看效果评估
      this.$refs.viewPerformanceEvaluationRef.open(row);
    },

    cellClick({row, column}) {
      if (column.title === "操作") {
        return;
      }
      this.$refs.viewAssessmentRecordRef.open(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.firstTab {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>
