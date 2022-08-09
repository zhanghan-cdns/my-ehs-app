<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="1000px"
      height="60%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <list-container>
          <template #left> </template>
          <template #right>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
                @checkbox-change="selectChangeEvent"
                @checkbox-all="selectChangeEvent"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </template>
        </list-container>
      </template>
    </basic-dialog>

    <information-dialog ref="informationDialogRef"></information-dialog>
    <record-dialog ref="recordDialogRef"></record-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import informationDialog from "./informationDialog.vue";
import recordDialog from "./recordDialog.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { informationDialog, recordDialog },
  name: "historyDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {},
      rules: {},
      query: {
        safetyTarget: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
      columns: [
        {
          type: "checkbox",
          align: "center",
          fixed: "left",
          width: 50,
        },
        {
          type: "seq",
          title: "序号",
          fixed: "left",
          width: 50,
          align: "center",
        },
        {
          field: " type",
          title: "违章相关方",
          align: "center",
        },
        {
          field: " type",
          title: "违章内容",
          align: "center",
        },
        {
          field: "name",
          title: "相关责任人",
          align: "center",
        },
        {
          field: "industryType",
          title: "罚款金额（元）",
          align: "center",
        },
        {
          field: "contact",
          title: "扣分分值",
          align: "center",
        },
        {
          field: "phone",
          title: "操作",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                operateButtonList={["chakan"]}
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

  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "相关方违章历史",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    add() {
      this.$refs.recordDialogRef.open();
    },
    submitForm() {
      this.close();
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.informationDialogRef.open();
          break;
        case "bianji":
          this.$refs.recordDialogRef.open();
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
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
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 20px;
}
/deep/.projectFund .el-form-item__label {
  line-height: 20px;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
.role_operation_box {
  padding: 5px;
  display: flex;
  justify-content: end;
}

.role_operation_box .el-button {
  background-color: #409eff;
  color: white;
  width: 72.56px;
  height: 33px;
  padding: 9px 15px;
}
.role_operation_box .el-button:hover {
  background-color: #6eb5ff;
}
/deep/ .role_operation_box span {
  font-size: 12px;
}
</style>
