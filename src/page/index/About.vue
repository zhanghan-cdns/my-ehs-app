<template>
  <div class="main_box">
    <div
      v-if="!keyCollapse"
      style="
        display: flex;
        align-items: center;
        background: rgb(220 223 230 / 50%);
        padding: 5px 15px;
        border-radius: 3px;
        justify-content: space-around;
        width: 60%;
        cursor: pointer;
      "
      @click="downLoad"
    >
      <svg-icon style="width: 30px; height: 25px" icon-class="下载"></svg-icon>
      <div class="text">操作指南</div>
    </div>
    <div
      style="width: 30px; height: 30px; cursor: pointer"
      v-if="keyCollapse"
      @click="downLoad"
    >
      <svg-icon style="width: 30px; height: 25px" icon-class="下载"></svg-icon>
    </div>
    <!-- <div class="icon" v-if="keyCollapse">
      <div>
        <i class="iconfont icon-dianhua2"></i>
      </div>
      <div>
        <i class="iconfont icon-youjian"></i>
      </div>
    </div> -->
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { mapGetters } from "vuex";
import { getSystemConfigInfo, getUserType } from "@/util/auth";
import { IMG_URL } from "@/router/axios";
export default {
  data() {
    return {
      QRcodeMSg: "http://www.qya360.com/index.html",
      sysconfig: getSystemConfigInfo(),
      usertype: getUserType(),
      imgUrl:IMG_URL,
    };
  },
  computed: {
    ...mapGetters(["keyCollapse"]),
  },
  watch: {
    keyCollapse(val) {
      // if (val) {
      //   this.initQrCode(this.QRcodeMSg, 40, 40);
      // } else {
      //   this.initQrCode(this.QRcodeMSg, 70, 70);
      // }
    },
  },
  created() {},
  mounted() {
    // this.initQrCode(this.QRcodeMSg, 70, 70);
  },
  methods: {
    // 下载操作指南
    downLoad() {
      console.log(this.usertype);
      if (this.usertype == 2) {
        let files =
          this.imgUrl + this.sysconfig.entOperationManual.split("|")[1];
        window.location.href = files;
      } else if (this.usertype !== 2) {
        let files =
          this.imgUrl + this.sysconfig.govOperationManual.split("|")[1];
        window.location.href = files;
      }
    },
    //  初始化二维码
    initQrCode(url, width, height) {
      document.getElementById("qrCode").innerHTML = "";
      new QRCode("qrCode", {
        text: url,
        width: width,
        height: height,
        colorDark: "#000", //二维码颜色
        colorLight: "#fff", //二维码背景色
        // correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      });
      // code.clear()
      // code.makeCode(url) //生成另一个新的二维码
    },
  },
};
</script>

<style scoped lang='scss'>
.main_box {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  align-items: center;
  justify-content: center;
  background: #144182;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid rgb(30, 85, 167);
  .code_box {
    width: 70px;
    height: 70px;
    background: #144182;
  }
  .text {
    margin-right: 20px;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }
  .icon {
    color: #fff;
  }
}
</style>