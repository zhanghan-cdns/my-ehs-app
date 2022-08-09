  <template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div style="padding: 10px"></div>
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
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    // editDialog
  },
  name: "indexProvide",
  data() {
    return {
      query: {},
      tableData: [{ restrictSpaceName: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "restrictSpaceName",
          title: "隐患来源",
          align: "center"
        },
        {
          field: "affiliatedFunctionId",
          title: "隐患发现时间",
          align: "center"
        },
        {
          field: "mainSubstance",
          title: "检查单位",
          align: "center"
        },
        {
          field: "num",
          title: "检查人员",
          align: "center"
        },
        {
          field: "injectionPosition",
          title: "隐患级别",
          align: "center"
        },
        {
          field: "locate",
          title: "隐患因素",
          align: "center"
        },
        {
          field: "facilitiesSatety",
          title: "整改责任单位",
          align: "center"
        },
        {
          field: "facilitiesSatety",
          title: "整改责任人",
          align: "center"
        },
        {
          field: "facilitiesSatety",
          title: "隐患描述",
          align: "center"
        }
      ]
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
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          // this.deleteData(row);
          break;
      }
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await sdpInfoDeleteAPI({
            ids: row.id
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
  }
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
