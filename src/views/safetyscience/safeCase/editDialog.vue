<template>
  <div class="gridcheckresult-view">
    <basicDialog
      icon="icon-chakan"
      title="事故案例编辑"
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
            <el-row>
              <el-col :span="24">
                <el-form-item label="类别" prop="accidentType">
                  <el-select
                    v-model="form.accidentType"
                    @change="getTableData"
                    clearable
                    placeholder="类别"
                    style="width: 90%"
                    :size="size"
                  >
                    <el-option
                      v-for="(item, index) in certificateTypeList"
                      :key="index"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="!isDisabled">
                <el-form-item label="附件" prop="attachment">
                  <!-- <render-upload
                    :fileList="form.attachment"
                    @uploadSuccess="uploadSuccess"
                    @handleRemove="handleRemove"
                    :disabled="chakan"
                  >
                  </render-upload> -->
                  <basic-upload
                    key="file"
                    :model="true"
                    @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                    @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                    :photos="form.attachment"
                  ></basic-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isDisabled">
              <el-col :span="12">
                <div>
                  <span style="margin: 0px 15px 0px 43px">上传附件</span>
                  <span
                    style="cursor: pointer; color: #409eff"
                    @click="downloadPdf"
                    >{{ pdfName }}</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    style="width: 90%"
                    clearable
                    v-model="form.remark"
                    :size="size"
                  ></el-input>
                </el-form-item>
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
      pdfUrl: "",
      openEdit: false,
      isDisabled: false, // 是否禁用表单
      rowData: "",
      certificateTypeList: [],
      accidentTypeKey: "",
      pdfName: "",
      width: "280px",
      size: "small",
      form: {
        accidentType: "",
        attachment: [],
        id: "",
        remark: "",
      },
      formRules: {
        accidentType: [
          { required: true, message: "请输入证书名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    downloadPdf() {
      let downloadUrl = this.imgUrl + this.pdfUrl;
      window.open(downloadUrl, "_self");
    },
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.form.attachment = [];
      this.openEdit = false;
    },
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;

      if (row) {
        this.rowData = row.id || "";
        const res = await safeEchoDataAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        if (res.data.attachment.originalFilename) {
          this.pdfName = res.data.attachment.originalFilename;
          this.pdfUrl = res.data.attachment.url;
        }
        this.form.attachment = new Array(res.data.attachment);
        this.accidentTypeKey = res.data.accidentType.value;
        this.form.accidentType = res.data.accidentType.key;
      }
    },

    handleRemove(index) {
      this.form.attachment.splice(index, 1);
    },
    uploadSuccess(data) {
      this.form.attachment.push(data);
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.form.attachment.length > 0) {
              this.form.attachment = this.form.attachment[0];
            } else {
              this.form.attachment = {};
            }
            if (this.rowData) {
              let params = { ...this.form };
              const res = await safeUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await safePostAPI(params);
              if (res.code !== 200) {
                return this.$message.error("新增失败");
              }
              this.$message.success("新增成功");
              this.$emit("refreshDataList");
              this.close();
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
  },
};
</script>

<style scoped lang="scss"></style>
