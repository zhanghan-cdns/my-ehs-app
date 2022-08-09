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
          label-width="108px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item
            label="培训计划名称"
            label-width="108px"
            prop="courseId"
          >
            <el-select
              v-model="form.courseId"
              placeholder="请选择培训计划名称"
              style="width: 814px"
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
          <el-form-item label="培训类型" label-width="108px" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择培训类型"
              style="width: 340px"
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
          <el-form-item label="培训类别" label-width="108px" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择培训类别"
              style="width: 340px"
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
          <el-form-item label="培训课程" label-width="108px" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择培训课程"
              style="width: 814px"
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
          <el-form-item label="计划年度" label-width="108px" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择计划年度"
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
          <el-form-item label="培训学时" label-width="108px" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择培训学时"
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
          <el-form-item label="考核单位" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入考核单位"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训费用(元)"
            label-width="108px"
            prop="courseId"
          >
            <el-input
              v-model="form.courseHours"
              placeholder="请输入培训费用(元)"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训讲师" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入培训讲师"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训地点" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入培训地点"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="组织部门" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入组织部门"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训学时" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入培训学时"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="108px" prop="courseId">
            <div style="display: flex; align-items: center">
              <el-input
                v-model="form.courseHours"
                placeholder="请选择姓名"
                style="width: 720px"
                :disabled="disabled"
              ></el-input>
              <el-button type="primary" style="margin-left: 25px"
                >选择</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="工作岗位" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入工作岗位"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训时间" label-width="108px" prop="courseId">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择培训时间"
               style="width: 320px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="考试成绩" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入考试成绩"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训结果" label-width="108px" prop="courseId">
            <el-radio-group
              v-model="form.trainLevel"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonJudge"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName=='是'?'合格':'不合格'}}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="培训内容" label-width="108px" prop="courseId">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入工作岗位"
              style="width: 814px"
              :disabled="disabled"
              type="textarea"
              rows="3"
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
export default {
  name: "editDialog",
  mixins: [tableMixins],
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      courseList: [],
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {},
      rules: {
        courseId: [
          { required: true, message: "请选择课程名称", trigger: "change" },
        ],
        stem: [{ required: true, message: "请输入题干", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增日常培训记录";
        this.isDisabled = false;
      } else if (type == "bianji") {
        // this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑日常培训记录";
        this.isDisabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看日常培训记录";
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
      this.form = {};
      this.multipleAnswer = [];
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      if (this.form.topicType == "EDUCATION_SET_QUESTION_TYPE:TWO") {
        if (this.multipleAnswer.length <= 0) {
          this.$message.warning("请设置正确答案");
        }
        this.form.answer = this.multipleAnswer.join("");
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
