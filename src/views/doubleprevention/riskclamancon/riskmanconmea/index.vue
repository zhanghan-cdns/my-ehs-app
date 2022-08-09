<template>
  <div>
    <list-container>
      <template #left>
        <risk-analysis-object-tree @node-click="riskAnalysisObjectClick"></risk-analysis-object-tree>
      </template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-select v-model="query.riskManConType" placeholder="管控方式">
              <el-option
                v-for="item in doublePreventionRiskManConType"
                :key="item.id"
                :label="item.dictValueName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>
        <dom-size-listen v-model="sizeCon">
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
      :dictConfig="{doublePreventionRiskManConType,doublePreventionRiskManConMeaCla1,doublePreventionRiskInspectionCycleUnit}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog
      ref="viewDialogRef"
      :dictConfig="{}"
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
import riskAnalysisObjectTree from '../components/riskAnalysisObjectTree'
import {
  conmeacheckcycleGetFullUnitIdAPI,
  riskmanconmeaDeleteAPI,
  riskmanconmeaPageAPI
} from "@/api/doubleprevention/riskmanconmea";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewDialog,
    riskAnalysisObjectTree
  },
  name: "indexProvide",
  data() {
    return {
      query: {},
      tableData: [],
      columns: [
        {type: "checkbox", width: 50, align: "center", fixed: "left"},
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "riskAnalysisEvent.riskEventName",
          title: "风险事件",
          align: "center",
        },
        {
          field: "riskManConType.value",
          title: "管控方式",
          align: "center",
        },
        {
          field: "riskManConMeaCla1.value",
          title: "管控措施分类1",
          align: "center",
        },
        {
          field: "riskManConMeaCla2.value",
          title: "管控措施分类2",
          align: "center",
        },
        {
          field: "riskManConMeaCla3",
          title: "管控措施分类3",
          align: "center",
        },
        {
          field: "description",
          title: "管控措施描述",
          align: "center",
        },
        {
          field: "hazInvContent",
          title: "隐患排查内容",
          align: "center",
        },
        // {
        //   field: "managementLevel",
        //   title: "巡检周期",
        //   align: "center",
        // },
        // {
        //   field: "improvementMeasures",
        //   title: "巡检周期单位",
        //   align: "center",
        // },
        // {
        //   field: "improvementMeasures",
        //   title: "责任岗位",
        //   align: "center",
        // },
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
      sizeCon: {
        height: '100%'
      }
    };
  },
  created() {
    this.getTableData({})//tree
  },
  methods: {
    riskAnalysisObjectClick(value) {
      this.getTableData({query: {riskAnalysisUnitId: value.data.id}})//tree
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {}
        this.tableData({query: this.query})
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row, "bianji");
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
          const res = await riskmanconmeaDeleteAPI({
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
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage !== 0 ? this.page.currentPage : 1,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await conmeacheckcycleGetFullUnitIdAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        console.log(this.tableData, 'this.tableData')
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
