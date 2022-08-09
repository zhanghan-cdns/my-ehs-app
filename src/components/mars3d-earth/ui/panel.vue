<template>
  <div class="panel-border" v-if="visible" :style="style">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button v-if="closable" size="mini" style="float:right;padding: 3px 0" type="text" title="收起/展开" @click="switchVisible"> <i class="el-icon-close"></i></el-button>
      </div>

    </el-card>
  </div>
</template>

<script>

export default {
  props: {
    title:{
      type: String,
      default: "标题"
    },
    style:{
      type: String,
      default: "left:10px;top:50px"
    },
    visible:{
      type: Boolean,
      default: true
    },
    closable:{
      type: Boolean,
      default: true
    }
  },
  data(){

  },
  methods: {
    switchVisible(){
      if(this.visible){
        this.visible = false;
      }else{
        this.visible = true;
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.panel-border{
  position: absolute;
  width: 20%;
}
</style>
