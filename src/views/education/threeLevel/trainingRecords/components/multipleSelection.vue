<template>
  <div class="singleChoice">
    <div class="type_title">二、多项选择题（每题{{multiple_selection_form[0]?multiple_selection_form[0].score:"5"}}分，共{{multiple_selection_form.length}}题）</div>
    <el-form ref="form">
      <div
        class="item"
        v-for="(item, index) in multiple_selection_form"
        :key="item"
        :id="item.id"
      >
        <div class="item_title">{{ index + 1 }}.{{ item.question.stem }}</div>
        <el-form-item>
          <el-checkbox-group v-model="personAnswer" @change="change">
            <el-checkbox label="A">{{ item.question.optiona }}</el-checkbox>
            <el-checkbox label="B">{{ item.question.optionb }}</el-checkbox>
            <el-checkbox label="C">{{ item.question.optionc }}</el-checkbox>
            <el-checkbox label="D">{{ item.question.optiond }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
       <div class="answer">
          <span style="color:#52C41A" v-if="multiple_selection_form[index].question.answer==multiple_selection_form[index].question.rightKey">考生答案：{{multiple_selection_form[index].question.answer}}</span>
          <span style="color:#FF4646" v-if="multiple_selection_form[index].question.answer!=multiple_selection_form[index].question.rightKey">考生答案：{{multiple_selection_form[index].question.answer}}</span>
        </div>
        <div class="answer">
          <span style="color:#52C41A">正确答案：{{multiple_selection_form[index].question.rightKey}}</span>
        </div>
        <div class="line"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["multiple_selection_form"],
  data() {
    return {
      A_K: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
      personAnswer:[],
    };
  },
  watch: {},
  mounted() {},
  methods: {
    change() {
      this.$emit("multipleSelectionChange", this.multiple_selection_form);
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
  .el-checkbox {
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
