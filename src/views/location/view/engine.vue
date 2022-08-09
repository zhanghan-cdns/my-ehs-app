<template>

</template>
<script>

export default {

  name: 'locationEngine',

  data() {
    return {
      url: '',
      websocket: null,
      heartBeat: null,
      retryTime: 0,
      echoMsg: 0,
      MAX_RETRY_TIMES: 5,
    };
  },

  methods: {
    //获取连接
    getConnection(url){
      if(url){
        this.url = url
      }
      if('WebSocket' in window){
        this.websocket = new WebSocket(this.url)
      }else{
        this.$message("您的浏览器不支持WebSocket连接，请升级到最新版，建议使用Chrome浏览器访问本系统！")
      }
      this.websocket.onopen = ()=>{
        console.log(this.url + "Websocket连接建立成功！")
        //this.startHeartBeat()
      }
      this.websocket.onmessage = (event)=>{
        let msgObj = JSON.parse(event.data)
        switch(msgObj.type){
          case "pong"://心跳

            break;
          case "scene":  // 场景初始化
            this.$emit("initScene", msgObj.content)
            break;
          case "location":  // 更新定位
            this.$emit("location", msgObj.content)
            break;
          default:
            console.log("未知类型消息！");
        }
      }
      this.websocket.onerror = ()=>{
        console.log(this.url + "Websocket连接失败，重新建立连接中！")
        this.retryTime++
        this.getConnection()
      }
    },
    //开始心跳检测
    startHeartBeat(){
      if(this.retryTime <= this.MAX_RETRY_TIMES){
        if(this.heartBeat){
          clearInterval(this.heartBeat)
        }
        this.heartBeat = setInterval(()=>{
          let msgObj = {"type":"ping","content":{"msg": ++this.echoMsg}}
          this.websocket.send(JSON.stringify(msgObj))
        }, 5000 * this.retryTime)
      }else{
        this.$message("已达到最大重连次数，请检查网络连接后刷新本页面！")
      }
    },
  },
  //销毁前先关闭连接
  beforeDestroy() {
    if(this.websocket){
      this.websocket.close()
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
