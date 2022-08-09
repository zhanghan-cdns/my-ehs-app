<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入文件名称"
              clearable
              v-model="query.pszt"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
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
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
    <approval-dialog ref="approvalDialogRef"></approval-dialog>
    <file-dialog ref="fileDialogRef"></file-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import approvalDialog from "./components/approvalDialog.vue";
import fileDialog from "./components/fileDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    approvalDialog,
    fileDialog,
  },
  data() {
    return {
      dlbList: [],
      xlbList: [],
      tableData: [
        {
          wjmc: "2021年度培训计划",
          status: "0",
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "wjbh",
          title: "文件编号",
          align: "center",
        },
        {
          field: "wjmc",
          title: "文件名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.wjmc) {
              return (
                <div
                  class="data-blue"
                  onClick={() => {
                    this.openFile(row);
                  }}
                >
                  {row.wjmc}
                </div>
              );
            }
          },
        },
        {
          field: "fgbh",
          title: "类别",
          align: "center",
        },
        {
          field: "fbjg",
          title: "性质",
          align: "center",
        },
        {
          field: "qyrq",
          title: "发送部门",
          align: "center",
        },
        {
          field: "qyrq",
          title: "文件内容",
          align: "center",
        },
        {
          field: "sp",
          title: "状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.status === "0") {
              return (
                <el-button size="mini" class="status-button approval">
                  待审批
                </el-button>
              );
            } else if (row.status === "1") {
              return (
                <el-button size="mini" class="status-button inapproval">
                  审批中
                </el-button>
              );
            } else if (row.status === "2") {
              return (
                <el-button size="mini" class="status-button release">
                  发布
                </el-button>
              );
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
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      query: {
        pszt: "",
      },
    };
  },

  created() {
    // this.getTableData({ query: this.query });
  },

  methods: {
    openFile(row) {
      console.log(row, "row");
      this.$refs.fileDialogRef.open(row);
    },

    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData({ query: this.query });
          break;
      }
    },

    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      if (query) {
        params = {
          ...params,
          ...query,
        };
      }
      const res = await monitoringIndicatorsListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.total;
      }
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "shenpi":
          this.$refs.approvalDialogRef.open(row);
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
          const res = await monitoringIndicatorsDeleteAPI({
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
  },
};
</script>

<style lang="scss" scoped>
/deep/ .data-blue {
  color: #3c81e6;
  cursor: pointer;
}

/deep/ .status-button {
  width: 71px;
}

/deep/ .approval {
  color: #f17d08;
  background-color: #fff8f3;
  border: 1px solid #f17d08;
}

/deep/ .inapproval {
  color: #d8ad00;
  background-color: #fff7e2;
  border: 1px solid #c7a500;
}

/deep/ .release {
  color: #0080ff;
  background-color: #e2f3ff;
  border: 1px solid #149efb;
}
</style>
