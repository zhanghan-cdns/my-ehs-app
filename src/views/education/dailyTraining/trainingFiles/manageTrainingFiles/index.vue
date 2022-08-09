<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button @headerButtonClick="headerButtonMethods"/>
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
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择年度",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择部门",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "请输入人员姓名",
          disabled: false,
          width: "200px",
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
          field: "xm",
          title: "部门",
          align: "center",
        },
        {
          field: "gh",
          title: "工号",
          align: "center",
        },
        {
          field: "pxlx",
          title: "姓名",
          align: "center",
        },
        {
          field: "pxkc",
          title: "完成陪你计划数",
          align: "center",
          render: (h, { row, column, $index }) => {
              return <div class="blue cell_btn">10/10</div>;
          },
        },
        {
          field: "pxjs",
          title: "总学时数",
          align: "center",
          render: (h, { row, column, $index }) => {
              return <div class="green cell_btn">3</div>;
          },
        },
        {
          field: "kscj",
          title: "考试通过数",
          align: "center",
          render: (h, { row, column, $index }) => {
          return <div class="blue cell_btn">8/12</div>;
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
      tableData: [],
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async getList() {
      let params = {
        ...this.searchData,
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
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type == "chakan") {
        this.$refs.editDialogRef.open(type, row);
      }
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
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
/deep/.div-headerbutton {
  display: flex;
  align-items: center;
}
/deep/.cell_btn {
  width: 68px;
  height: 28px;
  margin: 0 auto;
  font-size:12px;
  text-align:center;
  line-height: 28px;
}
/deep/.green {
  border: 1px dashed #52C41A;
  color: #52C41A;
}

/deep/.blue {
  border: 1px dashed #4a80fc;
  color: #4a80fc;
 ;
}
</style>
