<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role-operation-box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button
            @headerButtonClick="headerButtonMethods"
          ></header-button>
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
      :dict="{ commonJudge,educationDailyTrainCategory,educationDailyTrainType}"
      :userList="userList"
    ></edit-dialog>
    <learning-rate
      ref="learningDialogRef"
      @refresh="getList()"
      :dict="{ commonJudge }"
    ></learning-rate>
    <examination-rate
      ref="examinationDialogRef"
      @refresh="getList()"
      :dict="{ commonJudge }"
    ></examination-rate>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue";
import learningRate from "./components/learningRate.vue";
import examinationRate from "./components/examinationRate.vue";
import dict from "@/mixins/dict";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/dailyTraining/trainingPlan/safetyTrainingPlan";
import { entPersonnelListAllAPI } from "@/api/enterprise/entPersonnel";
export default {
  components: { editDialog, learningRate, examinationRate },
  mixins: [tableMixins, dict],
  data() {
    return {
      dict: dict,
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "计划名称",
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
          field: "planName",
          title: "计划名称",
          align: "center",
        },
        {
          field: "courseInfo.courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "trainHorse",
          title: "培训学时(h)",
          align: "center",
        },
        {
          field: "applianceDate",
          title: "开始日期",
          align: "center",
        },
        {
          field: "planCompleteDate",
          title: "结束日期",
          align: "center",
        },
        {
          field: "tpzt",
          title: "状态",
          align: "center",
          width: "300px",
          render: (h, { row, column, $index }) => {
            return (
              <div>
                <div class="blue">查看学习进度</div>
                <div class="red">查看考试进度</div>
              </div>
            );
          },
        },
        {
          field: "dc",
          title: "进度",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-progress
                text-inside="true"
                stroke-width="24"
                percentage="100"
                status="success"
              ></el-progress>
            );
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
      tableData: [
      ],
      userList:[],
    };
  },
  mounted(){
    this.getList();
    this.getUserList()
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
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getList();
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
    //获取人员列表
    getUserList() {
      entPersonnelListAllAPI().then((res) => {
        res.data.map((item)=>{
          if(item.nickName){
            item.value=item.nickName;
          }
        })
        this.userList = res.data;
        // console.log(this.userList)
      });
    },
  },
};
</script>
<style scoped lang="scss">
.role-operation-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/.red,
/deep/.blue {
  width: 113px;
  height: 33px;
  background: #f47943;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ff9940;
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 33px;
  color: white;
}
/deep/.blue {
  background: #439af4;
  border: 1px solid #409eff;
}
</style>
