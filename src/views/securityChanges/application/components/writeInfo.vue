<template>
  <div id="change-write-info">
    <div class="extra-form-title" style="padding-top: 0px">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">变更申请</span>
    </div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="变更项目名称" prop="changeProject">
            <el-input
              placeholder="请输入变更项目名称"
              clearable
              v-model="form.changeProject"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="变更编号" prop="changeProjectNo">
            <el-input
              placeholder="请输入变更编号"
              clearable
              v-model="form.changeProjectNo"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="申请部门" prop="requestDepartment">
            <el-input
              placeholder="请输入申请部门"
              clearable
              v-model="form.requestDepartment"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="申请人" prop="requestPerson">
            <el-input
              placeholder="请输入申请人"
              clearable
              v-model="form.requestPerson"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="申请日期" prop="requestDate">
            <el-date-picker
              v-model="form.requestDate"
              type="date"
              placeholder="请选择申请日期"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="计划完成时间" prop="completeDate">
            <el-date-picker
              v-model="form.completeDate"
              type="date"
              placeholder="请选择计划完成时间"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="变更类别" prop="changeType">
            <el-select
              placeholder="请选择变更类别"
              clearable
              v-model="form.changeType"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.dlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="变更级别" prop="changeLevel">
            <el-radio-group v-model="form.changeLevel">
              <el-radio :label="0">一般变更</el-radio>
              <el-radio :label="1">重要变更</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="变更原因和目的" prop="changeReason">
            <el-input
              placeholder="请输入变更原因和目的"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeReason"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="变更内容" prop="changeContectDescribe">
            <el-input
              placeholder="请输入变更内容"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeContectDescribe"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="变更存在的风险" prop="changeRisk">
            <el-input
              placeholder="请输入变更存在的风险"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeRisk"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="变更后可能存在的风险" prop="afterChangeRisk">
            <el-input
              placeholder="请输入变更后可能存在的风险"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.afterChangeRisk"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="风险控制措施" prop="riskSnalysisControlStep">
            <el-input
              placeholder="请输入风险控制措施"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.riskSnalysisControlStep"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="变更可能造成的其他变化" prop="changeExtra">
            <el-input
              placeholder="请输入变更可能造成的其他变化"
              type="textarea"
              :rows="4"
              clearable
              v-model="form.changeExtra"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="附件资料" prop="file">
            <basic-upload
              key="file"
              :model="true"
              @onSuccess="(fileList) => onSuccess(fileList, 'file')"
              @onRemove="(fileList) => onRemove(fileList, 'file')"
              :photos="form.file"
            ></basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="车间负责人" prop="workLeader">
            <el-input
              placeholder="请选择车间负责人"
              clearable
              v-model="form.workLeader"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectworkLeader">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="EHS负责人" prop="ehsLeader">
            <el-input
              placeholder="请选择EHS负责人"
              clearable
              v-model="form.ehsLeader"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectEhsLeader">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="企业负责人" prop="entLeader">
            <el-input
              placeholder="请选择企业负责人"
              clearable
              v-model="form.entLeader"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectEntLeader">选择</button-select>
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
        changeProject: "",
        changeProjectNo: "",
        requestDepartment: "",
        requestPerson: "",
        requestDate: "",
        completeDate: "",
        changeType: "",
        changeLevel: 0,
        changeReason: "",
        changeContectDescribe: "",
        changeRisk: "",
        afterChangeRisk: "",
        riskSnalysisControlStep: "",
        changeExtra: "",
        file: [],
        workLeader: "",
        ehsLeader: "",
        selectEntLeader: "",
      },
      rules: {
        changeProject: [{ required: true, trigger: "blur" }],
        requestDepartment: [{ required: true, trigger: "blur" }],
        requestPerson: [{ required: true, trigger: "blur" }],
        requestDate: [{ required: true, trigger: "change" }],
        completeDate: [{ required: true, trigger: "change" }],
        changeType: [{ required: true, trigger: "change" }],
        changeLevel: [{ required: true, trigger: "change" }],
      },
      width: "100%",
      width2: "74%",
    };
  },

  methods: {},
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
</style>