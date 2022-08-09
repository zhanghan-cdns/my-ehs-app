<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入人员姓名"
              clearable
              v-model="query.safetyTarget"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select
              placeholder="请选择"
              v-model="query.targetType"
              style="width: 200px; margin-right: 5px"
            >
              <el-option>正序</el-option>
              <el-option>反序</el-option>
            </el-select>
          </div>
          <!-- <header-button @headerButtonClick="headerButtonMethods" /> -->
          <div style="text-align: right; margin: 10px 0px">
            <el-button
              size="small"
              class="export_btn primary_btn"
              @click="headerButtonMethods('peizhi')"
            >
              <i class="iconfont icon-daochu" style="font-size: 13px"></i
              >积分配置
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="headerButtonMethods('chaxun')"
            >
              <i class="iconfont icon-chaxun" style="font-size: 13px"></i>查询
            </el-button>
          </div>
        </div>
        <div style="height: 300px; width: 100%; border: 1px solid #fcc;margin-bottom:9px;">
          <div id="chartbar" style="width: 100%; height: 100%"></div>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog
      ref="viewDialogRef"
      @refresh="getTableData({})"
    ></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import echarts from "echarts";
import {
  adpInfoListAPI,
  sdpInfoDeleteAPI,
} from "@/api/duty/duty_standard_provide/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewDialog
  },
  name: "indexProvide",
  data() {
    return {
      sizeCon: {
        height: "230px",
      },
      query: {
        safetyTarget: "",
        targetType: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyTarget",
          title: "姓名",
          align: "center",
        },
        {
          field: "targetCode",
          title: "积分总得分",
          align: "center",
        },
        {
          field: "year",
          title: "排名",
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
      myCharts: null,
    };
  },
  mounted() {
    this.init();
  },
  created() {},
  beforeDestroy() {
    if (this.myCharts) {
      this.myCharts.clear();
    }
    window.removeEventListener("resize", function () {
      _this.myCharts.resize();
    });
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "peizhi") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {
          // restrictSpaceName:""
        };
        // this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row, "chakan");
          break;
      }
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await sdpInfoDeleteAPI({
            ids: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData({});
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await adpInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
    async init() {
      let _this = this;
      this.myCharts = echarts.init(document.getElementById("chartbar"));
      var option = {
        title: {
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 20,
          },
          top: "3%",
          left: "10%",
        },
        grid: {
          top: "25%",
          bottom: "10%", //也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        legend: {
          data: ["销售水量", "主营业务"],
          top: "15%",
          textStyle: {
            color: "#ffffff",
          },
        },
        xAxis: {
          data: [
            "当年完成水量",
            "去年同期水量",
            "滚动目标值水量",
            "全年目标值水量",
            "当年完成金额",
            "去年同期金额",
            "滚动目标金额",
            "全年目标值",
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#DCDFE6",
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#999999", //X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCDFE6",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#999999",
              },
            },
          },

          // {
          //   type: "value",
          //   gridIndex: 0,
          //   min: 50,
          //   max: 100,
          //   splitNumber: 8,
          //   splitLine: {
          //     show: false,
          //   },
          //   axisLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLabel: {
          //     show: false,
          //   },
          //   splitArea: {
          //     show: true,
          //     areaStyle: {
          //       color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
          //     },
          //   },
          // },
        ],
        series: [
          {
            name: "主营业务",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#FAAD14",
              },
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      _this.myCharts.setOption(option);
      window.addEventListener("resize", function () {
        _this.myCharts.resize();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
