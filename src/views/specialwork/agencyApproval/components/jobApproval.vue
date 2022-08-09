<template>
  <div class="job-approval-container">
    <div class="card-left">
      <div style="height: 450px">
        <el-steps
          :active="activeIndex"
          align-center
          direction="vertical"
          finish-status="success"
        >
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
    </div>
    <div class="card-right">
      <el-form
        label-width="220px"
        label-position="right"
        :model="form"
        :rules="rules"
        size="small"
        ref="formRef"
      >
        <el-row>
          <el-col span="24">
            <el-form-item label="是否通过" prop="pass">
              <el-radio-group v-model="form.pass">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="0">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="审批意见" prop="approvalComments">
              <el-input
                placeholder="请输入审批意见"
                type="textarea"
                :rows="6"
                clearable
                v-model="form.approvalComments"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="线上签字" prop="onlineSignature">
              <img
                v-if="form.onlineSignature && form.onlineSignature !== ''"
                :src="form.onlineSignature"
                style="width: 133px; height: 50px"
              />
              <button-select v-else @click="sign">签字</button-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-top: 50px">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      stepList: [
        {
          title: "作业单位负责人审批",
          description: "已通过",
        },
        {
          title: "车间（分厂）负责人",
          description: "审批中",
        },
        {
          title: "安全管理人员",
          description: "暂未审批",
        },
        {
          title: "班组长验票",
          description: "暂未审批",
        },
      ],
      form: {
        pass: 0,
        onlineSignature: "",
      },
    };
  },
  methods: {
    sign() {
      this.$refs.signDialogRef.open();
    },

    getSignImg(imgSrc) {
      this.form.onlineSignature = imgSrc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
.job-approval-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .card-left {
    width: 15%;
    height: 100%;
    margin-right: 10px;
  }
  .card-right {
    width: 85%;
    height: 100%;
  }
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