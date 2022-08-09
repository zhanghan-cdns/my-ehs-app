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
          label-width="auto"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="奖惩类型" label-width="auto" prop="courseId">
            <el-select
              v-model="form.courseId"
              placeholder="请选择奖惩类型"
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
          <el-form-item label="被奖惩人" label-width="auto" prop="topicType">
            <el-input
              v-model="form.optionA"
              placeholder="请输入被奖惩人"
              style="width: 320px"
              value="rowData.xm"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="奖惩金额" label-width="auto" prop="optionA">
            <el-input
              v-model="form.optionA"
              placeholder="请输入奖惩金额"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖惩日期" label-width="auto" prop="optionA">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择奖惩日期"
              style="width: 320px"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="奖惩内容" label-width="auto" prop="optionA">
            <el-input
              v-model="form.optionA"
              placeholder="请输入奖惩内容"
              :disabled="disabled"
              style="width: 850px"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖惩依据" label-width="auto" prop="optionA">
            <el-input
              v-model="form.optionA"
              placeholder="请输入奖惩依据"
              :disabled="disabled"
              style="width: 850px"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="auto" prop="optionA">
            <el-input
              v-model="form.optionA"
              placeholder="请输入备注"
              :disabled="disabled"
              style="width: 850px"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >确定
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
  name: "rewardsDialog",
  mixins: [tableMixins],
  props: {
    rowData: {
      type: Object,
      // default:{
      //   xm:""
      // }
    },
  },
  watch: {
    rowData(v) {
      console.log(1111, v);
    },
  },
  data() {
    return {
      title: "奖惩",
      icon: "icon-xinzeng",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {},
      rules: {
        // courseId: [
        //   { required: true, message: "请选择课程名称", trigger: "change" },
        // ],
        // stem: [{ required: true, message: "请输入题干", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
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
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          this.$confirm("是否确定进行奖惩?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
              let params = {
                ...this.form,
              };
              createAPI(params).then((res) => {
                this.$message.success("奖惩成功");
                this.close();
                this.$emit("refresh");
              });
            })
            .catch(() => {});
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
