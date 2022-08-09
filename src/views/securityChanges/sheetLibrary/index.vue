<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            :mergeRowMethod="mergeRowMethod"
            @currentChange="currentChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dict="{commonJudge}"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
export default {
  components: { editDialog,},
  mixins: [tableMixins,dict],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      columns: [
        // {
        //   type: "seq",
        //   title: "序号",
        //   width: 50,
        //   fixed: "left",
        //   align: "center",
        // },
        {
          field: "pglb",
          title: "评估类别",
          align: "center",
        },
        {
          field: "pgxmc",
          title: "评估项名称",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
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
      tableData: [
        {
          pglb: "变更影响人员安全风险",
          pgxmc: "人体工程学的风险",
        },
        {
          pglb: "变更影响人员安全风险",
          pgxmc: "化学品泄漏的风险",
        },
        {
          pglb: "变更影响人员安全风险",
          pgxmc: "变更影响设备安全",
        },
        {
          pglb: "变更影响人员安全风险",
          pgxmc: "影响设备报警参数",
        },
      ],
      courseList: [],
      choseRow: "", //选中行
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async getList() {
      let params = {
        ...this.search_data,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
      this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } 
    },
    operateButtonClick(type, row) {
      if (type == "chakan") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "bianji") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "shanchu") {
        this.delete(row.id);
      }
    },
    // 删除
    async delete(id) {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteAPI({ ids: id });
          if (res.code === 200) {
            this.getList();
            this.$message.success("删除成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    //合并单元格
    // 通用行合并函数（将相同多列数据合并为一行）
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      const fields = ["pglb"];
      const cellValue = row[column.property];
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
