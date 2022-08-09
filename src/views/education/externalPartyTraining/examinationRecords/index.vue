<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button @headerButtonClick="headerButtonMethods">
            <div class="ksk">
              <img src="../../../../assets/images/education/ksk.png" alt="" />
              <span>导出考试卡</span>
            </div>
            <div class="ewm" @click="jump">
              <img src="../../../../assets/images/education/ewm.png" alt="" />
              <span>二维码考试</span>
            </div>
          </header-button>
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
    <certificate-dialog ref="certificateDialogRef"></certificate-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import certificateDialog from "./components/certificateDialog.vue"
export default {
  components:{certificateDialog},
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
          title: "外来方单位",
          align: "center",
        },
        {
          field: "sex",
          title: "考试人员",
          align: "center",
        },
        {
          field: "sfz",
          title: "身份证",
          align: "left",
        },
        {
          field: "departmentName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "departmentName",
          title: "考试时间",
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
          title: "用时",
          align: "center",
        },
        {
          field: "departmentName",
          title: "试卷标识",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 120,
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
  mounted() {},
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
        case "pingzheng":
          this.deleteTable(row.id);
          break;
      }
    },
    jump() {
      window.open("https://wwww.baidu.com");
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
  color: #52c41a;
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
  border: 1px solid #ff4646;
  color: #ff4646;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
.ksk {
  width: 126px;
  height: 38px;
  background: #fffaf5;
  opacity: 1;
  border: 1px solid #faad14;
  font-size: 14px;
  color: #989898;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}
.ewm {
  width: 126px;
  height: 38px;
  background: #f5fff8;
  opacity: 1;
  border: 1px solid #52c41a;
  font-size: 14px;
  color: #989898;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}
/deep/ .div-headerbutton {
  display: flex;
}
</style>
