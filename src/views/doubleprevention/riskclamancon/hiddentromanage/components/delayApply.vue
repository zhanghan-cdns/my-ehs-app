<template>
  <div id>
    <basicDialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="50%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="120px" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="12">
                <el-form-item label="审批人" prop="approverName">
                  <el-input
                    style="width: 330px"
                    clearable
                    disabled
                    v-model="form.approverName"
                    placeholder="请输入审批人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="原计划日期" prop="originalPlannedDate">
                  <el-date-picker
                    disabled
                    style="width:330px"
                    v-model="form.originalPlannedDate"
                    type="date"
                    value-format="yyyy-MM-dd"
					          format="yyyy-MM-dd"
                    placeholder="请选择原计划日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="延期时间" prop="delayDate" class="is-required">
                  <el-date-picker
                    style="width:330px"
                    v-model="form.delayDate"
                    type="date"
                    value-format="yyyy-MM-dd"
					          format="yyyy-MM-dd"
                    placeholder="请选择延期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="延期申请原因" prop="reason" class="is-required">
                  <el-input
                    style="width: 830px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.reason"
                    placeholder="请输入延期申请原因"
                  ></el-input>
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
  </div>
</template>

<script>
// import {extensionRequestAPI} from "@/api/inspection/hiddenTroManage"
export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      taskId: '',
      instanceId: '',
      form: {},
      formRules: {
        delayDate: [
          { required: true, message: "请选择延期时间", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入延期申请原因", trigger: "blur" },
        ],
      }
    }
  },
  props: {
    title: {
      type: String,
      default: "延期申请编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  methods:{
    open(row,taskId) {
      this.openEdit = true;
      this.taskId = taskId
      this.instanceId = row.processInstanceId
      this.form = {
        hiddenDangerId: row.id, //隐患id
        approverId: row.deferredReviewerId,//审批人id
        approverName: row.deferredReviewer&&row.deferredReviewer.nickName,
        originalPlannedDate: row.rectifyDate,  //原计划日期
        delayDate: '', //延期日期
        reason: '',   //延期原因
      }
    },
    close() {
      this.resetForm('ruleForm')
      this.openEdit = false;
    },
    // 保存
    submitForm(formName) {
      let params = {
        taskId: this.taskId,
        instanceId: this.instanceId,
        delayRecord: this.form
      }
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          extensionRequestAPI(params).then((res)=>{
            this.$message.success('延期申请成功!')
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
  }
};
</script>

<style>
</style>
