<template>
  <div class="control" style="text-align: center">
    <el-card>

      <el-row>
        <el-button size="mini" icon="el-icon-minus" circle title="减速" @click="changeSpeed(-1)"></el-button>
        <el-button size="mini" icon="el-icon-d-arrow-left" circle title="快退" @click="changeProgress(-10)"></el-button>
        <el-button size="mini" icon="el-icon-video-play" circle title="播放" v-show="!playing" @click="play"></el-button>
        <el-button size="mini" icon="el-icon-video-pause" circle title="暂停" v-show="playing" @click="pause"></el-button>
        <el-button size="mini" icon="el-icon-d-arrow-right" circle title="快进" @click="changeProgress(10)"></el-button>
        <el-button size="mini" icon="el-icon-plus" circle title="加速" @click="changeSpeed(1)"></el-button>
      </el-row>

      <el-slider v-model="progress" :format-tooltip="formatTooltip"> </el-slider>
<!--      <el-button size="mini" round title="视角" v-text="viewport" @click="changeViewPort"></el-button>-->
      <el-button size="mini" round title="速率" v-text="playSpeed"></el-button>
    </el-card>
  </div>
</template>

<script>

export default {

  name: "play-controller",

  props: {
    speedControl: {
      type: Boolean,
      default: true
    }
  },

  data(){
    return {
      playTime: {},//播放的时间
      playSpeed: 1,//播放速度
      playing: true,//播放状态 true-播放中 false-暂停
      progress: 0,//播放进度
      viewport: '跟随视角',
    }
  },

  mounted() {

  },
  methods: {
    //格式化提示
    formatTooltip(val){
      return parseInt(val) + '%'
    },
    //播放
    play(){//开始播放
      this.playing = true
      this.$emit("proceed")
    },
    //停止播放
    pause(){//暂停播放
      this.playing = false
      this.$emit("pause")
    },
    //改变播放速度
    changeSpeed(rate){
      this.playSpeed = this.playSpeed * Math.pow(2, rate)
      this.$emit("changeSpeed", 100 * this.playSpeed)
    },
    //改变进度条
    changeIndex(e){
      this.progress = e * 100
    },
    //改变进度
    changeProgress(pro){
      let changed = this.progress + pro * this.playSpeed
      if(changed > 100){
        changed = 100
      }else if(changed < 0){
        changed = 0
      }
      this.$emit("changeProgress", changed)
    },
    //改变视角
    changeViewPort(){
      let type = ''
      if(this.viewport === "跟随视角"){
        this.viewport = "第一视角"
        type = 'dy'
        this.$emit("changeViewPort", type)
        return
      }else if(this.viewport === "第一视角"){
        this.viewport = "上帝视角"
        type = 'sd'
        this.$emit("changeViewPort", type)
        return
      }else if(this.viewport === "上帝视角"){
        this.viewport = "跟随视角"
        type = 'gs'
        this.$emit("changeViewPort", type)
        return
      }
    },
  }
}

</script>

<style lang="scss" scoped>

</style>
