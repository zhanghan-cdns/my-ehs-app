<template>
  <div class="courseManagement">
    <list-container>
      <template #left>
        <left-tree
          :title="treeTitle"
          :list="courseList"
          @choseCourse="choseCourse"
          ref="leftTreeRef"
          :dict="{ educationSetTrainingcategory, commonJudge }"
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
      :dict="{educationSetTrainingcategory, commonJudge,educationSetCourseTrainlevel}"
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
} from "@/api/education/trainingSettings/courseManagement";
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
      treeTitle: "课程类别",
      treeData: [
        {
          label: "日常培训计划",
          children: [
            {
              label: "日常培训计划——1",
            },
          ],
        },
        {
          label: "入职三级教育培训",
          children: [
            {
              label: "新员工教育培训",
            },
            {
              label: "外来培训",
            },
          ],
        },
        {
          label: "外来方培训",
          children: [
            {
              label: "安全培训课程",
            },
          ],
        },
      ],
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
      ], //查询列表
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
          field: "courseHours",
          title: "课程学时（分钟）",
          align: "center",
        },
        {
          field: "questionNum",
          title: "试题数量",
          align: "center",
        },
        {
          field: "questionUpdateTime",
          title: "试题更新时间",
          align: "center",
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
    this.getList();
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
      this.page.currentPage = res.data.totalPages?res.data.totalPages:1;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      }else if (type == "chongzhi") {
        this.searchData={};
        this.getList()
        this.$refs.leftTreeRef.refresh()
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
    choseCourse(name) {
      this.searchData.trainCategory = name;
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
