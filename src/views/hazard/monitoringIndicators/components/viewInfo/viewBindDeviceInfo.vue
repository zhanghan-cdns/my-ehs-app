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
            @change="handleEquipCodeSelect"
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
        <el-form-item label="设备名称" prop="indexCode">
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
        <el-form-item label="生产装置名称" prop="indexName">
          <el-input
            clearable
            v-model="form.indexName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设备类型" prop="indexType">
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
        <el-form-item label="重大危险源名称" prop="unit">
          <el-input
            clearable
            v-model="form.unit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设备描述" prop="unit">
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
        <el-form-item label="设备介质" prop="threUpVal">
          <el-input
            clearable
            v-model="form.threUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="所属部门" prop="threUpUpVal">
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
        <el-form-item label="设备运行状态" prop="threDownVal">
          <el-input
            clearable
            v-model="form.threDownVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="安装位置" prop="threDownDownVal">
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
        <el-form-item label="设备启用时间" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设备启用说明" prop="rangeDownVal">
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
        <el-form-item label="设备停止时间" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设备停止说明" prop="rangeDownVal">
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
        <el-form-item label="设备建设时间" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设备停用人" prop="rangeDownVal">
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
        <el-form-item label="设备所属网关" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="化学品CAS号" prop="rangeDownVal">
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
        <el-form-item label="经度" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="纬度" prop="rangeDownVal">
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
      <el-col span="24">
        <el-form-item label="区域名称" prop="describe">
          <el-input
            clearable
            v-model="form.describe"
            :style="`width:${width2}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="绑定区域" prop="rangeUpVal">
          <el-input
            clearable
            v-model="form.rangeUpVal"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="绑定DCS" prop="rangeDownVal">
          <el-input
            clearable
            v-model="form.rangeDownVal"
            :style="`width:${width}`"
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
      },
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
