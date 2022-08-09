<template>
  <div id="">
    <list-container>
      <template #right>
        <div style="margin-top: 20px">
          <el-form
            label-width="120px"
            :model="form"
            ref="formRef"
            :rules="rules"
          >
            <el-row>
              <el-col span="12">
                <el-form-item label="系统名称" prop="sysName">
                  <el-input
                    placeholder="请输入系统名称"
                    style="width: 300px"
                    clearable
                    v-model="form.sysName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="版权所有" prop="copyright">
                  <el-input
                    placeholder="请输入版本号"
                    style="width: 300px"
                    clearable
                    v-model="form.copyright"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="初始密码" prop="defaultPassword">
                  <el-input
                    placeholder="请输入初始密码"
                    style="width: 300px"
                    clearable
                    type="password"
                    v-model="form.defaultPassword"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col span="12">
                <el-form-item label="绑定域名" prop="bandDomain">
                  <el-input
                    placeholder="请输入绑定域名"
                    style="width: 300px"
                    clearable
                    v-model="form.bandDomain"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="AppID" prop="appId">
                  <el-input
                    placeholder="请输入appId"
                    style="width: 300px"
                    clearable
                    v-model="form.appId"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="指南附件" prop="slDomainHandBook">
                  <el-upload
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :file-list="slDomainHandBook"
                    :on-remove="
                      (file, fileList) => handleRemove(file, 'slDomainHandBook')
                    "
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'slDomainHandBook');
                      }
                    "
                  >
                    <el-button size="small" type="primary"
                      >点击上传附件</el-button
                    >
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="企业端操作手册" prop="entOperationManual">
                  <el-upload
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :file-list="entOperationManual"
                    :on-remove="
                      (file, fileList) =>
                        handleRemove(file, 'entOperationManual')
                    "
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'entOperationManual');
                      }
                    "
                  >
                    <el-button size="small" type="primary"
                      >点击上传附件</el-button
                    >
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="政府端操作手册" prop="govOperationManual">
                  <el-upload
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :file-list="govOperationManual"
                    :on-remove="
                      (file, fileList) =>
                        handleRemove(file, 'govOperationManual')
                    "
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'govOperationManual');
                      }
                    "
                  >
                    <el-button size="small" type="primary"
                      >点击上传附件</el-button
                    >
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="系统logo" prop="logo" class="is-required">
                  <el-upload
                    class="avatar-uploader"
                    :file-list="logo"
                    list-type="picture-card"
                    :limit="1"
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'logo');
                      }
                    "
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        v-if="form.logo"
                        :src="imgUrl + form.logo.url"
                        class="avatar"
                      />
                      <span class="el-upload-list__item-actions">
                        <!-- <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span> -->
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file, 'logo')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="背景图片一" prop="bgPic1">
                  <el-upload
                    class="avatar-uploader"
                    :file-list="bgPic1"
                    list-type="picture-card"
                    :limit="1"
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'bgPic1');
                      }
                    "
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        v-if="form.bgPic1"
                        :src="imgUrl + form.bgPic1.url"
                        class="avatar"
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file, 'bgPic1')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="背景图片二" prop="bgPic2">
                  <el-upload
                    class="avatar-uploader"
                    :file-list="bgPic2"
                    list-type="picture-card"
                    :limit="1"
                    :http-request="
                      (params) => {
                        handleUploadPreview(params, 'bgPic2');
                      }
                    "
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        v-if="form.bgPic2"
                        :src="imgUrl + form.bgPic2.url"
                        class="avatar"
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file, 'bgPic2')"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="display: flex; justify-content: center">
              <el-button
                type="primary"
                style="width: 300px"
                @click="handleSaveClick"
                >保存</el-button
              >
            </div>
          </el-form>
        </div>
      </template>
    </list-container>
  </div>
</template>
<script>
import { BASE_URL, IMG_URL } from "@/router/axios";
import { uploadAPI } from "@/api/system/common";
import {
  systemConfigCreateAPI,
  systemConfigUploadAPI,
  systemConfigViewAPI,
} from "@/api/system/config";
import { setSystemConfigInfo, setSystemConfigParams } from "@/util/auth";

export default {
  data() {
    return {
      imgUrl: IMG_URL,
      baseUrl: BASE_URL,
      bgPic2: [],
      bgPic1: [],
      slDomainHandBook: [],
      entOperationManual: [],
      govOperationManual: [],
      logo: [],
      form: {
        version: "",
      },
      rules: {
        sysName: [
          {
            required: true,
            message: "请输入系统名称",
            trigger: " blur",
          },
        ],
        logo: {
          required: true,
          message: "请上传系统logo",
          trigger: "change",
        },
      },
    };
  },
  created() {
    this.getSystemconfig();
  },
  methods: {
    async getSystemconfig() {
      const res = await systemConfigViewAPI();
      if (res.code === 200 && JSON.stringify(res.data) !== "{}") {
        this.form.version = res.data.version;
        this.$set(this.form, "id", res.data.id);
        this.$set(this.form, "sysName", res.data.sysName);
        this.$set(this.form, "copyright", res.data.copyright);
        this.$set(this.form, "defaultPassword", res.data.defaultPassword);
        this.$set(this.form, "bandDomain", res.data.bandDomain);
        this.$set(this.form, "isDefault", res.data.isDefault);
        this.$set(this.form, "inDomain", res.data.inDomain);
        this.$set(this.form, "appId", res.data.appId);
        this.echoImg(res.data.logo, "logo");
        this.echoImg(res.data.bgPic1, "bgPic1");
        this.echoImg(res.data.bgPic2, "bgPic2");
        this.echoImg(res.data.slDomainHandBook, "slDomainHandBook"); //指南
        this.echoImg(res.data.entOperationManual, "entOperationManual"); //企业端操作手册
        this.echoImg(res.data.govOperationManual, "govOperationManual"); //政府端操作手册
      }
    },
    // 回显图片
    echoImg(imgUrl, mark) {
      if (imgUrl.url) {
        this.$set(this.form, mark, imgUrl);
        this[mark].push({
          name: imgUrl.originalFilename,
          url: imgUrl.url,
        });
      }
    },
    // 保存
    handleSaveClick() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.form.id) {
            res = await systemConfigUploadAPI(this.form);
          } else {
            res = await systemConfigCreateAPI(this.form);
          }
          if (res.code === 200) {
            this.$message.success("保存成功");
          }
        }
      });
    },
    // 提交上传文件
    handleUploadPreview(params, value) {
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then((res) => {
        if (res.code == 200) {
          this.$set(this.form, value, res.data);
          this[value].push({
            name: res.data.originalFilename,
            url: res.data.url,
          });
        }
      });
    },
    handleRemove(file, value) {
      this[value] = this[value].filter((item) => item.uid !== file.uid);
    },
  },
};
</script>

<style  lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped lang='scss'>
</style>