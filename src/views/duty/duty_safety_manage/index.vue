<template>
  <div>
    <list-container>
      <template #left>1424</template>
      <template #right>
        <div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            border
            resizable
            :tree-config="{ children: 'children', expandAll: true }"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData()"
    ></edit-dialog>
    <el-dialog
      title="新建"
      :modal-append-to-body="false"
      :visible.sync="newDialogFormVisible"
      @open="open()"
      append-to-body
      width="850px"
      height="70%"
    >
      <div
        id="newEcharts"
        style="width: 850px; height: 200px; padding-top: 10px"
      ></div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  safeInfoListAPI,
  safeInfoDeleteAPI,
} from "@/api/duty/duty_safety_manage/index.js";
import { getDeptListAPI } from "@/api/system/common";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {},
      newDialogFormVisible: false,
      tableData: [],
      myChart: null,
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "nodeName",
          title: "名称",
          align: "center",
          treeNode: "true",
        },
        {
          field: "manager",
          title: "负责人",
          align: "center",
        },
        {
          field: "phone",
          title: "负责人联系方式",
          align: "center",
        },
        {
          field: "remark",
          title: "备注",
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
  created() {
    this.getTableData();
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData();
      } else if (type === "chongzhi") {
        this.getTableData();
      } else if (type === "jiagoutu") {
        this.newDialogFormVisible = true;
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },
    async initEcharts() {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("newEcharts"));
      await getDeptListAPI().then((res) => {
        let treeList = res.data;
        console.log(treeList, "uuu");

        // 绘制图表
        // for (var i = 0; i < this.aa.length; i++) {
        //   if (this.aa[i].children == "" || this.aa[i].children == null) {
        //     this.aa[i].children = [];
        //   }
        //  console.log([this.aa[i]],'jkl')
        // 绘制图表
        var option = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              name: "树图",
              type: "tree",
              orient: "vertical", // vertical horizontal
              rootLocation: { x: 0, y: "center" }, // 根节点位置  {x: 100, y: 'center'} x: "center", y: 100
              nodePadding: 30,
              layerPadding: 100,
              hoverable: true,
              roam: true,
              symbolSize: 40,
              symbol: "rectangle",
              symbolSize: [145, 50],
              itemStyle: {
                normal: {
                  color: "#4883B4",
                  borderColor: "#4883B4",
                  label: {
                    show: true,
                    position: "inside",
                    // width: "100px",
                    color: "#fff",
                    formatter: function (params) {
                      return params.data.name;
                    },
                  },
                  lineStyle: {
                    color: "#48b",
                    type: "broken", // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                  },
                },
                emphasis: {
                  color: "#4883b4",
                  label: {
                    show: true,
                  },
                  borderWidth: 0,
                },
              },
              data: treeList,
            },
          ],
        };
        _this.myChart.setOption(option);
        _this.myChart.on("click", function (params) {
          console.log(params, "ddd");
        });
        // 使用刚指定的配置项和数据显示图表。
        _this.myChart.setOption(option);
        window.addEventListener("resize", function () {
          _this.myChart.resize();
        });
      });

      // var myChart = this.$echarts.init(
      //   document.getElementById("newEcharts" + i)
      // );
      // console.log(myChart,'ghh')
      // this.canvasEcharts(myChart, [this.aa[i]]);
      // }
    },
    // canvasEcharts(myChart, data) {

    // },
    open() {
      this.$nextTick(() => {
        //  执行echarts方法
        this.initEcharts();
      });
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await safeInfoDeleteAPI({
            ids: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await safeInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data;
        this.page.totalResult = res.data.totalElements;
      }
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.clear();
    }
    window.removeEventListener("resize", function () {
      _this.myChart.resize();
    });
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
