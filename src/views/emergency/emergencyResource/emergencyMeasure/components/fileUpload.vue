<template>
  <div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      name="file"
      action="#"
      :file-list="renderFileList"
      :http-request="
        (params) => {
          handleUploadPreview(params);
        }
      "
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      accept=".pdf"
      :limit="1"
      :on-exceed="onExceed"
    >
      <el-button size="small" type="primary" :loading="loading">点击上传</el-button
      >
      <!-- <div slot="tip" class="el-upload__tip">只支持拓展名：.pdf,文件大小不超过100M</div> -->
    </el-upload>

    <!-- <el-progress v-if="progress > 0" :percentage="progress"></el-progress> -->
  </div>
</template>
<script>
import request from "@/router/axios";
export default {
  name: "file-upload",
  props: {
    name: {
      type: String,
      default: "file",
    },
    fileList: {
      // 必传
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      progress: 0,
    };
  },
  computed: {
    renderFileList() {
      let renderFileList = [];
      if (this.fileList.length > 0) {
        this.fileList.forEach((element) => {
          renderFileList.push({
            name: element.originalFilename,
            url: element.url,
          });
        });
      }
      return renderFileList;
    },
  },
  created() {},
  methods: {
    onExceed() {
      this.$message.error("只能上传一个");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      this.$emit("handleRemove");
      this.renderFileList = [];
      this.progress = 0;
    },
    // 提交上传文件
    handleUploadPreview(params) {
      let formData = new FormData();
      formData.append("file", params.file);
      this.loading = true;
      request({
        url: "/api/resource/file/upload",
        method: "post",
        data: formData,
        headers: {
          type: "upload",
        },
        timeout: 600000, //超时时长10分钟
        onUploadProgress: (progress) => {
          // 格式化成百分数
          this.progress = Math.floor((progress.loaded / progress.total) * 100);
        },
      })
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.$message.success(res.data.originalFilename + "上传成功");
            this.$emit("uploadSuccess", res.data);
          } else {
            this.loading = false;
            this.$message.error("上传失败");
            this.$emit("handleRemove");
            this.renderFileList = [];
            this.progress = 0;
          }
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error("上传失败");
          this.$emit("handleRemove");
          this.renderFileList = [];
          this.progress = 0;
        });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>