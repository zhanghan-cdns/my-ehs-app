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
        <add-dialog
          ref="addDialogRef"
          :userList="userList"
          @refresh="getList()"
        ></add-dialog>
        <online-training-records ref="onlineTrainingRecordsRef"></online-training-records>
      </template>
    </list-container>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import statisticsCom from "./components/statistics.vue";
import addDialog from "./components/addDialog.vue";
import onlineTrainingRecords from "./components/onlineTrainingRecords.vue";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/threeLevel/trainingRecords";
import { entPersonnelListAllAPI } from "@/api/enterprise/entPersonnel";
export default {
  mixins: [tableMixins],
  components: { statisticsCom, addDialog, onlineTrainingRecords },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
        totalResult: 0,
      },
      searchData: {},
      searchItem: [
        {
          prop: "personName",
          type: "Input",
          placeholder: "人员姓名",
          disabled: false,
        },
        {
          prop: "deptName",
          type: "Select",
          placeholder: "部门名称",
          disabled: false,
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
          field: "entPersonName",
          title: "姓名",
          align: "center",
        },
        {
          field: "sex",
          title: "性别",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.sex == "COMMON_GENDER:MALE") {
              return <div>男</div>;
            } else if (row.sex == "COMMON_GENDER:FMALE") {
              return <div>女</div>;
            } else if (row.sex == "COMMON_GENDER:UNKNOW") {
              return <div>未知</div>;
            }
          },
        },
        {
          field: "sfz",
          title: "身份证",
          align: "left",
        },
        {
          field: "deptName",
          title: "部门名称",
          align: "center",
        },
        {
          field: "cj",
          title: "厂级培训",
          align: "center",
          children: [
            {
              field: "companyLevel_courseName",
              title: "课程",
              align: "center",
            },
            {
              field: "companyLevel_achievement",
              title: "成绩",
              align: "center",
            },
            {
              field: "companyLevel_isQualified",
              title: "结果",
              align: "center",
              render: (h, { row, column, $index }) => {
                if (row.companyLevel_isQualified === 0) {
                  return <div>不合格</div>;
                } else if (row.companyLevel_isQualified === 1) {
                  return <div>合格</div>;
                }
              },
            },
          ],
        },
        {
          field: "cjj",
          title: "车间级培训",
          align: "center",
          children: [
            {
              field: "workshopLevel_achievement",
              title: "课程",
              align: "center",
            },
            {
              field: "workshopLevel_achievement",
              title: "成绩",
              align: "center",
            },
            {
              field: "workshopLevel_isQualified",
              title: "结果",
              align: "center",
              render: (h, { row, column, $index }) => {
                if (row.workshopLevel_isQualified === 0) {
                  return <div>不合格</div>;
                } else if (row.workshopLevel_isQualified === 1) {
                  return <div>合格</div>;
                }
              },
            },
          ],
        },
        {
          field: "bzj",
          title: "班组级培训",
          align: "center",
          children: [
            {
              field: "teamLevel_courseName",
              title: "课程",
              align: "center",
            },
            {
              field: "teamLevel_achievement",
              title: "成绩",
              align: "center",
            },
            {
              field: "teamLevel_isQualified",
              title: "结果",
              align: "center",
              render: (h, { row, column, $index }) => {
                if (row.teamLevel_isQualified === 0) {
                  return <div>不合格</div>;
                } else if (row.teamLevel_isQualified === 1) {
                  return <div>合格</div>;
                }
              },
            },
          ],
        },
        {
          field: "fs",
          title: "培训方式",
          align: "center",
          width: 100,
          render: (h, { row, column, $index }) => {
            if (row.methods == 0) {
              return <div class="online" on-click={()=>{
                 this.operateButtonClick("chakan", row, row.methods);
              }} >线上</div>;
            } else if (row.methods == 1) {
              return <div class="offline">线下</div>;
            }
          },
        },
        {
          field: "jyk",
          title: "三级安全教育卡",
          align: "center",
          width: 100,
          render: (h, { row, column, $index }) => {
            return <div class="btn_export">导出</div>;
          },
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, { row, column, $index }) => {
            if (row.methods == 0) {
              return (
                <operate-button
                  operateButtonList={["chakan", "shanchu"]}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row, row.methods);
                  }}
                ></operate-button>
              );
            } else if (row.methods == 1) {
              return (
                <operate-button
                  operateButtonList={["chakan", "shanchu", "bianji"]}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row, row.methods);
                  }}
                ></operate-button>
              );
            }
          },
        },
      ],
      tableData: [],
      userList: "", //人员列表
    };
  },
  mounted() {
    this.getList();
    this.getUserList();
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
      getListAPI(params).then((res) => {
        this.tableData = [];
        res.data.content.map((item) => {
          let obj = {
            id: item.trMap.id,
            personId:item.trMap.personId,
            entPersonName: item.trMap.entPersonName,
            sex: item.trMap.sex,
            deptName: item.trMap.deptName,
            methods: item.trMap.methods,
            companyLevel_courseName: item.companyLevel
              ? item.companyLevel.courseName
              : "",
            companyLevel_achievement: item.companyLevel
              ? item.companyLevel.achievement
              : "",
            companyLevel_isQualified: item.companyLevel
              ? item.companyLevel.isQualified
              : "",
            workshopLevel_courseName: item.workshopLevel
              ? item.workshopLevel.courseName
              : "",
            workshopLevel_achievement: item.workshopLevel
              ? item.workshopLevel.achievement
              : "",
            workshopLevel_isQualified: item.workshopLevel
              ? item.workshopLevel.isQualified
              : "",
            teamLevel_courseName: item.teamLevel
              ? item.teamLevel.courseName
              : "",
            teamLevel_achievement: item.teamLevel
              ? item.teamLevel.achievement
              : "",
            teamLevel_isQualified: item.teamLevel
              ? item.teamLevel.isQualified
              : "",
          };
          this.tableData.push(obj);
          this.page.totalResult = res.data.totalElements;
          this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
        });
      });
    },
    headerButtonMethods(type) {
      if (type == "tongji") {
        this.$refs.statisticsRef.open();
      } else if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.addDialogRef.open(type);
      }else if (type == "chongzhi") {
        this.searchData={}
        this.getList();
      }

    },
    // 表格操作按钮
    operateButtonClick(type, row, methods) {
      if (methods == 0) {
        //线上
        switch (type) {
          case "chakan":
            this.$refs.onlineTrainingRecordsRef.open(row);
            break;
          case "shanchu":
            this.deleteTable(row.id);
            break;
        }
      } else {
        switch (type) {
          case "chakan":
            this.$refs.addDialogRef.open(type, row);
            break;
          case "bianji":
            this.$refs.addDialogRef.open(type, row);
            break;
          case "shanchu":
            this.deleteTable(row.id);
            break;
        }
      }
    },
    //获取人员列表
    getUserList() {
      entPersonnelListAllAPI().then((res) => {
        this.userList = res.data;
      });
    },
    //删除
    deleteTable(id) {
      let params = {
        ids: id,
      };
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAPI(params).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {});
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
  padding-left: 0px;
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
</style>
