<template>
  <div id="">
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form
            :model="form"
            label-width="150px"
            class="demo-ruleForm"
            ref="formRef"
            :rules="rules"
            :size="size"
          >
            <div class="title">
              <svg-icon
                icon-class="chuchaxinxi"
                style="width: 20px; height: 20px; margin-right: 5px"
              ></svg-icon>
              <div>隐患信息</div>
            </div>
            <el-row>
              <el-col span="12">
                <el-form-item label="整改标题" prop="correctTheTitle">
                  <el-input
                    clearable
                    :style="`width:${width}`"
                    v-model="form.correctTheTitle"
                    placeholder="请输入整改标题"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <!-- 自动默认，不可修改 -->
                <el-form-item label="整改单编号" prop="correctionOrderNumber">
                  <el-input
                    clearable
                    disabled
                    v-model="form.correctionOrderNumber"
                    placeholder="请输入整改单编号"
                    :style="`width:${width}`"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="隐患来源" prop="sourceOfHiddenDanger">
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="隐患发现时间"
                  prop="hazardDiscoveryTime"
                  class="is-required"
                >
                  <el-date-picker
                    :style="`width:${width}`"
                    v-model="form.hazardDiscoveryTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="请选择隐患发现时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display: flex">
                  <el-form-item
                    label="检查人员"
                    prop="inspectorName"
                    class="is-required"
                  >
                    <el-input
                      :style="`width:${width}`"
                      clearable
                      v-model="form.inspectorName"
                      disabled
                      placeholder="请输入检查人员"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="检查单位"
                  prop="inspectionDepartmentId"
                  class="is-required"
                >
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="外来检查人员" prop="foreignInspectors">
                  <el-input
                    :style="`width:${width}`"
                    clearable
                    v-model="form.foreignInspectors"
                    placeholder="请输入外来检查人员"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item
                  label="隐患级别"
                  prop="hiddenLevel"
                  class="is-required"
                >
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="隐患因素"
                  prop="hiddenFactors"
                  class="is-required"
                >
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="隐患类型" prop="dangerType">
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="整改方式" prop="rectificationMethod">
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="违章人数" prop="theNumberOfViolations">
                  <el-input
                    :style="`width:${width}`"
                    clearable
                    v-model="form.theNumberOfViolations"
                    placeholder="请输入违章人数"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="检查来源分类"
                  prop="checkSourceClassification"
                >
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="发生环节" prop="occurrenceLink">
                  <el-select
                    v-model="form.sourceOfHiddenDanger"
                    :isDisabled="isDisabled"
                    :size="size"
                    :style="`width:${width}`"
                    clearable
                    placeholder="请选择管控措施分类1"
                    @change="handleChangeRiskManageMeasure"
                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="是否重复整改" prop="repeatRectification">
                  <el-radio-group
                    v-model="form.repeatRectification"
                    style="width: 330px"
                  >
                    <el-radio label="repeat_rectification:true">是</el-radio>
                    <el-radio label="repeat_rectification:false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="隐患位置" prop="hiddenLocation">
                  <el-input
                    style="width:90%"
                    clearable
                    v-model="form.hiddenLocation"
                    placeholder="请输入隐患位置"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="21">
                <el-form-item label="隐患照片">
                  <basic-upload
                    key="file"
                    :model="true"
                    @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                    @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                    :photos="form.attachment"
                  ></basic-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item
                  label="隐患描述"
                  prop="hazardDescription"
                  class="is-required"
                >
                  <el-input
                    style="width: 90%"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.hazardDescription"
                    placeholder="请输入隐患描述"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <div class="title">
              <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
              <div>隐患整改</div>
            </div> -->
            <el-row>
              <el-col span="24">
                <el-form-item label="整改意见" prop="rectificationOpinion">
                  <el-input
                    style="width: 90%"

                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.rectificationOpinion"
                    placeholder="请输入整改意见"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="原因分析/法规依据" prop="causeAnalysis">
                  <el-input
                    style="width: 90%"

                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.causeAnalysis"
                    placeholder="请输入原因分析/法规依据"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="控制措施" prop="controlMeasures">
                  <el-input
                    style="width: 90%"

                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.controlMeasures"
                    placeholder="请输入控制措施"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display: flex">
                  <el-form-item
                    label="整改责任人"
                    prop="rectifierName"
                    class="is-required"
                  >
                    <el-input
                      style="width: 220px"
                      clearable
                      disabled
                      v-model="form.rectifierName"
                      placeholder="请输入整改责任人"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="整改责任单位"
                  prop="rectificationDepartmentId"
                >
                  <!-- <select-tree
                    :width="330"
                    :id.sync="form.rectificationDepartmentId"
                    :treeData="deptTreeData"
                    :selectTreeProps="selectTreeProps"
                  /> -->
                  <el-select
                    placeholder="请输入整改责任单位"
                    clearable
                    v-model="form.year"
                    :style="`width:${width}`"
                    :size="size"
                    :isDisabled="isDisabled"
                  >
                    <!-- <el-option
                      v-for="item in dictConfig.entAccidentType"
                      :key="item.id"
                      :value="item.dictValue"
                      :label="item.dictValueName"
                    ></el-option> -->
                  </el-select>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display: flex">
                  <el-form-item
                    label="整改责任单位负责人"
                    prop="rectifierName"
                    class="is-required"
                  >
                    <el-select
                    placeholder="请输入整改责任单位负责人"
                    clearable
                    v-model="form.year"
                    :style="`width:${width}`"
                    :size="size"
                    :isDisabled="isDisabled"
                  >
                    <!-- <el-option
                      v-for="item in dictConfig.entAccidentType"
                      :key="item.id"
                      :value="item.dictValue"
                      :label="item.dictValueName"
                    ></el-option> -->
                  </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="计划整改完成时间"
                  prop="rectifyDate"
                  class="is-required"
                >
                  <el-date-picker
                    :style="`width:${width}`"
                    v-model="form.rectifyDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="请选择计划整改完成时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="验收人" prop="year">
                  <el-select
                    placeholder="验收人"
                    clearable
                    v-model="form.year"
                    :style="`width:${width}`"
                    :size="size"
                    :isDisabled="isDisabled"
                  >
                    <!-- <el-option
                      v-for="item in dictConfig.entAccidentType"
                      :key="item.id"
                      :value="item.dictValue"
                      :label="item.dictValueName"
                    ></el-option> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button type="success" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <choose-person-dialog
      ref="choosePersonDialogRef"
      title="选择员工"
      @submit="choosePerson"
    ></choose-person-dialog>
  </div>
