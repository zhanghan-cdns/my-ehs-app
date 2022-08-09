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
    <add-dialog
      ref="addDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></add-dialog>
    <look-dialog
      ref="lookDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></look-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import addDialog from "./components/addDialog.vue";
import lookDialog from "./components/lookDialog.vue";
// import basicEnclosure from '@/components/basic-enclosure'
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    addDialog,
    lookDialog,
    // basicEnclosure,
  },
  name: "indexProvide",
  data() {
    return {
      search_item: [
        {
          prop: "courseName",
          type: "SelectDict",
          placeholder: "请选择类别",
          disabled: false,
          width: "200px",
          children: "commonJudge"
        },
      ],
      search_data: {},
      tableData: [{ safetyTarget: "1" }],
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
          field: "type",
          title: "类别",
          align: "center",
        },
        {
          field: "checkUnit",
          title: "检查单元",
          align: "center",
        },
        {
          field: "checkContent",
          title: "检查内容",
          align: "center",
        },
        {
          field: "basisOf",
          title: "依据",
          align: "center",
        },
        {
          field: "note",
          title: "备注",
          align: "center",
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
        this.$refs.addDialogRef.open(type);
      } else if (type === "chaxun") {

      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.lookDialogRef.open(type, row);
          break;
        case "bianji":
          this.$refs.addDialogRef.open(type, row);
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
</style>
