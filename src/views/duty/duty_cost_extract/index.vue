<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-select
              placeholder="年度"
              clearable
              v-model="query.year"
              style="width: 200px; margin-right: 5px"
            >
              <el-option
                v-for="item in dutyAllocationYear"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择行业类型"
              clearable
              v-model="query.industry"
              style="width: 200px; margin-right: 5px"
            >
              <el-option
                v-for="item in dutyCostUseIndustryType"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
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
    <edit-dialog ref="editDialogRef" :dictConfig="{dutyAllocationYear,dutyCostUseIndustryType}" @refresh="getTableData()"></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  dceInfoListAPI,
  dceInfoDeleteAPI,
} from "@/api/duty/duty_cost_extract/index";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        year: "",
        industry: "",
      },
      tableData: [{ restrictSpaceName: "1" }],
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "year",
          title: "年度",
          align: "center",
          render: (h, { row}) => {
            if (row.year) {
              return <span>{row.year.value ? row.year.value : ""}</span>;
            }
          },
        },
        {
          field: "sales",
          title: "销售收入(万元)",
          align: "center",
        },
        {
          field: "industry",
          title: "行业类型",
          align: "center",
          render: (h, { row}) => {
            if (row.industry) {
              return (
                <span>{row.industry.value ? row.industry.value : ""}</span>
              );
            }
          },
        },
        {
          field: "quantity",
          title: "提取数(万元)",
          align: "center",
        },
        {
          field: "standard",
          title: "提取标准",
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
          render: (h, { row}) => {
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
        this.query = {
          year: "",
          industry: "",
        };
        this.getTableData();
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
          const res = await dceInfoDeleteAPI({
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
        ...this.query,
      };

      const res = await dceInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
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
