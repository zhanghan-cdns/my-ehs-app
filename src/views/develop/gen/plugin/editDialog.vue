<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="80%"
      height="60%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="200px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="12">
                <el-form-item label="插件名称" prop="pluginName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.pluginName"
                    placeholder="请输入插件名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="注入位置" prop="injectionPosition" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.injectionPosition"
                    placeholder="请输入注入位置"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="插件内容" prop="scriptContent" class="is-required">
                    <el-input
                      type="textarea"
                      style="width: 100%;"
                      :autosize="{ minRows: 17}"
                      clearable
                      v-model="form.scriptContent"
                      placeholder="请输入插件内容"
                    >
                    </el-input>
                </el-form-item>
              </el-col>
              <el-col span="11" style="float: right">
                  <highlight-code lang="javascript" :code="form.scriptContent"></highlight-code>
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
import {pluginCreateAPI, pluginUpdateAPI, pluginGetAPI} from "@/api/develop/gen/plugin/plugin";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        pluginName: '',
        injectionPosition: '',
        scriptContent: '',
      },
      formRules: {
        pluginName: [
          { required: true, message: "请输入插件名称", trigger: "blur" },
        ],
        injectionPosition: [
          { required: true, message: "请输入注入类型", trigger: "blur" },
        ],
        scriptContent: [
          { required: true, message: "请输入插件内容", trigger: "blur" },
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "插件编辑面板",
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
          id: '',
          pluginName: '',
          injectionPosition: '',
          scriptContent: '',
        }
        if(row && row.id){
          this.type = 'edit'
          this.getRetuenForm(row.id)
        }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id){
      const res = await pluginGetAPI({id});
      if(res.code == 200){
        this.form = {
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          pluginName: res.data.pluginName,
          injectionPosition: res.data.injectionPosition,
          scriptContent: res.data.scriptContent,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            pluginUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            pluginCreateAPI(this.form).then((res)=>{
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
