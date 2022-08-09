<template>
<div class="pdf" :key="currentKey">
  <div class="pdf-tab">
    <el-button type="primary" @click.stop="prePage">上一页</el-button>
    <el-button type="primary" @click.stop="nextPage">下一页</el-button>
    <!-- <el-button type="primary" @click.stop="clock">顺时针</el-button>
    <el-button type="primary" @click.stop="counterClock">逆时针</el-button>
    <el-button type="primary" @click.stop="pdfPrintAll">全部打印</el-button>
    <el-button type="primary" @click.stop="pdfPrint">部分打印</el-button> -->
    <span style="margin-left:20px">页面加载：{{pageNum}}/{{pageTotalNum}}</span>
    <!-- <span>进度：{{loadedRatio}}</span>
    <span>页面加载成功: {{curPageNum}}</span> -->
  </div>
  <div class="pdf-con">
    <pdf
      ref="pdf"
      :src="pdfUrl"
      :page="pageNum"
      :rotate="pageRotate"
      @password="password"
      @progress="loadedRatio = $event"
      @page-loaded="pageLoaded($event)"
      @num-pages="pageTotalNum=$event" 
      @error="pdfError($event)"
      @link-clicked="page = $event">
    </pdf>
  </div>
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: "render-pdf",
  components:{ pdf },
  data(){
      return {
        // pdfUrl:"https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf",
        currentKey: '1',
        pdfUrl: '',
        pageNum: 1,
        pageTotalNum: 1,
        pageRotate: 0,
        // 加载进度
        loadedRatio: 0,
        curPageNum: 0,
      }
  },
  methods: {
    open(pdfUrl){
      this.currentKey++
      this.pageNum = 1
      this.pageTotalNum = 1
      this.pdfUrl = pdfUrl
    },
    prePage(){
      var p = this.pageNum
      p = p>1?p-1:this.pageTotalNum
      this.pageNum = p
    },
    nextPage(){
      var p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    clock(){
      this.pageRotate += 90 
    },
    counterClock(){
      this.pageRotate -= 90 
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
    pdfPrintAll(){
      this.$refs.pdf.print()
    },
    pdfPrint(){
      this.$refs.pdf.print(100,[1,2])
    },
  }
}
</script>
<style scoped lang='scss'>
.pdf{
  height: 100%;
  display: flex;
  flex-direction: column;
  .pdf-tab{
    margin: 10px 0 0
  }
  .pdf-con{
    overflow: auto;
  }
}

</style>