<template>
  <div style="width: 33%;padding: 5px;box-sizing: border-box" >
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="false"
      :options='{
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            // src: item.video_stream_address,
            src: src
          },
        ],
        poster: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false, //当前时间和持续时间的分隔符
          durationDisplay: false, //显示持续时间
          // remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      }'></video-player>
    <div class="title">{{ videoTitle }}</div>
  </div>
</template>

<script>
export default {
  name: "videoItem",
  props: ["src", "videoTitle"],
}
</script>

<style lang="scss">

.video-js.vjs-fluid{
  height: 100%;
  .vjs-tech{
    object-fit: cover;
  }
}
.dark_cover{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  z-index: -1;
}

.video-js  .vjs-big-play-button {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
}

</style>
<style scoped lang="scss">
.title {
  background: #2b60c7;
  text-align: center;
  color: #fff;
}


</style>
