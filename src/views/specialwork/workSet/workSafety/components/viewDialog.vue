<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          disabled
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="工作步骤" prop="workSteps">
                <el-select
                  clearable
                  placeholder="请选择工作步骤"
                  v-model="form.workSteps"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.workSteps"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="作业类型" prop="jobType">
                <el-select
                  clearable
                  placeholder="请选择作业类型"
                  v-model="form.jobType"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.jobType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="危险因素" prop="riskFactors">
                <el-input
                  type="textarea"
                  placeholder="请输入危险因素"
                  :rows="4"
                  clearable
                  v-model="form.riskFactors"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="导致的后果" prop="consequences">
                <el-input
                  placeholder="请输入导致的后果"
                  type="textarea"
                  :rows="4"
                  clearable
                  v-model="form.consequences"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="控制措施" prop="controlMeasures">
                <el-input
                  placeholder="请输入控制措施"
                  type="textarea"
                  :rows="4"
                  clearable
                  v-model="form.controlMeasures"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="附件">
                <show-file :data="form.file"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import { monitoringIndicatorsViewAPI } from "@/api/hazard/monitoringIndicators/index";
import showFile from "@/components/show-file/index";

export default {
  name: "editDialog",
  components: {
    showFile,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "查看作业安全分析库",
      icon: "icon-chakan2",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      form: {
        workSteps: "",
        jobType: "",
        riskFactors: "",
        consequences: "",
        controlMeasures: "",
        file: [],
      },
      rules: {},
    };
  },

  created() {},

  computed: {},

  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      if (row) {
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
    },

    // 获取详情
    async getDetail(id) {
      try {
        const res = await monitoringIndicatorsViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
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
</style>
