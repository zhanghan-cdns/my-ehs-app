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
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="auto"
          :rules="rules"
        >
          <el-form-item label="课程名称" label-width="auto" prop="surveyTopics">
            <el-input
              v-model="form.courseName"
              placeholder="请输入课程名称"
              style="width: 400px"
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
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {createAPI} from "@/api/education/dailyTraining/trainingPlan/trainingDemandSurvey"
export default {
  mixins: [tableMixins],
  data() {
    return {
      title: "添加课程",
      icon: "icon-xinzeng",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
      
      },
      rules: {
        courseName:[
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    // 打开
    open(type, row) {
      this.openFlag = true;
    },
    // 关闭
    close() {
       this.openFlag = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          this.refresh(this.form.courseName)
        }
      });
    },
    refresh(data){
       this.$parent.refresh(data);
       this.openFlag = false;
       this.form={};
    }
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
