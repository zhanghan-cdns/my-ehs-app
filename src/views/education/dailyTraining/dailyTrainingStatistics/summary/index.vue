<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData"/>
          <header-button @headerButtonClick="headerButtonMethods"></header-button>
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
          type: "Input",
          placeholder: "员工姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "所属部门",
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
          field: "zt",
          title: "员工姓名",
          align: "center",
        },
        {
          field: "zg",
          title: "累计学习时间(分钟)",
          align: "center",
        },
        {
          field: "zgp",
          title: "考试次数",
          align: "center",
        },
         {
          field: "zgp",
          title: "最近学习时间",
          align: "center",
        },
                 {
          field: "zgp",
          title: "最近考试时间",
          align: "center",
        },
                 {
          field: "zgp",
          title: "考试合格率",
          align: "center",
        },
      ],
      tableData: [
        {
          courseName: "1",
        },
      ],
      addCourseList: [],
      tableData: [
        {
          zt: "调查主题",
          zg: "最高投",
          zgp: "最高票数",
          tpzt: "投票状态",
          dc: "调查状态",
        },
        {
          zt: "调查主题2",
          zg: "最高投",
          zgp: "最高票数",
          tpzt: "投票状态",
          dc: "调查状态",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    async getList() {
      let params = {
        ...this.searchData,
        ...this.query,
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
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.query = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type == "shanchu") {
        this.delete(row.id);
      }else if (type == "toupiao") {
        this.$refs.voteDialogRef.open()
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
    // 添加课程
    addCourse() {
      this.$refs.courseDialogRef.open();
    },
    //课程添加成功
    refresh(name) {
      this.addCourseList.push(name);
    },
    //重置
    reset() {
      this.addCourseList = [];
    },
    //删除课程
    deleCourse(index) {
      this.addCourseList.splice(index);
    },
    //选中行
    currentChange(row) {
      this.courseInfo = this.tableData[row.$rowIndex];
      console.log(this.courseInfo);
    },
    //设置调查
    setInvestigation() {
      this.$refs.editDialogRef.open();
    },
    //打开统计信息
    checkStatistics(){
      this.$refs.statisticsDialogRef.open()
    }
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
