<template>
    <el-upload
      :disabled="openOff"
      class="upload-demo"
      drag
      multiple
      name="file"
      :file-list="renderFileList"
      :http-request="(params) => {handleUploadPreview(params)}"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
    >
    <img src="../../assets/images/uploadImg/uploadTwo.png" alt="" style="width:100%">
      <!-- <i class="el-icon-upload" style="color: #1890FF"></i>
      <div class="el-upload__text">
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <div>支持拓展名：.rar .zip .doc .docx .pdf .jpg .png...</div>
      </div> -->
    </el-upload>
</template>
<script>
import { uploadAPI } from "@/api/system/common";
export default {
  name: "render-upload",
  props:{
    name: {
      type: String,
      default: "file",
    },
    fileList: {  // 必传
      type: Array,
      default: () => []
    },
    openOff: { //开启是否禁用
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      
    };
  },
  computed: {
    renderFileList(){
      let renderFileList = []
      if(this.fileList.length>0){
        this.fileList.forEach(element => {
          renderFileList.push({
            name: element.originalFilename,
            url: element.url,
          });
        });
      }
      return renderFileList
    }
  },
  created() {
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList){
      let index = this.fileList.findIndex((item,index)=>{
        return file.name == item.originalFilename
      })
      console.log(index)
      if(index && index > -1||index===0){
        this.$emit('handleRemove',index)
      }
    },
    // 提交上传文件
    handleUploadPreview(params) {
      let formData = new FormData();
      formData.append("file", params.file);
      uploadAPI(formData).then((res) => {
        if(res.code == 200){
          this.$emit('uploadSuccess',res.data)
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/ .el-upload-dragger{
  border: none;
}
</style>