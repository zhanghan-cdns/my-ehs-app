<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1418"
      height="918"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <canvas id="myCanvas"></canvas>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import {
  dcsPointAPI,
  selectDcsPointAPI,
} from "@/api/hazard/monitoringIndicators/index";
import { dcsInfoByIndexIdsAPI } from "@/api/hazard/dcsInfo/index";
import { imgUrl } from "@/router/axios";

export default {
  data() {
    return {
      icon: "icon-bianji",
      title: "绑定DCS标点",
      openEdit: false,
      canvas: null,
      context: null,
      img: null, //图片对象
      imgsrc: "",
      imgX: 0,
      imgY: 0,
      imgScale: 1,
      drawCircle: true, //绘制实心圆
      mousePressed: false, //是否拖拽
      eleHeight: 820, //canvas高度
      eleWidth: 1380, //canvas宽度
      mousePosX: 0, //鼠标点击处
      mousePosY: 0,
      mouseStart: 0, // 判断是点击还是拖拽
      mouseEnd: 0,
      scaleFlag: 0, //缩放因子，最大缩放9,最小缩放-9
      isRightClick: false,
      startpos: true,
      row: {},
      dcsId: "",
      imgUrl,
    };
  },
  created() {},
  methods: {
    open(row, dcsId) {
      this.row = row;
      this.dcsId = dcsId;
      this.openEdit = true;
      // this.mousePosX = 845;
      // this.mousePosY = 301;
      this.imgScale = 1;
      // this.imgsrc = require("@/assets/images/realTimeData/testdcs.png");
      this.getDcsUrl();
    },
    // 获取组态图
    async getDcsUrl() {
      let params = {
        ids: this.dcsId || "",
      };
      const res = await dcsInfoByIndexIdsAPI(params);
      if (res && res.code === 200 && res.data) {
        this.imgsrc = this.imgUrl + res.data[0].enclosurePhoto[0].url;
        // this.imgsrc = require("@/assets/images/realTimeData/testdcs.png");
        console.log(this.imgsrc, "imgsrc");
        this.getDcsPoint();
      }
    },
    // 获取点位
    async getDcsPoint() {
      let params = { indexId: this.row.id, dcsId: this.dcsId };
      const res = await selectDcsPointAPI(params);
      if (res && res.code === 200 && res.data.length > 0) {
        this.mousePosX = res.data[0].width;
        this.mousePosY = res.data[0].height;
      }
      this.initCanvas();
    },

    initCanvas() {
      this.$nextTick(() => {
        console.log(this.mousePosX, this.mousePosY);
        this.canvas = document.getElementById("myCanvas"); //画布对象
        this.canvas.height = this.eleHeight;
        this.canvas.width = this.eleWidth;
        this.context = this.canvas.getContext("2d"); //画布显示二维图片
        this.loadImg();
        this.canvasEventsInit();
      });
    },

    /*加载画布图片信息*/
    loadImg() {
      this.img = new Image();
      this.img.src = this.imgsrc;
      let that = this;
      this.img.onload = function () {
        // imgIsLoaded = true;
        that.drawImage();
      };
    },

    /*绘制画布*/
    drawImage() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(
        this.img, //规定要使用的图像、画布或视频。
        0,
        0, //开始剪切的 x 坐标位置。
        this.img.width,
        this.img.height, //被剪切图像的高度。
        this.imgX,
        this.imgY, //在画布上放置图像的 x 、y坐标位置。
        this.canvas.width * this.imgScale,
        this.canvas.height * this.imgScale //要使用的图像的宽度、高度
      );

      // 画实心圆
      if (this.drawCircle) {
        console.log(this.imgScale, "imgScale");
        let icon = new Image();
        icon.src = require("@/assets/images/point.png");
        this.$nextTick(() => {
          this.context.drawImage(
            icon, //规定要使用的图像、画布或视频。
            this.imgX + (this.mousePosX - 13) * this.imgScale,
            this.imgY + (this.mousePosY - 24) * this.imgScale,
            23 * this.imgScale,
            34 * this.imgScale
          );
        });
      }
    },
    /*事件注册*/
    canvasEventsInit() {
      let that = this;
      this.canvas.onmousedown = function (event) {
        that.mousePressed = true;
        that.mouseStart = event.clientX;
        let pos = that.windowToCanvas(event.clientX, event.clientY); //坐标转换，将窗口坐标转换成canvas的坐标
        that.canvas.onmousemove = function (evt) {
          //移动拖拽
          if (that.mousePressed) {
            that.canvas.style.cursor = "move";
            let posl = that.windowToCanvas(evt.clientX, evt.clientY);
            let x = posl.x - pos.x;
            let y = posl.y - pos.y;
            pos = posl;
            that.imgX += x;
            that.imgY += y;
            that.drawImage(); //重新绘制图片
          }
        };
        // 阻止默认的右击属性
        document.oncontextmenu = function () {
          return false;
        };
        //定义新的的右击属性
        document.getElementById("myCanvas").onmouseup = async function (
          oEvent
        ) {
          console.log(oEvent, "oevent");
          that.mousePressed = false;
          that.isRightClick = true;
          that.mouseEnd = oEvent.clientX;
          if (!oEvent) oEvent = window.event;
          // 鼠标点击 (0：左键  2：右键)
          if (oEvent.button == 2 || oEvent.button == 0) {
            if (that.startpos) {
              that.mousePosX = (oEvent.offsetX - that.imgX) / that.imgScale;
              that.mousePosY = (oEvent.offsetY - that.imgY) / that.imgScale;
              console.log(that.mousePosX, that.mousePosY, "xy");
              let params = {
                indexId: that.row.id,
                dcsId: that.dcsId,
                width: that.mousePosX,
                height: that.mousePosY,
              };
              const res = await dcsPointAPI(params);
              if (res && res.code === 200) {
                that.$message.success("标点成功");
              }
              //保存位置
              //   $.ajax({
              //     type: "get",
              //     url:
              //       ctx +
              //       "/bis/ztt/saveZttloc/" +
              //       pointid +
              //       "/" +
              //       mousePosX +
              //       "/" +
              //       mousePosY,
              //     success: function (data) {
              //       layer.alert(data, { offset: "rb", shade: 0, time: 2000 });
              //       dg.datagrid("reload");
              //     },
              //   });
              that.drawImage(); //重新绘制图片
            }
          }
        };
      };
      this.canvas.onmousewheel = function (event) {
        console.log(event, "event");
        //滚轮放大缩小
        let pos = that.windowToCanvas(event.clientX, event.clientY);
        // event.wheelDelta = event.wheelDelta ? event.wheelDelta : event.deltalY * -40; //获取当前鼠标的滚动情况
        // 放大
        if (event.wheelDelta > 0 && that.scaleFlag < 3) {
          that.imgScale *= 2;
          that.imgX = that.imgX * 2 - pos.x;
          that.imgY = that.imgY * 2 - pos.y;
          that.scaleFlag += 1;
        }
        // 缩小
        if (event.wheelDelta < 0 && that.scaleFlag > -3) {
          that.imgScale /= 2;
          that.imgX = that.imgX * 0.5 + pos.x * 0.5;
          that.imgY = that.imgY * 0.5 + pos.y * 0.5;
          that.scaleFlag -= 1;
        }
        that.drawImage(); //重新绘制图片
      };
    },
    /*坐标转换*/
    windowToCanvas(x, y) {
      let box = this.canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
      return {
        x: x - box.left,
        y: y - box.top,
      };
    },
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>