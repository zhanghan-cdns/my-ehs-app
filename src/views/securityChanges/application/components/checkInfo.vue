<template>
  <div id="change-check-info">
    <div class="extra-form-title" style="padding-top: 0px">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">变更验收</span>
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
        <el-col :span="12" style="height: 78px">
          <el-form-item label="是否通过" prop="isPass">
            <el-radio-group v-model="form.isPass">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="height: 78px">
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
      <el-row>
        <el-col span="12">
          <el-form-item label="变更措施是否落实" prop="isImplement">
            <el-radio-group v-model="form.isImplement">
              <el-radio :label="1">已落实</el-radio>
              <el-radio :label="0">未落实</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="变更措施落实负责人" prop="changeMeasureLeader">
            <el-input
              placeholder="请选择变更措施落实负责人"
              clearable
              v-model="form.changeMeasureLeader"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectChangeMeasureLeader"
              >选择</button-select
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="验收意见或建议" prop="changeAcceptIdea">
            <el-input
              placeholder="请输入验收意见或建议"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeAcceptIdea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="验收结论" prop="checkConclusion">
            <el-input
              placeholder="请输入验收结论"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.checkConclusion"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="主管部门意见" prop="comDepartmentIdea">
            <el-input
              placeholder="请输入主管部门意见"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.comDepartmentIdea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item
            label="变更结果需要沟通部门"
            prop="changeResultReturnDepartment"
          >
            <el-input
              placeholder="请输入变更结果需要沟通部门"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeResultReturnDepartment"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="沟通部门意见" prop="returnDepartmentIdea">
            <el-input
              placeholder="请输入沟通部门意见"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.returnDepartmentIdea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="部门领导意见" prop="departmentLeadIdea">
            <el-input
              placeholder="请输入部门领导意见"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.departmentLeadIdea"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="公司领导意见" prop="companyDepartmentIdea">
            <el-input
              placeholder="请输入公司领导意见"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.companyDepartmentIdea"
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
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  components: {},

  data() {
    return {
      form: {
        isPass: 1,
        onlineSignature: "",
        isImplement: 1,
        changeMeasureLeader: "",
        changeAcceptIdea: "",
        checkConclusion: "",
        comDepartmentIdea: "",
        changeResultReturnDepartment: "",
        returnDepartmentIdea: "",
        departmentLeadIdea: "",
        companyDepartmentIdea: "",
      },
      rules: {},
      width: "100%",
      width2: "74%",
    };
  },

  methods: {
    // 签名
    sign() {
      this.$refs.signDialogRef.open();
    },

    // 获取签名图片
    getSignImg(imgSrc) {
      this.$set(this.form, "onlineSignature", imgSrc);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
/deep/ .button-select {
  margin-left: 10px;
}

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
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-top: 1px solid #e2e2e2;
  margin-top: 40px;
}

/deep/ .vxe-modal--content {
  background-color: #fff !important;
}
</style>