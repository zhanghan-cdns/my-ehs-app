<template>
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
        <el-form-item label="设备位号/编码" prop="equipCode.facilitypurpose">
          <el-select
            ref="selectEquipCodeRef"
            clearable
            v-model="form.equipCode.facilitypurpose"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in equipCodeList"
              :key="item.id"
              :value="item.id + ',' + item.facilitypurpose"
              :label="item.facilitypurpose"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="指标编码" prop="indexCode">
          <el-input
            clearable
            v-model="form.indexCode"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="指标名称" prop="indexName">
          <el-input
            clearable
            v-model="form.indexName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="指标类型" prop="indexType">
          <el-select
            clearable
            v-model="form.indexType"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in dictConfig.entHazardMonitoringIndextype"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="计量单位" prop="unit">
          <el-input
            clearable
            v-model="form.unit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="阈值上限" prop="threUpVal">
          <el-input
            clearable
            v-model="form.threUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="阈值上上限" prop="threUpUpVal">
          <el-input
            clearable
            v-model="form.threUpUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="阈值下限" prop="threDownVal">
          <el-input
            clearable
            v-model="form.threDownVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="阈值下下限" prop="threDownDownVal">
          <el-input
            clearable
            v-model="form.threDownDownVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="量程上限" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="量程下限" prop="rangeDownVal">
          <el-input
            clearable
            v-model="form.rangeDownVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="是否报警">
          <el-radio-group v-model="form.isAlarm">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">报警</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item
          label="报警类型"
          prop="alarmType"
          v-if="form.isAlarm === 1"
        >
          <el-select
            clearable
            v-model="form.alarmType"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in dictConfig.entHazardMonitoringAlarmtype"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="DCS点位号" prop="tagNo">
          <el-input
            clearable
            v-model="form.tagNo"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="描述" prop="describe">
          <el-input
            type="textarea"
            :rows="3"
            clearable
            v-model="form.describe"
            :style="`width:${width2}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            clearable
            v-model="form.remark"
            :style="`width:${width2}`"
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
  },
  data() {
    return {
      width: "260px",
      width2: "94%",
      size: "small",
      equipCodeList: [],
      form: {
        equipCode: {
          id: "",
          facilitypurpose: "",
        },
        isAlarm: 0,
      },
      row: {},
    };
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