</template>
<script>
import choosePersonDialog from "./choosePersonDialog";
export default {
  components: { choosePersonDialog },
  data() {
    return {
      width:"220px",
      deptTreeData: [], // 表单目录
      selectTreeProps: {
        children: "children",
        label: "name",
        disabled: function (data, node) {
          // 禁选项处理
          return false;
        },
      },
      type: "add",
      openEdit: false,
      curChooseName: "",
      size:"small ",
      form: {},
      rules: {
        hazardDiscoveryTime: [
          { required: true, message: "请选择隐患发现时间", trigger: "blur" },
        ],
        inspectorName: [
          { required: true, message: "请输入检查人员", trigger: "blur" },
        ],
        inspectionDepartmentId: [
          { required: true, message: "请选择检查单位", trigger: "blur" },
        ],
        hiddenLevel: [
          { required: true, message: "请选择隐患级别", trigger: "blur" },
        ],
        hiddenFactors: [
          { required: true, message: "请选择隐患因素", trigger: "blur" },
        ],
        hazardDescription: [
          { required: true, message: "请输入隐患描述", trigger: "blur" },
        ],
        // rectifierName: [
        //   { required: true, message: "请输入整改责任人", trigger: "blur" },
        // ],
        // rectifyDate: [
        //   { required: true, message: "请选择计划整改完成时间", trigger: "blur" },
        // ],
        // reviewerName: [
        //   { required: true, message: "请选择复查人", trigger: "blur" },
        // ],
        // closedLoopManName: [
        //   { required: true, message: "请选择闭环人", trigger: "blur" },
        // ],
      },
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
      default: "隐患排查编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    this.getTreeData();
  },
  methods: {
    open(row) {
      this.openEdit = true;
      this.form.id = "";
      if (row && row.id) {
        this.type = "edit";
        this.getRetuenForm(row.id);
      } else {
        this.type = "add";
        this.getTrackingNumber(); // 新增时获取整改单编号
      }
    },
    close() {
      this.resetForm("ruleForm");
      this.openEdit = false;
    },
    choosePerson(data) {
      if (this.curChooseName == "inspectorName") {
        this.form.inspectorId = data.staffId;
        this.form.inspectorName = data.staffName;
      } else if (this.curChooseName == "rectifierName") {
        this.form.rectifierId = data.staffId;
        this.form.rectifierName = data.staffName;
      } else if (this.curChooseName == "reviewerName") {
        this.form.reviewerId = data.staffId;
        this.form.reviewerName = data.staffName;
      } else if (this.curChooseName == "closedLoopManName") {
        this.form.closedLoopManId = data.staffId;
        this.form.closedLoopManName = data.staffName;
      }
    },
    async getTreeData() {
      const res = await deptListTreeAPI();
      if (res.code == 200) {
        this.deptTreeData = res.data;
      }
    },
    getTrackingNumber() {
      getTrackingNumberAPI().then((res) => {
        if (res.code == 200) {
          this.form.correctionOrderNumber = res.data;
        }
      });
    },
    // 删除图片
    handleImageRemove(index, itemIdx) {
      this.form.dangerPhotos.splice(index, 1);
    },
    // 上传图片成功
    uploadImageSuccess(data, itemIdx) {
      this.form.dangerPhotos.push(data);
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await returnHiddenDangerDataAPI({ id });
      if (res.code == 200) {
        let data = res.data.inspectHiddenDanger;
        this.form = {
          id: data.id,
          version: data.version,
          correctTheTitle: data.correctTheTitle,
          correctionOrderNumber: data.correctionOrderNumber,
          sourceOfHiddenDanger:
            data.sourceOfHiddenDanger && data.sourceOfHiddenDanger.key,
          hazardDiscoveryTime: data.hazardDiscoveryTime,
          inspectorId: data.inspectorId,
          inspectorName: data.inspector && data.inspector.nickName,
          inspectionDepartmentId: data.inspectionDepartmentId,
          inspectionDepartmentName:
            data.inspectionDepartment && data.inspectionDepartment.deptName,
          foreignInspectors: data.foreignInspectors,
          hiddenLevel: data.hiddenLevel && data.hiddenLevel.key,
          hiddenFactors: data.hiddenFactors && data.hiddenFactors.key,
          dangerType: data.dangerType && data.dangerType.key,
          rectificationMethod:
            data.rectificationMethod && data.rectificationMethod.key,
          theNumberOfViolations: data.theNumberOfViolations,
          checkSourceClassification:
            data.checkSourceClassification &&
            data.checkSourceClassification.key,
          occurrenceLink: data.occurrenceLink && data.occurrenceLink.key,
          repeatRectification:
            data.repeatRectification && data.repeatRectification.key,
          hiddenLocation: data.hiddenLocation,
          dangerPhotos: data.dangerPhotos,
          hazardDescription: data.hazardDescription,
          // rectificationOpinion: data.rectificationOpinion,
          // causeAnalysis: data.causeAnalysis,
          // controlMeasures: data.controlMeasures,
          // rectifierId: data.rectifierId,
          // rectifierName: data.rectifier&&data.rectifier.nickName,
          // rectificationDepartmentId: data.rectificationDepartmentId,
          // rectifyDate: data.rectifyDate,
          // reviewerId: data.reviewerId,
          // reviewerName: data.reviewer&&data.reviewer.nickName,
          // closedLoopManId: data.closedLoopManId,
          // closedLoopManName: data.closedLoopMan&&data.closedLoopMan.nickName
        };
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type == "edit") {
            updateHiddenDangerDataAPI(this.form).then((res) => {
              this.$message.success("编辑成功!");
              this.$emit("refreshDataList");
              this.close();
            });
          } else {
            createHiddenDangerDataAPI(this.form).then((res) => {
              this.$message.success("新增成功!");
              this.$emit("refreshDataList");
              this.close();
            });
          }
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.dangerPhotos = [];
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
  .title {
    display: flex;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
  }
  .attachment {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #fff;
    border: none;
  }
  .attachment-item {
    background: #f0f5ff;
    color: #4a80fc;
    border: 1px dashed #4a80fc;
    border-radius: 2px;
    padding: 5px 20px;
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
