<template>
  <div class="singleChoice">
    <div class="type_title">三、判断题（每题5.0分，共15题）</div>
    <el-form ref="form">
      <div class="item" v-for="(item,index) in judge_from" :key="item" :id="item.id">
        <div class="item_title">
          {{index+1}}.{{item.stem}}
        </div>
        <el-form-item>
          <el-radio-group v-model="item.personAnswer" @change="change">
            <el-radio label="1">正确</el-radio>
            <el-radio label="0">错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <div class="answer">
          <span style="color:#52C41A">考生答案：{{single_choice_form[index]}}</span>
          <span style="#FF4646">考生答案：single_choice_form[index]</span>
        </div>
        <div class="answer">
          <span style="color:#52C41A">正确答案：D</span>
        </div> -->
        <div class="line"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['judge_from'],
  data() {
    return {
    };
  },
  mounted(){
    console.log(this.judge_from)
  },
  methods: {
    change() {
      this.$emit("judgeChange", this.judge_from);
    },
  },
};
</script>
<style scoped lang="scss">
.type_title {
  font-size: 18px;
  font-weight: 400;
  color: #4a80fc;
  margin-bottom: 20px;
}
.item {
  .item_title {
    margin-bottom: 14px;
  }
  .line {
    height: 1px;
    background: #e0e0e0;
    margin: 32px 0px;
  }
}

/deep/ .el-form-item__content {
  margin-left: 0px !important;
  .el-radio {
    display: block;
    margin-bottom: 20px;
    font-size: 16px;
    color: #666666;
  }
}
.answer {
  font-size: 16px;
  line-height: 30px;
}
</style>
