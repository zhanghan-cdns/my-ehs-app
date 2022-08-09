<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header>
          <header-search :searchData="search_data" :searchItem="search_item" />
          <header-button
            @headerButtonClick="danger_headerButtonMethods"
            :headerButtonList="['chaxun', 'chongzhi']"
          >
          </header-button>
        </header>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <inspect-dialog
          ref="inspectDialogRef"
          @refresh="getTableData()"
        ></inspect-dialog>
      </template>
    </list-container>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import inspectDialog from "./inspectDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "index",
  components: {
    inspectDialog,
  },
  data() {
    return {
      search_item: [
        {
          prop: "courseName",
          type: "Date",
          placeholder: "请选择检查时间",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择检查类别",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择状态",
          disabled: false,
          width: "200px",
          children: [],
        },
      ],
      search_data: {},
      tableData: [{ sourceOfHiddenDanger: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "sourceOfHiddenDanger",
          title: "任务名称",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "部门",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "检查人",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "检查类别",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "计划检查时间",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
            if (!row.rectificationDepartment) {
              return <div class="self">已检查</div>;
            } else if (row.result == "0") {
              return <div class="notStarand">未检查</div>;
            }
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
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      operateButtonList: ["ksjiancha", "chakan", "shanchu"],
    };
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "chaxun") {
        this.getTableData();
      } else if (type === "chongzhi") {
        this.getTableData();
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "ksjiancha":
          this.$refs.inspectDialogRef.open(row);
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
    async getTableData() {},
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .notStarand {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #fff0f0;
  border: 1px solid #ff4646;
  color: #ff4646;
  border-radius: 4px;
}

/deep/ .self {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #f0f5ff;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #4a80fc;
  color: #4a80fc;
  margin: 0 auto;
  border-radius: 4px;
}
</style>
