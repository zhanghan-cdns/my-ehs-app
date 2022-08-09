<template>
  <div>
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="content">
          <!-- 右侧  -->
          <div class="container">
            <el-form
              :model="form"
              label-width="auto"
              class="demo-ruleForm"
              ref="ruleForm"
              :rules="formRules"
            >
              <el-form-item
                label="证书持有者姓名"
                class="is-required"
              >
                <!-- <el-input clearable v-model="form.certificateHolders"></el-input> -->
              <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
              style="width: 100%"
            ></el-autocomplete>



              </el-form-item>
              <el-form-item label="证书名称" prop="certificateName" required>
                <el-input v-model="form.certificateName"></el-input>
              </el-form-item>
              <el-form-item label="证书编号" required>
                <el-input v-model="form.certificateNum"></el-input>
              </el-form-item>
              <el-form-item label="证书类型" prop="certificateType" required>
                <el-select
                      v-model="form.certificateType"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                  <el-option v-for="item in certificateTypeData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="有效日期" required>
                <el-date-picker
                  v-model="form.validTime"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="上次培训时间">
                <el-date-picker
                  v-model="form.lastTrainTime"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="下次培训时间">
                <el-date-picker
                  v-model="form.nextTrainTime"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="发证机构" required>
                <el-select
                  v-model="form.licenseIssuingAgency"
                  placeholder="请选择"
                  style="width: 100%"

                >
                <el-option v-for="item in licenseIssuingAgencyData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="证书描述">
                <el-input class="contentInput" v-model="form.certificateDescription"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item label="上传附件">
                <render-upload
                    :openOff = "false"
                    :fileList="form.relevantAttachment"
                    @uploadSuccess="uploadSuccess"
                    @handleRemove="handleRemove"
                  >
                  </render-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button type="success" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {
  createDictKeyDataAPI,
  updataDictKeyDataAPI,
  returnDictKeyDataAPI,
} from "@/api/system/dictionary";
// import "@/assets/icon/editorPage/iconfont.css";
// import "@/assets/icon/editDialog/iconfont.css";
import { entPersonCreateAPI,entPersonQueryAPI,entPersonGetAPI } from '@/api/enterprise/entPersonCert/index'
import { fastGetDictAPI } from "@/api/system/dictionary";//字典

export default {
  inject: ["index"],
  data() {
    return {
      value1: "",
      active: 0,
      type: "add",
      openEdit: false,
      certificateTypeData:[],//证书类型
      licenseIssuingAgencyData:[],//发证机构
      projectOptions: [],//证书持有者人员列表
      projectOptionsData:[],
      state1: '',
      diseaseList: [], //这个值是需要匹配的值
      disease: '',     //这个值是用户正在输入的值
      restaurantsData:[],
      form: {
        certificateHolders:[],
      },
      formRules: {
        state1: [
          { required: true, message: "请输入证书持有者姓名", trigger: "blur" },
        ],
        certificateName: [{ required: true, message: "请输入证书名称", trigger: "blur" }],
        certificateType: [
          { required: true, message: "请选择证书类型", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "新增人员证书信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
    restaurants: {
      type: Array,
      default: [],
    },
  },
  created() {
    this.initLoadDict();
    // this.certificateHoldersQuery() //证书持有者查询
  },
  watch:{

  },
  mounted(){

  },
  methods: {
    open(row) {
      this.openEdit = true;
      // this.form = {
      //   id: "",
      //   dictKeyName: "",
      //   dictKey: "",
      //   dictKeyType: "",
      // };
      if (row && row.id) {
        this.type = "edit";
        this.getRetuenForm(row.id);
      }
    },
    close() {
      this.openEdit = false;
      this.form = {}
      this.state1 =""
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await entPersonGetAPI({ id });
      console.log('查看',res.data)
      if (res.code == 200) {
        this.form = {
          certificateType: res.data.certificateType && res.data.certificateType.key,
          licenseIssuingAgency: res.data.licenseIssuingAgency && res.data.licenseIssuingAgency.key,
          certificateName:res.data.certificateName,
          certificateNum:res.data.certificateNum,
          validTime:res.data.validTime,
          lastTrainTime:res.data.lastTrainTime,
          nextTrainTime:res.data.nextTrainTime,
          certificateDescription:res.data.certificateDescription,
          remark:res.data.remark,
          relevantAttachment:res.data.relevantAttachment
        };
        this.state1 = res.data.certificateHolders[0].entPersonName
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type == "edit") {
            updataDictKeyDataAPI(this.form).then((res) => {
              this.$message.success("编辑成功!");
              this.$emit("refreshDataList");
              this.close();
            });
          } else {
            entPersonCreateAPI(this.form).then((res) => {
              this.$message.success("新增成功!");
              this.$emit("refreshDataList");
              this.close();
            });
          }
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 上传文件成功
    uploadSuccess(data) {
      this.form.relevantAttachment = [];
      this.form.relevantAttachment.push(data);
    },
    //删除文件
    handleRemoveC(index) {
      this.form.relevantAttachment = [];

    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("CERTIFICATE_TYPE").then((res) => {//证书类型
         this.certificateTypeData = res.data
      });
      fastGetDictAPI("LICENSE_ISSUING_AGENCY").then((res) => {//发证机构
         this.licenseIssuingAgencyData = res.data
      });
    },
    //证书持有者查询
    async certificateHoldersQuery(){
      // entPersonQueryAPI().then(res=>{
      //   let resData = res.data
      //   console.log('resData',res.data)
      // //  this.projectOptions = resData
      // })
      let resD = await entPersonQueryAPI()
      console.log('resD.data',resD.data)
      this.projectOptionsData = resD.data
      // this.projectOptions.push(resD.data)

    },


    //证书持有者搜索
    querySearch(queryString, cb) {


        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          // return console.log('restaurant',restaurant.entpersonname)
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        let obj = {
            entPersonName:item.value,
            entPersonId:item.entPersonId
        }
        this.form.certificateHolders = []
        this.form.certificateHolders.push(obj)
        console.log('this.form.certificateHolders',this.form.certificateHolders)
      }
  }
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
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
  // margin-left: 10px;
  // box-shadow: 0 0 20px #979696;
}

.content {
  display: flex;
  flex-wrap: wrap;
  .leftContent {
    width: 235px;
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
  width: 214px;
  position: absolute;
  height: 42px;
}

/deep/ .el-step.is-vertical .el-step__head {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  width: 24px;
  padding-top: 10px;
  padding-left: 47px;
}

.card {
  margin-left: 20px;
}

/deep/ .el-step.is-vertical .el-step__title {
  margin-top: 9px !important;
}

/deep/ .contentInput {
  .el-input__inner {
    height: 85px;
  }
}

/deep/ .el-upload-dragger {
  background: white;
  border: 0px;
  width: 323px;
  height: 161px;
}

/deep/ .el-upload--picture-card {
  background: white;
  border: 0px;
  width: 120px;
  height: 120px;
}
</style>
