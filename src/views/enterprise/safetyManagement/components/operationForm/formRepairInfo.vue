<template>
  <!-- 维修表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="repairForm"
    :rules="repairFormRules"
    ref="repairFormRef"
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
      <el-col span="12">
        <el-form-item label="设施异常项" prop="facilityException">
          <el-input
            placeholder="设施异常项"
            clearable
            v-model="repairForm.facilityException"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="维修情况" prop="repairSituation">
          <el-input
            placeholder="维修情况"
            clearable
            v-model="repairForm.repairSituation"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="维修负责人" prop="chargeManName">
          <el-select
            ref="personSelectRef"
            placeholder="维修负责人"
            clearable
            filterable
            v-model="repairForm.chargeManName"
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
        <el-form-item label="维修状态" prop="repairStatus">
          <el-input
            placeholder="维修状态"
            clearable
            v-model="repairForm.repairStatus"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="本单位维修人" prop="isUintRepairer">
          <el-radio-group v-model="repairForm.isUintRepairer">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12" v-if="repairForm.isUintRepairer === 0">
        <el-form-item label="外部单位名称" prop="externalUnitName">
          <el-input
            placeholder="外部单位名称"
            clearable
            v-model="repairForm.externalUnitName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="12">
        <el-form-item label="维修开始日期" prop="repairStartDate">
          <el-date-picker
            v-model="repairForm.repairStartDate"
            type="date"
            placeholder="请选择维修开始日期"
            :style="`width:${width}`"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="维修结束日期" prop="repairEndDate">
          <el-date-picker
            v-model="repairForm.repairEndDate"
            type="date"
            placeholder="请选择维修结束日期"
            :style="`width:${width}`"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="repairForm.remark"
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
      repairForm: {
        facilityException: "",
        repairSituation: "",
        chargeManName: "",
        repairStatus: "",
        isUintRepairer: 1,
        externalUnitName: "",
        repairStartDate: "",
        repairEndDate: "",
        remark: "",
      },
      repairFormRules: {
        facilityException: [
          { required: true, message: "请输入设施异常项", trigger: "blur" },
        ],
        repairSituation: [
          { required: true, message: "请输入维修情况", trigger: "blur" },
        ],
        repairStatus: [
          { required: true, message: "请选择维修状态", trigger: "blur" },
        ],
        chargeManName: [
          { required: true, message: "请输入维修负责人", trigger: "blur" },
        ],
        isUintRepairer: [
          {
            required: true,
            message: "请选择是否为本单位维修人",
            trigger: "blur",
          },
        ],
        externalUnitName: [
          { required: true, message: "请输入外部单位名称", trigger: "blur" },
        ],
        repairStartDate: [
          { required: true, message: "请选择开始维修日期", trigger: "change" },
        ],
        repairEndDate: [
          { required: true, message: "请输入维修结束日期", trigger: "change" },
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
