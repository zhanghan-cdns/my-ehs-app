<template>
  <div class="courseManagement">
    <list-container>
      <template #left>
        <left-tree
          :title="left_title"
          :courseList="courseList"
          @choseCourse="choseCourse"
          ref="leftTreeRef"
        ></left-tree>
      </template>
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
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dict="{ educationSetExamstatus, commonJudge, educationSetQuestionType }"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import leftTree from "./components/leftTree.vue";
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/trainingSettings/questionBank";
import { courseListAllAPI } from "@/api/education/trainingSettings/courseManagement";
export default {
  components: { leftTree, editDialog },
  mixins: [tableMixins, dict],
  data() {
    return {
      dict: dict,
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      left_title: "课程名称",
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
      ],
      query:{
        courseName:name
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "topicType",
          title: "题目类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.topicType ? row.topicType.value : ""}</div>;
          },
        },
        {
          field: "stem",
          title: "题干",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div title={row.stem}>{row.stem}</div>;
          },
        },
        {
          field: "answer",
          title: "答案",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.topicType.key == "EDUCATION_SET_QUESTION_TYPE:FORE") {
              if (row.answer == 1) {
                return <div>正确</div>;
              } else {
                return <div>错误</div>;
              }
            }else{
                return <div>{row.answer}</div>;
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
      courseList: [],
    };
  },
  mounted() {
    this.getList();
    this.getcourseListAll();
  },
  methods: {
    // 获课程列表
    async getcourseListAll() {
      const res = await courseListAllAPI();
      if (res.code === 200) {
        this.courseList = res.data;
      }
    },
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
    //侧边选择课程
    choseCourse(name) {
      this.query={
        courseName:name
      }
      this.searchData={};
      this.getList();
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.query={}
        this.getList();
        this.$refs.leftTreeRef.refresh();
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
  },
};
</script>
<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
