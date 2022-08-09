<template>
  <div class="singleChoice">
    <div class="type_title">一、单项选择题（每题5.0分，共15题）</div>
    <el-form ref="form" :model="single_choice_form" @change="change" >
      <div class="item" v-for="(item,index) in single_choice_form" :key="item.id" :id="item.id">
        <div class="item_title">
          {{index+1}}.{{item.stem}}
        </div>
        <el-form-item label="">
          <el-radio-group v-model="item.personAnswer" @change="change">
            <el-radio label="A">{{item.optiona}}</el-radio>
            <el-radio label="B">{{item.optionb}}</el-radio>
            <el-radio label="C">{{item.optionc}}</el-radio>
            <el-radio label="D">{{item.optiond}}</el-radio>
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
  props:['single_choice_form'],
  data() {
    return {
      A_K:["A","B","C","D","E","F","G","H","I","J","K"]
    };
  },
  mounted() {},
  methods: {
    change() {
      this.$emit("singleChoiceChange", this.single_choice_form);
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
/deep/.el-radio-group{
  display:flex;
}
</style>
