<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
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
        <statistics-com ref="statisticsRef"></statistics-com>
        <add-dialog ref="addDialogRef"></add-dialog>
      </template>
    </list-container>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import statisticsCom from "./components/statistics.vue";
import addDialog from "./components/addDialog.vue";
import { getListAPI } from "@/api/education/trainingSettings/trainingRecords";
export default {
  mixins: [tableMixins],
  components: { statisticsCom, addDialog },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "personName",
          type: "Input",
          placeholder: "姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "personName",
          type: "Input",
          placeholder: "外来方单位名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "bm",
          type: "Select",
          placeholder: "培训结果",
          disabled: false,
          width: "200px",
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
          field: "username",
          title: "姓名",
          align: "center",
        },
        {
          field: "sex",
          title: "培训类别",
          align: "center",
        },
        {
          field: "sfz",
          title: "外来方单位名称",
          align: "left",
        },
        {
          field: "departmentName",
          title: "培训日期",
          align: "center",
        },
        {
          field: "departmentName",
          title: "培训内容",
          align: "center",
        },
        {
          field: "departmentName",
          title: "培训人员",
          align: "center",
        },
        {
          field: "departmentName",
          title: "培训日期",
          align: "center",
        },
        {
          field: "departmentName",
          title: "教育人",
          align: "center",
        },
        {
          field: "departmentName",
          title: "考试成绩",
          align: "center",
        },
        {
          field: "departmentName",
          title: "培训结果",
          align: "center",
          render: (h, { row, column, $index }) => {
            // return <div class="qualified">合格</div>;
            return <div class="unqualified">不合格</div>;
          },
        },
        {
          field: "departmentName",
          title: "培训方式",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.fs == "线上") {
              return <div class="online">线上</div>;
            } else if (row.fs == "线下") {
              return <div class="offline">线下</div>;
            }
          },
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          // fixed: "right",
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
          seq: 1,
          username: "杨帆",
          sex: 1,
          sfz: 1525456451231,
          departmentName: "技术部门",
          bzj_kc: "法律课程",
          bzj_cj: 85,
          bzj_jg: "合格",
          cj_kc: "法律课程",
          cj_cj: 85,
          cj_jg: "合格",
          cjj_kc: "法律课程",
          cjj_cj: 85,
          cjj_jg: "合格",
          fs: "线上",
        },
        {
          seq: 1,
          username: "杨帆",
          sex: 1,
          sfz: 1525456451231,
          departmentName: "技术部门",
          bzj_kc: "法律课程",
          bzj_cj: 85,
          bzj_jg: "合格",
          cj_kc: "法律课程",
          cj_cj: 85,
          cj_jg: "合格",
          cjj_kc: "法律课程",
          cjj_cj: 85,
          cjj_jg: "合格",
          fs: "线下",
        },
      ],
    };
  },
  mounted() {
    this.getList();
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
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      getListAPI(params).then((res) => {});
    },
    headerButtonMethods(type) {
      console.log(type);
      if (type == "tongji") {
        this.$refs.statisticsRef.open();
      } else if (type == "chaxun") {
        this.$refs.addDialogRef.open();
      }
    },
    change() {},
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "fenpeiquanxian":
          this.$refs.permissionDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
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
/deep/ .online {
  width: 58px;
  height: 26px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #01ad9d;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: #01ad9d;
  margin: 0 auto;
  &:hover {
    background: #01ad9d;
    color: white;
  }
}
/deep/ .offline {
  width: 58px;
  height: 24px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #ffb508;
  font-size: 12px;
  font-weight: 500;
  color: #ffb508;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background: #ffb508;
    color: white;
  }
}
/deep/ .btn_export {
  width: 60px;
  height: 33px;
  background: #409eff;
  border-radius: 4px 4px 4px 4px;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 33px;
  margin: 0 auto;
  cursor: pointer;
}
// /deep/ .col--center>.vxe-cell{
//   display: flex;
//   align-items:center;
//   justify-content: center;
// }

/deep/.qualified {
  width: 74px;
  height: 30px;
  background: #fbfff9;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #52c41a;
  color: #52C41A;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
/deep/.unqualified {
  width: 74px;
  height: 30px;
  background: #fbfff9;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #FF4646;
  color: #FF4646;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
</style>
