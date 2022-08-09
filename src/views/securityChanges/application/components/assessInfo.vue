<template>
  <div id="change-approval-info">
    <div class="extra-form-title" style="padding-top: 0px">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">风险评估</span>
    </div>
    <div class="assess-select-box">
      <div style="margin-right: 5px; font-size: 15px; font-weight: 600">
        <span style="color: #ff4646">*</span>
        <span>请选择评估方式：</span>
      </div>
      <div style="display: flex">
        <div
          :class="[
            activeType === item ? activeClass : '',
            'assess-select-button',
          ]"
          v-for="(item, index) in assessTypeList"
          :key="index"
          @click="onChange(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div>
      <!-- LEC -->
      <div v-if="activeType === 'LEC'">
        <el-form
          label-width="220px"
          label-position="right"
          :model="lecForm"
          size="small"
          ref="formRef"
        >
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="可能性(L)" prop="lecPossible">
                <el-radio-group v-model="lecForm.lecPossible">
                  <el-radio
                    v-for="(item, index) in radioData.lecRadioOne"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="暴露频率(E)" prop="lecFrequency">
                <el-radio-group v-model="lecForm.lecFrequency">
                  <el-radio
                    v-for="(item, index) in radioData.lecRadioTwo"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="严重度(C)" prop="lecSeverity">
                <el-radio-group v-model="lecForm.lecSeverity">
                  <el-radio
                    v-for="(item, index) in radioData.lecRadioThree"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="评估等级" prop="lecLevel">
                <div class="lowRisk">低风险</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- LS -->
      <div v-if="activeType === 'LS'">
        <el-form
          label-width="220px"
          label-position="right"
          :model="lsForm"
          size="small"
          ref="formRef"
        >
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="事故发生的可能性（L）" prop="lsPossible">
                <el-radio-group v-model="lsForm.lsPossible">
                  <el-radio
                    v-for="(item, index) in radioData.lsRadioOne"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="事故后果严重性（S）" prop="lsSeverity">
                <el-radio-group v-model="lsForm.lsSeverity">
                  <el-radio
                    v-for="(item, index) in radioData.lsRadioTwo"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="评估等级" prop="lecLevel">
                <div class="lowRisk">低风险</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 评估表 -->
      <div v-if="activeType === '评估表库'">
        <el-form
          label-width="220px"
          label-position="right"
          :model="evaForm"
          size="small"
          ref="formRef"
        >
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="变更影响人员安全" prop="lsPossible">
                <el-radio-group v-model="evaForm.lsPerson">
                  <el-radio
                    v-for="(item, index) in radioData.lsRadioOne"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="变更影响设备安全" prop="lsSeverity">
                <el-radio-group v-model="evaForm.lsEquipment">
                  <el-radio
                    v-for="(item, index) in radioData.lsRadioTwo"
                    :key="index"
                    :label="item.value"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="bottom-button-group">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="warning" @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import { radioData } from "./radioData.js";

export default {
  components: {},

  data() {
    return {
      lecForm: {
        lecPossible: 10,
        lecFrequency: 10,
        lecSeverity: 100,
        approvalOpinions: "",
      },
      lsForm: {
        lsPossible: 5,
        lsSeverity: 5,
      },
      evaForm: {
        lsPerson: 5,
        lsEquipment: 5,
      },
      width: "100%",
      activeType: "LEC",
      assessTypeList: ["LEC", "LS", "评估表库"],
      activeClass: "assess-active-button",
      radioData,
    };
  },

  mounted() {
    console.log(this.lecRadioOne, "lecRadioOne");
  },

  methods: {
    // 按钮切换
    onChange(val) {
      this.activeType = val;
    },

    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
.extra-form-title {
  padding: 34px 0px 10px 0px;
  margin-bottom: 17px;
  border-bottom: 1px solid #f0f0f0;
  .form-title-icon {
    color: #4a80fc;
    margin-right: 6px;
  }
  .form-title-name {
    font-weight: 500;
    font-size: 16px;
    color: #333333;
  }
}

.assess-select-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 28px 0px 12px 0px;
}

.assess-select-button {
  width: 114px;
  height: 46px;
  line-height: 46px;
  background: #dbe6ff;
  border-radius: 4px 4px 4px 4px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #4a80fc;
  margin: 0px 5px;
  white-space: initial;
  cursor: pointer;
}

.assess-active-button {
  background: #4a80fc;
  color: #ffffff;
}

.bottom-button-group {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-top: 1px solid #e2e2e2;
  margin-top: 40px;
}

.approval-top-step {
  width: 100%;
  padding: 30px 0px;
  height: 82px;
  margin-bottom: 50px;
  background: #f0f5ff;
  border-radius: 3px 3px 0px 0px;
}

/deep/ .el-form-item__content {
  flex-flow: column;
  align-items: start;
}

/deep/ .el-radio__label {
  white-space: normal;
  line-height: 25px;
}

.lowRisk {
  width: 239px;
  height: 14px;
  line-height: 14px;
  background: #4a80fc;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #dcdfe6;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  padding: 9px;
}
</style>