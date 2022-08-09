<template>
  <div class="singleChoice">
    <div class="type_title">四、填空题（每题{{blank_from[0]?blank_from[0].score:"5"}}分，共{{blank_from.length}}题）</div>
    <el-form ref="form">
      <div class="item" v-for="(item,index) in blank_from" :key="item" :id="item.id">
        <div class="item_title">
          {{index+1}}.{{item.question.stem}}
        </div>
        <el-form-item>
          <el-form-item label="答案">
            <el-input v-model="item.personAnswer" @input="change"></el-input>
          </el-form-item>
        </el-form-item>
       <div class="answer">
          <span style="color:#52C41A" v-if="blank_from[index].question.answer==blank_from[index].question.rightKey">考生答案：{{blank_from[index].question.answer}}</span>
          <span style="color:#FF4646" v-if="blank_from[index].question.answer!=blank_from[index].question.rightKey">考生答案：{{blank_from[index].question.answer}}</span>
        </div>
        <div class="answer">
          <span style="color:#52C41A">正确答案：{{blank_from[index].question.rightKey}}</span>
        </div>
        <div class="line"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["blank_from"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    change() {
      this.$emit("blankFromChange", this.blank_from);
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
.answer {
  font-size: 16px;
  line-height: 30px;
}
/deep/.el-form-item__content {
  height: 40px;
  .el-input {
    width: 40%;
  }
  .el-input__inner {
    height: 30px;
    border:none;
    border-bottom: 1px solid #DCDFE6;
    border-radius: 0px;
  }
  .el-form-item {
    margin-top: 60px;
    white-space: normal;
  }
}
</style>
