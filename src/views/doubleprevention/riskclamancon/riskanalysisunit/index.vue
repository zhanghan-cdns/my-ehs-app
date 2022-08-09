<template>
  <div>
    <list-container>
      <template #left>

      </template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              v-model="query.safetyTarget"
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
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {riskanalysisunitDeleteAPI, riskanalysisunitPageAPI} from "@/api/doubleprevention/riskanalysisunit";
// import {adp  InfoListAPI,sdpInfoDeleteAPI} from '@/api/duty/duty_standard_provide/index.js';
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog
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
          field: "safetyTarget",
          title: "风险分析对象",
          align: "center"
        },
        {
          field: "targetCode",
          title: "风险分析单元名称",
          align: "center"
        },
        {
          field: "year",
          title: "风险类型",
          align: "center"
        },
        {
          field: "targetName",
          title: "风险描述",
          align: "center"
        },
        {
          field: "targetType",
          title: "事故类型",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
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
    this.getTableData({})
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query:this.query});
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
        type: "warning"
      })
        .then(async () => {
          const res = await riskanalysisunitDeleteAPI({
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
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await riskanalysisunitPageAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
  }
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
