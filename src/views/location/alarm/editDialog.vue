<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="60%"
      height="50%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm" :rules="formRules" style="width: 100%">
            <el-row>
              <el-col span="12">
                <el-form-item label="对象类型" prop="thingType" class="is-required">
                  <el-input
                    style="width: 330px"
                    v-model="form.things.type.value"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="对象名称" prop="name" class="is-required">
                  <el-input
                    style="width: 330px"
                    v-model="form.things.name"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="报警类型" prop="alarmType" class="is-required">
                  <el-input
                    style="width: 330px"
                    v-model="form.type.value"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="报警时间" prop="alarmTime" class="is-required">
                  <el-input
                    style="width: 330px"
                    v-model="form.alarmTime"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="报警消息" prop="msg" class="is-required">
                  <el-input
                    type="textarea"
                    v-model="form.msg"
                    :autosize="{ minRows: 5}"
                    readonly>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>

import Dict from "@/components/basic-dict";
import {locationAlarmCreateAPI, locationAlarmGetAPI, locationAlarmUpdateAPI} from "@/api/location/alarm/alarm";

export default {
  components: {Dict},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: 0,
        things: {},
        type: {},
        msg: '',
        thingId: 0,
        alarmTime: ''
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "报警详情面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {

  },
  methods: {
    open(row) {
      this.openEdit = true;
      this.form = {
        id: 0,
        things: {
          type: {}
        },
        type: {},
        msg: '',
        thingId: 0,
        alarmTime: ''
      }
      if(row && row.id != ''){
        this.type = 'edit'
        this.getRetuenForm(row.id)
      }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id){
      const res = await locationAlarmGetAPI({id: id});
      if(res.code == 200){
        this.form = {
          id: res.data.id,
          version: res.data.version,

          things: res.data.things,
          type: res.data.type,
          msg: res.data.msg,
          thingId: res.data.thingId,
          alarmTime: res.data.alarmTime
        }
      }
    },
    // 保存
    submitForm(formName) {
      console.log(this.form)
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            locationAlarmUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            locationAlarmCreateAPI(this.form).then((res)=>{
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
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
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
