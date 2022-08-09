<template>
  <div class="qrcode_box">
    <div
      style="
        color: #000;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
      "
    >
      <div id="downLoadQrcode" style="width: 100px; height: 100px"></div>
      1.手机浏览器扫码下载App
    </div>
    <div
      style="
        color: #000;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
      "
    >
      <div id="App" style="width: 100px; height: 100px"></div>
      2.首次登录扫码完成App配置
    </div>
  </div>
</template>
<script>
import { getSystemConfigInfo } from "@/util/auth";
import { APP_CONFIG } from "@/router/axios";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      sysconfig: getSystemConfigInfo(),
      APP_CONFIG,
    };
  },
  created() {},
  mounted() {
    this.initQrCode(
      `http://hub.qya360.com:8010/software/application/download-newest?appId=${this.sysconfig.appId}`,
      100,
      100,
      "downLoadQrcode"
    );
    this.initQrCode(`${this.APP_CONFIG}`, 100, 100, "App");
  },
  methods: {
    initQrCode(url, width = 100, height = 100, id) {
      document.getElementById(id).innerHTML = "";
      new QRCode(id, {
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
.qrcode_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 265px;
}
</style>