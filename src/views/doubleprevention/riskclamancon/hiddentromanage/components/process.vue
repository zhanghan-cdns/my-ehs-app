<template>
  <div id="">
    <basicDialog
      icon="icon-bianji"
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
          <el-form :model="commitForm" label-width="150px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <div class="title">
              <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
              <div>{{}}</div>
            </div>
            <template v-if="type=='shenpi'">
              <el-row>
                <el-col span="24">
                  <el-form-item label="审核意见" prop="auditContent" class="is-required">
                    <el-input
                      style="width: 830px"
                      clearable
                      :rows="3"
                      v-model="commitForm.auditContent"
                      placeholder="请输入审核意见"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <el-form-item label="延期是否通过" prop="auditStatus">
                    <el-radio-group v-model="commitForm.auditStatus">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="col-class" style="margin:0">
                  <div>申请人</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="col-class" style="margin:0">
                  <div>原计划时间</div><div>{{}}</div>
                </el-col>
                <el-col :span="12" class="col-class" style="margin:0">
                  <div>延期时间</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="col-class" style="margin:25px 0">
                  <div>延期申请原因</div><div>{{}}</div>
                </el-col>
              </el-row>
            </template>
            <template v-if="type=='zhenggai'">
              <el-row>
                <el-col span="24">
                  <el-form-item label="整改费用" prop="correctionFee">
                    <el-input
                      style="width: 830px"
                      clearable
                      v-model="commitForm.correctionFee"
                      placeholder="请输入整改费用"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="24">
                  <el-form-item label="整改描述" prop="rectifyContent" class="is-required">
                    <el-input
                      style="width: 830px"
                      clearable
                      type="textarea"
                      :rows="3"
                      v-model="commitForm.rectifyContent"
                      placeholder="请输入整改描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="24">
                  <el-form-item label="整改照片" prop="rectifyPhotos">
                    <render-upload
                      renderType="image"
                      :fileList="commitForm.rectifyPhotos"
                      @uploadSuccess="(data)=>{uploadImageSuccess(data,index,'rectifyPhotos')}"
                      @handleRemove="(data)=>{handleImageRemove(data,index,'rectifyPhotos')}"
                    >
                    </render-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="type=='fucha'">
              <el-row>
                <el-col span="24">
                  <el-form-item label="复查描述" prop="reviewDescription">
                    <el-input
                      style="width: 830px"
                      clearable
                      type="textarea"
                      :rows="3"
                      v-model="commitForm.reviewDescription"
                      placeholder="请输入复查描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="21">
                  <el-form-item label="复查照片" prop="reviewPhotos">
                    <render-upload
                      renderType="image"
                      :fileList="commitForm.reviewPhotos"
                      @uploadSuccess="(data)=>{uploadImageSuccess(data,index,'reviewPhotos')}"
                      @handleRemove="(data)=>{handleImageRemove(data,index,'reviewPhotos')}"
                    >
                    </render-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  <div style="display:flex">
                    <el-form-item label="闭环人" prop="closedLoopManName">
                      <el-input
                        style="width: 220px"
                        clearable
                        v-model="commitForm.closedLoopManName"
                        disabled
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
                  <el-form-item label="复查是否通过" prop="isReviewPassed">
                    <el-radio-group v-model="commitForm.isReviewPassed">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="type=='bihuan'">
              <el-row>
                <el-col span="24">
                  <el-form-item label="审核意见" prop="closedLoopOpinion">
                    <el-input
                      style="width: 830px"
                      clearable
                      type="textarea"
                      :rows="3"
                      v-model="commitForm.closedLoopOpinion"
                      placeholder="请输入审核意见"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="21">
                  <el-form-item label="上传签字图片" prop="closedLoopSignaturePicture">
                    <render-upload
                      renderType="image"
                      :fileList="commitForm.closedLoopSignaturePicture"
                      @uploadSuccess="(data)=>{uploadImageSuccess(data,index,'closedLoopSignaturePicture')}"
                      @handleRemove="(data)=>{handleImageRemove(data,index,'closedLoopSignaturePicture')}"
                    >
                    </render-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="24">
                  <el-form-item label="闭环是否通过" prop="isClosedLoopPasses">
                    <el-radio-group v-model="commitForm.isClosedLoopPasses">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <div class="title">
              <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
              <div>隐患信息</div>
            </div>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>整改标题</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>整改单编号</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>隐患来源</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div><i class="require"></i>隐患发现时间</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div><i class="require"></i>检查人员</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div><i class="require"></i>检查单位</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>外来检查人员</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div><i class="require"></i>隐患级别</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div><i class="require"></i>隐患因素</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24" class="col-class">
                <div>隐患描述</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>整改责任人</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>整改责任单位</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>计划整改完成时间</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>闭环人</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>隐患类型</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>整改方式</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>违章人数</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>检查来源分类</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>发生环节</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>是否重复整改</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24" class="col-class">
                <div>隐患位置</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24" class="col-class">
                <div>隐患照片</div>
                <div style="border: none;background: none;padding: 0;">

                </div>
              </el-col>
            </el-row>
            <template>
              <div class="title">
                <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
                <div>整改信息</div>
              </div>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>整改意见</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>原因分析/法规依据</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>整改填写说明</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>整改人</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12" class="col-class">
                  <div>整改时间</div><div>{{}}</div>
                </el-col>
                <el-col :span="12" class="col-class">
                  <div>整改费用</div><div>{{}}</div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>整改照片</div>
                  <div style="border: none;background: none;padding: 0;">

                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="col-class">
                  <div>整改措施</div><div>{{form.rectifyContent}}</div>
                </el-col>
              </el-row>
            </template>
            <template>
              <div class="title">
                <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
                <div>隐患复查</div>
              </div>
              <!-- <template v-for="item in form.fuchaList"> -->
                <el-row :gutter="10">
                  <el-col :span="12" class="col-class">
                    <div>复查人</div><div>{{}}</div>
                  </el-col>
                  <el-col :span="12" class="col-class">
                    <div>确认时间</div><div>{{}}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12" class="col-class">
                    <div>复查结果</div><div>{{form.isReviewPassed=='true'?'通过':'不通过'}}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24" class="col-class">
                    <div>复查描述</div><div>{{}}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="24" class="col-class">
                    <div>复查照片</div>
                    <div style="border: none;background: none;padding: 0;">

                    </div>
                  </el-col>
                </el-row>
              <!-- </template> -->
            </template>
            <div class="title">
              <svg-icon icon-class="chuchaxinxi" style="width: 20px; height: 20px;margin-right:5px"></svg-icon>
              <div>审批信息</div>
            </div>
            <!-- <el-row :gutter="10">
              <el-col :span="24" class="col-class">
                <div>下步审批参与人</div><div>{{}}</div>
              </el-col>
            </el-row> -->
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>新增隐患</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>确认时间</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>隐患审核</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>确认时间</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>整改</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>确认时间</div><div>{{}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="col-class">
                <div>延期申请</div><div>{{}}</div>
              </el-col>
              <el-col :span="12" class="col-class">
                <div>确认时间</div><div>{{}}</div>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10">
              <el-col :span="24" class="col-class">
                <div>描述</div><div>{{}}</div>
              </el-col>
            </el-row> -->
            <template>
              <el-row :gutter="10">
                <el-col :span="12" class="col-class">
                  <div>复查</div><div>{{}}</div>
                </el-col>
                <el-col :span="12" class="col-class">
                  <div>确认时间</div><div>{{}}</div>
                </el-col>
              </el-row>
            </template>
            <template v-if="type=='bihuan'">
              <el-row :gutter="10">
                <el-col :span="12" class="col-class">
                  <div>安全总监闭环</div><div>{{}}</div>
                </el-col>
                <el-col :span="12" class="col-class">
                  <div>确认时间</div><div>{{}}</div>
                </el-col>
              </el-row>
            </template>
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
import { baseUrl } from '@/router/axios';
import choosePersonDialog from "./choosePersonDialog"
// import {extensionApprovalAPI,hiddenDangerRectificationAPI,hiddenDangerReviewAPI,hiddenDangerClosedLoopAPI} from "@/api/inspection/hiddenTroManage"

export default {
  components: {choosePersonDialog},
  data() {
    return {
      baseUrl: baseUrl + '/resource/file/download?url=',
      title: '',
      type: '',
      taskId: '',
      instanceId: '',
      openEdit: false,
      curChooseName: '',
      form: {},
      commitForm: {},
      formRules: {
        rectifyContent: [
          { required: true, message: "请输入整改描述", trigger: "blur" },
        ],
        auditContent: [
          { required: true, message: "请输入审核意见", trigger: "blur" },
        ],
      }
    };
  },
  created() {
  },
  methods: {
    open(type,row,taskId) {

      this.openEdit = true;

    },
    close() {
      this.resetForm('ruleForm')
      this.openEdit = false;
    },
    choosePerson(data){
      if(this.curChooseName == 'closedLoopManName'){
        this.commitForm.closedLoopManId = data.staffId
        this.commitForm.closedLoopManName = data.staffName
      }
    },
    // 删除图片
    handleImageRemove(index,itemIdx,type){
      this.commitForm[type].splice(index,1)
    },
    // 上传图片成功
    uploadImageSuccess(data,itemIdx,type) {
      this.commitForm[type].push(data);
    },
    // 保存
    submitForm(formName) {

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
  .title{
    display: flex;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0F0F0;
    margin-bottom: 10px;
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
