<template>
  <div>
    <el-upload
      :class="model ? 'upload-demo' : ''"
      :drag="!!model"
      name="files"
      :list-type="model ? '' : 'picture-card'"
      :file-list="fileList"
      :on-remove="handleRemove"
      :limit="limit"
      :http-request="
        (params) => {
          handleUploadPreview(params);
        }
      "
      multiple
      :disabled="disabled"
    >
      <i v-if="!model" slot="default" class="el-icon-plus"></i>
      <div v-if="!model" slot="file" slot-scope="{ file }">
        <img
          class="el-upload-list__item-thumbnail"
          :src="imgUrl + file.url"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
            ><i class="el-icon-zoom-in"></i
          ></span>
        </span>
      </div>
      <i v-if="model" class="el-icon-upload"></i>
      <div v-if="model" class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div v-if="model" class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <basic-dialog
      :title="'图片'"
      :width="400"
      :height="400"
      v-bind="$attrs"
      @close="dialogVisible = false"
      :openFlag="dialogVisible"
      :showFooter="false"
      show-zoom
      resize
    >
      <template #content>
        <img width="100%" :src="dialogImageUrl" alt="" />
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import { imgUrl } from "@/router/axios";
import { uploadAPI } from "@/api/system/common";
import logoCanvasVue from "@/page/index/logoCanvas.vue";

export default {
  name: "basicUpload",
  data() {
    return {
      fileList: [],
      imgUrl,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  /**
   * model：在文件上传样式和图片上传样式切换
   */
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
    model: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    /**
     * 当photos发生变化时，更新fileList
     *
     * @param val  外部传入的参数名
     */
    photos(val) {
      if (Array.isArray(val)) {
        this.fileList = val;
      } else {
        this.fileList = [];
      }
    },
  },
  methods: {
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.imgUrl + file.url;
      this.dialogVisible = true;
    },
    handleUploadPreview(params) {
      console.log("upload");
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then((res) => {
        if (res.code === 200) {
          if (!this.fileList) {
            this.fileList = [];
          }
          this.fileList.push({
            // url: res.data.url,
            ...res.data,
            name: res.data.originalFilename,
          });
          this.$message.success(res.data.originalFilename + "上传成功");
          this.$emit("onSuccess", this.fileList);
        }
      });
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
      this.$emit("onRemove", this.fileList);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-upload__tip {
  margin-top: 0px;
  margin-bottom: 5px;
  line-height: 10px;
}

/deep/ .el-upload-dragger .el-upload__text {
  line-height: 15px;
}
</style>
