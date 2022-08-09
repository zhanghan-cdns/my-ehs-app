<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="600px"
      height="700px"
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
            label="培训调查主题"
            label-width="auto"
            prop="theme"
          >
            <el-input
              v-model="form.theme"
              placeholder="请输入培训调查主题"
              style="width: 400px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <div class="courseWrap" v-show="form.courseNames.length > 0">
            <el-table :data="form.courseNames" style="width: 100%">
              <el-table-column
                prop="courseName"
                label="课程名称"
              ></el-table-column>
              <el-table-column label="操作">
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
          </div>
          <el-form-item
            label="培训课程投票项"
            label-width="auto"
            prop="optionA"
          >
            <el-button type="primary" @click="addCourse"
              >培训课程投票项</el-button
            >
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
    <course-dialog ref="courseDialogRef" @refresh="refresh"></course-dialog>
  </div>
</template>
<script>
import courseDialog from "./courseDialog.vue";
import tableMixins from "@/mixins/table";
import { createAPI } from "@/api/education/dailyTraining/trainingPlan/trainingDemandSurvey";
export default {
  mixins: [tableMixins],
  components: {
    courseDialog,
  },
  data() {
    return {
      title: "发起调查问卷",
      icon: "icon-xinzeng",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        courseNames: [],
        theme:"",
      },
      rules: {
        theme: [
          { required: true, message: "请输入培训主题", trigger: "blur" },
        ],
      },
    };
  },
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
      this.$refs.basicFormRef.resetFields();
      this.form.courseNames=[];
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.form.courseNames.length <= 0) {
            this.$message.warning("请至少添加一个选项");
            return;
          }
          let params = {
            ...this.form,
          };
          createAPI(params).then((res) => {
            this.$message.success("新增成功");
            this.close();
            this.$emit("refresh");
          });
        }
      });
    },
    //添加课程
    addCourse() {
      this.$refs.courseDialogRef.open();
    },
    //删除课程
    deleCourse(index) {
     this.form.courseNames.splice(index);
    },
    //课程添加成功
    refresh(name) {
      let obj = {
        courseName: name,
        number: this.form.courseNames.length,
        voteNum: 0,
      };
      this.form.courseNames.push(obj);
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px !important;
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
.courseWrap {
  padding-left: 110px;
  margin-bottom: 20px;
}
</style>
