<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header>
          <header-search :searchData="search_data" :searchItem="search_item" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </header>
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
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <look-dialog
      ref="lookDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></look-dialog>
    <drill-dialog
      ref="drillDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></drill-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import lookDialog from "./components/lookDialog.vue";
import drillDialog from "./components/drillDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    lookDialog,
    drillDialog,
  },
  name: "indexProvide",
  data() {
    return {
      search_item: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "请输入应急演练名称",
          disabled: false,
          width: "200px",
          children: "commonJudge",
        },
      ],
      search_data: {},
      tableData: [
        { seq: "1" },

      ],
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
          fixed: "left",
          align: "center",
        },
        {
          field: "checkName",
          title: "演练名称",
          align: "center",
        },
        {
          field: "rillName",
          title: "实际演练名称",
          align: "center",
        },
        {
          field: "checkContent",
          title: "演练内容",
          align: "center",
        },
        {
          field: "state",
          title: "评价状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (1) {
              return (
                <el-button
                  class="evaluation"
                  onClick={(e) => this.evaluation()}
                >
                  评价中
                </el-button>
              );
            } else {
              return (
                <el-button
                  class="havevaluation"
                  onClick={(e) => this.havevaluation()}
                >
                  已评价
                </el-button>
              );
            }
          },
        },
        {
          title: "操作",
          align: "center",
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
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type === "chaxun") {
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "xinzengyanlianzhenggai":
          this.$refs.drillDialogRef.open(type, row);
          break;
        case "chakan":
          this.$refs.lookDialogRef.open(type, row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(type, row);
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
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.evaluation {
  color: #ffbe00;
  border: 1px solid #ffbe00;
}
/deep/.havevaluation {
  color: #008eff;
  border: 1px solid #008eff;
}

.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.violationsLabel {
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
}
</style>
