<template>
  <div>
    <el-upload
    :disabled="idCardIsUpload"
    class="avatar-uploader"
    list-type="picture"
    :show-file-list="false"
    :http-request="diyRequest"
    >
      <el-image v-if="idCardImgUrl"
      :src="idCardImgUrl"
      name="idCardImgUrl"
      class="avatar"
      @error="imgLoadError"
      ></el-image>
      <img :src="idCardImgUrl" alt="">
      <el-progress style="margin: 5px;" :width='70' type="circle" :percentage="idCardUploadPercentage">
      </el-progress>
      <div  class="div-plus">
        <i class="el-icon-plus avatar-uploader-icon">
        </i>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadAPI } from "@/api/system/common.js"
export default {
  data() {
    return {
      idCardImgUrl: '',
      idCardIsUpload: false,
      idCardUploadPercentage: 0,
      errorImgUrls: [],
    }
  },
  props: {
   /*可以在使用组件的时候传入一个支持上传的图片格式的数组进来，不传默认default数组*/
    supportType: {//支持上传文件的格式
      default: () => ['image/jpeg', 'image/jpg', 'image/png'],
      type: Array
    }
  },
  methods: {
   /*父组件执行的方法*/
    setEditImg(path) {
      console.log('path',path)
      this.idCardImgUrl = path ? path : ''
    },
    /*自定义上传的方法*/
    diyRequest(param) {
      /*对上传图片的大小和格式校验*/
      const isLt10M = param.file.size / 1024 / 1024 < 4
      if (this.supportType.indexOf(param.file.type) == -1) {
        let supportType = this.supportType
        let msg = ''
        supportType.map(res => {
          msg += res.substring(6) + '/'
        })
        let newMsg = msg.slice(0, (msg.length) - 1)
        this.$Message('error', `请上传正确的图片格式！支持的格式有：` + newMsg)
        return
      }
      if (!isLt10M) {
        this.$Message('error', '上传图片大小不能超过4MB哦!')
        return
      }
      const fileObj = param.file
      const form = new FormData()
      form.append('file', fileObj)
      let callback = (progress) => {
        this.idCardIsUpload = true
        this.idCardUploadPercentage = progress
      }
      /*走后台接口，这里自行换成自己的api*/
      uploadAPI(form, callback).then(res => {
        console.log('res',res)
        this.idCardIsUpload = false
        this.idCardUploadPercentage = 0
        if (res.code == 200) {
          this.idCardImgUrl = res.data.url
          /*成功之后将图片路径暴露给父组件去显示图片*/
          this.$emit('setCardPic', res.data.url)
        } else {
          this.$Message('error', res.message)
        }
      })
    },
    /*当图片显示失败的时候，我会重复10次赋值图片，成功显示就退出，还是失败就会显示失败*/
    imgLoadError(error) {
      let isExist = false
      const src = error.path[0].src.split('?')[0]
      if (this.errorImgUrls.length == 0) {
        this.errorImgUrls.push({ 'src': src, 'number': 1 })
      }
      for (let i = 0; i < this.errorImgUrls.length; i++) {
        if (src === this.errorImgUrls[i].src) {
          isExist = true
          while (this.errorImgUrls[i].number < 10) {
            console.log('我在重复赋值...')
            this.errorImgUrls[i].number++
            const timestamp1 = Date.parse(new Date())
            this[error.path[0].name] = src + '?t=' + timestamp1
          }
        }
      }
      if (!isExist) {//首次上传（不在错误数组图片中，需要执行循环三次赋值）
        this.errorImgUrls.push({ 'src': src, 'number': 1 })
        this.imgLoadError(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.div-plus {
  width: 174px;
  height: 174px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
  width: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

