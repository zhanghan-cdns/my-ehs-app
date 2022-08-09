import html2canvas from "html2canvas";
import { Message } from 'element-ui';
import jsPDF from "jspdf";
export function getPdf(ele) {
  Message({
    message: '正在导出,请稍后',
    type: 'info'
  });
  let element = document.getElementById(ele)
  let width = element.offsetWidth; //获取dom 宽度
  let height = element.offsetHeight; //获取dom 高度
  let scale = 3; //定义任意放大倍数 支持小数
  // let canvas = document.createElement("canvas"); //创建一个canvas节点
  // canvas.width = width * scale
  // canvas.height = height * scale
  // canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
  // let context = canvas.getContext('2d')
  // context.translate('-' + (element.offsetLeft), '-' + (element.offsetTop))
  let opts = {
    // dpi: window.devicePixelRatio * scale,
    dpi:5000,
    scale: scale, // 添加的scale 参数
    // canvas, //自定义 canvas
    logging: true, //日志开关，便于查看html2canvas的内部执行流程
    width: width, //dom 原始宽度
    height: height,
    useCORS: true, // 【重要】开启跨域配置
    // allowTaint:true,
    // proxy:'http://180.97.197.46:1888/api/risk'
  };
  html2canvas(element, opts).then(canvas => {
    // let contentWidth = canvas.width
    // let contentHeight = canvas.height
    // let pdfX = (contentWidth + 10) / 2 * 0.75
    // let pdfY = (contentHeight + 700) / 2 * 0.75 // 500为底部留白

    let imgX = 730;
    let imgY = 570; //内容图片这里不需要留白的距离
    let doc = new jsPDF("l", "pt", 'a4');
    let dataUrl = canvas.toDataURL('image/png', 'a4')
    let img = new Image()
    img.src = dataUrl
    doc.addImage(dataUrl, 'png', 50, 10, imgX, imgY);
    doc.save('风险告知卡.pdf')
    // this.$emit('imgdata10',dataUrl)
    Message({
      message: '导出成功',
      type: 'success'
    });
  }).catch(err => {
    console.log(err);
    Message({
      message: '导出失败',
      type: 'error'
    });
  });
}