<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <el-row :gutter="10" style="height: 100%">
          <el-col :span="13" style="height: 100%">
            <header-container>
              <div>
                <el-input
                  v-model="query.aqglmc"
                  clearable
                  placeholder="请输入安全管理名称"
                  style="width: 200px; margin-right: 10px"
                ></el-input>
              </div>
              <header-button @headerButtonClick="headerButtonMethods" />
            </header-container>
            <dom-size-listen v-model="sizeCon" style="flex: 1; height: 87%">
              <render-table
                :columns="columns"
                :data="tableData"
                :height="sizeCon.height"
                @cellClick="handleCellClick"
                @checkbox-change="selectChangeEvent"
                @checkbox-all="selectChangeEvent"
              />
            </dom-size-listen>
            <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
          </el-col>
          <el-col :span="11" style="height: 100%; margin-top: 10px">
            <right-content :selectRowData="selectRowData"></right-content>
          </el-col>
        </el-row>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
    <approval-dialog ref="approvalDialogRef"></approval-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import rightContent from "./components/rightContent.vue";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/dialog/editDialog.vue";
import viewDialog from "./components/dialog/viewDialog.vue";
import approvalDialog from "./components/dialog/approvalDialog.vue";
import { monitoringIndicatorsDeleteAPI } from "@/api/hazard/monitoringIndicators";

export default {
  components: {
    rightContent,
    HeaderContainer,
    editDialog,
    viewDialog,
    approvalDialog,
  },
  mixins: [tableMixins, commonMixin, dictMixin],
  data() {
    return {
      dlbList: [],
      xlbList: [],
      tableData: [
        {
          zdmc: "111",
          status: "3",
        },
        {
          zdmc: "222",
          status: "1",
        },
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
          field: "zdmc",
          title: "制度名称",
          align: "center",
        },
        {
          field: "xlb",
          title: "版本号",
          align: "center",
        },
        {
          field: "status",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
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
            } else if (row.status === "3") {
              return (
                <el-button size="mini" class="status-button review">
                  评审
                </el-button>
              );
            } else if (row.status === "4") {
              return (
                <el-button size="mini" class="status-button cancel">
                  作废
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
          render: (h, { row }) => {
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
        aqglmc: "",
      },
      ids: [],
      selectRowData: null,
    };
  },

  created() {
    this.getTableData({ query: this.query });
  },

  methods: {
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
      if (!this.selectRowData) {
        this.selectRowData = this.tableData[0];
      }
      // let params = {
      //   "queryParams[pageNum]": this.page.currentPage,
      //   "queryParams[pageSize]": this.page.pageSize,
      //   ...domain,
      // };
      // if (query) {
      //   params = {
      //     ...params,
      //     ...query,
      //   };
      // }
      // const res = await monitoringIndicatorsListAPI(params);
      // if (res.code === 200) {
      //   this.tableData = res.data.content;
      //   this.page.totalResult = res.data.total;
      // }
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
        case "zuofei":
          break;
      }
    },

    //     表格复选框选中
    selectChangeEvent({ records }) {
      this.ids = records.map((item) => item.id);
    },

    // 行点击事件
    handleCellClick(data) {
      this.selectRowData = data.row;
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

/deep/ .review {
  color: #15acc1;
  background-color: #ecfdff;
  border: 1px solid #0fb4c7;
}

/deep/ .cancel {
  color: #ffffff;
  background-color: #aeaeae;
  border: 1px solid #7e7e7e;
}
</style>
