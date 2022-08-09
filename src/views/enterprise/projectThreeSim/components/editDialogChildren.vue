<template>
  <div>
    <basicDialog
      :icon="icon"
      :title="title"
      width="40%"
      height="50%"
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
              :model="formChild"
              label-width="auto"
              class="demo-ruleForm"
              ref="ruleForm"
              :rules="formRules"
            >

            <el-row>
                <el-col :span="12">
              <el-form-item label="三同时类型">
                <el-select
                      v-model="formChild.threeSimCategory"
                      placeholder="请选择"
                      style="width: 100%"
                      value-key="id"
                    >
                  <el-option v-for="item in licenseIssuingAgencyData" :key="item.id" :label="item.dictValueName" :value="item.dictValue">

                  </el-option>

                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="附件类别">
                <el-select
                      v-model="formChild.projectFileCategory"
                      placeholder="请选择"
                      style="width: 100%"
                      value-key="id"
                    >
                <el-option v-for="item in licenseIssuingData" :key="item.id" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
              </el-col>
              </el-row>
              <el-form-item label="上传附件">
              <render-upload
                    :fileList="projectFile"
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
import { projectThreeSimCreateAPI } from '@/api/enterprise/projectThreeSim/index'
import { fastGetDictAPI } from "@/api/system/dictionary";//字典
import { isArray } from 'xe-utils';

export default {
  inject: ["index"],
  data() {
    return {
      value1: "",
      active: 0,
      type: "add",
      openEdit: false,
      certificateTypeData:[],
      licenseIssuingAgencyData:[],
      licenseIssuingData:[],
      formChild:{
      },
      projectFile:[],
      formRules: {
        dictKeyName: [
          { required: true, message: "请输入字典键名称", trigger: "blur" },
        ],
        dictKey: [{ required: true, message: "请输入字典键", trigger: "blur" }],
        dictKeyType: [
          { required: true, message: "请选择字典键类型", trigger: "blur" },
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
  },
  created() {
    this.initLoadDict()
  },
  methods: {
    open(row) {
      this.formChild={}
      this.openEdit = true;
      // this.form = {

      // };
      // if (row && row.id) {
      //   this.type = "edit";
      //   this.getRetuenForm(row.id);
      // }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await returnDictKeyDataAPI({ id });
      if (res.code == 200) {
        this.form = {
          version: res.data.version, // 不传version会是新增
          id: res.data.id,
          dictKeyName: res.data.dictKeyName,
          dictKey: res.data.dictKey,
          dictKeyType: res.data.dictKeyType && res.data.dictKeyType.key,
        };
      }
    },
    // 保存
    submitForm(formName) {

      this.$set(this.formChild, 'projectFile', this.projectFile)//添加附件

      this.$emit('receiveData',this.formChild)
      // this.$emit('projectFileData',this.projectFile)

      this.openEdit = false;



    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

     // 删除文件
    handleRemove(index) {
      this.form.entPersonWorkResume = [];

    },
    // 上传文件成功
    uploadSuccess(data) {
      this.projectFile.push(data)

    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("PROJECT_NATURE").then((res) => {//项目性质
         this.certificateTypeData = res.data
      });
      fastGetDictAPI("THREE_SIM_CATEGORY").then((res) => {//三同时类别
         this.licenseIssuingAgencyData = res.data
      });
      fastGetDictAPI("PROJECT_FILE_CATEGORY").then((res) => {//附件类别
         this.licenseIssuingData = res.data
      });
      fastGetDictAPI("PROJECT_PROGRESS").then((res) => {//附件类别
         this.projectProgressData = res.data
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

.fujian{
  display: flex;
  border-bottom: 1px solid #4A80FC;
      margin: 8px;
    margin-bottom: 18px;
  .fujianOne{
    width: 2px;
        height: 20px;
    margin-top: 3px;
    background: #4A80FC;
    border-radius: 1px 1px 1px 1px;
    opacity: 1;
  }
  .fujianTwo{
        margin-left: 7px;
    font-size: 16px;
    margin-bottom: 3px;
  }
}

</style>
