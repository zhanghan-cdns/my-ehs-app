<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              v-model="query.name"
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
      :dictConfig="{
        doublePreventionRiskAnalysisObjectType,
        riskType,
        doublePreventionRiskAnalysisObjectStatus,
        accidentType
      }"
      @refresh="getTableData({})"
    ></edit-dialog>
    <modify-dialog
      ref="modifyDialogRef"
      :dictConfig="{
              doublePreventionRiskAnalysisObjectStatus,
      }"
      @refresh="getTableData({})"
    ></modify-dialog>
    <unit-dialog
      ref="unitDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></unit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import modifyDialog from "./components/modifyDialog.vue";
import unitDialog from "./components/unitDialog.vue";
import {objectInfoDeleteAPI, objectInfoListAPI,} from "@/api/doubleprevention/riskobject/index.js";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    modifyDialog,
    unitDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        name: "",
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
          field: "number",
          title: "编号",
          align: "center",
        },
        {
          field: "name",
          title: "风险分析对象名称",
          align: "center",
        },
        {
          field: "riskAnalysisObjectType",
          title: "类型",
          align: "center",
          render: (h, {row, column, $index}) => {
            if (row.riskAnalysisObjectType) {
              return (
                <span>
                  {row.riskAnalysisObjectType.value
                    ? row.riskAnalysisObjectType.value
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "responsibleDepartment",
          title: "责任部门",
          align: "center",
          render: (h, {row, column, $index}) => {
            if (row.responsibleDepartment) {
              return (
                <span>
                  {row.responsibleDepartment.deptName
                    ? row.responsibleDepartment.deptName
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "responsiblePerson",
          title: "责任人",
          align: "center",
          render: (h, {row, column, $index}) => {
            if (row.responsiblePerson) {
              return (
                <span>
                  {row.responsiblePerson.entPersonName
                    ? row.responsiblePerson.entPersonName
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "riskArea",
          title: "区域",
          align: "center",
          render: (h, {row, column, $index}) => {
            if (row.riskArea) {
              return (
                <span>
                  {row.riskArea.areaName ? row.riskArea.areaName : ""}
                </span>
              );
            }
          },
        },
        {
          field: "riskAnalysisObjectStatus",
          title: "状态",
          align: "center",
          render: (h, {row, column, $index}) => {
            if (row.riskAnalysisObjectStatus) {
              return (
                <span>
                  {row.riskAnalysisObjectStatus.value ? row.riskAnalysisObjectStatus.value : ""}
                </span>
              );
            }
          },
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
          render: (h, {row, column, $index}) => {
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
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          name:''
        };
        this.getTableData({query: this.query});
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
        case "xiugaizhuangtai":
          this.$refs.modifyDialogRef.open(row, "chakan");
          break;
        case "chakandanyuan":
          this.$refs.unitDialogRef.open(row, "chakan");
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
          const res = await objectInfoDeleteAPI({
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
        "queryParams[pageNum]": this.page.currentPage?this.page.currentPage:1,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await objectInfoListAPI(params);
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
