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
          <el-form-item label="计划性" prop="isPalnned">
            <el-radio-group v-model="form.isPalnned">
              <el-radio :label="0">计划性</el-radio>
              <el-radio :label="1">非计划性</el-radio>
            </el-radio-group>
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
          <el-form-item label="电源接入点" prop="operateLocation">
            <el-input
              placeholder="请输入电源接入点"
              clearable
              v-model="form.status"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="使用电压" prop="appendix">
            <el-input
              placeholder="请输入使用电压"
              clearable
              v-model="form.appendix"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item
            :label="'作业范围、内容、方式\n（包括深度面积）'"
            prop="jobContent"
          >
            <el-input
              type="textarea"
              :rows="6"
              clearable
              v-model="form.jobContent"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="作业简图" prop="assignmentSketch">
            <basic-upload
              key="file"
              :model="true"
              @onSuccess="(fileList) => onSuccess(fileList, 'assignmentSketch')"
              @onRemove="(fileList) => onRemove(fileList, 'assignmentSketch')"
              :photos="form.assignmentSketch"
            ></basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="作业内容" prop="workUnit">
            <el-input
              type="textarea"
              :rows="6"
              clearable
              v-model="form.workUnit"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="计划实施时间" prop="fromTime">
            <el-date-picker
              v-model="form.fromTime"
              type="date"
              placeholder="请选择计划实施时间"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="计划结束时间" prop="endTime">
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="请选择计划结束时间"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="作业单位类别" prop="OperateUnitCategory">
            <el-radio-group v-model="form.OperateUnitCategory">
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
          <el-form-item label="作业单位负责人" prop="brokenRoadReason">
            <el-input
              placeholder="请选择作业单位负责人"
              clearable
              v-model="form.brokenRoadReason"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
            <button-select @click="selectChargeHotWork">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作业人员" prop="guardian">
            <el-input
              placeholder="请选择作业人员"
              clearable
              v-model="form.guardian"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="extra-item">
        <div class="extra-button" @click="addWorkPermitInfo">
          <i
            class="iconfont icon-icon--tianjia"
            style="font-size: 14px; margin-right: 10px; color: #409eff"
          ></i>
          <span>添加作业证信息</span>
        </div>
      </div>
    </el-form>
    <add-operators-dialog ref="addOperatorsDialogRef"></add-operators-dialog>
  </div>
</template>
<script>
import addOperatorsDialog from "./addOperatorsDialog.vue";
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  components: {
    addOperatorsDialog,
  },

  data() {
    return {
      form: {
        isInvolved: 0,
        isPalnned: 0,
        isFireMonitor: 0,
        OperateUnitCategory: 0,
        fireType: [],
      },
      rules: {
        workCertName: [{ required: true, trigger: "blur" }],
        isInvolved: [{ required: true, trigger: "change" }],
        workCertType: [{ required: true, trigger: "change" }],
        fromTime: [{ required: true, trigger: "change" }],
        endTime: [{ required: true, trigger: "change" }],
      },
      width: "100%",
      width2: "76%",
      fireTypeList: [
        {
          id: "1",
          dictValue: "1",
          dictValueName: "电焊",
        },
        {
          id: "2",
          dictValue: "2",
          dictValueName: "气焊(割)",
        },
        {
          id: "3",
          dictValue: "3",
          dictValueName: "喷灯",
        },
        {
          id: "4",
          dictValue: "4",
          dictValueName: "电钻",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "氧乙炔",
        },
      ],
    };
  },

  methods: {
    selectJSA() {},

    // 添加作业证信息
    addWorkPermitInfo() {
      this.$refs.addOperatorsDialogRef.open();
    },
    // 上传附件成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除附件
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
.extra-item {
  width: calc(100% - 1px);
  display: flex;
  align-items: center;
  height: 85px;
  border: 1px solid #d0e0ff;
  cursor: pointer;
  .extra-button {
    width: 157px;
    height: 38px;
    margin-left: 20px;
    line-height: 38px;
    background: #f5faff;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #409eff;
    text-align: center;
    font-size: 14px;
    color: #989898;
    font-weight: 500;
  }
}

/deep/ .button-select {
  margin-left: 10px;
}
</style>
