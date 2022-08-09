<template>
  <!-- 恢复表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="recoveryForm"
    :rules="recoveryFormRules"
    ref="recoveryFormRef"
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
        <el-form-item label="恢复理由" prop="recoveryReason">
          <el-input
            placeholder="恢复理由"
            clearable
            v-model="recoveryForm.recoveryReason"
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
        <el-form-item label="恢复填报日期" prop="recoveryCreateDate">
          <el-date-picker
            v-model="recoveryForm.recoveryCreateDate"
            type="date"
            placeholder="请选择恢复填报日期"
            style="width: 98.5%"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="实际恢复日期" prop="realRecoveryDate">
          <el-date-picker
            v-model="recoveryForm.realRecoveryDate"
            type="date"
            placeholder="请选择实际恢复日期"
            style="width: 98.5%"
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
            v-model="recoveryForm.remark"
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
      recoveryForm: {
        recoveryReason: "",
        recoveryCreateDate: "",
        realRecoveryDate: "",
        remark: "",
      },
      recoveryFormRules: {
        recoveryReason: [
          { required: true, message: "请输入恢复理由", trigger: "blur" },
        ],
        recoveryCreateDate: [
          { required: true, message: "请选择恢复填报日期", trigger: "change" },
        ],
        realRecoveryDate: [
          { required: true, message: "请选择实际恢复日期", trigger: "change" },
        ],
      },
    };
  },

  methods: {},
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
