<template>
  <div id="">
    <basicDialog
      :icon="'icon-daoru'"
      :title="'导入数据'"
      :width="493"
      :height="245"
      v-bind="$attrs"
      @close="close"
      id="modal2"
      :openFlag="openExport"
    >
      <template #content>
        <div style="display: flex; justify-content: center">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <div v-else class="avatar-uploader-icon">
              <svg-icon icon-class="shangchuan" class="svg_icon"></svg-icon>
              <div class="svg_text">上传数据</div>
            </div>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>
      </template>
      <template #bottom>
        <el-button type="primary" size="medium" @click="handleConfirm()">确定</el-button>
        <el-button type="success" size="medium" @click="handleUpload()">下载模板</el-button>
        <el-button type="warning" size="medium" @click="close()">关闭</el-button>
      </template>
    </basicDialog>
  </div>
</template>
<script>
export default { name:'exportDialog',
  data() {
    return {
      openExport: false,
    };
  },
  methods: {
    open() {
      this.openExport = true;
    },
    close() {
      this.openExport = false
    },
    handleConfirm(){
      this.openExport = false
      this.$emit('handleConfirm')
    },
    handleUpload(){
      this.$emit('handleUpload')
    }
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--box {
  // width: 493px !important;
  // height:245px !important;
}
.avatar-uploader /deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  color: #8c939d;
  width: 258px;
  height: 128px;
  line-height: 128px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .svg_icon {
    width: 80px;
    height: 80px;
  }
  .svg_text {
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #4789e9;
  }
}
.avatar {
  width: 258px;
  height: 128px;
  display: block;
}
</style>