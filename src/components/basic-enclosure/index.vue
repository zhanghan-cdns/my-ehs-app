<template>
  <div style="display: flex">
    <div
      class="enclosure"
      @click="download(index)"
      v-for="(item, index) in attachmentList"
      :key="index"
    >
      <div style="display: flex; align-items: center; padding: 4px">
        <svg-icon
          icon-class="file"
          style="width: 30px; height: 30px"
        ></svg-icon>
        <div
          style="
            color: #4a80fc;
            font-size: 16px;
            font-family: SourceHanSansCN-Medium;
            margin-left: 10px;
          "
        >
          <div style="line-height: 0">
            {{ item ? item : "暂无附件" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {IMG_URL} from "@/router/axios";

export default {
  name: "attachment",
  data() {
    return {imgUrl: IMG_URL};
  },
  props: {
    data: {
      type: String,
      default: "",
    },
  },
  computed: {
    attachmentList() {
      // 如果文件存在
      if (this.data.split("|")[0]) {
        return this.data.split("|")[0].split(",");
      } else {
        return [];
      }
    },
  },
  created() {
  },
  methods: {
    download(index) {
      this.$message.info("正在下载中....");
      let files = this.imgUrl + this.data.split("|")[1].split(",")[index];
      window.location.href = files;
    },
  },
};
</script>

<style scoped lang='scss'>
.enclosure {
  width: auto;
  height: 23px;
  line-height: 23px;
  background: #f0f5ff;
  border: 1px dashed #4a80fc;
  border-radius: 2px;
  display: table;
  padding: 0 20px;
  cursor: pointer;
  margin-right: 20px;

  /deep/ .el-form-item__content {
    line-height: none !important;
  }
}
</style>
