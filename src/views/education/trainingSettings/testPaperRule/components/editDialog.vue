<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="128px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="课程名称" prop="courseInfo.courseId">
            <el-select
              v-model="form.courseInfo.courseId"
              placeholder="请选择课程名称"
              style="width:802px"
              :disabled="disabled"
              @change="selectChange"
            >
              <el-option
                v-for="item in courseList"
                :label="item.courseName"
                :key="item.courseId"
                :value="item.courseId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单选题（道）" prop="singleChoiceQuestions">
            <el-input
              v-model="form.singleChoiceQuestions"
              placeholder="请输入数量"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="每题分值" prop="singleChoiceQuestionsScore">
            <el-input
              v-model="form.singleChoiceQuestionsScore"
              placeholder="请输入单选题分值"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="多选题（道）" prop="multipleChoiceQuestions">
            <el-input
              v-model="form.multipleChoiceQuestions"
              placeholder="请输入数量"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="每题分值" prop="multipleChoiceQuestionsScore">
            <el-input
              v-model="form.multipleChoiceQuestionsScore"
              placeholder="请输入多选题分值"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="填空题（道）" prop="fillBlanks">
            <el-input
              v-model="form.fillBlanks"
              placeholder="请输入填空题数量"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="每题分值" prop="fillBlanksScore">
            <el-input
              v-model="form.fillBlanksScore"
              placeholder="请输入填空题分值"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="判断题（道）" prop="judgeQuestion">
            <el-input
              v-model="form.judgeQuestion"
              placeholder="请输入判断题数量"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="每题分值" prop="judgeQuestionScore">
            <el-input
              v-model="form.judgeQuestionScore"
              placeholder="请输入判断题分值"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="合格分数线" prop="qualifiedScoreLine">
            <el-input
              v-model="form.qualifiedScoreLine"
              placeholder="请输入合格分数"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="考试时长（分钟）" prop="qualifiedScoreLine">
            <el-input
              v-model="form.examDuration"
              placeholder="请输入考试时长"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close()">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/trainingSettings/testPaperRule";
import { bindExamAPI } from "@/api/education/trainingSettings/courseManagement";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      courseList: [],
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        courseInfo: {},
        qualifiedScoreLine: "",
      },
      rules: {
        "courseInfo.courseId": [
          { required: true, message: "请选择课程名称", trigger: "change" },
        ],
        qualifiedScoreLine: [
          { required: true, message: "请输入合格分数", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dict: Object,
    default: {},
  },
  mounted() {
    this.getcourseListAll();
  },
  methods: {
    // 获课程列表
    async getcourseListAll() {
      const res = await bindExamAPI();
      if (res.code === 200) {
        this.courseList = res.data;
      }
    },
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增出题规则";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑出题规则";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看出题规则";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {
        courseInfo: {},
        qualifiedScoreLine: "",
      };
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
              this.getcourseListAll();
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
              this.getcourseListAll();
            });
          }
        }
      });
    },
    // 获取详情
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.form = res.data;
        console.log(this.form);
      }
    },
    // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除课件
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    selectChange(data) {
      this.courseList.map((item) => {
        if (item.courseId === data) {
          this.form.courseInfo.courseName = item.courseName;
          this.form.courseInfo.trainCategory = item.trainCategory;
          this.form.courseInfo.trainCategoryName = item.trainCategoryName;
        }
      });
      this.form.courseId = data;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
</style>
