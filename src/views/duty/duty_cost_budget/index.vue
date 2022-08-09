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
      :dictConfig="{ dutyAllocationYear, dutyCostBugetType }"
      @refresh="getTableData()"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  dcbInfoListAPI,
  dcbInfoDeleteAPI,
} from "@/api/duty/duty_cost_budget/index";
import {imgUrl} from "@/router/axios";
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
      },
      IMG_URL: imgUrl,
      tableData: [{ budget: "1" }],
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
          render: (h, { row, column, $index }) => {
            if (row.year) {
              return <span>{row.year.value ? row.year.value : ""}</span>;
            }
          },
        },
        {
          field: "type",
          title: "支出项目类别",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.type) {
              return <span>{row.type.value ? row.type.value : ""}</span>;
            }
          },
        },
        {
          field: "budget",
          title: "预算费用（万元）",
          align: "center",
        },
        {
          field: "checker",
          title: "预算识别人",
          align: "center",
        },
        {
          field: "attachment",
          title: "附件",
          align: "center",
          render: (h, { row }) => {
            return (
              <div
                class="downloadPdf"
                onclick={(e) => this.downCheckNum(e, row)}
              ></div>
            );
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
      dutyAllocationYear: [], //年度
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
          const res = await dcbInfoDeleteAPI({
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
      const res = await dcbInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    downCheckNum(e, row) {
      console.log(row, "row");
      let file = this.IMG_URL + res.data.dutyDoc[0].url;
      let a = document.createElement("a");
      a.href = file;
      a.click();
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
/deep/.downloadPdf {
  cursor: pointer;
  color: #409eff;
  width: 160px;
  height: 39px;
  background: #f0f5ff;
  border-radius: 2px 2px 2px 2px;
  border: 1px dashed #4a80fc;
  padding: 3px 5px;
}
</style>
