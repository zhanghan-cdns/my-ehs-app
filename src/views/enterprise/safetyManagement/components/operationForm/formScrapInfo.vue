<template>
  <!-- 报废表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="scrapForm"
    :rules="scrapFormRules"
    ref="scrapFormRef"
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
        <el-form-item label="报废理由" prop="scrapReason">
          <el-input
            placeholder="报废理由"
            clearable
            v-model="scrapForm.scrapReason"
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
        <el-form-item label="报废填报日期" prop="scrapCreateDate">
          <el-date-picker
            v-model="scrapForm.scrapCreateDate"
            type="date"
            placeholder="请选择报废填报日期"
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
        <el-form-item label="实际报废日期" prop="realScrapDate">
          <el-date-picker
            v-model="scrapForm.realScrapDate"
            type="date"
            placeholder="请选择实际报废日期"
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
            v-model="scrapForm.remark"
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
      scrapForm: {
        scrapReason: "",
        scrapCreateDate: "",
        realScrapDate: "",
        remark: "",
      },
      scrapFormRules: {
        scrapReason: [
          { required: true, message: "请输入报废理由", trigger: "blur" },
        ],
        scrapCreateDate: [
          { required: true, message: "请选择报废填报日期", trigger: "change" },
        ],
        realScrapDate: [
          { required: true, message: "请选择实际报废日期", trigger: "change" },
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
