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
          <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="12">
                <el-form-item label="工程名称" prop="projectName" class="is-required">
                  <el-input
                    clearable
                    v-model="form.projectName"
                    placeholder="请输入工程名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="模型" prop="devModel" class="is-required">
                  <el-select v-model="form.devModel"
                             value-key="id"
                             style="width: 300px"
                             clearable
                             placeholder="请选择工程模型" @change="selectModel">
                    <el-option v-for="item in modelList" :key="item.id" :label="item.modelName" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="参数" prop="params" class="is-required">
                  <el-input
                    type="textarea"
                    style="width: 100%;"
                    :autosize="{ minRows: 6}"
                    clearable
                    v-model="form.params"
                    placeholder="请输入参数"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="实体清单" prop="entities" class="is-required">
                  <el-select v-model="form.entities"
                             value-key="id"
                             style="width: 100%"
                             clearable
                             multiple
                             placeholder="请选择实体清单" @change="selectEntities">
                    <el-option v-for="item in entityList" :key="item.id" :label="item.entityName" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="插件清单" prop="plugins" class="is-required">
                  <el-select v-model="form.plugins"
                             value-key="id"
                             style="width: 100%"
                             clearable
                             multiple
                             placeholder="请选择实体清单" @change="selectPlugins">
                    <el-option v-for="item in pluginList" :key="item.id" :label="item.pluginName" :value="item"></el-option>
                  </el-select>
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
import {projectCreateAPI, projectUpdateAPI, projectGetAPI} from "@/api/develop/gen/project/project";
import {modelListAPI} from "@/api/develop/gen/model/model";
import {entityListAPI} from "@/api/develop/gen/entity/entity";
import {pluginListAPI} from "@/api/develop/gen/plugin/plugin";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        projectName: '',
        devModel: {},
        modelId: '',
        params: '',
        entities: [],
        plugins: [],
      },
      formRules: {
        projectName: [
          { required: true, message: "请输入工程名称", trigger: "blur" },
        ],
        modelId: [
          { required: true, message: "请选择工程模型", trigger: "blur" },
        ],
        params: [
          { required: true, message: "请输入参数列表", trigger: "blur" },
        ],
      },
      modelList: [],
      entityList: [],
      pluginList: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "工程编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    modelListAPI({'queryParams[pageNum]': 1, 'queryParams[pageSize]': 10000}).then((res) => {
      this.modelList = res.data.content
    })
    entityListAPI({'queryParams[pageNum]': 1, 'queryParams[pageSize]': 10000}).then((res) => {
      this.entityList = res.data.content
    })
    pluginListAPI({'queryParams[pageNum]': 1, 'queryParams[pageSize]': 10000}).then((res) => {
      this.pluginList = res.data.content
    })
  },
  methods: {
    open(row) {
        this.openEdit = true;
        this.form = {
          id: '',
          projectName: '',
          devModel: {},
          modelId: '',
          params: '',
          entities: [],
          plugins: [],
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
      const res = await projectGetAPI({id});
      if(res.code == 200){
        this.form = {
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          projectName: res.data.projectName,
          modelId: res.data.modelId,
          devModel: res.data.devModel,
          params: res.data.params,
          entities: res.data.entities,
          plugins: res.data.plugins,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          for(let i in this.form.entities){
            this.form.entities[i].orderNum = i
          }
          // 编辑保存
          if(this.type == 'edit'){
            projectUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            projectCreateAPI(this.form).then((res)=>{
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
    // 选择模型
    selectModel(model){
      this.form.modelId = model.id
      this.form.params = model.paramRepo
    },
    // 选择实体清单
    selectEntities(entities){
      console.log(entities)
    },
    // 选择插件清单
    selectPlugins(plugins){
      console.log(plugins)
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
