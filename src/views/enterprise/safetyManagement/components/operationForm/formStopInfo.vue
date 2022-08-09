<template>
  <!-- 停用表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="stopForm"
    :rules="stopFormRules"
    ref="stopFormRef"
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
        <el-form-item label="停用理由" prop="stopReason">
          <el-input
            placeholder="停用理由"
            clearable
            v-model="stopForm.stopReason"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="停用后措施" prop="afterStopMeasure">
          <el-input
            placeholder="停用后措施"
            clearable
            v-model="stopForm.afterStopMeasure"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="实际停用日期" prop="realStopDate">
          <el-date-picker
            v-model="stopForm.realStopDate"
            type="date"
            placeholder="请选择实际停用日期"
            :style="`width:${width}`"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="停用提交日期" prop="stopCreateDate">
          <el-date-picker
            v-model="stopForm.stopCreateDate"
            type="date"
            placeholder="请选择停用提交日期"
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
        <el-form-item label="停用提交人" prop="stopManName">
          <el-select
            ref="personSelectRef"
            placeholder="停用提交人"
            clearable
            filterable
            v-model="stopForm.stopManName"
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
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
            clearable
            v-model="stopForm.remark"
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
      stopForm: {
        stopReason: "",
        afterStopMeasure: "",
        stopManName: "",
        realStopDate: "",
        stopCreateDate: "",
        remark:"",
      },
      stopFormRules: {
        stopReason: [
          { required: true, message: "请输入停用理由", trigger: "blur" },
        ],
        afterStopMeasure: [
          { required: true, message: "请输入停用后措施", trigger: "blur" },
        ],
        stopManName: [
          { required: true, message: "请输入停用提交人", trigger: "blur" },
        ],
        realStopDate: [
          { required: true, message: "请选择实际停用日期", trigger: "change" },
        ],
        stopCreateDate: [
          { required: true, message: "请选择停用提交日期", trigger: "change" },
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
