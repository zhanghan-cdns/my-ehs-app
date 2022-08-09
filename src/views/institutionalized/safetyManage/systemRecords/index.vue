<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入评审主题"
              clearable
              v-model="query.pszt"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <review-dialog
      ref="reviewDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></review-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
    <approval-dialog ref="approvalDialogRef"></approval-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import reviewDialog from "@/views/institutionalized/safetyManage/manageSystem/components/dialog/reviewDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import approvalDialog from "./components/approvalDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    reviewDialog,
    viewDialog,
    approvalDialog,
  },
  data() {
    return {
      dlbList: [],
      xlbList: [],
      tableData: [
        {
          status: "0",
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
          field: "pszt",
          title: "评审主题",
          align: "center",
        },
        {
          field: "fgbh",
          title: "评审人",
          align: "center",
        },
        {
          field: "fbjg",
          title: "地点",
          align: "center",
        },
        {
          field: "qyrq",
          title: "评审结论",
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
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.reviewDialogRef.open();
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
          this.$refs.reviewDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "shenpi":
          this.$refs.approvalDialogRef.open(row);
          break;
      }
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
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
</style>
