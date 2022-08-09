<template>
  <div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="作业证编号" prop="workCertName">
            <el-input
              placeholder="请输入作业证编号"
              clearable
              v-model="form.workCertName"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="JSA编号" prop="jsaNo">
            <el-input
              placeholder="请选择JSA编号"
              clearable
              v-model="form.jsaNo"
              :style="`width:${width2}`"
            ></el-input>
            <button-select @click="selectJSA">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="绑定区域" prop="bindingArea">
            <el-select
              placeholder="请选择绑定区域"
              clearable
              v-model="form.bindingArea"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.dlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="是否涉及罐区作业" prop="isInvolved">
            <el-radio-group v-model="form.isInvolved">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="申请单位" prop="applicationUnit">
            <el-select
              placeholder="请选择申请单位"
              clearable
              v-model="form.applicationUnit"
              :style="`width:${width}`"
            >
              <el-option
                v-for="item in dictConfig.applicationUnit"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="申请人" prop="applicant">
            <el-input
              placeholder="请选择申请人"
              clearable
              v-model="form.applicant"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectApplicant">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="作业类别" prop="workCertType">
            <el-radio-group v-model="form.workCertType">
              <el-radio :label="0">抽盲板</el-radio>
              <el-radio :label="1">堵盲板</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="设备管道名称" prop="equipmentPipingName">
            <el-input
              placeholder="请输入设备管道名称"
              clearable
              v-model="form.equipmentPipingName"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="介质" prop="jobContent">
            <el-input
              placeholder="请输入介质"
              clearable
              v-model="form.jobContent"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="温度" prop="temperature">
            <el-input
              placeholder="请输入温度"
              clearable
              v-model="form.temperature"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="压力" prop="operateLocation">
            <el-input
              placeholder="请输入压力"
              clearable
              v-model="form.operateLocation"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="盲板材质" prop="blindPlateMaterial">
            <el-input
              placeholder="请输入盲板材质"
              clearable
              v-model="form.blindPlateMaterial"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="盲板规格" prop="blindPlateSpecification">
            <el-input
              placeholder="请输入盲板规格"
              clearable
              v-model="form.blindPlateSpecification"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="盲板编号" prop="blindPlateNumber">
            <el-input
              placeholder="请输入盲板编号"
              clearable
              v-model="form.blindPlateNumber"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="计划实施时间" prop="fromTime">
            <el-date-picker
              v-model="form.fromTime"
              type="datetime"
              placeholder="请选择计划实施时间"
              value-format="yyyy-MM-dd HH:mm:00"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作业地点" prop="operateLocation">
            <el-input
              placeholder="请输入作业地点"
              clearable
              v-model="form.operateLocation"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="作业单位类别" prop="operateUnitCategory">
            <el-radio-group v-model="form.operateUnitCategory">
              <el-radio :label="0">本厂</el-radio>
              <el-radio :label="1">外来方</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作业单位名称" prop="operationUnitName">
            <el-select
              placeholder="请选择作业单位名称"
              clearable
              v-model="form.operationUnitName"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in dictConfig.operationUnitName"
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
          <el-form-item label="作业单位负责人" prop="chargeHotWork">
            <el-input
              placeholder="请选择作业单位负责人"
              clearable
              v-model="form.chargeHotWork"
              :style="`width:${width2}`"
            ></el-input>
            <button-select @click="selectChargeHotWork">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作业人员" prop="operators">
            <el-input
              placeholder="请选择作业人员"
              clearable
              v-model="form.operators"
              :style="`width:${width2}`"
            ></el-input>
            <button-select @click="selectOperators">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col span="12">
          <el-form-item label="盲板位置图" prop="blindPositionDiagram">
            <basic-upload
              key="picture"
              @onSuccess="
                (fileList) => onSuccess(fileList, 'blindPositionDiagram')
              "
              @onRemove="
                (fileList) => onRemove(fileList, 'blindPositionDiagram')
              "
              :photos="form.blindPositionDiagram"
            ></basic-upload>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="盲板位置图编号"
            prop="blindPositionDiagramNumber"
          >
            <el-input
              placeholder="请输入盲板位置图编号"
              clearable
              v-model="form.blindPositionDiagramNumber"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item
            label="生产单位作业指挥"
            prop="productionUnitOperationCommand"
          >
            <el-input
              placeholder="请输入生产单位作业指挥"
              clearable
              v-model="form.productionUnitOperationCommand"
              :style="`width:${width3}`"
            ></el-input>
            <button-select @click="selectApplicant">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  components: {},

  data() {
    return {
      form: {
        workCertName: "",
        jsaNo: "",
        bindingArea: "",
        isInvolved: "",
        applicationUnit: "",
        applicant: "",
        workCertType: 0,
        equipmentPipingName: "",
        jobContent: "",
        temperature: "",
        operateLocation: "",
        blindPlateMaterial: "",
        blindPlateSpecification: "",
        blindPlateNumber: "",
        fromTime: "",
        operateLocation: "",
        operateUnitCategory: 0,
        operationUnitName: "",
        chargeHotWork: "",
        operators: "",
        blindPositionDiagram: [],
        blindPositionDiagramNumber: "",
        productionUnitOperationCommand: "",
      },
      rules: {
        workCertName: [{ required: true, trigger: "blur" }],
        isInvolved: [{ required: true, trigger: "change" }],
        workCertType: [{ required: true, trigger: "change" }],
        fromTime: [{ required: true, trigger: "change" }],
      },
      width: "100%",
      width2: "76%",
      width3: "91%",
    };
  },

  methods: {
    selectJSA() {},

    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";

/deep/ .button-select {
  margin-left: 10px;
}
</style>