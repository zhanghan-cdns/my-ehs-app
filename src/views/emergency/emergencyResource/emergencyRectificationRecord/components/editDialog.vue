<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="1084"
      height="828"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="container">
          <el-form
            :model="form"
            label-width="140px"
            class="demo-ruleForm"
            ref="ruleForm"
            :rules="formRules"
          >
          <el-row>
            <el-col :span="24">
                <el-form-item label="演练记录" prop="recordCode">
                  <el-select
                    clearable
                    :style="`width:${width2}`"
                    :size="size"
                    v-model="form.measureType"
                    class="is-required"
                    placeholder="请选择演练记录"
                  >
                    <el-option
                      v-for="item in certificateTypeList"
                      :key="item.dictValue"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                <el-form-item label="整改人员" prop="recordHandler">
                  <el-input
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.recordHandler"
                    placeholder="请输入整改人员"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="演练中存在问题" prop="organizeEmergencyDuty">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.organizeEmergencyDuty"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="24">
                <el-form-item label="整改内容" prop="organizeEmergencyDuty">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.organizeEmergencyDuty"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
            <el-col>
              <el-form-item label="上传照片">
                <basic-upload
                  @onSuccess="(fileList)=>onSuccess(fileList,'picture')"
                  @onRemove="(fileList)=>onRemove(fileList,'picture')"
                  :photos="form.picture"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <basic-upload
                  :model="true"
                  @onSuccess="(fileList)=>onSuccess(fileList,'file')"
                  @onRemove="(fileList)=>onRemove(fileList,'file')"
                  :photos="form.file"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
        </el-form>
        </div>
      </template>
      <template #bottom>
        <el-button
          v-if="!chakan"
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >保存</el-button
        >
        <el-button
          v-if="!chakan"
          type="success"
          size="medium"
          @click="handleBottomClick('reset')"
          >重置</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="handleBottomClick('cancel')"
          >取消</el-button
        >
      </template>
    </basicDialog>
  </div>
</template>
<script>
// import fileUpload from "./fileUpload.vue";
// import imgUpload from "./imgUpload.vue";
import {
  emergencyMeasureUpdateAPI,
  emergencyMeasurePostAPI,
  emergencyMeasureEchoDataAPI,
} from "@/api/emergency/emergencyMeasure";
import { imgUrl, baseUrl } from "@/router/axios";

export default {
  // components: { fileUpload, imgUpload },
  data() {
    return {
      width: "330px",
      width2: "91%",
      size: "small",
      isShow: true,
      isHide: false,
      chakan: false,
      openEdit: false,
      type: "add",
      baseUrl,
      pdfName: "",
      imgUrl: imgUrl,
      ertificateTypeList: [], //字段数据
      measureTypeKey: "",
      form: {
        attachment: [], //文件
        measureChart: [], //图片
        id: "",
        measureType: "",
        recordCode: "",
        recordHandler: "",
        recordHandler: "",
        remark: "",
        // queryHierarchy_orgName:"",
      },
      rowData: "",
      pdfUrl: "",
      formRules: {
        recordCode: [
          { required: true, message: "请输入演练记录", trigger: "change" },
        ],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "应急预案信息",
    },
    icon: {
      type: String,
      default: "nomi-xinzengfabu",
    },
  },
  created() {
  },
  methods: {
    downloadPdf() {
      // //查看是显示文件
      // let url = this.imgUrl + this.type;
      // let a = document.createElement("a");
      // a.href = url;
      // a.click();
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.chooseData = val.records;
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    dateChange(val) {
      console.log(val, "kkkkk");
    },

    // 上传文件成功
    uploadSuccess(data) {
      this.form.attachment.push(data);
    },
    // 移出图片
    handleRemovePic() {
      this.form.measureChart = [];
    },
    //上传图片
    picUploadSuccess(data) {
      this.form.measureChart.push(data);
    },
    selectCourseType(item) {
      this.type = item[0].url;
      this.pdfUrl = this.imgUrl + item[0].url;
      if (item[0].url == "pdf") {
        this.$nextTick(() => {
          this.$refs.renderPdfRef.open(pdfUrl);
        });
      }
    },
    
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      this.title = "新增演练整改信息";
      this.icon = "icon-xinzeng";
      if (row) {
        if (type === "chakan") {
          this.title = "查看演练整改信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑演练整改信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await hospitalViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form.hospitalLevel = res.data.hospitalLevel
          ? res.data.hospitalLevel.key
          : "";
        this.form = res.data;
      }
    },
    // 关闭
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            let res;
            this.form.attachment = this.form.attachment[0];
            this.form.measureChart = this.form.measureChart[0];
            console.log(this.form, "124");
            if (this.rowData) {
              res = await emergencyMeasureUpdateAPI(
                Object.assign(
                  {},
                  {
                    id: this.rowData,
                    attachment: this.form.attachment,
                    measureChart: this.form.measureChart,
                  },
                  this.form
                )
              );
              this.$message.success("编辑成功");
            } else {
              res = await emergencyMeasurePostAPI(
                Object.assign(
                  {},
                  {
                    id: this.rowData,
                    attachment: this.form.attachment,
                    measureChart: this.form.measureChart,
                  },
                  this.form
                )
              );
              this.$message.success("新增成功");
            }
            if (res.code === 200) {
              this.close();
              this.$emit("refreshDataList");
            }
          }
        });
      }
      if (type === "reset") {
        this.resetForm();
      }
      if (type === "cancel") {
        this.close();
      }
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
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

/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
