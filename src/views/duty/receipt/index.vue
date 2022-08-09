<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div>
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
      :dictConfig="{}"
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
import editDialog from "@views/duty/receipt/components/editDialog.vue";
import viewDialog from "@views/duty/receipt/components/viewDialog.vue";
import { adpInfoListAPI, sdpInfoDeleteAPI } from "@/api/duty/duty_doc/index";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        safetyTarget: "",
        targetType: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyTarget",
          title: "岗位名称",
          align: "center",
        },
        {
          field: "targetCode",
          title: "姓名",
          align: "center",
        },
        {
          field: "year",
          title: "电话",
          align: "center",
        },
        {
          field: "targetName",
          title: "责任书签订时间",
          align: "center",
        },
        {
          field: "targetType",
          title: "回执书附件",
          align: "center",
          render: (h, {}) => {
            return (
              <div class="attachment" onClick={(e) => this.getWordDoc()}>
                常州飞腾化....
              </div>
            );
          },
        },
        {
          field: "checkRate",
          title: "考核结果",
          align: "center",
          render: (h, {}) => {
            return <div class="result">优秀</div>;
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
    };
  },
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
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
          this.$refs.viewDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "xiafa":
          this.issueData(row);
          break;
        case "kaohe":
          this.$refs.editDialogRef.open(row);
          break;
      }
    },
    async issueData(row) {
      this.$confirm("确认下发安全责任书吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(222);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
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
      const res = await adpInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
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
/deep/ .attachment {
  cursor: pointer;
  color: #ff4646;
  border: 1px dashed #ff4646;
  border-radius: 4px;
  padding: 4px;
}
/deep/ .result {
  width: 70px;
  height: 32px;
  line-height: 32px;
  background: #4a80fc;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  color: #ffffff;
  margin: 0 auto;
}
</style>
