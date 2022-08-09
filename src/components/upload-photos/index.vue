<template>
  <div>
    <el-upload
      class="upload-demo"
      list-type="picture"
      :file-list="fileList"
      :http-request="
        (params) => {
          handleUploadPreview(params);
        }
      "
    >
      <button-select>上传照片</button-select>
      <div slot="file" slot-scope="{ file }">
        <img
          :src="imgUrl + file.url"
          alt=""
          style="width: 100%; cursor: pointer"
          @click="handlePictureCardPreview(file)"
        />
        <div class="upload-delete" @click="handleRemove(file)">删除</div>
      </div>
    </el-upload>
    <basic-dialog
      :title="'图片'"
      :width="800"
      :height="600"
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
export default {
  name: "uploadPhotos",

  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fileList: [],
      imgUrl,
      dialogImageUrl: "",
      dialogVisible: false,
    };
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
          this.$emit("success", this.fileList);
        }
      });
    },

    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
      this.$emit("remove", this.fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-upload-list--picture .el-upload-list__item {
  width: 100px;
  height: 100px;
  padding: 0px;
  margin: 0 auto;
  margin-top: 10px !important;
}

/deep/ .upload-delete {
  position: absolute;
  top: 0px;
  width: 100%;
  background: #ff4646;
  color: white;
  text-align: center;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
</style>