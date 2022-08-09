<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-select
              placeholder="隐患级别"
              id="mettingType"
              v-model="query.checkRate"
              style="width:80%"
            >
              <el-option></el-option>
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
export default {
  mixins: [tableMixins, commonMixin,dictMixin],
  components: {
     addDialog,
     lookDialog,
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
          field: "categories",
          title: "大类",
          align: "center",
        },
        {
          field: "smallClass",
          title: "小类",
          align: "center",
        },
        {
          field: "level",
          title: "隐患级别",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
            <div class='level'>一级隐患</div>
            );
            }
        },
        {
          field: "description",
          title: "隐患描述",
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
        this.$refs.addDialogRef.open(type);
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
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
}
/deep/.level{
    background-color: yellow;
    width: 50%;
    margin-left: 25%;
    border-radius: 5px;
}

 /deep/ .vxe-body--column.col_7.col--center{
     background-color: yellow;
     color: black;
 }

</style>
