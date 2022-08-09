<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="860px"
      height="40%"
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
        >
          <el-form-item
            label="培训类别"
            label-width="auto"
            prop="trainCategory"
          >
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训类别"
              style="width: 726px"
            >
              <el-option
                v-for="item in dict.commonGudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" label-width="auto" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入姓名"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" label-width="auto" prop="courseHours">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入身份证号"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属单位" label-width="auto">
            <el-input
              v-model="form.examNum"
              placeholder="请输入所属单位"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位" label-width="auto">
            <el-input
              v-model="form.examNum"
              placeholder="请输入岗位"
              style="width: 320px"
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
    default: () => {},
  },
  data() {
    return {
      title: "填写基本信息",
      icon: "icon-xinzeng",
      openFlag: true,
      isDisabled: "",
      form: {
        trainCategory: "",
        courseName: "",
        courseHours: "",
        isExamBindHours: "COMMON_JUDGE:FALSE",
        coursewareLibrary: {},
        trainLevel: "EDUCATION_SET_COURSE_TRAINLEVEL:ONE",
        courseWare: [],
      },
      rules: {
        trainCategory: [
          { required: true, message: "请选择培训类别", trigger: "change" },
        ],
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        courseHours: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
        ],
        trainLevel: [
          { required: true, message: "请选择培训级别", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    console.log(this.dict.commonJudge);
  },
  methods: {
    // 打开
    open() {
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {};
    },
    // 保存
    // async submitForm() {
    //   this.$refs.basicFormRef.validate((valid) => {
    //     if (!valid) {
    //       return false;
    //     } else {
    //       createAPI(params).then((res) => {
    //         this.$message.success("绑定成功");
    //         this.close();
    //         this.$emit("refresh");
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style scoped lang="scss"></style>
