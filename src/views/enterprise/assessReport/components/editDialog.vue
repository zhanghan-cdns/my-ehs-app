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
                label="评价报告名称"
                prop="evaluationReportName"
                class="is-required"
              >
                <el-input clearable v-model="form.evaluationReportName"></el-input>
              </el-form-item>
              <el-form-item label="评价报告编号" prop="evaluationReportNum">
                <el-input v-model="form.evaluationReportNum"></el-input>
              </el-form-item>
              <el-form-item label="评价报告类型" prop="evaluationReportType">

                <el-select
                      v-model="form.evaluationReportType"
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
              <el-form-item label="评价机构" prop="evaluationOrganization">
                <el-input v-model="form.evaluationOrganization"></el-input>

              </el-form-item>
              <!-- <el-form-item label="评价报告描述">
                <el-input class="contentInput" v-model="form.name"></el-input>
              </el-form-item> -->
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item label="报告附件">
                <render-upload
                    :openOff = "false"
                    :fileList="form.reportFile"
                    @uploadSuccess="uploadSuccess"
                    @handleRemove="handleRemove"
                  >
                  </render-upload>
              </el-form-item>
              <el-form-item label="备案附件">
                <render-upload
                    :openOff = "false"
                    :fileList="form.relatedAccessories"
                    @uploadSuccess="uploadSuccessD"
                    @handleRemove="handleRemoveD"
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
// import "@/assets/icon/editorPage/iconfont.css";
// import "@/assets/icon/editDialog/iconfont.css";
import { assessCreateAPI,assessGetAPI,assessUpdateAPI } from '@/api/enterprise/assessReport/index'
import { fastGetDictAPI } from "@/api/system/dictionary";//字典



export default {
  inject: ["index"],
  data() {
    return {
      value1: "",
      active: 0,
      type: "add",
      openEdit: false,
      certificateTypeData:[],
      form: {
      },
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
      default: "新增评价报告信息",
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
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await assessGetAPI({ id });
      if (res.code == 200) {
        this.form = {
          version: res.data.version, // 不传version会是新增
          id: res.data.id,
          dictKeyName: res.data.dictKeyName,
          dictKey: res.data.dictKey,
          dictKeyType: res.data.dictKeyType && res.data.dictKeyType.key,
          evaluationReportName:res.data.evaluationReportName,
          evaluationReportNum:res.data.evaluationReportNum,
          evaluationReportType:res.data.evaluationReportType && res.data.evaluationReportType.key,
          validTime:res.data.validTime,
          evaluationOrganization:res.data.evaluationOrganization,
          remark:res.data.remark,
          reportFile:res.data.reportFile,
          relatedAccessories:res.data.relatedAccessories

        };
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type == "edit") {
            assessUpdateAPI(this.form).then((res) => {
              this.$message.success("编辑成功!");
              this.$emit("refreshDataList");
              this.close();
            });
          } else {
            assessCreateAPI(this.form).then((res) => {
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
      this.form.reportFile = [];
      this.form.reportFile.push(data);
    },
    //删除文件
    handleRemoveC(index) {
      this.form.reportFile = [];

    },
    // 上传文件成功
    uploadSuccessD(data) {
      this.form.relatedAccessories = [];
      this.form.relatedAccessories.push(data);
    },
    //删除文件
    handleRemoveCD(index) {
      this.form.relatedAccessories = [];

    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("ENT_EVALUATION_REPORT_TYPE").then((res) => {//项目性质
         this.certificateTypeData = res.data
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
</style>
