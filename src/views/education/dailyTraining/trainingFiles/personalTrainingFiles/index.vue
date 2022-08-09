<template>
  <div ref="wrapRef">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button @headerButtonClick="headerButtonMethods">
            <el-button
              size="small"
              class="export_btn primary_btn"
              @click="headerButtonMethods('daochu')"
            >
              <i class="iconfont icon-daochu" style="font-size: 13px"></i>
              导出个人安全培训信息档案
            </el-button>
          </header-button>
        </div>
        <div class="top" ref="topRef">
          <div class="top_left">
            <div class="side_title">个人信息</div>
            <div class="info_box">
              <div>
                <span>姓名：</span>
                <span class="info_text">刘桥</span>
              </div>
              <div>
                <span>部门：</span>
                <span class="info_text">车间1</span>
              </div>
              <div>
                <span>岗位：</span>
                <span class="info_text">技术岗</span>
              </div>
              <div>
                <span>性别：</span>
                <span class="info_text">男</span>
              </div>
              <div>
                <span>出生年月：</span>
                <span class="info_text">1972-06-04</span>
              </div>
              <div>
                <span>联系电话：</span>
                <span class="info_text">181 6332 1157</span>
              </div>
              <div>
                <span>文化程度：</span>
                <span class="info_text">本科</span>
              </div>
              <div>
                <span>入厂年月：</span>
                <span class="info_text">2020-06-04</span>
              </div>
            </div>
            <div class="record">
              <div class="item">
                <img src="@/assets/images/education/ljxs.png" alt="" />
                <div style="text-align: center">
                  <div class="item_title">累计学时</div>
                  <div class="time">26</div>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/images/education/ljxs.png" alt="" />
                <div style="text-align: center">
                  <div class="item_title">额定学时</div>
                  <div class="time">26</div>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/images/education/ljxs.png" alt="" />
                <div style="text-align: center">
                  <div class="item_title">学时完成度</div>
                  <div class="time">80%</div>
                </div>
              </div>
            </div>
          </div>
          <div class="top_right">
            <div class="side_title">课程统计</div>
            <div class="chartBox">
              <basic-charts
                id="courseChart"
                :option="courseOption"
              ></basic-charts>
            </div>
            <div class="chartBox">
              <basic-charts id="examChart" :option="examOption"></basic-charts>
            </div>
          </div>
        </div>
        <div class="bot">
          <dom-size-listen style="flex: 1" v-model="sizeCon">
            <render-table
              :height="sizeCon.height"
              :data="tableData"
              :columns="columns"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
    </list-container>
    <details-dialog ref="detailsRef"></details-dialog>
  </div>
</template>
<script>
import detailsDialog from "./components/detailsDialog.vue"
export default {
  components:{detailsDialog},
  data() {
    return {
      sizeCon: {
        height: 340,
      },
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "year",
          type: "Select",
          placeholder: "选择年度",
          disabled: false,
          width: "200px",
        },
      ],
      courseOption: {},
      examOption: {},
      tableData: [{}, {}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "courseName",
          title: "年度",
          align: "center",
        },
        {
          field: "courseName",
          title: "计划名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "学习时长",
          align: "center",
        },
        {
          field: "courseName",
          title: "学习进度",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-progress
                text-inside="true"
                stroke-width="24"
                percentage="100"
              ></el-progress>
            );
          },
        },
        {
          field: "courseName",
          title: "考试成绩",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
    };
  },
  mounted() {
    this.test();
    this.sizeCon.height =
      this.$refs.wrapRef.offsetHeight - this.$refs.topRef.offsetHeight - 130;
  },
  methods: {
    test() {
      this.courseOption = {
        title: {
          text: "课程完成率",
          x: "center",
          y: "35%",
          textStyle: {
            fontWeight: "normal",
            color: "#333333",
            fontSize: "16",
          },
          subtext: "4/12",
          subtextStyle: {
            fontSize: 32,
            color: "#1890FF",
            align: "center",
          },
        },
        color: ["rgba(176, 212, 251, 1)"],
        series: [
          {
            roundCap: true,
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["75%", "90%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            data: [
              {
                value: 80,

                name: "01",
                itemStyle: {
                  normal: {
                    color: "#1890FF",
                    borderRadius: "10px",
                  },
                },
              },
              {
                name: "02",
                value: 20,
                itemStyle: {
                  normal: {
                    color: "#F0F0F0",
                  },
                },
              },
            ],
          },
        ],
      };
      this.examOption = {
        title: {
          text: "考试完成率",
          x: "center",
          y: "35%",
          textStyle: {
            fontWeight: "normal",
            color: "#333333",
            fontSize: "16",
          },
          subtext: 75 + "%",
          subtextStyle: {
            fontSize: 32,
            color: "#1890FF",
            align: "center",
          },
        },
        color: ["rgba(176, 212, 251, 1)"],
        series: [
          {
            roundCap: true,
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["75%", "90%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            data: [
              {
                value: 80,

                name: "01",
                itemStyle: {
                  normal: {
                    color: "#1890FF",
                    borderRadius: "10px",
                  },
                },
              },
              {
                name: "02",
                value: 20,
                itemStyle: {
                  normal: {
                    color: "#F0F0F0",
                  },
                },
              },
            ],
          },
        ],
      };
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
    },
    operateButtonClick(type, row) {
      if (type == "chakan") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "bianji") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "shanchu") {
        this.delete(row.id);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.personalTrainingFiles {
  width: 100%;
  background: white;
  padding: 0 20px;
  border-radius: 4px 4px 4px 4px;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .top_left,
  .top_right {
    width: 49.5%;
    height: 100%;
    border: 1px solid #4a80fc;
    position: relative;
    box-sizing: border-box;
    .side_title {
      width: 32px;
      height: 128px;
      background: url("../../../../../assets/images/education/side_title.png")
        no-repeat center/cover;
      position: absolute;
      left: 0px;
      top: 77px;
      padding: 20px 8px;
      box-sizing: border-box;
      color: white;
      font-size: #ffffff;
    }
  }
}
.top_left {
  padding-left: 102px;
  padding-top: 30px;
  box-sizing: border-box;
  .info_box {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 218px;
      height: 40px;
      background: #ffffff;
      box-shadow: inset 0px -3px 6px 1px #f0f5ff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #f0f5ff;
      font-size: 12px;
      color: #999;
      box-sizing: border-box;
      line-height: 40px;
      padding-left: 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      .info_text {
        color: #333333;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}
.record {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 218px;
    height: 81px;
    border-radius: 4px 4px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-right: 30px;
    box-sizing: border-box;
    margin-bottom: 16px;
    img {
      width: 50px;
      margin-right: 36px;
    }
    .item_title {
      font-size: 16px;
      color: #f0f0f0;
      white-space: nowrap;
    }
    .time {
      font-size: 24px;
      color: #fff;
    }
  }
  .item:nth-of-type(1) {
    background: linear-gradient(90deg, #1890ff 0%, #4ef9f4 100%);
    margin-right: 10px;
  }
  .item:nth-of-type(2) {
    background: linear-gradient(90deg, #40cf3b 0%, #4dffe7 100%);
    margin-right: 10px;
  }
  .item:nth-of-type(3) {
    background: linear-gradient(90deg, #ffa318 0%, #f1e04b 100%);
  }
}
.chartBox {
  width: 220px;
  height: 220px;
}
.top_right {
  padding: 0px 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
// #courseChart,#examChart{
// }
</style>
