<template>
  <!-- 特种设备附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="specialForm"
    :rules="specialFormRules"
    ref="specialFormRef"
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="设备类型" prop="equipmentType">
          <el-select
            placeholder="设备类型"
            clearable
            v-model="specialForm.equipmentType"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in equipmentTypeList"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="出厂编号" prop="factoryNumber">
          <el-input
            placeholder="出厂编号"
            clearable
            v-model="specialForm.factoryNumber"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="注册代码" prop="registrationCode">
          <el-input
            placeholder="注册代码"
            clearable
            v-model="specialForm.registrationCode"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="specialForm.remark"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import dictMixin from "@/mixins/dict";

export default {
  mixins: [dictMixin],
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
      size: "small",
      specialForm: {
        equipmentType: "",
        factoryNumber: "",
        registrationCode: "",
        remark: "",
      },
      specialFormRules: {},
      equipmentTypeList: [],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_SPECIAL_TYPE", "equipmentTypeList");
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

.form-title {
  margin: 10px 0px;
  .form-title-icon {
    font-size: 26px;
    vertical-align: sub;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
