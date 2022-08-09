<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
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
                  <el-form-item label="引擎名称" prop="name" class="is-required">
                    <el-input
                      style="width: 330px"
                      clearable
                      v-model="form.name"
                      placeholder="请输入引擎名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="12">
                  <el-form-item label="引擎类型" prop="type" class="is-required">
                    <dict v-model="form.type" dictKey="LOCATION_ENGINE"></dict>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="24">
                  <el-form-item label="引擎配置" prop="config">
                    <el-input
                      type="textarea"
                      style="width: 100%"
                      :autosize="{ minRows: 14}"
                      clearable
                      v-model="form.config"
                      placeholder="请输入引擎配置"
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

import {engineConfigCreateAPI, engineConfigGetAPI, engineConfigUpdateAPI} from "@/api/location/config/engine/engine";
import Dict from "@/components/basic-dict";

export default {
  components: {Dict},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        name: '',
        type: '',
        config: '',
      },
      formRules: {
        name: [
          { required: true, message: "请输入引擎名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "引擎配置编辑面板",
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
          name: '',
          type: '',
          config: '',
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
      const res = await engineConfigGetAPI({id: id});
      if(res.code == 200){
        this.form = {
          id: res.data.id,
          version: res.data.version,

          name: res.data.name,
          type: res.data.type.key,
          config: res.data.config,
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
            engineConfigUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            engineConfigCreateAPI(this.form).then((res)=>{
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
