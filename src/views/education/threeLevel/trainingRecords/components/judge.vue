<template>
  <div class="singleChoice">
    <div class="type_title">三、判断题（每题{{judge_from[0]?judge_from[0].score:"5"}}分，共{{judge_from.length}}题）</div>
    <el-form ref="form">
      <div class="item" v-for="(item,index) in judge_from" :key="item" :id="item.id">
        <div class="item_title">
          {{index+1}}.{{item.question.stem}}
        </div>
        <el-form-item>
          <el-radio-group v-model="item.personAnswer" @change="change">
            <el-radio label="1">{{item.question.optionTrue}}</el-radio>
            <el-radio label="0">{{item.question.optionFalse}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="answer">
          <span style="color:#52C41A" v-if="judge_from[index].question.answer==judge_from[index].question.rightKey">考生答案：{{judge_from[index].question.answer==1?judge_from[index].question.optionTrue:judge_from[index].question.optionFalse}}</span>
          <span style="color:#FF4646" v-if="judge_from[index].question.answer!=judge_from[index].question.rightKey">考生答案：{{judge_from[index].question.answer==1?judge_from[index].question.optionTrue:judge_from[index].question.optionFalse}}</span>
        </div>
        <div class="answer">
          <span style="color:#52C41A">正确答案：{{judge_from[index].question.rightKey==1?judge_from[index].question.optionTrue:judge_from[index].question.optionFalse}}</span>
        </div>
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
