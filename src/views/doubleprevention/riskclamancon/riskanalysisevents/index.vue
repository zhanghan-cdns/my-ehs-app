<template>
  <div>
    <list-container>
      <template #left>
        <risk-analysis-object-tree @node-click="riskAnalysisObjectClick"></risk-analysis-object-tree>
      </template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              v-model="query.riskEventName"
              clearable
              placeholder="请输入名称"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{managementLevel,doublePreventionRiskLevel}"
      @refresh="getTableData({})"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import riskAnalysisObjectTree from '../components/riskAnalysisObjectTree'
import {riskEventDeleteAPI, riskEventPageAPI} from "@/api/doubleprevention/riskevent/index.js";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    riskAnalysisObjectTree
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        riskEventName: "",
      },
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "riskEventName",
          title: "风险事件名称",
          align: "center",
        },
        {
          field: "assessmentMethod",
          title: "评估方法",
          align: "center",
        },
        {
          field: "ledC",
          title: "可能性",
          align: "center",
        },
        {
          field: "ledE",
          title: "严重度",
          align: "center",
        },

        {
          field: "ledL",
          title: "暴露频率",
          align: "center",
        },
        {
          field: "fraction",
          title: "风险值(R)",
          align: "center",
        },
        {
          field: "riskLevel.value",
          title: "风险等级",
          align: "center",
        },
        {
          field: "managementLevel.value",
          title: "管控层级",
          align: "center",
        },
        {
          field: "improvementMeasures",
          title: "改进措施",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
      ],
      // 风险单元id
      riskAnalysisUnitId:''
    };
  },
  created() {
    this.getTableData({})//tree
  },
  methods: {
    // 风险分析对象点击
    riskAnalysisObjectClick(value) {
      const {data, node} = value
      console.log(data)
      if (data.riskAnalysisObjectId) {
        this.riskAnalysisUnitId = data.id
        this.getTableData({
          query: {
            riskAnalysisUnitId: data.id
          }
        })
      }
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {};
        this.getTableData({});
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
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await riskEventDeleteAPI({
            ids: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData({
              query: {
                riskAnalysisUnitId: this.riskAnalysisUnitId
              }
            });
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage ? this.page.currentPage : 1,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await riskEventPageAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
