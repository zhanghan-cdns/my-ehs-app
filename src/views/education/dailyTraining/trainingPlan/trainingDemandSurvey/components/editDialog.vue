<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="600px"
      height="500px"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <div class="btn-wrap">
          <el-button type="primary" size="small" @click="addRow"
            >添加行</el-button
          >
        </div>
        <el-table
          :data="courseNames"
          style="width: 100%"
          border
          header-row-class-name="headerName"
        >
          <el-table-column prop="courseName" label="课程名称" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="deleCourse(scope.$index)"
                size="small"
                type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <course-dialog ref="courseDialogRef" @refresh="refresh"></course-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import { updateAPI } from "@/api/education/dailyTraining/trainingPlan/trainingDemandSurvey";
import courseDialog from "./courseDialog.vue";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  components: {
    courseDialog,
  },
  data() {
    return {
      title: "设置培训课程投票项信息",
      icon: "icon-fujiaxinxi",
      openFlag: false,
      currentRow: [],
    };
  },
  mounted() {},
  methods: {
    // 获课程列表
    async getcourseListAll() {
      const res = await courseListAllAPI();
      if (res.code === 200) {
        this.courseList = res.data;
      }
    },
    // 打开
    open(currentRow) {
      this.currentRow = currentRow;
      this.courseNames = currentRow.courseNames;
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
    },
    // 保存
    async submitForm() {
      let params = {
        ...this.currentRow,
      };
      updateAPI(params).then((res) => {
        this.$message.success("编辑成功");
        this.close();
        this.$emit("refresh");
      });
    },
    addRow() {
      this.$refs.courseDialogRef.open();
    },
    refresh(name) {
      console.log(name);
      let obj = {
        courseName: name,
        number: this.currentRow.courseNames.length,
        voteNum: 0,
      };
      this.currentRow.courseNames.push(obj);
      console.log(this.currentRow);
    },
    deleCourse(index){
      this.currentRow.courseNames.splice(index);
    }
  },
};
</script>

<style scoped lang="scss">
/deep/.headerName th {
  background: #d0e0ff !important;
  color: #333333 !important;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
