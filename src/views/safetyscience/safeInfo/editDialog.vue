<template>
  <div class="gridcheckresult-view">
    <basicDialog
      icon="icon-chakan"
      title="行政许可证书信息编辑"
      width="1084"
      height="828"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          :model="form"
          label-width="140px"
          :disabled="isDisabled"
          :rules="formRules"
          ref="ruleForm"
        >
          <div class="content_box">
            <el-row v-if="isGov">
              <el-col :span="24">
                <el-form-item label="企业名称" prop="enterpriseName">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.enterpriseName"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书名称" prop="certificateName">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.certificateName"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证书编号" prop="certificateCode">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.certificateCode"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书类型" prop="certificateType">
                  <el-select
                    clearable
                    style="width: 330px"
                    v-model="form.certificateType"
                  >
                    <el-option
                      v-for="item in certificateTypeList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期" prop="effectiveDate">
                  <el-date-picker
                    style="width: 330px"
                    type="date"
                    placeholder="选择日期"
                    v-model="form.effectiveDate"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证机构" prop="certifyingAuthority">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.certifyingAuthority"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证书描述">
                  <el-input
                    type="textarea"
                    style="width: 93.8%"
                    clearable
                    v-model="form.certificateDescribe"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="!isDisabled">
                <el-form-item label="上传证书文件" prop="certificateAttachment">
                  <file-upload 
                    ref="fileUploadRef"
                    :fileList="form.certificateAttachment"
                    @uploadSuccess="uploadSuccess"
                    @handleRemove="handleRemove"
                    :disabled="chakan"
                  >
                  </file-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isDisabled">
              <el-col :span="12">
                <div>
                  <span style="margin:0px 15px 0px 43px">上传证书文件</span>
                  <span style="cursor:pointer;color:#409EFF" @click="downloadPdf">{{pdfName}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </template>
      <template #bottom>
        <el-button
          v-if="!isDisabled"
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >确定</el-button
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
import { imgUrl } from "@/router/axios";

export default {
  data() {
    return {
      isGov: false,
      imgUrl: imgUrl,
      pdfUrl: '',
      openEdit: false,
      isDisabled: false, // 是否禁用表单
      rowData: "",
      certificateTypeList: [],
      certificateTypeKey: "",
      pdfName:"",
      form: {
        certificateName: "", 
        certificateCode: "", 
        certificateType: "",
        effectiveDate: "",
        certifyingAuthority: "",
        certificateDescribe: "",
        certificateAttachment: [],
      },
      formRules: {
        certificateName: [
          { required: true, message: "请输入证书名称", trigger: "blur" }
        ],
        certificateCode: [
          { required: true, message: "请输入证书编号", trigger: "blur" }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    downloadPdf() {
      let downloadUrl = this.imgUrl + this.pdfUrl
      window.open(downloadUrl,'_self')
    },
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.form.certificateAttachment = [];
      this.openEdit = false;
    },
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;

      if (row) {
        this.rowData = row.id || "";
        const res = await enterpriseLicViewAPI({id:this.rowData})
        if(res.code !== 200) {
          return this.$message.error('获取数据失败')
        }
        this.form = res.data
        if(res.data.certificateAttachment.originalFilename) {
          this.pdfName = res.data.certificateAttachment.originalFilename
          this.pdfUrl = res.data.certificateAttachment.url
        }
        this.certificateTypeKey = res.data.certificateType.value;
        this.form.certificateType = res.data.certificateType.key;
        this.form.certificateAttachment = new Array(res.data.certificateAttachment)
        console.log(this.certificateTypeKey,'111')
        // const res = await rulesEchoDataAPI({ id: row.id });
        // if (res.code === 200) {
        //   this.form = res.data;
        //   this.form.attachment = new Array(res.data.attachment);
        //   this.selectCourseType(res.data.attachment);
        // }
      }
    },

    handleRemove(index) {
      this.form.certificateAttachment.splice(index, 1);
    },
    uploadSuccess(data) {
      this.form.certificateAttachment.push(data);
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            if(this.form.certificateAttachment.length > 0){
              this.form.certificateAttachment = this.form.certificateAttachment[0];
            } else {
              this.form.certificateAttachment = {}
            }
            if (this.rowData) {
              let params = {...this.form}
              const res = await enterpriseLicUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close()
            } else {
              console.log(this.form, "新增");
              let params = {...this.form}
              const res = await enterpriseLicCreateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("新增失败");
              }
              this.$message.success("新增成功");
              this.$emit("refreshDataList");
              this.close()
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
    }
  }
};
</script>

<style scoped lang="scss"></style>
