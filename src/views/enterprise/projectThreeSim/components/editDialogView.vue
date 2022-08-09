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
              :disabled="true"
            >
             <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="项目名称"
                    prop="projectName"
                    class="is-required"
                  >
                    <el-input clearable v-model="form.projectName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="项目编码"
                    prop="projectNo"
                    class="is-required"
                  >
                    <el-input clearable v-model="form.projectNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="12">
              <el-form-item label="项目性质" prop="projectNature">
                <el-select
                      v-model="form.projectNature"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    <el-option v-for="item in certificateTypeData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="项目建设单位" prop="projectBuildUnit">
                <el-input v-model="form.projectBuildUnit"></el-input>
              </el-form-item>
              </el-col>
              </el-row>
              <el-form-item label="项目建设地点" prop="projectBuildLoc">
                <el-input v-model="form.projectBuildLoc"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="项目总投资(元)"
                    prop="projectTotalMoney"
                    class="is-required"
                  >
                    <el-input clearable v-model="form.projectTotalMoney"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="项目进展情况"
                    prop="projectProgress"
                    class="is-required"

                  >
                  <el-select
                      v-model="form.projectProgress"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    <el-option v-for="item in projectProgressData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
              <el-form-item label="项目开工日期" required>
                <el-date-picker
                  v-model="form.projectBeginDate"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
                 </el-form-item>
                 </el-col>
                <el-col :span="12">
              <el-form-item label="项目竣工验收日期" required>
                <el-date-picker
                  v-model="form.projectFinishDate"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
               </el-col>
              </el-row>
              <el-form-item label="项目描述">
                <el-input class="contentInput" v-model="form.projectDescribe"></el-input>
              </el-form-item>
              <el-form-item label="安全设施三同时" prop="projectSafeFacThreeSim">
                <el-input v-model="form.projectSafeFacThreeSim"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="contentInput" v-model="form.remark"></el-input>
              </el-form-item>
              <!-- 附件下列 -->
              <div class="fujian">
                <div class="fujianOne"></div>
                <div class="fujianTwo">附件信息</div>
              </div>
              <el-form-item label="附件信息">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$refs.editDialogChildrenRef.open()">添加附件</el-button>
              </el-form-item>
            <!-- 附件弹窗 -->
            <edit-dialog-children ref="editDialogChildrenRef" @receiveData='receiveData'></edit-dialog-children>
            <!-- 表格 -->
            <render-table
            height="450px"
            :columns="columns"
            :data="tableData"
          />
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
import { projectThreeSimCreateAPI,projectThreeSimGetAPI,projectThreeSimgetSimFileAPI } from '@/api/enterprise/projectThreeSim/index'
import { fastGetDictAPI } from "@/api/system/dictionary";//字典
import { isArray } from 'xe-utils';
import editDialogChildren from './editDialogChildren.vue'
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
      attachmentData:{},//附件信息对象
      options:[],
      transferData:[],
      form: {
        fileListSim:[
        ],
      },
      tableData:[],//附件过来的弹窗数据
      threeSimCategory:'',
      projectFileCategory:"",
      projectFile:[],//附件信息
      formRules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        projectNo: [{ required: true, message: "请输入项目编码", trigger: "blur" }],
        projectNature: [
          { required: true, message: "请选择项目性质", trigger: "change"},
        ],
        projectProgress: [
          { required: true, message: "请选择项目性质", trigger: "change"},
        ],
        projectBuildUnit: [{ required: true, message: "请输入项目建设单位", trigger: "blur" }],
        projectBuildLoc: [{ required: true, message: "请输入项目建设地点", trigger: "blur" }],
        projectTotalMoney: [{ required: true, message: "请输入项目总投资(元)", trigger: "blur" }],
        projectSafeFacThreeSim: [{ required: true, message: "请输入安全设施三同时", trigger: "blur" }],

      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "threeSimCategory.dictValueName",
          title: "三同时类别",
          align: "center",
           render: (h, { row, column, $index }) => {
            return (
              <span>
                 {this.getDictName(this.licenseIssuingAgencyData, row.threeSimCategory)}
              </span>
            );
          },
        },
        {
          field: "projectFileCategory.dictValueName",
          title: "附件类别",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <span>
                 {this.getDictName(this.licenseIssuingData, row.projectFileCategory)}
              </span>
            );
          },
        },
        {
          field: "projectFile",
          title: "附件",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
              operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
       operateButtonList: ["shanchu"],
    };
  },
  components:{
    editDialogChildren
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
      this.openEdit = true;
      this.form = {

      };
      if (row && row.id) {
        this.type = "edit";
        this.getRetuenForm(row.id);
      }
      // this.fileApi(row.projectFileIds)
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await projectThreeSimGetAPI({ id });

      console.log('三同时回填数据的查看',res.data)
      if (res.code == 200) {
        this.form = {
          version: res.data.version, // 不传version会是新增
          id: res.data.id,
          dictKeyName: res.data.dictKeyName,
          dictKey: res.data.dictKey,
          dictKeyType: res.data.dictKeyType && res.data.dictKeyType.key,
          projectName:res.data.projectName,
          projectNo:res.data.projectNo,
          projectNature:res.data.projectNature && res.data.projectNature.key,
          projectBuildUnit:res.data.projectBuildUnit,
          projectBuildLoc:res.data.projectBuildLoc,
          projectTotalMoney:res.data.projectTotalMoney,
          projectProgress:res.data.projectProgress && res.data.projectProgress.key,
          projectBeginDate:res.data.projectBeginDate,
          projectFinishDate:res.data.projectFinishDate,
          projectDescribe:res.data.projectDescribe,
          projectSafeFacThreeSim:res.data.projectSafeFacThreeSim,
          remark:res.data.remark
        };
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
            // this.form.fileListSim = []
            // this.form.fileListSim.push(this.attachmentData)
            console.log('this.form',this.form)

            console.log('this.form.fileListSim',this.form.fileListSim)

            projectThreeSimCreateAPI(this.form).then((res) => {
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

     // 删除文件
    handleRemove(index) {
      this.form.entPersonWorkResume = [];

    },
    // 上传文件成功
    uploadSuccess(data) {
      this.form.entPersonWorkResume = [];
      this.form.entPersonWorkResume.push(data);
    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("PROJECT_NATURE").then((res) => {//项目性质
         this.certificateTypeData = res.data
      });
      fastGetDictAPI("THREE_SIM_CATEGORY").then((res) => {//三同时类别
         this.licenseIssuingAgencyData = res.data
         console.log('this.licenseIssuingAgencyData',this.licenseIssuingAgencyData)
      });
      fastGetDictAPI("PROJECT_FILE_CATEGORY").then((res) => {//附件类别
         this.licenseIssuingData = res.data
      });
      fastGetDictAPI("PROJECT_PROGRESS").then((res) => {//附件类别
         this.projectProgressData = res.data
      });
    },
    //附件弹窗发送过来的数据
    receiveData(data){
          this.tableData=[data]
           this.form.fileListSim =this.tableData
        },


    getDictName(option,value){
         if (option.length > 0 && value) {
        return option.find((i) => i.dictValue == value)
          ? option.find((i) => i.dictValue == value).dictValueName
          : "";
        } else {
          return "";
        }
     },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "dictionary":
          this.$refs.dictValueDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row);
          break;
      }
    },
    // 删除列表数据
    deleteTable(row) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData = this.removeArray(this.tableData,row)
        this.form.fileListSim =this.tableData
         this.$message.success("删除成功");

      });
    },
    // 附件的请求
    async fileApi(ids){
      const res = await projectThreeSimgetSimFileAPI({ ids });

      console.log('附件查看',res.data)
      if (res.code == 200) {

      }

    },

    /**
     * 从数组中删除指定对象
     *  _arr:数组
     *  _obj:需删除的对象
     * */
  removeArray(_arr, _obj) {
  let length = _arr.length
  for (let i = 0; i < length; i++) {
    if (_arr[i] === _obj) {
      if (i === 0) {
        _arr.shift() //删除并返回数组的第一个元素
        return _arr
      } else if (i === length - 1) {
        _arr.pop()  //删除并返回数组的最后一个元素
        return _arr
      } else {
        _arr.splice(i, 1) //删除下标为i的元素
        return _arr
      }
    }
  }
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
