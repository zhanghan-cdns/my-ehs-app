<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="60%"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="150px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="12">
                <el-form-item label="电子围栏名称" prop="name" class="is-required">
                  <el-input
                    type="text"
                    v-model="form.name"
                    placeholder="请输入电子围栏名称">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="启用状态" prop="state" class="is-required">
                  <dict v-model="form.state" dict-key="LOCATION_FENCE_ENABLE" tips="请选择启用状态"></dict>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="围栏区域" prop="areaBuilding" class="is-required">
                  <el-cascader
                    ref="buildingSelector"
                    v-model="selectBuildings"
                    :options="buildingList"
                    :props="{multiple: true, checkStrictly: true, label: 'name', value: 'id', emitPath:false }"
                    @change="changeSelectMode"
                    clearable>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col span="12" style="text-align: center">
                <el-button round size="medium" @click="addRule">添加规则</el-button>
              </el-col>
            </el-row>
            <div v-for="(item, index) in form.rules" :key="index">
              <RuleItem :params="item" :thing-list="thingList" :index="index" @saveRule="saveRule" @delRule="delRule"></RuleItem>
            </div>
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

import Dict from "@/components/basic-dict"
import {buildingAreaListAPI} from "@/api/location/buildingarea/buildingarea";
import {fenceCreateAPI, fenceGetAPI, fenceUpdateAPI} from "@/api/location/fence/fence";
import {thingsListAPI} from "@/api/location/things/things";
import RuleItem from "@views/location/fence/ruleItem";

export default {
  components: {RuleItem, Dict},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        name: '',
        buildingAreas: [],
        state: {},
        rules: [],
      },
      formRules: {

      },
      buildingList: [],
      thingList: [],
      selectBuildings: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "电子围栏编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {
    this.loadBuildings();
    this.loadThingList()
  },
  methods: {
    open(row) {
      this.openEdit = true;
      this.form = {
        name: '',
        buildingAreas: [],
        state: {},
        rules: [],
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
      const res = await fenceGetAPI({id});
      if(res.code == 200){
        this.form = {
          id: res.data.id,
          version: res.data.version,   // 不传version会是新增

          name: res.data.name,
          buildingAreas: res.data.buildingAreas,
          state: res.data.state.key,
          rules: res.data.rules
        }
        let tempBuildings = []
        for(let i in res.data.buildingAreas){
          tempBuildings.push(res.data.buildingAreas[i].id)
        }
        this.selectBuildings = tempBuildings
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            fenceUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            fenceCreateAPI(this.form).then((res)=>{
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
    // 加载建筑区域
    loadBuildings(){
      const params = {
        "queryParams[pageSize]": 99999,
        "queryParams[pageNum]": 1
      }
      buildingAreaListAPI(params).then((res)=>{
        this.buildingList = res.data.content
      })
    },
    // 改变选中状态
    changeSelectMode(){
      let selectVal = this.$refs.buildingSelector.getCheckedNodes()
      let result = []
      for(let i in selectVal){
        result.push(selectVal[i].data)
      }
      this.form.buildingAreas = result
    },
    // 加载对象列表
    loadThingList(){
      const params = {
        "queryParams['pageSize']" : 99999,
        "queryParams['pageNum']" : 1
      }
      thingsListAPI(params).then((res)=>{
        this.thingList = res.data.content
      })
    },
    // 添加规则
    addRule(){
      this.form.rules.push({thingId: '[]', time: '[]', type: {}})
    },
    // 删除规则
    delRule(index){
      this.form.rules.splice(index, 1)
    },
    // 保存规则
    saveRule(params, index){
      this.form.rules[index] = params
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
