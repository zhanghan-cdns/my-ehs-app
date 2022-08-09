<template>
  <el-upload
    class="upload-demo"
    drag
    multiple
    name="file"
    :limit="1"
    :accept="'image/*,video/*'"
    :file-list="renderFileList"
    :http-request="
      params => {
        handleUploadPreview(params);
      }
    "
    :before-remove="beforeRemove"
    :on-remove="handleRemove"
    :on-exceed="onExceed"
  >
    <i class="el-icon-upload" style="color: #1890FF"></i>
    <div class="el-upload__text">
      <div>将文件拖到此处，或<em>点击上传</em></div>
      <div>支持拓展名：mp4 .jpg .png...</div>
    </div>
  </el-upload>
</template>
<script>
import { uploadAPI } from "@/api/system/common";
export default {
  name: "render-upload",
  props: {
    name: {
      type: String,
      default: "file"
    },
    fileList: {
      // 必传
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    renderFileList() {
      let renderFileList = [];
      if (this.fileList.length > 0) {
        this.fileList.forEach(element => {
          renderFileList.push({
            name: element.originalFilename,
            url: element.url
          });
        });
      }
      return renderFileList;
    }
  },
  created() {},
  methods: {
    onExceed() {
      this.$message.error("只能上传1个");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      let index = this.fileList.findIndex((item, index) => {
        return file.name == item.originalFilename;
      });
      if (index && index > -1) {
        this.$emit("handleRemove", index);
      }
    },
    // 提交上传文件
    handleUploadPreview(params) {
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.data.originalFilename + "上传成功");
          this.$emit("uploadSuccess", res.data);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
