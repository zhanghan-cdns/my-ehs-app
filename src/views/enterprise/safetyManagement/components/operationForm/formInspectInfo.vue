<template>
  <!-- 检查表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="inspectForm"
    :rules="inspectFormRules"
    ref="inspectFormRef"
  >
    <el-row>
      <el-col span="12">
        <el-form-item label="装置设施名称" prop="facilityName">
          <el-input
            placeholder="装置设施名称"
            clearable
            v-model="row.facilityName"
            :style="`width:${width}`"
            :size="size"
            disabled
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="检查内容" prop="checkContent">
          <el-input
            placeholder="检查内容"
            clearable
            v-model="inspectForm.checkContent"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="负责部门" prop="chargeDepartment">
          <el-select
            placeholder="负责部门"
            clearable
            v-model="inspectForm.chargeDepartment"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in dictConfig.entAccidentType"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="检查指标" prop="checkQuota">
          <el-input
            placeholder="检查指标"
            clearable
            v-model="inspectForm.checkQuota"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="预警值" prop="earlyWarningValue">
          <el-input
            placeholder="预警值"
            clearable
            v-model="inspectForm.earlyWarningValue"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="联锁值" prop="interlockValue">
          <el-input
            placeholder="联锁值"
            clearable
            v-model="inspectForm.interlockValue"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="检查人" prop="checkManName">
          <el-select
            ref="personSelectRef"
            placeholder="检查人"
            clearable
            filterable
            v-model="inspectForm.checkManName"
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
        <el-form-item label="检查日期" prop="checkDate">
          <el-date-picker
            v-model="inspectForm.checkDate"
            type="date"
            placeholder="请选择检查日期"
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
        <el-form-item label="检查人部门" prop="checkManDept">
          <el-select
            placeholder="检查人部门"
            clearable
            v-model="inspectForm.checkManDept"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in dictConfig.entAccidentType"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="检查结果" prop="checkResult">
          <el-input
            placeholder="检查结果"
            clearable
            v-model="inspectForm.checkResult"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="检查状态" prop="checkStatus">
          <el-select
            placeholder="检查状态"
            clearable
            v-model="inspectForm.checkStatus"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in checkStatusList"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="inspectForm.remark"
            :style="`width:${width}`"
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
      personList: [],
      inspectForm: {
        checkContent: "",
        chargeDepartment: "测试部门",
        checkQuota: "",
        earlyWarningValue: "",
        interlockValue: "",
        checkManName: "",
        checkDate: "",
        checkManDept: "测试检查人部门",
        checkResult: "",
        checkStatus: "",
        remark: "",
      },
      checkStatusList: [
        {
          id: 1,
          dictValue: 1,
          dictValueName: "正常",
        },
        {
          id: 2,
          dictValue: 2,
          dictValueName: "异常",
        },
      ],
      inspectFormRules: {
        checkContent: [
          { required: true, trigger: "blur", message: "请输入检查内容" },
        ],
        chargeDepartment: [
          { required: true, trigger: "change", message: "请选择负责部门" },
        ],
        checkQuota: [
          { required: true, trigger: "blur", message: "请输入检查指示" },
        ],
        earlyWarningValue: [
          { required: true, trigger: "blur", message: "请输入预警值" },
        ],
        interlockValue: [
          { required: true, trigger: "blur", message: "请输入联锁值" },
        ],
        checkManName: [
          { required: true, trigger: "blur", message: "请输入检查人" },
        ],
        checkDate: [
          { required: true, trigger: "change", message: "请选择检查日期" },
        ],
        checkManDept: [
          { required: true, trigger: "change", message: "请选择检查人部门" },
        ],
        checkResult: [
          { required: true, trigger: "blur", message: "请输入检查结果" },
        ],
        checkStatus: [
          { required: true, trigger: "change", message: "请输入检查状态" },
        ],
      },
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
