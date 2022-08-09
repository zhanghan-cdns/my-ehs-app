<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="55%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <!-- <el-row :gutter="10">
            <el-col :span="12" class="col-class">
              <div>检查类型</div><div>{{form.sourceOfHiddenDanger&&form.sourceOfHiddenDanger.value}}</div>
            </el-col>
            <el-col :span="12" class="col-class">
              <div>隐患发现时间</div><div>{{form.hazardDiscoveryTime}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" class="col-class">
              <div>检查人员</div><div>{{form.inspector&&form.inspector.nickName}}</div>
            </el-col>
            <el-col :span="12" class="col-class">
              <div>检查单位</div><div>{{form.inspectionDepartment&&form.inspectionDepartment.deptName}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" class="col-class">
              <div>外来检查人员</div><div>{{form.foreignInspectors}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" class="col-class">
              <div>隐患级别</div><div>{{form.hiddenLevel&&form.hiddenLevel.value}}</div>
            </el-col>
            <el-col :span="12" class="col-class">
              <div>隐患因素</div><div>{{form.hiddenFactors&&form.hiddenFactors.value}}</div>
            </el-col>
          </el-row> -->
          <!-- <el-row :gutter="10">
            <el-col :span="24" class="col-class">
              <div>隐患照片</div>
              <div style="border: none;background: none;padding: 0;">
                <img v-if="form.dangerPhotos&&form.dangerPhotos.length>0"
                  v-for="(child,childIndex) in form.dangerPhotos"
                  :key="childIndex"
                  :src="baseUrl+child.url"
                />
                <span v-if="form.dangerPhotos.length==0"> 暂无 </span>
              </div>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24" class="col-class">
              <!-- <div>隐患描述</div><div>{{form.hazardDescription}}</div> -->
            </el-col>
          </el-row>
          <el-form :model="commitForm" style="margin-top: 10px" label-width="150px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="24">
                <el-form-item label="整改意见" prop="rectificationOpinion">
                  <el-input
                    style="width: 830px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="commitForm.rectificationOpinion"
                    placeholder="请输入整改意见"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="原因分析/法规依据" prop="causeAnalysis">
                  <el-input
                    style="width: 830px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="commitForm.causeAnalysis"
                    placeholder="请输入原因分析/法规依据"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="整改填写说明" prop="controlMeasures">
                  <el-input
                    style="width: 830px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="commitForm.controlMeasures"
                    placeholder="请输入整改填写说明"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display:flex">
                  <el-form-item label="整改责任人" prop="rectifierName" class="is-required">
                    <el-input
                      style="width: 220px"
                      clearable
                      disabled
                      v-model="commitForm.rectifierName"
                      placeholder="请输入整改责任人"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    style="margin-left: 10px;height: 40px"
                    type="primary"
                    icon="el-icon-plus"
                    @click="()=>{curChooseName='rectifierName';$refs.choosePersonDialogRef.open()}"
                  >请选择
                  </el-button>
                </div>
              </el-col>
              <el-col span="12">
                <el-form-item label="整改责任单位" prop="rectificationDepartmentId">
                  <!-- <select-tree :width="330" :id.sync="form.rectificationDepartmentId" :treeData="deptTreeData" :selectTreeProps="selectTreeProps"/> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="计划整改完成时间" prop="rectifyDate" class="is-required">
                  <el-date-picker
                    style="width:330px"
                    v-model="commitForm.rectifyDate"
                    type="date"
                    value-format="yyyy-MM-dd"
					          format="yyyy-MM-dd"
                    placeholder="请选择计划整改完成时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <div style="display:flex">
                  <el-form-item label="复查人" prop="reviewerName" class="is-required">
                    <el-input
                      style="width: 220px"
                      clearable
                      disabled
                      v-model="commitForm.reviewerName"
                      placeholder="请输入复查人"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    style="margin-left: 10px;height: 40px"
                    type="primary"
                    icon="el-icon-plus"
                    @click="()=>{curChooseName='reviewerName';$refs.choosePersonDialogRef.open()}"
                  >请选择
                  </el-button>
                </div>
              </el-col>
              <el-col span="12">
                <div style="display:flex">
                  <el-form-item label="闭环人" prop="closedLoopManName" class="is-required">
                    <el-input
                      style="width: 220px"
                      clearable
                      disabled
                      v-model="commitForm.closedLoopManName"
                      placeholder="请输入闭环人"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    style="margin-left: 10px;height: 40px"
                    type="primary"
                    icon="el-icon-plus"
                    @click="()=>{curChooseName='closedLoopManName';$refs.choosePersonDialogRef.open()}"
                  >请选择
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="意见" prop="reviewComments" class="is-required">
                  <el-input
                    style="width: 830px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="commitForm.reviewComments"
                    placeholder="请输入意见"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="是否是隐患" prop="isHiddenDanger">
                  <el-radio-group v-model="commitForm.isHiddenDanger">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
    <choose-person-dialog ref="choosePersonDialogRef" title="选择员工" @submit="choosePerson"></choose-person-dialog>
  </div>
</template>
<script>
import choosePersonDialog from "./choosePersonDialog"
import { baseUrl } from '@/router/axios';

export default {
  components: {choosePersonDialog},
  data() {
    return {
      baseUrl: baseUrl + '/resource/file/download?url=',
      deptTreeData:[],
      curChooseName: '',
      openEdit: false,
      taskId: '',
      instanceId: '',
      form: {},
      commitForm:{},
      formRules: {
        rectifierName: [
          { required: true, message: "请输入整改责任人", trigger: "blur" },
        ],
        rectifyDate: [
          { required: true, message: "请选择计划整改完成时间", trigger: "blur" },
        ],
        reviewerName: [
          { required: true, message: "请选择复查人", trigger: "blur" },
        ],
        closedLoopManName: [
          { required: true, message: "请选择闭环人", trigger: "blur" },
        ],
        reviewComments: [
          { required: true, message: "请输入意见", trigger: "blur" },
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "隐患审核编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    this.getTreeData()
  },
  methods: {
    open(row,taskId) {
      this.openEdit = true;
      this.form = row
      // this.taskId = taskId
      // this.instanceId = row.processInstanceId
      // this.commitForm = {
      //   id: row.id,
      //   rectificationOpinion: '',
      //   causeAnalysis: '',
      //   controlMeasures: '',
      //   rectifierId: row.rectifierId,
      //   rectifierName: row.rectifier&&row.rectifier.nickName,
      //   rectificationDepartmentId: '',
      //   rectifyDate: row.rectifyDate,
      //   reviewerId: row.reviewerId,
      //   reviewerName: row.reviewer&&row.reviewer.nickName,
      //   closedLoopManId: row.closedLoopManId,
      //   closedLoopManName: row.closedLoopMan&&row.closedLoopMan.nickName,
      //   reviewComments: '',
      //   isHiddenDanger: false,
      // }
    },
    close() {
      this.resetForm('ruleForm')
      this.openEdit = false;
    },
    async getTreeData(){
      const res = await deptListTreeAPI();
      if(res.code == 200){
        this.deptTreeData = res.data
      }
    },
    choosePerson(data){
      if(this.curChooseName == 'rectifierName'){
        this.commitForm.rectifierId = data.staffId
        this.commitForm.rectifierName = data.staffName
      }else if(this.curChooseName == 'reviewerName'){
        this.commitForm.reviewerId = data.staffId
        this.commitForm.reviewerName = data.staffName
      }if(this.curChooseName == 'closedLoopManName'){
        this.commitForm.closedLoopManId = data.staffId
        this.commitForm.closedLoopManName = data.staffName
      }
    },
    // 保存
    submitForm(formName) {
      let params = {
        taskId: this.taskId,
        instanceId: this.instanceId,
        inspectHiddenDanger: this.commitForm
      }
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          hiddenDangerAuditAPI(params).then(()=>{
            this.$message.success('保存成功!')
            this.$emit("refreshDataList");
            this.close()
          })
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  .col-class div:first-child{
    width: 138px !important;
  }
  .attachment{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    background:#fff;
    border: none;
  }
  .attachment-item{
    background: #F0F5FF;
    color: #4A80FC;
    border: 1px dashed #4A80FC;
    border-radius: 2px;
    padding: 5px 20px;
    margin-right: 15px;
    cursor: pointer
  }
}
</style>
