<template>
  <div id="change-approval-info">
    <div class="approval-top-step">
      <el-steps :active="activeIndex" align-center finish-status="success">
        <el-step
          v-for="(item, index) in stepList"
          :key="index"
          :title="item.title"
        >
          <template slot="description" style="">{{
            item.description
          }}</template>
        </el-step>
      </el-steps>
    </div>
    <div class="extra-form-title" style="padding-top: 0px">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">变更审批</span>
    </div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="是否通过" prop="isPass">
            <el-radio-group v-model="form.isPass">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审批意见" prop="approvalOpinions">
            <el-input
              placeholder="请输入审批意见"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.approvalOpinions"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="bottom-button-group">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="warning" @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      form: {
        isPass: 1,
        approvalOpinions: "",
      },
      rules: {},
      width: "100%",
      activeIndex: 1,
      stepList: [
        {
          title: "车间负责人",
          description: "已通过",
        },
        {
          title: "EHS负责人",
          description: "审批中",
        },
        {
          title: "企业负责人",
          description: "暂未审批",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
.extra-form-title {
  padding: 34px 0px 10px 0px;
  margin-bottom: 17px;
  border-bottom: 1px solid #f0f0f0;
  .form-title-icon {
    color: #4a80fc;
    margin-right: 6px;
  }
  .form-title-name {
    font-weight: 500;
    font-size: 16px;
    color: #333333;
  }
}

.bottom-button-group {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-top: 1px solid #e2e2e2;
  margin-top: 40px;
}

.approval-top-step {
  width: 100%;
  padding: 30px 0px;
  height: 82px;
  margin-bottom: 50px;
  background: #f0f5ff;
  border-radius: 3px 3px 0px 0px;
}

/deep/ .el-step__line {
  height: 60%;
  background-color: #dcdcdc;
}

/deep/ .el-step.is-vertical .el-step__line {
  top: 30%;
}

/deep/ .el-step__head.is-success .el-step__line {
  background-color: #4a80fc;
}

// 当前步骤样式
/deep/ .el-step__head.is-process {
  color: #4575e2;
  border-color: #4575e2;
}

/deep/ .el-step__title.is-process {
  font-weight: 400;
  color: #4a80fc;
}

/deep/ .el-step__description.is-process {
  color: #faad14;
}
</style>