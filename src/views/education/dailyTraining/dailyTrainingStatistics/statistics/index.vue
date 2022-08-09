<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="top">
          <div class="title"><i class="line"></i>按部门统计</div>
          <div class="wrap">
            <div class="role_operation_box">
              <header-search
                :searchItem="searchItem"
                :searchData="searchData"
              />
            </div>
            <basic-charts id="depChart" :option="depOption"></basic-charts>
          </div>
        </div>
        <div class="bot">
          <div class="title"><i class="line"></i>按培训计划统计</div>
          <div class="wrap">
            <div class="item" v-for="(item, index) in tableData" :key="item.id">
              <div class="left">
                <div class="item_title">{{ item.title }}</div>
                <div class="item_join">培训人数：{{ item.join }}</div>
                <div class="item_no_join">未参加人数：{{ item.no_join }}</div>
              </div>
              <div class="right">
                <basic-charts
                  :id="'planChart_' + index"
                  class="planChart"
                  :option="tableOption[index]"
                ></basic-charts>
              </div>
            </div>
          </div>
        </div>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "jh",
          type: "Select",
          placeholder: "培训计划",
          disabled: false,
          width: "200px",
        },
        {
          prop: "bm",
          type: "Select",
          placeholder: "选择部门",
          disabled: false,
          width: "200px",
        },
      ],
      columns: [
        //  {
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
          field: "zt",
          title: "培训调查主题",
          align: "center",
        },
        {
          field: "zg",
          title: "最高投票课程",
          align: "center",
        },
        {
          field: "zgp",
          title: "最高投票数",
          align: "center",
        },
        {
          field: "tpzt",
          title: "投票状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div class="red">未投票</div>;
          },
        },
        {
          field: "dc",
          title: "调查状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div class="red">未投票</div>;
          },
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
      addCourseList: [],
      tableData: [],
      depOption: {},
      tableOption: [],
    };
  },
  mounted() {
    this.test();
    this.test2();
  },
  methods: {
    test() {
      this.depOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          label: {
            formatter: function (params) {
              console.log(params);
            },
          },
        },
        grid: {
          top: "8%",
          left: "1%",
          right: "1%",
          bottom: "8%",
          containLabel: true,
        },
        legend: {
          itemGap: 10,
          data: ["培训合格率", "培训人数", "未参加人数"],
          textStyle: {
            color: "#666666",
            borderColor: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#f9f9f9",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#333",
                margin: 15,
              },
            },
            axisTick: {
              show: true,
            },
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // splitNumber: 7,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#333",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#333",
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#333",
            },
            position: "right",
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#333",
                margin: 50,
              },
            },
          },
        ],
        series: [
          {
            name: "培训合格率",
            type: "line",
            showAllSymbol: true,
            symbol: "emptyCircle",
            yAxisIndex: 1,
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#ECEFF7", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#333333",
              },
            },
            itemStyle: {
              normal: {
                color: "#28ffb3",
              },
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(17, 255, 239, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, 0)",
                    },
                  ],
                  false
                ),
              },
            },
            data: [20, 25, 28, 30, 32, 38, 45],
          },
          {
            name: "培训人数",
            type: "bar",
            barWidth: 20,
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#333333",
              },
            },
            tooltip: {
              show: true,
            },
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#4985FF",
                  },
                  {
                    offset: 1,
                    color: "#2E73FF",
                  },
                ]),
              },
            },
            data: [200, 382, 102, 267, 186, 315, 316],
          },
          {
            name: "未参加人数",
            type: "bar",
            barWidth: 20,
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            tooltip: {
              show: true,
            },
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FFAA75",
                  },
                  {
                    offset: 1,
                    color: "#F96409",
                  },
                ]),
              },
            },
            data: [120, 250, 50, 120, 110, 50, 130],
          },
        ],
      };
    },
    test2() {
      this.tableData = [
        {
          title: "安全教育培训",
          join: 238,
          no_join: 20,
          hg: "80%",
        },
        {
          title: "安全教育培训",
          join: 238,
          no_join: 20,
          hg: "80%",
        },
        {
          title: "安全教育培训",
          join: 238,
          no_join: 20,
          hg: "80%",
        },
        {
          title: "安全教育培训",
          join: 238,
          no_join: 20,
          hg: "80%",
        },
        {
          title: "安全教育培训",
          join: 238,
          no_join: 20,
          hg: "80%",
        },
      ];
      this.tableData.map((item) => {
        let option = {
          title: {
            text: "合格率",
            x: "center",
            y: "26%",
            textStyle: {
              fontWeight: "normal",
              color: "#333333",
              fontSize:10,
            },
            subtext: "80%",
            subtextStyle: {
              fontSize: 15,
              color: "#23D9C8",
              fontWeight: "normal",
              align:"center" 
            },
          },

          color: ["rgba(176, 212, 251, 1)"],
          legend: {
            show: false,
            itemGap: 12,
            data: ["01", "02"],
          },
          series: [
            {
              name: "Line 1",
              type: "pie",
              clockWise: true,
              radius: ["70%", "90%"],
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
              hoverAnimation: false,
              data: [
                {
                  value: 80,
                  name: "01",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#00cefc", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#367bec", // 100% 处的颜色
                          },
                        ],
                      },
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                  },
                },
                {
                  name: "02",
                  value: 20,
                },
              ],
            },
          ],
        };
        this.tableOption.push(option);
      });
    },
    async getList() {
      let params = {
        ...this.searchData,
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
      this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.query = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type == "shanchu") {
        this.delete(row.id);
      } else if (type == "toupiao") {
        this.$refs.voteDialogRef.open();
      }
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
  },
};
</script>
<style scoped lang="scss">
/deep/.contain-right {
  padding-top: 20px;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.top {
  background: #ffffff;
  box-shadow: 0px 1px 6px 1px #d2e2ff;
  border-radius: 2px 2px 2px 2px;
  height:370px;
  .wrap {
    padding: 20px;
    height: 80%;
  }
  margin-bottom: 16px;
  .title {
    padding-left: 16px;
    height: 36px;
    display: flex;
    border: 1px solid #eceff7;
    align-items: center;
    .line {
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #4985ff 0%, #2e73ff 100%);
      border-radius: 3px 3px 3px 3px;
      margin-right: 10px;
    }
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
  }
}
.bot {
  background: #ffffff;
  box-shadow: 0px 1px 6px 1px #d2e2ff;
  border-radius: 2px 2px 2px 2px;
  height: 430px;
  .wrap {
    padding: 20px;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 250px;
      height: 92px;
      background: #ffffff;
      box-shadow: 0px 1px 10px 1px #d2e2ff;
      opacity: 1;
      border: 1px solid #94b7ff;
      margin: 0 10px;
      display: flex;
      padding: 14px;
      .left {
        width: 60%;
        .item_title {
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          margin-bottom: 10px;
        }
        .item_join {
          font-size: 15px;
          color: #4683ff;
          margin-bottom: 10px;
        }
        .item_no_join {
          font-size: 15px;
          color: #fc8c46;
        }
      }
      .right {
        width: 40%;
        .planChart {
          width: 100%;
        }
      }
    }
  }
  margin-bottom: 16px;
  .title {
    padding-left: 16px;
    height: 36px;
    display: flex;
    border: 1px solid #eceff7;
    align-items: center;
    .line {
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #4985ff 0%, #2e73ff 100%);
      border-radius: 3px 3px 3px 3px;
      margin-right: 10px;
    }
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
  }
}

#depChart {
  height: 250px !important;
}
</style>
