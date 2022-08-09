<template>
  <div class="entityField">
    <el-form :model="form" label-width="100px" class="demo-ruleForm" ref="ruleForm1" :rules="formRules">
      <el-row>
        <el-col span="6">
          <el-form-item label="关系类型" prop="relationType" class="is-required">
            <dict-select
              style="width: 150px"
              :dictKey="'DEVELOP_ENTITY_RELATION'"
              v-model="relation.relationType">
            </dict-select>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="主实体字段" prop="mainEntityField" class="is-required">
            <el-select v-model="relation.mainEntityFieldId"
                       style="width: 150px"
                       clearable
                       placeholder="请选择主实体字段">
              <el-option v-for="(item,index) in mainFields" :label="item.fieldName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="从实体" prop="subEntity" class="is-required">
            <el-select value-key="id" v-model="relation.subEntity"
                       style="width: 150px"
                       clearable
                       placeholder="请选择从实体" @change="loadSubEntityFiled" @clear="clearSubEntity">
              <el-option v-for="(item,index) in entityList" :label="item.entityName" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="从实体字段" prop="subEntityField" class="is-required">
            <el-select value-key="id" v-model="relation.subEntityField"
                       style="width: 150px"
                       clearable
                       placeholder="请选择从实体字段" @change="selectEntityFiled" @clear="clearSubEntityField">
              <el-option v-for="(item,index) in subEntityFields" :label="item.fieldName" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: center;">
        <el-button size="mini" type="success" icon="el-icon-check" circle @click="saveRelation()"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" v-if="relation.id" circle @click="deleteRelation()"></el-button>
      </el-row>
    </el-form>
    <el-divider></el-divider>
  </div>
</template>
<script>

import {
  entityRelationBatchRemoveAPI,
  entityRelationCreateAPI,
  entityRelationUpdateAPI
} from "@/api/develop/gen/entity/entityRelationApi";
import {entityListAPI} from "@/api/develop/gen/entity/entity";

export default {
  props: {
    relationObj:{
      type: Object,
      default: {},
    },
    mainFields:{
      type: Array,
      default: [],
    }
  },
  data () {
    return {
      type: 'create',
      relation: {
        id: '',
        subEntityId: '',
        subEntityFieldId: '',
        subEntity: {},
        subEntityField: {},
        mainEntityId: '',
        mainEntityField: {},
        relationType: {
          key:"",
          value:""
        },
      },
      entityList: [],
      subEntityFields: [],
    }
  },
  created() {
    this.loadEntityList()
    this.relation = this.relationObj
    if(!this.relation.version){
      this.relation.verison = 0
    }
    if(this.relation.subEntity){
      this.subEntityFields = this.relation.subEntity.fields
    }
    if(this.relation.id && this.relation.id !== ''){
      this.type = 'edit'
    }
  },
  methods: {
    //加载实体列表
    loadEntityList: function (){
      entityListAPI({'queryParams[pageSize]': 10000, 'queryParams[pageNum]': 1}).then((res)=>{
        this.entityList = res.data.content;
      })
    },
    //加载从实体字段下拉
    loadSubEntityFiled: function(subEntity){
      this.subEntityFields = subEntity.fields
      this.relation.subEntityId = subEntity.id
    },
    //选择字段
    selectEntityFiled: function(field){
      this.relation.subEntityFieldId = field.id
    },
    //清空从实体
    clearSubEntity: function(){
      this.relation.subEntity = {}
      this.relation.subEntityId = null
      this.clearSubEntityField()
    },
    //清空从实体字段
    clearSubEntityField: function(){
      this.relation.subEntityFieldId = null
      this.relation.subEntityField = {}
    },
    //保存字段
    saveRelation: function () {
      console.log(this.type)
      // 编辑保存
      if(this.type === 'edit'){
        entityRelationUpdateAPI(this.relation).then((res)=>{
          this.relation = res.data
          this.$message.success('保存成功!')
        })
      }else{
        entityRelationCreateAPI(this.relation).then((res)=>{
          this.relation = res.data
          this.$message.success('保存成功!')
        })
      }
    },
    //删除字段
    deleteRelation: function (){
      if(this.relation.id != ''){
        entityRelationBatchRemoveAPI({ids : this.relation.id}).then((res)=>{
          this.$message.success('删除成功!')
          this.$emit('relationRemoveEvent', this.orderIndex)
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.is-required{
  width: 100px;
}
</style>
