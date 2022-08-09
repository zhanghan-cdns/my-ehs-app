<template>
  <el-upload
    ref="uploadRef"
    list-type="picture-card"
    name="file"
    :file-list="renderFileList"
    :http-request="
      (params) => {
        handleUploadPreview(params);
      }
    "
    accept="image/*"
    :limit="1"
    :on-exceed="onExceed"
  >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{ file }">
      <img
        class="el-upload-list__item-thumbnail"
        :src="imgUrl + file.url"
        alt=""
      />
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </el-upload>
</template>
<script>
import { imgUrl } from "@/router/axios";
export default {
  name: "img-upload",
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
      imgUrl
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
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    handleRemove(file, fileList) {
      this.$confirm(`确定移除 ${file.name}？`).then(() => {
        let index = this.fileList.findIndex((item, index) => {
          return file.name == item.originalFilename;
        });
        // console.log(index);
        if (index + 1 && index > -1) {
          this.$emit("handleRemove", index);
        }
      });
    },
    // 提交上传文件
    handleUploadPreview(params) {
      let formData = new FormData();
      formData.append("file", params.file);
      // uploadAPI(formData)
      //   .then((res) => {
      //     if (res.code == 200) {
      //       this.$message.success(res.data.originalFilename + "上传成功");
      //       this.$emit("uploadSuccess", res.data);
      //     } else {
      //       this.$message.error("上传失败");
      //       this.renderFileList.pop()
      //     }
      //   })
      //   .catch((e) => {
      //     this.$message.error("上传失败");
      //       this.renderFileList.pop()
      //   });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>