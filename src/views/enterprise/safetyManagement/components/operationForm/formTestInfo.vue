<template>
  <!-- 检测表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="testForm"
    :rules="testFormRules"
    ref="testFormRef"
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
        <el-form-item label="检测人" prop="testManName">
          <el-select
            ref="personSelectRef"
            placeholder="检测人"
            clearable
            filterable
            v-model="testForm.testManName"
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
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="检测日期" prop="testDate">
          <el-date-picker
            v-model="testForm.testDate"
            type="date"
            placeholder="请选择检测日期"
            :style="`width:${width}`"
            value-format="yyyy-MM-dd"
            :size="size"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="检测状态" prop="testStatus">
          <el-select
            placeholder="检测状态"
            clearable
            v-model="testForm.testStatus"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in testStatusList"
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
        <el-form-item label="本单位检测人" prop="isUintTester">
          <el-radio-group v-model="testForm.isUintTester">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12" v-if="testForm.isUintTester === 0">
        <el-form-item label="外部单位名称" prop="externalUnitName">
          <el-input
            placeholder="外部单位名称"
            clearable
            v-model="testForm.externalUnitName"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="检测内容" prop="testContent">
          <el-input
            placeholder="检测内容"
            clearable
            v-model="testForm.testContent"
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
        <el-form-item label="检测结果" prop="testResult">
          <el-input
            placeholder="检测结果"
            clearable
            v-model="testForm.testResult"
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
            v-model="testForm.remark"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="检测报告" prop="testReport">
          <basic-upload
            key="file"
            :model="true"
            @onSuccess="(fileList) => onSuccess(fileList, 'testReport')"
            @onRemove="(fileList) => onRemove(fileList, 'testReport')"
            :photos="testForm.testReport"
          ></basic-upload>
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
      testForm: {
        testManName: "",
        testDate: "",
        testReport: [],
        isUintTester: 1,
        externalUnitName: "",
        testContent: "",
        testResult: "",
        testStatus: "",
        remark: "",
      },
      testFormRules: {
        testManName: [
          { required: true, message: "请输入检测人姓名", trigger: "blur" },
        ],
        testDate: [
          { required: true, message: "请选择检测日期", trigger: "change" },
        ],
        isUintTester: [
          {
            required: true,
            message: "请选择是否为本单位检测人",
            trigger: "blur",
          },
        ],
        externalUnitName: [
          { required: true, message: "请输入外部单位名称", trigger: "blur" },
        ],
        testContent: [
          { required: true, message: "请输入检测内容", trigger: "blur" },
        ],
        testResult: [
          { required: true, message: "请输入检测结果", trigger: "blur" },
        ],
        testStatus: [
          { required: true, message: "请选择检测状态", trigger: "change" },
        ],
      },
      testStatusList: [
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
      personList: [],
    };
  },

  created() {
    this.getPersonList();
  },

  methods: {
    // 上传附件成功
    onSuccess(fileList, params) {
      this.testForm[params] = fileList;
    },
    // 上传附件失败
    onRemove(fileList, params) {
      this.testForm[params] = fileList;
    },

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
