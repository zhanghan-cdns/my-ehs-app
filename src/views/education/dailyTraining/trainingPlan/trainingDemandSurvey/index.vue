<template>
  <div>
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button @headerButtonClick="headerButtonMethods">
            <el-button type="primary" size="small" plain @click="launch"
              ><i class="el-icon-s-promotion" style="font-size: 13px"></i
              >发起调查</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              @click="setInvestigation"
              ><i class="el-icon-s-tools" style="font-size: 13px"></i
              >设置调查</el-button
            >
            <el-button type="warning" size="small" @click="changeStatus(1)"
              >终止调查</el-button
            >
            <el-button type="primary" size="small" @click="changeStatus(0)"
              >恢复调查</el-button
            >
          </header-button>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @currentChange="currentChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      @refresh="getList()"
      :currentRow="currentRow"
    ></edit-dialog>
    <launch-dialog ref="launchDialogRef" @refresh="getList()"></launch-dialog>
    <vote-dialog ref="voteDialogRef" @refresh="refresh"></vote-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue";
import launchDialog from "./components/launchDialog.vue";
import voteDialog from "./components/voteDialog.vue";
import statisticsDialog from "./components/statisticsDialog.vue";
import {
  getListAPI,
  deleteAPI,
  updateStateAPI,
} from "@/api/education/dailyTraining/trainingPlan/trainingDemandSurvey";
export default {
  components: { editDialog, launchDialog, voteDialog, statisticsDialog },
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
          type: "Input",
          placeholder: "培训需求主题",
          disabled: false,
          width: "200px",
        },
      ],
      columns: [
        //  {
        //   type: "checkbox",
        //   width: 50,
        //   align: "center",
        //   fixed: "left",
        // },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "theme",
          title: "培训调查主题",
          align: "center",
        },
        {
          field: "courseName",
          title: "最高投票课程",
          align: "center",
        },
        {
          field: "maxVoteNum",
          title: "最高投票数",
          align: "center",
        },
        {
          field: "tpzt",
          title: "投票状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.vote == "未投票") {
              return <div class="red">{row.vote}</div>;
            } else {
              return <div class="green">{row.vote}</div>;
            }
          },
        },
        {
          field: "dc",
          title: "调查状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.surveyState == "1") {
              return <div class="red">已终止</div>;
            } else {
              return <div class="green">进行中</div>;
            }
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
      currentRow: "", //当前选中的行
      personId: "", //用户id
    };
  },
  mounted() {
    this.personId = this.$store.state.user.currentUserInfo.id;
    this.getList();
  },
  methods: {
    async getList() {
      let params = {
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        personId: this.personId,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
      this.tableData.forEach((item)=>{
        item.courseNames=JSON.parse(item.courseNames)
      })
      // this.tableData.forEach((item) => {
      //   item.courseNames.sort(function (a, b) {
      //     return b.voteNum - a.voteNum;
      //   });
      //   item.mostCourse=item.courseNames[0].courseName;
      //   item.mostVotes=item.courseNames[0].voteNum
      // });
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type == "shanchu") {
        this.delete(row.id);
      } else if (type == "toupiao") {
        this.$refs.voteDialogRef.open(row);
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
    //发起调查
    launch() {
      this.$refs.launchDialogRef.open();
    },
    //选中行
    currentChange(row) {
      this.currentRow = this.tableData[row.$rowIndex];
    },
    //设置调查
    setInvestigation() {
      if (!this.currentRow) {
        this.$message.warning("请至少选择一个主题问卷");
        return;
      }

      this.$refs.editDialogRef.open(this.currentRow);
    },
    changeStatus(state) {
      if (!this.currentRow) {
        this.$message.warning("请至少选择一个主题问卷");
        return;
      }
      let params = {
        id: this.currentRow.id,
        surveyState: state,
      };
      updateStateAPI(params).then((res) => {
        if (res.code == 200) {
          if (state == 0) {
            this.$message.success("恢复带调查！");
          } else {
            this.$message.success("已终止调查！");
          }
        }
      });
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
/deep/.red {
  width: 74px;
  height: 30px;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #ff7b60;
  font-size: 14px;
  text-align: center;
  color: #ff7b60;
  line-height: 30px;
  margin: 0 auto;
}
/deep/.green {
  width: 74px;
  height: 30px;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #52c41a;
  font-size: 14px;
  text-align: center;
  color: #52c41a;
  line-height: 30px;
  margin: 0 auto;
}
</style>
