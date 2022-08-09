<template>
  <div>
    <basicDialog
      :icon="icon"
      :title="title"
      width="1250px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="content">
          <!-- 左侧 -->
          <div class="leftContent">
            <el-steps
              :active="active"
              space-size="50px"
              direction="vertical"
              finish-status="wait"
              align-center
              :space="80"
              style="margin-top: 20px"
            >
              <el-step title="基本信息" icon="iconfont icon-qiyejibenxinxi">
              </el-step>
            </el-steps>
          </div>
          <!-- 右侧  -->
          <div class="container">
            <el-form
              :size="'small'"
              :model="form"
              label-width="auto"
              class="demo-ruleForm"
              ref="formRef"
              :rules="formRules"
            >

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="姓名"
                    prop="entPersonName"
                    class="is-required"
                  >
                    <el-input clearable v-model="form.entPersonName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="照片">
                <el-upload
                    class="avatar-uploader"
                    :file-list="form.photoUpload"
                    :show-file-list="false"
                    name="file"
                    list-type="picture-card"
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'photoUpload');
                      }
                    "
                  >
                    <template v-if="form.photoUpload ">
                      <img  v-for="item in form.photoUpload" :key="item.uid" :src="imgUrlL + item.url" class="avatar" />

                    </template>

                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>


                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="topCentent" label="性别">
                    <el-radio-group v-model="form.entPersonGender">
                      <el-radio
                      v-for="(item,index) in sexData"
                      :key="index"
                      :label="item.dictValue"
                      >{{item.dictValueName}}</el-radio>
                    </el-radio-group>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="topCententTwo" label="工号">
                    <el-input v-model="form.jobNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-input v-model="form.department"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位">
                    <el-input v-model="form.operatingPost"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="籍贯">
                    <el-input v-model="form.nativePlace"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="人员类型">
                    <el-select
                      v-model="form.entPersonType"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option v-for="item in optionsPersonnel" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="政治面貌">
                    <el-select
                      v-model="form.politicalOutlook"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                      <el-option v-for="item in political" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="护照号码">
                    <el-input clearable v-model="form.passportNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工卡绑定">
                    <el-input clearable v-model="form.jobCardBind">
                      <el-button slot="append" icon="el-icon-search" @click="getJobCard" class="card" type="primary">绑卡</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="职务">
                    <el-input v-model="form.postContent"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职称">
                    <el-input v-model="form.postName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系方式" prop="entPersonTel">
                    <el-input v-model="form.entPersonTel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="办公电话">
                    <el-input v-model="form.officeTpNum"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="移动电话">
                    <el-input v-model="form.mobilePhone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮箱">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工龄">
                    <el-input v-model="form.workingYears"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="民族" prop="entPersonNation">
                    <el-input v-model="form.entPersonNation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="婚姻状况">
                    <el-select
                      v-model="form.maritalStatus"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option v-for="item in marriage" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
                    </el-select>

                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="健康状况">
                    <el-input v-model="form.entPersonHealth"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最高学历" prop="entPersonEducation">
                    <el-input v-model="form.entPersonEducation"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最高学位">
                    <el-select
                      v-model="form.highestDegree"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option v-for="item in degree" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
                    </el-select>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="专业">
                    <el-input v-model="form.entPersonSubject"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="毕业学校" prop="entPersonSchool">
                    <el-input v-model="form.entPersonSchool"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="证件类型">

                    <el-select
                      v-model="form.entPersonCertType"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option v-for="item in certificate" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件号码" prop="entPersonCertNumber">
                    <el-input v-model="form.entPersonCertNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出生日期">
                    <el-date-picker
                      v-model="form.birthday"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮政编码">
                    <el-input v-model.number="form.entPersonPostalCode"></el-input>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工作单位">
                    <el-input v-model="form.entPersonWorkUnit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="进入单位时间">
                    <el-date-picker
                      v-model="form.entPersonWorkStartTime"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="是否3年以上化工行业从业经历"
                    label-width="220px"
                  >
                    <el-radio-group v-model="form.isPracticeThree">
                      <el-radio
                      v-for="item in chemical"
                      :key="item.dictKeyId"
                      :label="item.dictValue"
                      >{{item.dictValueName}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="户籍所在地">
                    <el-input v-model="form.entPersonHousehold"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="从业所在地">
                    <el-input v-model="form.entPersonWorkPlace"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="毕业证书编号">
                    <el-input v-model="form.gradCertNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="注册安全工程师证号">
                    <el-input v-model="form.safetyEngineerNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职称证书编号">
                    <el-input v-model="form.technicalTitleNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="证书有效期起">
                    <el-date-picker
                      v-model="form.certificateValidityStart"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证书有效期止">
                    <el-date-picker
                      v-model="form.certificateValidityEnd"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="工作职责">
                    <el-input placeholder="工作职责" clearable v-model="form.operatingDuty" type="textarea" :rows="4"
                              style="width: 98.5%" :size="size"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="工作经历">
                    <el-input placeholder="工作经历" clearable v-model="form.workExperience" type="textarea" :rows="4"
                              style="width: 98.5%" :size="size"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="责任区域">
                    <el-input placeholder="责任区域" clearable v-model="form.areaResponsibility" type="textarea" :rows="4"
                              style="width: 98.5%" :size="size"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="备注">
                    <el-input placeholder="备注" clearable v-model="form.remark" type="textarea" :rows="4"
                              style="width: 98.5%" :size="size"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="工作简历">
                    <basic-upload
                      key="file"
                      :model="true"
                      @onSuccess="(fileList)=>onSuccess(fileList,'entPersonWorkResume')"
                      @onRemove="(fileList)=>onRemove(fileList,'entPersonWorkResume')"
                      :photos="form.entPersonWorkResume"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="学历证书">
                    <basic-upload
                      key="picture"
                      @onSuccess="(fileList)=>onSuccess(fileList,'academicCertificate')"
                      @onRemove="(fileList)=>onRemove(fileList,'academicCertificate')"
                      :photos="form.academicCertificate"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-row>
                <el-col>
                  <el-form-item label="上传证书">
                    <basic-upload
                      key="file"
                      :model="true"
                      @onSuccess="(fileList)=>onSuccess(fileList,'certificateUpload')"
                      @onRemove="(fileList)=>onRemove(fileList,'certificateUpload')"
                      :photos="form.certificateUpload"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-row>
                <el-col>
                  <el-form-item label="上传附件">
                    <basic-upload
                      key="file2"
                      :model="true"
                      @onSuccess="(fileList)=>onSuccess(fileList,'enclosureUpload')"
                      @onRemove="(fileList)=>onRemove(fileList,'enclosureUpload')"
                      :photos="form.enclosureUpload"
                    ></basic-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存</el-button
          >
          <el-button type="success" @click="resetForm('form')"
            >重置</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import { entPersonnelCreateAPI,entPersonnelGetAPI,entPersonnelUpdateAPI,entPersonnelRemoveAPI } from "@/api/enterprise/entPersonnel/index";
import { uploadAPI } from "@/api/system/common";
import { baseUrl,imgUrl } from "@/router/axios";
import { fastGetDictAPI } from "@/api/system/dictionary";//字典

// import "@/assets/icon/editorPage/iconfont.css";
// import "@/assets/icon/editDialog/iconfont.css";
import { isArray, isObject } from 'xe-utils';

export default {
  inject: ["index"],
  data() {
    return {
      interfaceUrl: '',//上传后台的接口地址
      imageUrl: '',
      imageSchooolUrl:'',//学历证书图片显示
      uploadDisabled:false,
      value1: "",
      rowData: {},
      active: 0,
      type: "add",
      openEdit: false,
      // 上传的版块
      dialogImageUrl: '',
      entBusiness:[],//字典
      dialogVisible: false,
      productImgs: [],
      imgLimit: 1, //文件个数
      hideUploadEdit: false,
      uploadAction: "",
      bgPic2: [],
      imgSrc: "",
      dictionaryD: [],
      entBusiness: [],
      hideUpload: false,
      sexData:[],//男，女选项
      optionsPersonnel:[],//人员类型
      political:[],//政治面貌
      marriage:[],//婚姻状态
      degree:[],//最高学位
      certificate:[],//证件类型
      chemical:[],//化工
      baseUrlL:baseUrl,
      imgUrlL:imgUrl,
      arrD:[],
      form: {

      },
      formRules: {
        entPersonName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        entPersonNation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        entPersonTel: [
          { required: true, message: "请选择联系方式", trigger: "blur" },
        ],
        entPersonEducation: [
          { required: true, message: "请选择最高学历", trigger: "blur" },
        ],
        entPersonSchool: [
          { required: true, message: "请选择毕业学校", trigger: "blur" },
        ],
        entPersonCertNumber: [
          { required: true, message: "请选择证件号码", trigger: "blur" },
        ],

      },
    };
  },
  props: {
    title: {
      type: String,
      default: "新增人员信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
    this.initLoadDict()


  },
  methods: {
    // 打开
    open(row) {
      console.log('打开',row)
      this.openEdit = true
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id)
      }
    },
    // 关闭
    close() {
      this.openEdit = false
      this.reset()
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields()
      this.form = {}
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.rowData.id) this.modify()
          else this.add()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await entPersonnelCreateAPI(this.form);
        console.log('新增',res.data)
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改
    async modify() {
      try {
        const res = await entPersonnelUpdateAPI({...this.form, id: this.rowData.id});
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await entPersonnelGetAPI({id})
        console.log('查看',res.data)
        if (res.code === 200) {
          this.form ={... res.data,
          entPersonType:res.data.entPersonType&&res.data.entPersonType.key,
          entPersonGender:res.data.entPersonGender&&res.data.entPersonGender.key,
          politicalOutlook:res.data.politicalOutlook&&res.data.politicalOutlook.key,
          maritalStatus:res.data.maritalStatus&&res.data.maritalStatus.key,
          highestDegree:res.data.highestDegree&&res.data.highestDegree.key,
          entPersonCertType:res.data.entPersonCertType&&res.data.entPersonCertType.key,
          isPracticeThree:res.data.isPracticeThree&&res.data.isPracticeThree.key}
          // 为图片添加名字
          this.form.entPersonWorkResume=res.data.entPersonWorkResume.map(item=>{
            return{
              ...item,
              name:item.originalFilename
            }
          })
          // 为图片添加名字
          this.form.certificateUpload=res.data.certificateUpload.map(item=>{
            return{
              ...item,
              name:item.originalFilename
            }
          })
          // 为图片添加名字
          this.form.enclosureUpload=res.data.enclosureUpload.map(item=>{
            return{
              ...item,
              name:item.originalFilename
            }
          })
          console.log(this.form)
        }
      } catch (e) {
        this.$message.error(e)
      }
    },


    //头像上传
    // 提交上传文件
    handleUploadPreview(params, value) {
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then((res) => {
        if (res.code == 200) {
          this.$set(this.form, value, [res.data]);

        }
      });
    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("SEX").then((res) => {//性别
         this.sexData = res.data
      });
      fastGetDictAPI("ENT_PERSON_TYPE").then((res) => {//人员类别
         this.optionsPersonnel = res.data
      });
       fastGetDictAPI("POLITICAL_OUTLOOK").then((res) => {//政治面貌
         this.political = res.data
      });
       fastGetDictAPI("MARITAL_STATUS").then((res) => {//婚姻状态
         this.marriage = res.data
      });
      fastGetDictAPI("HIGHEST_DEGREE").then((res) => {//最高学位
         this.degree = res.data
      });
      fastGetDictAPI("ENT_PERSON_CERT_TYPE").then((res) => {//证件类型
         this.certificate = res.data
      });
      fastGetDictAPI("IS_PRACTICE_THREE").then((res) => {//证件类型
         this.chemical = res.data
      });
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
  width: 76%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
  margin-left: 10px;
  box-shadow: 0 0 20px #979696;
}

.content {
  display: flex;
  flex-wrap: wrap;
  .leftContent {
    width: 22%;
    height: 1000px;
    background: white;
    box-shadow: 0 0 20px #979696;
    border-radius: 3px;
    position: relative;
  }
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}

/deep/ .el-steps {
  width: 90%;
  .el-step {
    left: 35px;
  }
  .el-step__icon {
    // width:56px;
    // height:56px;
  }
  .el-step__line {
    width: 0px;
  }
  .el-step__title.is-process {
    color: #0c66ff;
    font-size: 18px;
  }
  .el-step__head.is-process {
    color: #0c66ff;
  }
  // .el-step__head.is-finish{
  //   border-color: #285edf;
  // }
  .el-step__title.is-finish {
    color: #285edf;
  }
  .el-step__icon.is-icon {
    background: transparent;
  }
  .el-step__title.is-wait {
    color: #c0c4cc;
    font-size: 18px;
  }
}

/deep/ .el-step.is-vertical {
  margin-left: -24px;
  background: #eef4ff;
  width: 92%;
  position: absolute;
  height: 42px;
}

/deep/ .el-step.is-vertical .el-step__head {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  width: 24px;
  padding-top: 4%;
  padding-left: 22%;
}

.card {
  margin-left: -16px;
}

/deep/ .el-step.is-vertical .el-step__title {
  margin-top: 9px !important;
}

/deep/ .contentInput {
  .el-input__inner {
    height: 85px;
  }
}


.topCentent{
  margin-top: -115px;
}

.topCententTwo{
  margin-top: -64px;
}

</style>
