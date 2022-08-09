<template>
  <!-- 巡检查表单 -->
  <div id="inspection">
    <div class="add-btn-box">
      <el-button class="add-btn" type="primary" @click="addProject" size="small"
        >设置巡检标准</el-button
      >
    </div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="inspectionForm"
      :rules="inspectionFormRules"
      ref="inspectionFormRef"
    >
      <div
        v-for="(every, index) in inspectionForm.createList"
        :key="index"
        class="form-content"
      >
        <el-row>
          <el-col span="24">
            <el-form-item
              label="巡检项目名称"
              :prop="'createList.' + index + '.inspectProjectName'"
              :rules="projectNameRules"
            >
              <el-input
                placeholder="巡检项目名称"
                clearable
                v-model="every.inspectProjectName"
                type="textarea"
                :rows="1"
                style="width: 100%"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="检查标准"
              :prop="'createList.' + index + '.inspectStandard'"
              :rules="inspectStandardRules"
            >
              <el-input
                placeholder="检查标准"
                clearable
                v-model="every.inspectStandard"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="单位"
              :prop="'createList.' + index + '.company'"
              :rules="companyRules"
            >
              <el-input
                placeholder="单位"
                clearable
                v-model="every.company"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="标准值下限"
              :prop="'createList.' + index + '.standardLower'"
              :rules="standardLowerRules"
            >
              <el-input
                placeholder="标准值下限"
                clearable
                v-model="every.standardLower"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="标准值上限"
              :prop="'createList.' + index + '.standardUpper'"
              :rules="standardUpperRules"
            >
              <el-input
                placeholder="标准值上限"
                clearable
                v-model="every.standardUpper"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="巡检方法"
              :prop="'createList.' + index + '.inspectMethod'"
            >
              <el-select
                placeholder="巡检方法"
                clearable
                v-model="every.inspectMethod"
                :style="`width:${width}`"
                :size="size"
              >
                <el-option
                  v-for="item in inspectMethodList"
                  :key="item.id"
                  :value="item.dictValue"
                  :label="item.dictValueName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="巡检频次"
              :prop="'createList.' + index + '.inspectFrequency'"
              :rules="inspectFrequencyRules"
            >
              <el-input
                placeholder="巡检频次"
                clearable
                v-model="every.inspectFrequency"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="warning" @click="removeProject(index)" size="mini"
          >删除巡检项目</el-button
        >
      </div>
    </el-form>
  </div>
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
      inspectMethodList: [],
      inspectionForm: {
        createList: [
          {
            inspectProjectName: "",
            inspectStandard: "",
            company: "",
            standardLower: "",
            standardUpper: "",
            inspectMethod: "",
            inspectFrequency: "",
          },
        ],
      },
      projectNameRules: [
        { required: true, trigger: "blur", message: "请输入巡检名称" },
      ],
      inspectStandardRules: [
        { required: true, trigger: "blur", message: "请输入检查标准" },
      ],
      companyRules: [
        { required: true, trigger: "blur", message: "请输入单位名称" },
      ],
      standardLowerRules: [
        { required: true, trigger: "blur", message: "请输入标准值下限" },
      ],
      standardUpperRules: [
        { required: true, trigger: "blur", message: "请输入标准值上限" },
      ],
      inspectFrequencyRules: [
        { required: true, trigger: "change", message: "请选择巡检频次" },
      ],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_STANDARD_METHOD", "inspectMethodList");
  },

  methods: {
    addProject() {
      let obj = {
        inspectProjectName: "",
        inspectStandard: "",
        company: "",
        standardLower: "",
        standardUpper: "",
        inspectMethod: "",
        inspectFrequency: "",
      };
      this.inspectionForm.createList.push(obj);
    },
    removeProject(index) {
      this.inspectionForm.createList.splice(index, 1);
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

.add-btn-box {
  text-align: center;
  border-bottom: 1px dashed #8c8c8c;
  margin-bottom: 15px;
}

.add-btn {
  margin-bottom: 15px;
}

.form-content {
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px dashed #8c8c8c;
}
</style>
