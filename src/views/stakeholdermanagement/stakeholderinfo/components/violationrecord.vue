<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button
            @headerButtonClick="headerButtonMethods"
            :headerButtonList="['chaxun']"
          />
        </div>
        <render-table :height="height" :data="tableData" :columns="columns" />
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <history-dialog ref="historyDialogRef"></history-dialog>
  </div>
</template>
<script>
import historyDialog from "./historyDialog";
export default {
  name: "violationrecord",
  components: {historyDialog},
  props: ["operateButtonList"],
  data() {
    return {
      height: 480,
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      search_data: {},
      search_item: [
        {
          prop: "personName",
          type: "Input",
          placeholder: "请输入被考核相关方",
          disabled: false,
          width: "200px",
        },
        {
          prop: "deptName",
          type: "Select",
          placeholder: "请选择评定等级",
          disabled: false,
          width: "200px",
          children: [],
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
          field: "illegal",
          title: "违章相关方",
          align: "center",
        },
        {
          field: "illegalName",
          title: "违章人姓名",
          align: "center",
        },
        {
          field: "illegalDate",
          title: "违章日期",
          align: "center",
        },
        {
          field: "projectName",
          title: "项目名称",
          align: "center",
        },
        {
          field: "scorePoints",
          title: "扣分分值",
          align: "center",
        },
        {
          field: "assess",
          title: "评定人",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          width: 180,
          render: (h, { row, column, $index }) => {
            return (
              <div class="returnBtn">
                <el-button
                  type="primary"
                  class="Btn"
                  onClick={(e) => this.look()}
                >
                  查看历史记录
                </el-button>
              </div>
            );
          },
        },
      ],
      tableData: [{}],
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    async getList() {
      let params = {
        ...this.search_data,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      getListAPI(params).then((res) => {});
    },
    headerButtonMethods(type) {
      if (type == "xinzeng") {
        this.$refs.addQualificationInformationRef.open(type);
      } else if (type == "chaxun") {
        this.getList();
      } else if (type == "chongzhi") {
      }
    },
    change() {},
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.evaluateDialogRef.open(row, "chakan");
          break;
      }
    },
    add() {
      this.$refs.recordDialogRef.open();
    },
    look() {
      this.$refs.historyDialogRef.open();
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

/deep/ .investigation {
  width: 71px;
  height: 31px;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  color: #f15008;
  margin: 0 auto;
  background: #fff6f2;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #f15008;
}
/deep/ .investigation-under {
  width: 71px;
  height: 31px;
  line-height: 31px;
  background: #f1f8ff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #438ceb;
  color: #1f84ec;
  margin: 0 auto;
}
</style>
