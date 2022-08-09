<template>
  <div class="entityField">
    <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm1" :rules="formRules">
      <el-row>
        <el-col span="4">
          <el-input
            style="width: 200px"
            clearable
            v-model="field.fieldName"
            placeholder="请输入字段名称"
          ></el-input>
        </el-col>
        <el-col span="4">
          <el-input
            style="width: 200px"
            clearable
            v-model="field.fieldDescribe"
            placeholder="请输入字段描述"
          ></el-input>
        </el-col>
        <el-col span="4">
          <dict-select
            style="width: 200px"
            :dictKey="'DEVELOP_FIELD_TYPE'"
            v-model="field.javaType.key">
          </dict-select>
        </el-col>
        <el-col span="4">
          <dict-select
            style="width: 200px"
            :dictKey="'DEVELOP_DATA_TYPE'"
            v-model="field.dataType.key">
          </dict-select>
        </el-col>
        <el-col span="4">
            <el-input
              style="width: 200px"
              clearable
              v-model="field.dataValid"
              placeholder="请输入数据校验"
            ></el-input>
        </el-col>
        <el-col span="4">
            <el-input
              style="width: 200px"
              clearable
              v-model="field.importPackage"
              placeholder="请输入导入包名"
            ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-collapse>
          <el-collapse-item title="API" name="1">
            <el-row>
              <el-input
                style="width: 200px"
                clearable
                v-model="field.devFieldApi.allowableValues"
                placeholder="请输入允许数据"
              ></el-input>
              <el-input
                style="width: 200px"
                clearable
                v-model="field.devFieldApi.access"
                placeholder="请输入访问性"
              ></el-input>
              <el-input
                style="width: 200px"
                clearable
                v-model="field.devFieldApi.dataType"
                placeholder="请输入数据类型"
              ></el-input>
              <el-input
                style="width: 200px"
                clearable
                v-model="field.devFieldApi.notes"
                placeholder="请输入备注"
              ></el-input>
              <dict-select
                style="width: 200px"
                :dictKey="'COMMON_JUDGE'"
                placeholder="请输入是否必须"
                v-model="field.devFieldApi.required.key">
              </dict-select>
              <dict-select
                style="width: 200px"
                :dictKey="'COMMON_JUDGE'"
                placeholder="请输入是否隐藏"
                v-model="field.devFieldApi.hidden.key">
              </dict-select>
              <el-input
                style="width: 200px"
                clearable
                v-model="field.devFieldApi.example"
                placeholder="示例"
              ></el-input>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row>
      <el-row style="text-align: center;">
        <el-button size="mini" type="primary" v-if="orderIndex>0" icon="el-icon-top" circle @click="up(orderIndex)"></el-button>
        <el-button size="mini" type="primary" v-if="orderIndex!=lastIndex" icon="el-icon-bottom" circle @click="down(orderIndex)"></el-button>
        <el-button size="mini" type="success" icon="el-icon-check" circle @click="saveField()"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" v-if="field.id" circle @click="deleteField()"></el-button>
      </el-row>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>
<script>

import {
  entityFieldBatchRemoveAPI,
  entityFieldCreateAPI,
  entityFieldUpdateAPI
} from "@/api/develop/gen/entity/entityFiled";

export default {
  props: {
    fieldObj:{
      type: Object,
      default: {}
    },
    orderIndex:{
      type: String,
      default: ''
    },
    lastIndex:{
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      type: 'create',
      field: {
        id: '',
        fieldName: '',
        fieldDescribe: '',
        javaType: {
          value:"",
          key:""
        },
        dataType: {
          value:"",
          key:""
        },
        dataValid: '',
        importPackage: '',
        version: 0,
        orderNum: 0,
      }
    }
  },
  created() {
    this.field = this.fieldObj;
    if(this.field.id != ''){
      this.type = 'update';
    }
  },
  methods: {
    //保存字段
    saveField: function () {
      // 编辑保存
      if(this.type == 'edit'){
        entityFieldUpdateAPI(this.field).then((res)=>{
          this.field = res.data
          this.$message.success('保存成功!')
          //this.$emit("fieldSaveEvent")
        })
      }else{
        entityFieldCreateAPI(this.field).then((res)=>{
          this.field = res.data
          this.$message.success('保存成功!')
          //this.$emit("fieldSaveEvent", this.field, this.orderIndex)
        })
      }
    }
    ,
    //删除字段
    deleteField: function (){
      if(this.field.id != ''){
        entityFieldBatchRemoveAPI({ids : this.field.id}).then(()=>{
          this.$message.success('删除成功!')
          this.$emit('fieldRemoveEvent', this.orderIndex)
        })
      }
    },
    //上移字段
    up: function(index){
      this.$emit("upFieldIndex", index)
    },
    //下移字段
    down: function(index){
      this.$emit("downFieldIndex", index)
    },
  }
}
</script>

<style scoped lang='scss'>
.is-required{
  width: 100px;
}
</style>
