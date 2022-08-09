<template>
  <!-- 监测表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="monitorForm"
    :rules="monitorFormRules"
    ref="monitorFormRef"
  >
    <el-row>
      <el-col span="24">
        <el-form-item label="装置设施名称" prop="facilityName">
          <el-input
            placeholder="装置设施名称"
            clearable
            v-model="monitorForm.facilityName"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="监测人" prop="monitorer">
          <el-input
            placeholder="监测人"
            clearable
            v-model="monitorForm.monitorer"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="监测日期" prop="monitorDate">
          <el-date-picker
            v-model="monitorForm.monitorDate"
            type="date"
            placeholder="请选择监测日期"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="本单位监测人" prop="isUintmonitorer">
          <el-radio-group v-model="monitorForm.isUintmonitorer">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12" v-if="monitorForm.isUintmonitorer === 0">
        <el-form-item label="外部单位名称" prop="externalUnitName">
          <el-input
            placeholder="外部单位名称"
            clearable
            v-model="monitorForm.externalUnitName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="监测内容" prop="monitorContent">
          <el-input
            placeholder="监测内容"
            clearable
            v-model="monitorForm.monitorContent"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="监测结果" prop="monitorContent">
          <el-input
            placeholder="监测结果"
            clearable
            v-model="monitorForm.monitorContent"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="监测状态" prop="monitorContent">
          <el-input
            placeholder="监测状态"
            clearable
            v-model="monitorForm.monitorContent"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="检测报告">
          <basic-upload
            key="file"
            :model="true"
            @onSuccess="(fileList) => onSuccess(fileList, 'file')"
            @onRemove="(fileList) => onRemove(fileList, 'file')"
            :photos="monitorForm.monitorReport"
          ></basic-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="monitorForm.remark"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      width: "260px",
      size: "small",
      monitorForm: {
        isUintmonitorer: 1,
      },
      monitorFormRules: [],
    };
  },

  methods: {
    // 上传附件成功
    onSuccess(fileList, params) {
      this.monitorForm[params] = fileList;
    },
    // 上传附件失败
    onRemove(fileList, params) {
      this.monitorForm[params] = fileList;
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
