<template>
  <!-- 保养表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="maintainForm"
    :rules="maintainFormRules"
    ref="maintainFormRef"
  >
    <el-row>
      <el-col span="24">
        <el-form-item label="装置设施名称" prop="facilityName">
          <el-input
            placeholder="装置设施名称"
            clearable
            v-model="row.facilityName"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
            disabled
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="保养情况" prop="maintainSituation">
          <el-input
            placeholder="保养情况"
            clearable
            v-model="maintainForm.maintainSituation"
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
        <el-form-item label="保养负责人" prop="chargeManName">
          <el-select
            ref="personSelectRef"
            placeholder="保养负责人"
            clearable
            filterable
            v-model="maintainForm.chargeManName"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in personList"
              :key="item.entpersonid"
              :value="item.entpersonid + ',' + item.entpersonname"
              :label="item.entpersonname"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="保养日期" prop="maintainDate">
          <el-date-picker
            v-model="maintainForm.maintainDate"
            type="date"
            placeholder="请选择保养日期"
            :style="`width:${width}`"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="本单位保养人" prop="isUintMaintainer">
          <el-radio-group v-model="maintainForm.isUintMaintainer">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12" v-if="maintainForm.isUintMaintainer === 0">
        <el-form-item label="外部单位名称" prop="externalUnitName">
          <el-input
            placeholder="外部单位名称"
            clearable
            v-model="maintainForm.externalUnitName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="maintainForm.remark"
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
import { personListAPI } from "@/api/enterprise/safetyManagement/public/person";

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
      maintainForm: {
        maintainSituation: "",
        chargeManName: "",
        maintainDate: "",
        externalUnitName: "",
        remark: "",
        isUintMaintainer: 1,
      },
      maintainFormRules: {
        maintainSituation: [
          { required: true, message: "请输入保养情况", trigger: "blur" },
        ],
        chargeManName: [
          { required: true, message: "请输入保养负责人", trigger: "blur" },
        ],
        isUintMaintainer: [
          {
            required: true,
            message: "请选择是否为本单位保养人",
            trigger: "blur",
          },
        ],
        externalUnitName: [
          { required: true, message: "请输入外部单位名称", trigger: "blur" },
        ],
        maintainDate: [
          { required: true, message: "请选择保养日期", trigger: "change" },
        ],
      },
      personList: [],
    };
  },
  created() {
    this.getPersonList();
  },

  methods: {
    async getPersonList() {
      const res = await personListAPI();
      if (res.code !== 200) return this.$message.error("获取人员列表失败");
      this.personList = res.data;
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
