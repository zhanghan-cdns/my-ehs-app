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
              placeholder="请输入名称"
              clearable
              v-model="query.safetyTarget"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
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
      :dictConfig="{
        doublePreventionRiskAnalysisObjectType,
        riskType,
        doublePreventionRiskAnalysisObjectStatus
      }"
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
  objectInfoListAPI,
  objectInfoDeleteAPI, getfullinformationcategorybyunitidAPI
} from "@/api/doubleprevention/riskobject/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    riskAnalysisObjectTree,
    viewDialog
  },
  name: "indexProvide",
  data() {
    return {
      query: {
      },
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "number",
          title: "编号",
          align: "center"
        },
        {
          field: "name",
          title: "责任部门",
          align: "center"
        },
        {
          field: "riskAnalysisObjectType",
          title: "责任人",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.riskAnalysisObjectType) {
              return (
                <span>
                  {row.riskAnalysisObjectType.value
                    ? row.riskAnalysisObjectType.value
                    : ""}
                </span>
              );
            }
          }
        },
        {
          field: "responsibleDepartment",
          title: "风险事件",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.responsibleDepartment) {
              return (
                <span>
                  {row.responsibleDepartment.deptName
                    ? row.responsibleDepartment.deptName
                    : ""}
                </span>
              );
            }
          }
        },
        {
          field: "responsiblePerson",
          title: "管控措施",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.responsiblePerson) {
              return (
                <span>
                  {row.responsiblePerson.entPersonName
                    ? row.responsiblePerson.entPersonName
                    : ""}
                </span>
              );
            }
          }
        },
        {
          field: "riskArea",
          title: "管控措施分类1",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.riskArea) {
              return (
                <span>
                  {row.riskArea.areaName ? row.riskArea.areaName : ""}
                </span>
              );
            }
          }
        },
        {
          field: "riskAnalysisObjectStatus",
          title: "管控措施分类2",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.riskAnalysisObjectStatus) {
              return (
                <span>
                  {row.riskAnalysisObjectStatus.value
                    ? row.riskAnalysisObjectStatus.value
                    : ""}
                </span>
              );
            }
          }
        },
        {
          field: "remark",
          title: "管控措施分类3",
          align: "center"
        },
        {
          field: "remark",
          title: "责任岗位",
          align: "center"
        },
        {
          field: "remark",
          title: "巡检周期（次）",
          align: "center"
        },
        {
          field: "remark",
          title: "巡检周期单位",
          align: "center"
        },
        {
          field: "remark",
          title: "任务开始时间",
          align: "center"
        },
        {
          field: "remark",
          title: "最近检查时间",
          align: "center"
        },
        {
          field: "remark",
          title: "检查情况",
          align: "center"
        },
        {
          field: "remark",
          title: "执行状态",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          }
        }
      ]
    };
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {};
        this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "zhixing":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "jianchajilu":
          this.$refs.viewDialogRef.open(row);
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
        type: "warning"
      })
        .then(async () => {
          const res = await objectInfoDeleteAPI({
            ids: row.id
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
        ...domain
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await getfullinformationcategorybyunitidAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    }
  }
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
