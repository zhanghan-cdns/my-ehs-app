<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="80%"
      height="80%"
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
                <el-form-item label="模型名称" prop="modelName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.modelName"
                    placeholder="请输入模型名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="模板类型" prop="modelType" class="is-required">
                  <dict-select
                    style="width: 330px"
                    :dictKey="'DEVELOP_MODEL_TYPE'"
                    v-model="form.modelType.value">
                  </dict-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="参数清单" prop="paramRepo" class="is-required">
                  <el-input
                    type="textarea"
                    style="width: 100%"
                    clearable
                    v-model="form.paramRepo"
                    placeholder="请输入参数清单"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-tabs v-model="templateIndex" type="card" @tab-click="switchTemplate" @tab-remove="removeTemplate">
                <el-tab-pane v-for="(item,index) in form.modelTemplates" :key="index" closable="true" :label="item.path" :name="index">
                  <el-col span="12">
                    <el-form-item label="序号" prop="orderNum" class="is-required">
                      <el-input
                        type="number"
                        style="width: 100%"
                        clearable
                        v-model="item.orderNum"
                        placeholder="请输入模板序号"
                      ></el-input>
                    </el-form-item>
                    <el-input
                      type="textarea"
                      style="width: 100%"
                      :autosize="{ minRows: 12}"
                      clearable
                      v-model="item.templateContext"
                      placeholder="请输入参数清单"
                    ></el-input>
                  </el-col>
                  <el-col span="12">
                    <el-tabs v-model="methodIndex" tab-position="left" @tab-click="switchMethod" @tab-remove="removeMethod">
                      <el-tab-pane v-for="(method,index) in item.methods" :key="index" closable="true" :label="method.methodName" :name="index">
                        <el-form-item label="方法名称" prop="methodName" class="is-required">
                          <el-input
                            type="text"
                            style="width: 100%"
                            clearable
                            v-model="method.methodName"
                            placeholder="请输入方法名称"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="序号" prop="orderNum" class="is-required">
                          <el-input
                            type="number"
                            style="width: 100%"
                            clearable
                            v-model="method.orderNum"
                            placeholder="请输入方法序号"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="方法类型" prop="methodType" class="is-required">
                          <dict-select
                            v-if="method.methodType&&method.methodType.key"
                            style="width: 100%"
                            :dictKey="'DEVELOP_FIELD_TYPE'"
                            placeholder="请选择方法类型"
                            v-model="method.methodType.key">
                          </dict-select>
                        </el-form-item>
                        <el-form-item label="导入包" prop="importPackage">
                          <el-input
                            type="text"
                            style="width: 100%"
                            clearable
                            v-model="method.importPackage"
                            placeholder="请输入导入包"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="节点位置" prop="nodePos" class="is-required">
                          <el-input
                            type="text"
                            style="width: 100%"
                            clearable
                            v-model="method.nodePos"
                            placeholder="请输入节点位置"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="方法体" prop="methodBody" class="is-required">
                          <el-input
                            type="textarea"
                            style="width: 100%"
                            :autosize="{minRows: 6}"
                            clearable
                            v-model="method.methodBody"
                            placeholder="请输入方法体"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>
                      <el-tab-pane label="+" closable="false" name="addMethod"></el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-tab-pane>
                <el-tab-pane label="+" closable="false" name="addTemplate"></el-tab-pane>
              </el-tabs>
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
    <el-dialog :modal-append-to-body="false"
      title="请输入模板路径"
      :visible.sync="templateAddDialog"
      width="30%">
        <el-input
          type="text"
          style="width: 100%"
          clearable
          v-model="templatePath"
          placeholder="请输入模板路径"
        ></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="templateAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addTemplate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :modal-append-to-body="false"
               title="请输入方法名称"
               :visible.sync="methodAddDialog"
               width="30%">
      <el-input
        type="text"
        style="width: 100%"
        clearable
        v-model="methodName"
        placeholder="请输入方法名称"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="methodAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addMethod">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {modelCreateAPI, modelUpdateAPI, modelGetAPI} from "@/api/develop/gen/model/model";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        modelName: '',
        modelType: {
          value:"",
          key:""
        },
        paramRepo: '',
        modelTemplates: [],
      },
      formRules: {
        modelName: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
        ],
        modelType: [
          { required: true, message: "请输入模型类型", trigger: "blur" },
        ],
      },
      templateAddDialog: false,
      templatePath: '',
      templateIndex: 0,
      methodAddDialog: false,
      methodName: '',
      methodIndex: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "模板模型编辑面板",
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
          modelName: '',
          modelType: {
            value:"",
            key:""
          },
          modelTemplates: [],
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
      const res = await modelGetAPI({id});
      if(res.code == 200){
        this.form = {
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          modelName: res.data.modelName,
          modelType: res.data.modelType,
          paramRepo: res.data.paramRepo,
          modelTemplates: res.data.modelTemplates,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            modelUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            modelCreateAPI(this.form).then((res)=>{
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
    },
    // 切换模板
    switchTemplate(e){
       if(e.name === 'addTemplate'){
         this.templateAddDialog = true
       }
    },
    // 模板添加
    addTemplate(){
      this.templateAddDialog = false
      let orderNum = 0
      if(this.form.modelTemplates.length > 0){
        orderNum = this.form.modelTemplates[this.form.modelTemplates.length - 1].orderNum + 1
      }
      this.form.modelTemplates.push({
        path: this.templatePath,
        templateContext: '',
        methods: [],
        orderNum: orderNum,
      })
      this.templateIndex = this.form.modelTemplates.length - 1
    },
    // 删除模板
    removeTemplate(index){
       this.form.modelTemplates.splice(index, 1)
    },
    // 切换方法
    switchMethod(e){
       if(e.name === 'addMethod'){
         this.methodAddDialog = true
       }
    },
    // 方法添加
    addMethod(){
      this.methodAddDialog = false
      let orderNum = 0
      if(this.form.modelTemplates[this.templateIndex].methods.length > 0){
        orderNum = this.form.modelTemplates[this.templateIndex].methods[this.form.modelTemplates[this.templateIndex].methods.length - 1].orderNum + 1
      }
      this.form.modelTemplates[this.templateIndex].methods.push({
        methodType: {
          value:"",
          key:""
        },
        importPackage: '',
        methodName: this.methodName,
        methodBody: '',
        nodePos: '',
        orderNum: orderNum
      })
      this.methodIndex = this.form.modelTemplates[this.templateIndex].methods.length - 1
    },
    // 移除方法
    removeMethod(index){
       this.form.modelTemplates[this.templateIndex].methods.splice(index, 1)
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
