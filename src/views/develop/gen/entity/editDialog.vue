<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="1400px"
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
                <el-form-item label="实体名称" prop="entityName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.entityName"
                    placeholder="请输入实体名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="实体描述" prop="entityDescribe" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.entityDescribe"
                    placeholder="请输入实体名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="是否继承基础类" prop="isExtendBase" class="is-required">
                  <dict-select
                    style="width: 330px"
                    :dictKey="'COMMON_JUDGE'"
                    v-model="form.isExtendBase.key">
                  </dict-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="是否关联组织" prop="isLinkOrg" class="is-required">
                  <dict-select
                    style="width: 330px"
                    :dictKey="'COMMON_JUDGE'"
                    v-model="form.isLinkOrg.key">
                  </dict-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>实体字段</span>
              </div>
              <div v-for="(item,index) in form.fields" :key="index">
                <EntityField :fieldObj="item" :orderIndex="index" :key="index" :lastIndex="form.fields.length - 1" @fieldRemoveEvent="fieldRemoveEvent" @upFieldIndex="upFieldIndex" @downFieldIndex="downFieldIndex"></EntityField>
              </div>
              <el-row style="text-align: center">
                <el-button size="mini" type="primary" icon="el-icon-plus" style="text-align: center" circle @click="addField()"></el-button>
              </el-row>
            </el-card>

            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>关联关系</span>
              </div>
              <div v-for="(item,index) in form.relations" :key="index">
                <EntityRelation :relationObj="item" :mainFields="form.fields" :key="index"></EntityRelation>
              </div>
              <el-row style="text-align: center">
                <el-button size="mini" type="primary" icon="el-icon-plus" style="text-align: center" circle @click="addRelation()"></el-button>
              </el-row>
            </el-card>
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
import {entityCreateAPI, entityUpdateAPI, entityGetAPI} from "@/api/develop/gen/entity/entity";
import EntityField from "@views/develop/gen/entity/entityField";
import EntityRelation from "@views/develop/gen/entity/entityRelation";

export default {
  components: {EntityRelation, EntityField},
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        entityName: '',
        entityDescribe: '',
        isExtendBase: {
          value:"",
          key:""
        },
        isLinkOrg: {
          value:"",
          key:""
        },
        relations: [],
        fields: [],
        orderNum: 0,
      },
      formRules: {
        entityName: [
          { required: true, message: "请输入实体名称", trigger: "blur" },
        ],
        entityDescribe: [
          { required: true, message: "请输入实体描述", trigger: "blur" },
        ],
        isExtendBase: [
          { required: true, message: "请选择是否继承基础", trigger: "blur" },
        ],
        isLinkOrg: [
          { required: true, message: "请选择是否关联组织", trigger: "blur" },
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "实体编辑面板",
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
        // this.form = {
        //   id: '',
        //   entityName: '',
        //   entityDescribe: '',
        //   isExtendBase: {
        //     value:"",
        //     key:""
        //   },
        //   isLinkOrg: {
        //     value:"",
        //     key:""
        //   },
        //   fields: [],
        //   relations: [],
        //   orderNum: 0
        // }
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
      const res = await entityGetAPI({id});
      if(res.code == 200){
        this.form = {
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          entityName: res.data.entityName,
          entityDescribe: res.data.entityDescribe,
          isExtendBase: res.data.isExtendBase,
          isLinkOrg: res.data.isLinkOrg,
          fields: res.data.fields,
          relations: res.data.relations,
          orderNum: res.data.orderNum,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            entityUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            entityCreateAPI(this.form).then((res)=>{
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
    //添加字段
    addField(){
       let orderNum = 0;
       if(this.form.fields.length > 0 && this.form.fields[this.form.fields.length - 1].orderNum){
         orderNum = this.form.fields[this.form.fields.length - 1].orderNum + 1;
       }
       this.form.fields.push({
         devEntityId: this.form.id,
         fieldName: '',
         fieldDescribe: '',
         javaType: {
           key:"",
           value:""
         },
         dataType: {
           key:"",
           value:""
         },
         dataValid: '',
         importPackage: '',
         devFieldApi: {
           allowableValues:'',
           access:'',
           notes:'',
           dataType:"",
           required:{
             key:"",
             value:""
           },
           hidden:{
             key:"",
             value:""
           },
           example:'',
         },
         orderNum: orderNum,
       });
    },
    //添加关系
    addRelation(){
      this.form.relations.push({
        mainEntityId: this.form.id,
        subEntity:{},
        subEntityId: '',
        mainDevEntityField: {},
        subDevEntityField: {},
        mainEntityFieldId: '',
        subEntityFieldId: '',
        relationType: {
          value:"",
          key:""
        },
      });
    },
    //移除字段
    fieldRemoveEvent(orderIndex){
       this.form.fields.splice(orderIndex, 1);
    },
    //保存字段
    fieldSaveEvent(field, orderIndex){
       this.form.fields[orderIndex] = field;
    },
    //上移字段
    upFieldIndex(index){
       console.log(this.form.fields)
       let temp1 = JSON.parse(JSON.stringify(this.form.fields))[index];
       let temp2 = JSON.parse(JSON.stringify(this.form.fields))[index - 1];
       this.form.fields[index] = temp2;
       this.form.fields[index - 1] = temp1;
       console.log(temp1, temp2, this.form.fields);
    },
    //下移字段
    downFieldIndex(index){
      console.log(this.form.fields,'222');
      let temp = this.form.fields
      temp[1] = temp.splice(0,1,temp[1])[0];
      console.log(this.form.fields,'ddd');
      // this.$forceUpdate()
      console.log(this.form,'form')
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
