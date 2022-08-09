<template>
  <div id="">
    <basicDialog
      :icon="
        chakan ? 'nomi-chakan' : form.id ? 'nomi-bianji1' : 'nomi-xinzengfabu'
      "
      :title="(chakan ? '查看' : form.id ? '编辑' : '新增') + title"
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
            label-width="100px"
            class="demo-ruleForm"
            ref="ruleForm"
            :rules="formRules"
            :disabled="chakan"
          >
            <el-row>
              <el-col span="12">
                <el-form-item label="备案编号" prop="recordCode">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.recordCode"
                    placeholder="请输入备案编号"
                    :disabled="chakan"
                    class="is-required"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="备案日期" prop="recordDate">
                  <el-date-picker
                    v-model="form.recordDate"
                    type="date"
                    placeholder="选择备案日期"
                    :style="`width:${width}`"
                    :size="size"
                    :disabled="chakan"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="备案经手人" prop="recordHandler">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.recordHandler"
                    placeholder="请输入备案经手人"
                    :disabled="chakan"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="预案类型" prop="measureType">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.measureType"
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
              <el-col>
                <el-form-item label="备注" prop="remark">
                  <el-input
                    :style="`width:${width2}`"
                    :size="size"
                    type="textarea"
                    placeholder="请输入备注"
                    v-model="form.remark"
                    maxlength="500"
                    show-word-limit
                    :disabled="chakan"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="应急流程图" prop="measureChart">
                  <img-upload
                    :fileList="form.measureChart"
                    @uploadSuccess="picUploadSuccess"
                    @handleRemove="handleRemovePic"
                    :disabled="chakan"
                  >
                  </img-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="!chakan">
                <el-form-item label="附件(单文件)" prop="attachment">
                  <render-upload
                    :fileList="form.attachment"
                    @uploadSuccess="uploadSuccess"
                    @handleRemove="handleRemove"
                  >
                  </render-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="chakan">
              <el-col :span="24">
                <div>
                  <span style="margin: 0px 15px 0px 43px">附件(单文件)</span>
                  <span
                    style="cursor: pointer; color: #409eff"
                    @click="downloadPdf"
                    >{{ pdfName }}</span
                  >
                </div>
              </el-col>
            </el-row>
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
import fileUpload from "./fileUpload.vue";
import imgUpload from "./imgUpload.vue";
import {
  emergencyMeasureUpdateAPI,
  emergencyMeasurePostAPI,
  emergencyMeasureEchoDataAPI,
} from "@/api/emergency/emergencyMeasure";
import { imgUrl, baseUrl } from "@/router/axios";

export default {
  components: { fileUpload, imgUpload },
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
          { required: true, message: "请输入备案编号", trigger: "change" },
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
    this.getDicMap("measure_type", "certificateTypeList");
  },
  methods: {
    downloadPdf() {
      //查看是显示文件
      let url = this.imgUrl + this.type;
      let a = document.createElement("a");
      a.href = url;
      a.click();
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
    // 删除文件
    handleRemove(index) {
      this.form.attachment = [];
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
      if (type === "chakan") {
        this.chakan = true;
      } else {
        this.chakan = false;
      }
      if (row) {
        this.rowData = row.id;
        const res = await emergencyMeasureEchoDataAPI({ id: row.id });
        if (res.code === 200) {
          this.form = res.data;
          this.form.entName = res.data.hierarchyCode
            ? res.data.hierarchyCode.orgName
            : "";
          if (res.data.attachment.originalFilename) {
            this.pdfName = res.data.attachment.originalFilename;
          }
          this.measureTypeKey = res.data.measureType.value;
          this.form.measureType = res.data.measureType.key;
          this.form.attachment = new Array(res.data.attachment);
          this.form.measureChart = new Array(res.data.measureChart);
          this.selectCourseType(res.data.attachment);
        }
      }
    },
    // 关闭
    close() {
      this.form = {};
      this.form.id = "";
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
      // this.form = {
      //   attachment: []
      // };
      this.form.attachment = [];
      this.form.measureChart = [];
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
