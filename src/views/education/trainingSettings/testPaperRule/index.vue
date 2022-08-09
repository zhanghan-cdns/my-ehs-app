<template>
  <div>
    <list-container>
      <template #left>
      </template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-select v-model="searchData.trainCategory" placeholder="请选择培训类别"  @change="selectChange">
              <el-option v-for="item in trainCategory" :label="item.dictValueName" :key="item.id" :value="item.dictValue"></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table :height="sizeCon.height" :data="tableData" :columns="columns" />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refresh="getList()"></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue";
import dict from "@/mixins/dict";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/trainingSettings/testPaperRule";
import {fastGetDictAPI} from '@/api/system/dictionary'
export default {
  components: {editDialog},
  mixins: [tableMixins,dict],
  data() {
    return {
      trainCategory:[],
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      title: "出卷详情",
      columns: [
        // {
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
          field: "trainCategoryName",
          title: "培训类别",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div title={row.courseName}>
                {row.courseName}
              </div>
            );
          },
        },
        {
          field: "cj",
          title: "单选",
          align: "center",
          children: [
            {
              field: "singleChoiceQuestions",
              title: "数量",
              align: "center",
            },
            {
              field: "singleChoiceQuestionsScore",
              title: "分值",
              align: "center",
            },
          ],
        },
        {
          field: "dux",
          title: "多选",
          align: "center",
          children: [
            {
              field: "multipleChoiceQuestions",
              title: "数量",
              align: "center",
            },
            {
              field: "multipleChoiceQuestionsScore",
              title: "分值",
              align: "center",
            },
          ],
        },
        {
          field: "tk",
          title: "填空",
          align: "center",
          children: [
            {
              field: "fillBlanks",
              title: "数量",
              align: "center",
            },
            {
              field: "fillBlanksScore",
              title: "分值",
              align: "center",
            },
          ],
        },
        {
          field: "pd",
          title: "判断",
          align: "center",
          children: [
            {
              field: "judgeQuestion",
              title: "数量",
              align: "center",
            },
            {
              field: "judgeQuestionScore",
              title: "分值",
              align: "center",
            },
          ],
        },
        {
          field: "qualifiedScoreLine",
          title: "及格线",
          align: "center",
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
      tableData: [],
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "培训类别",
          disabled: false,
          width: "200px",
          children: [
            {
              label: "",
              value: "",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getList();
    this.getDicMap("EDUCATION_SET_TRAININGCATEGORY")
  },
  methods: {
    //获取字典
     async getDicMap(key, target) {
      const res = await fastGetDictAPI(key)
      if (res.data && res.code === 200) {
        this.trainCategory= res.data
      }
    },
    async getList() {
      let params = {
        ...this.searchData,
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
    selectChange(val){
      console.log(val,this.searchData)
      this.getList()
    }
  },
};
</script>
<style scoped lang='scss'>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>