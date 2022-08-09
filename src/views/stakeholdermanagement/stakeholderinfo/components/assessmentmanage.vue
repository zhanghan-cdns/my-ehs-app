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
    <evaluate-dialog ref="evaluateDialogRef"></evaluate-dialog>
  </div>
</template>
<script>
import addProjectmanage from "./addProjectmanage.vue";
import evaluateDialog from "../../assessmentmanage/components/evaluateDialog"
export default {
  name: "assessmentmanage",
  components: { addProjectmanage,evaluateDialog},
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
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "job",
          title: "被考核相关方",
          align: "center",
        },
        {
          field: "safetyDuty",
          title: "考核日期",
          align: "center",
        },
        {
          field: "editor",
          title: "标题",
          align: "center",
        },
        {
          field: "attachment",
          title: "得分",
          align: "center",
        },
        {
          field: "attachment",
          title: "考核结果",
          align: "center",
        },
        {
          field: "status",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
            if (row.status == "0") {
              return (
                <div
                  class="investigation"
                  onClick={(e) => this.downCheckNum(e, row)}
                >
                  未评定
                </div>
              );
            } else if (row.status == "1") {
              return <div class="investigation-under">已评定</div>;
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
               operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
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
