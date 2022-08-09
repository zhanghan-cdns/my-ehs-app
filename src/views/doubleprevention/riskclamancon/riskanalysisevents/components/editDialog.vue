<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      :openFlag="openEdit"
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      height="95%"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <el-form
          ref="formRef"
          :disabled="isDisabled"
          :model="form"
          :rules="rules"
          label-position="right"
          label-width="140px"
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="风险分析单元" prop="riskAnalysisUnitId">
                <el-select
                  v-model="form.riskAnalysisUnitId"
                  :isDisabled="isDisabled"
                  :size="size"
                  :style="`width:${width}`"
                  clearable
                  placeholder="请选择分析单元"
                >
                  <el-option
                    v-for="item in riskAnalysisUnitList"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="风险事件名称" prop="riskEventName">
                <el-input
                  v-model="form.riskEventName"
                  :isDisabled="isDisabled"
                  :size="size"
                  :style="`width:${width}`"
                  placeholder="风险事件名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style="width: 100%; height: 100%; border: 1px solid #eee">
              <div class="main-title">风险分析评估方法</div>
              <div class="tab-box">
                <div style="margin-right: 10px">
                  先选择评估方法：
                </div>
                <div
                  v-for="(item, index) in tablist" :key="index"
                  :class="num === index ? 'div-content-active' : ''"
                  class="div-content"
                  style="width: 100px;margin-right: 10px"
                  @click="selectCourseType(item, index)"
                >
                  <div>
                    <span style="width: 100px">{{ item }}</span>
                  </div>
                </div>

              </div>

              <div v-if="num === 0">
                <div style="display: flex; justify-content: center">
                  <div style="width: 240px; border-right: 1px solid #eee">
                    <div style="color: #4a80fc">可能性(L)</div>
                    <el-radio-group v-model="form.ledC" @change="(val)=>changeRadioMethods(0)">
                      <el-radio v-for="(item,index) in possibility" :key="index" :label="item.label"
                                style="margin-top: 11px"
                      >{{ item.value }}
                      </el-radio
                      >
                    </el-radio-group>
                  </div>
                  <div
                    style="
                      width: 260px;
                      border-right: 1px solid #eee;
                      padding-left: 15px;
                    "
                  >
                    <div style="color: #4a80fc">暴露评率(E)</div>
                    <el-radio-group v-model="form.ledE" @change="(val)=>changeRadioMethods(0)">
                      <el-radio v-for="(item,index) in exposureRate" :key="index" :label="item.label"
                                style="margin-top: 11px">
                        {{ item.value }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div style="width: 160px; padding-left: 15px">
                    <div style="color: #4a80fc">严重度(C)</div>
                    <el-radio-group v-model="form.ledL" @change="(val)=>changeRadioMethods(0)">
                      <el-radio v-for="(item,index) in severity" :key="index" :label="item.label"
                                style="margin-top: 11px">
                        {{ item.value }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="table-box">
                  <evaluation-form :gridData="gridData"></evaluation-form>
                </div>
              </div>
              <div v-if="num === 1">
                <div style="display: flex; justify-content: center">
                  <div style="width: 300px; border-right: 1px solid #eee">
                    <div style="color: #4a80fc">事故发生的可能性（L）：</div>
                    <el-radio-group v-model="form.lsL" @change="changeRadioMethods(1)">
                      <el-radio v-for="(item,index) in accidentProbability" :key="index" :label="item.label"
                                style="margin-top: 11px">
                        {{ item.value }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div style="width: 360px; padding-left: 19px">
                    <div style="color: #4a80fc">事故后果严重性(S):</div>
                    <el-radio-group v-model="form.lsS" @change="changeRadioMethods(1)">
                      <el-radio v-for="(item,index) in accidentConsequences" :key="index" :label="item.label"
                                style="margin-top: 11px">
                        {{ item.value }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="table-box">
                  <evaluation-form :gridData="gridData"></evaluation-form>
                </div>
              </div>
            </div>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="管控层级" prop="managementLevel">
                <el-select
                  v-model="form.managementLevel"
                  :isDisabled="isDisabled"
                  :size="size"
                  clearable
                  placeholder="请选择分析单元"
                  style="width: 94%"
                >
                  <el-option
                    v-for="item in dictConfig.managementLevel"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="改进措施" prop="improvementMeasures">
                <el-input
                  v-model="form.improvementMeasures"
                  :isDisabled="isDisabled"
                  :rows="4"
                  :size="size"
                  placeholder="改进措施"
                  style="width: 94%"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="风险评估时间" prop="riskAssessmentTime">
                <el-date-picker
                  v-model="form.riskAssessmentTime"
                  :size="size"
                  :style="`width:${width}`"
                  placeholder="选择风险评估时间"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="下次评估时间" prop="nextAssessmentTime">
                <el-date-picker
                  v-model="form.nextAssessmentTime"
                  :size="size"
                  :style="`width:${width}`"
                  placeholder="选择下次评估时间"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"

                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--   v-if="item.path"
                      :src="staticUrl + item.path" -->
            <el-col span="12">
              <el-form-item label="警示标志">
                <div class="img-show-box">
                  <div
                    v-for="(item, index) in activeSignList"
                    :key="index"
                    class="warning-sign"
                    style="margin-right: 5px; margin-bottom: 5px"
                  >
                    <el-image :src="baseUrl+'/doubleprevention'+item.path" style="width: 100%; height: 100%"></el-image>
                  </div>
                  <div
                    class="warning-sign"
                    style="margin-right: 5px; margin-bottom: 5px"
                    @click="addWarningSign"
                  >
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button v-if="isDisabled!=='chakan'" type="primary" @click="submitForm('form')"
          >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <warning-dialog ref="warningDialogRef"></warning-dialog>
    <set-lec-level-dialog ref="setLecLevelDialogRef"></set-lec-level-dialog>
  </div>
</template>
<script>
import {
  lecLevelListAPI,
  riskAnalysisUnitListAPI,
  riskEventCreateAPI,
  riskEventUpdateAPI,
  riskEventViewAPI
} from "@/api/doubleprevention/riskevent/index.js";
import warningDialog from "./warningDialog.vue";
import EvaluationForm from "@views/doubleprevention/riskclamancon/riskanalysisevents/components/evaluationForm";
import {accidentConsequences, accidentProbability, exposureRate, gridData, possibility, severity} from './scoreStandard'
import SetLecLevelDialog from "@views/doubleprevention/riskclamancon/riskanalysisevents/components/setLecLevelDialog";
import {baseUrl} from "@/router/axios";

export default {
  name: "editDialog",
  components: {
    warningDialog,
    EvaluationForm,
    SetLecLevelDialog
  },
  data() {
    return {
      openEdit: false,
      // 每一列单选框选中的字段
      isDisabled: "",
      width: "230px",
      size: "small",
      num: 0,
      tablist: ["LEC", "LS", "设置LEC等级"],
      form: {
        ledC: 0,//可能性
        ledE: 0,//暴露评率(E)
        ledL: 0,//严重度
        lsL: 0,//事故发生的可能性L
        lsS: 0,//事故后果严重性S
      },
      rules: {
        // 有限空间名称
        // checkMeasure: [
        //   {required: true, message: "请输入考核办法", trigger: "blur"},
        // ],
      },
      rowData: {},
      possibility,//可能性
      exposureRate,//暴露率
      severity,//严重度
      gridData,
      accidentProbability,
      accidentConsequences,
      defaultLecValue: [],
      riskAnalysisUnitList: [],//风险分析单元
      baseUrl
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "风险分析事件",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
  },
  computed: {
    activeSignList() {
      return this.$refs.warningDialogRef.activeList;
    },
  },
  methods: {
    /**
     * 单选框选择事件
     * @param type 选择框类型
     * @param val 选择值
     */
    changeRadioMethods(type, val) {
      if (type === 0) {
        console.log(this.countValueMethods(this.num).toFixed(2), 'lec值')
        this.countCellResult(this.countValueMethods(this.num))
      } else if (type === 1) {
        console.log(this.countValueMethods(this.num).toFixed(2), 'ls值')
        this.countCellResult(this.countValueMethods(this.num))
      }
    },
    /**
     * 计算lec和ls值
     * @param type
     * @returns {number}
     */
    countValueMethods(type) {
      if(type===0){
        if (this.form.ledE && this.form.ledL && this.form.ledC) return this.form.ledE * this.form.ledL * this.form.ledC
        else return 0
      }else{
        if (this.form.lsS && this.form.lsL) return this.form.lsS * this.form.lsL
        else return 0
      }

    },
    //
    /**
     *  计算确定某个范围
     * @param scope 范围
     * @param riskType  风险类型 low high
     * @param value 传入值
     */
    countScope(scope, value, riskType) {
      //如果区间为单一需要 risktype类型确定max min值
      if (scope.length === 1) {
        if (riskType === 'low') {
          return value <= scope[0];
        } else {
          return value >= scope[0];
        }
      } else {
        // 确定区间值
        return value >= scope[0] && value <= scope[1];
      }
    },
    /**
     *
     * @param lec  lec值
     * @param thresholds  阈值范围
     */
    countCellResult(lec, thresholds = ['low', 'high']) {
      this.gridData[0].forEach((item, index) => {
        //排除第一个空区间
        let result
        if (index !== 0) {
          this.gridData[item.rowIndex][index].text = ''
          this.gridData[item.rowIndex][index].background = '#fff'
          // 索引为1
          if (index === 1) {
            // 低风险
            result = this.countScope(item.interval, lec, thresholds[0])
          }
            // 索引为4
          //  高风险
          else if (index === 4) {
            result = this.countScope(item.interval, lec, thresholds[1])
          }
            // 其他索引
          // 区间风险
          else {
            result = this.countScope(item.interval, lec)
          }
          if (result) {
            this.form.riskLevel=item.key
            this.gridData[item.rowIndex][index].text = lec
            this.gridData[item.rowIndex][index].background = '#FF6600'
            this.gridData[item.rowIndex][index].color = '#fff'
          }
        }
      })
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan";
      this.getLecLevelInfo()
      this.getRiskAnalysisUnitList()
      // 默认给表格头部数据
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {
        ledC: 0,//可能性
        ledE: 0,//暴露评率(E)
        ledL: 0,//严重度
        lsL: 0,//事故发生的可能性L
        lsS: 0,//事故后果严重性S
      };
      this.num = 0
      this.$refs.warningDialogRef.activeList=[]
    },
    // 添加警示标志
    addWarningSign() {
      this.$refs.warningDialogRef.open();
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      const res = await riskEventCreateAPI({
        ...this.form,
        warningSigns: this.activeSignList,
        assessmentMethod:this.num===0?'LEC':'LS',
        fraction:this.countValueMethods(this.num)
      })
      if (res.code === 200) {
        this.$message.success("创建成功")
        this.close()
      }
    },
    // 修改
    async modify() {
      const res = await riskEventUpdateAPI({
        ...this.form,
        warningSigns: this.activeSignList,
        assessmentMethod:this.num===0?'LEC':'LS',
        fraction:this.countValueMethods(this.num)
      })
      if (res.code === 200) {
        this.$message.success("修改成功")
        this.close()
      }
    },
    // 获取详情
    async getDetail(id) {
      const res = await riskEventViewAPI({id: id})
      if (res.code === 200) {
        this.form = {
          ...res.data,
          managementLevel: res.data.managementLevel
            ? res.data.managementLevel.key
            : "",
        }
        this.$refs.warningDialogRef.activeList=res.data.warningSigns
        this.changeRadioMethods(this.num)
      }
    },
    // 获取lec默认值
    async getLecLevelInfo() {
      const res = await lecLevelListAPI()
      if (res && res.code) {
        if (res.data.length > 0) {
          let data = res.data[0]
          this.updateGridTableHeader(data)
        }
      }
    },
    /**
     * 更新表格头部阈值
     * @param data
     */
    updateGridTableHeader(data) {
      this.gridData[0][1].interval = [data.lowRisk]
      this.gridData[0][1].text = '≤' + data.lowRisk
      this.gridData[0][2].interval = [data.lowGeneralRisk, data.generalHighRisk]
      this.gridData[0][2].text = data.lowGeneralRisk + '~' + data.generalHighRisk
      this.gridData[0][3].interval = [data.highRiskLowValue, data.highRisk]
      this.gridData[0][3].text = data.highRiskLowValue + '~' + data.highRisk
      this.gridData[0][4].interval = [data.significantValueAtRisk]
      this.gridData[0][4].text = '≥' + data.significantValueAtRisk
    },
    /**
     * 还原表格
     */
    restoreGirdTable() {
      if(this.num===0){
        this.form.lsL=0
        this.form.lsS=0
      }else{
        this.form.ledC=0
        this.form.ledE=0
        this.form.ledL=0
      }
      // 还原gridData中的结构
      this.gridData[0].forEach((item, index) => {
        if (index !== 0) {
          this.gridData[item.rowIndex][index].text = ''
          this.gridData[item.rowIndex][index].background = '#fff'
        }
      })
    },
    // tab切换
    async selectCourseType(val, index) {
      // 获取索引
      this.num = index;
      this.restoreGirdTable()
      // 当点击设置lec等级时候
      if (this.num === 2) {
        this.$refs.setLecLevelDialogRef.open()
      } else if (this.num === 1) {
        // LS默认范围
        let scopes = {
          lowRisk: 8,
          lowGeneralRisk: 9,
          generalHighRisk: 12,
          highRiskLowValue: 15,
          highRisk: 16,
          significantValueAtRisk: 20
        }
        this.updateGridTableHeader(scopes)
        this.changeRadioMethods(this.num)
      } else if (this.num === 0) {
        await this.getLecLevelInfo()
        this.changeRadioMethods(this.num)
      }
    },
    /**
     * 获取单元列表接口
     */
    async getRiskAnalysisUnitList() {
      const res = await riskAnalysisUnitListAPI()
      if (res.code === 200) {
        console.log(res)
        this.riskAnalysisUnitList = res.data
      }
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

.table-box {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding: 10px;
}

.main-title {
  width: 100%;
  height: 50px;
  text-align: center;
  background: #d0e0ff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  text-align: center;
  align-items: center;
  white-space: normal;

  .div-content {
    border-radius: 4px;
    color: #999999;
    padding: 5px 0;
    cursor: pointer;
    background: #f0f0f0;
  }

  .div-content-active {
    background: #3877f1;
    color: #fff;
  }
}


// 警示标志
.warning-sign {
  width: 148px;
  height: 148px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 28px;
    color: #8c939d;
  }

  &:hover {
    border: 1px dashed #3c81e6;
  }
}

.img-show-box {
  display: flex;
  width: 700px;
  flex-wrap: wrap;
}


.pull-right {
  color: #161616 !important;
}
</style>

