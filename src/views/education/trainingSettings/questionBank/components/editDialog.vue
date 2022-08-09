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
          <el-form-item label="课程名称" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择课程名称"
              style="width: 320px"
              :disabled="disabled"
              @change="selectChange"
            >
              <el-option
                v-for="item in courseList"
                :label="item.courseName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型" prop="topicType">
            <el-select
              v-model="form.topicType"
              placeholder="请选择题目类型"
              style="width: 320px"
              :disabled="disabled"
              @change="topicTypeChange"
            >
              <el-option
                v-for="item in dict.educationSetQuestionType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试状态" prop="examStatus">
            <el-select
              v-model="form.examStatus"
              placeholder="请选择考试状态"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSetExamstatus"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="选项A"
            prop="optionA"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:ONE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:TWO'
            "
          >
            <el-input
              v-model="form.optionA"
              placeholder="请输入选项"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="选项B"
            prop="optionB"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:ONE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:TWO'
            "
          >
            <el-input
              v-model="form.optionB"
              placeholder="请输入选项"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="选项C"
            prop="optionC"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:ONE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:TWO'
            "
          >
            <el-input
              v-model="form.optionC"
              placeholder="请输入选项"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="选项D"
            prop="optionD"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:ONE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:TWO'
            "
          >
            <el-input
              v-model="form.optionD"
              placeholder="请输入选项"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="正确"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:FORE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:FORE'
            "
          >
            <el-input
              v-model="form.optionTrue"
              placeholder="正确"
              style="width: 320px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="错误"
            v-show="
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:FORE' ||
              form.topicType == 'EDUCATION_SET_QUESTION_TYPE:FORE'
            "
          >
            <el-input
              v-model="form.optionFalse"
              placeholder="错误"
              style="width: 320px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!-- 单选题 -->
          <el-form-item
            label="正确答案"
            v-show="form.topicType == 'EDUCATION_SET_QUESTION_TYPE:ONE'"
            prop="answer"
          >
            <el-radio-group
              v-model="form.answer"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in choice_answer"
                :label="item.label"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- 多选题 -->
          <el-form-item
            label="正确答案"
            v-show="form.topicType == 'EDUCATION_SET_QUESTION_TYPE:TWO'"
            prop="multipleAnswer"
          >
            <el-checkbox-group v-model="multipleAnswer" style="width: 320px">
              <el-checkbox
                v-for="item in choice_answer"
                :label="item.label"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <!-- 填空题 -->
          <el-form-item
            label="正确答案"
            prop="answer"
            v-show="form.topicType == 'EDUCATION_SET_QUESTION_TYPE:THREE'"
          >
            <el-input
              v-model="form.answer"
              placeholder="请输入答案"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <!-- 判断题 -->
          <el-form-item
            label="正确答案"
            v-show="form.topicType == 'EDUCATION_SET_QUESTION_TYPE:FORE'"
            prop="answer"
          >
            <el-radio-group
              v-model="form.answer"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in judge_answer"
                :label="item.value"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="是否带有图片" >
            <el-radio-group v-model="form.isPicture" style="width: 320px" :disabled="disabled">
              <el-radio v-for="item in dict.commonJudge" :label="item.dictValue" :key="item.id" :value="item.dictValue">{{ item.dictValueName }}</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="题干" prop="stem">
            <el-input
              v-model="form.stem"
              placeholder="请输入题干"
              style="width: 802px"
              :disabled="disabled"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="答案详解" prop="detailedAnswers">
            <el-input
              v-model="form.detailedAnswers"
              placeholder="请输入答案详解"
              style="width: 802px"
              :disabled="disabled"
              type="textarea"
              rows="3"
              resize="none"
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
          <el-button type="warning" @click="close">取消</el-button>
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
} from "@/api/education/trainingSettings/questionBank";
import { courseListAllAPI } from "@/api/education/trainingSettings/courseManagement";
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
      multipleAnswer: [],
      form: {
        courseId: "",
        courseName: "",
        stem: "",
        topicType: "",
        examStatus: "",
        isPicture: "COMMON_JUDGE:FALSE",
        optionTrue: "正确",
        optionFalse: "错误",
        answer: "",
        detailedAnswers: "",
      },
      rules: {
        courseId: [
          { required: true, message: "请选择课程名称", trigger: "change" },
        ],
        stem: [{ required: true, message: "请输入题干", trigger: "blur" }],
        examStatus: [
          { required: true, message: "请选择考试状态", trigger: "change" },
        ],
        answer: [
          { required: true, message: "请设置正确答案", trigger: "change" },
        ],
        // multipleAnswer: [
        //   { required: true, message: "请设置正确答案", trigger: "change" },
        // ],
      },
      judge_answer: [
        {
          label: "正确",
          value: "1",
        },
        {
          label: "错误",
          value: "0",
        },
      ],
      choice_answer: [
        {
          label: "A",
          value: "A",
        },
        {
          label: "B",
          value: "B",
        },
        {
          label: "C",
          value: "C",
        },
        {
          label: "D",
          value: "D",
        },
      ],
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
      const res = await courseListAllAPI();
      if (res.code === 200) {
        this.courseList = res.data;
      }
    },
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增试题信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑试题信息";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看试题信息";
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
        courseId: "",
        courseName: "",
        stem: "",
        topicType: "",
        examStatus: "",
        optionTrue: "正确",
        optionFalse: "错误",
        answer: "",
      };
      this.multipleAnswer = [];
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      if (this.form.topicType == "EDUCATION_SET_QUESTION_TYPE:TWO") {
        if (this.multipleAnswer.length <= 0) {
          this.$message.warning("请设置正确答案");
        }
        this.form.answer = this.multipleAnswer.sort().join("");
      }
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
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
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
        this.form.examStatus = res.data.examStatus.key;
        this.form.isPicture = res.data.isPicture.key;
        this.form.topicType = res.data.topicType.key;
        // 多选
        if (res.data.topicType == "EDUCATION_SET_QUESTION_TYPE:TWO") {
          this.multipleAnswer = this.form.answer.split("");
        }
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
      console.log(data);
      this.courseList.map((item) => {
        if (item.id === data) {
          this.form.courseName = item.courseName;
        }
      });
    },
    //题目切换
    topicTypeChange() {
      this.form.answer = "";
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
/deep/.el-checkbox {
  padding-top: 10px;
}
</style>
