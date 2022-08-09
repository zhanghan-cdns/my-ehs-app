<template>
  <div>
    <div class="safety-disclosures-item">
      <div class="disclosures-item-name">安全交底人签字</div>
      <div class="disclosures-item-value">
        <img
          v-if="safety !== ''"
          :src="safety"
          style="width: 133px; height: 50px"
        />
        <button-select v-else @click="sign('safety')">签字</button-select>
      </div>
    </div>
    <div class="safety-disclosures-item">
      <div class="disclosures-item-name">接受交底人签字</div>
      <div class="disclosures-item-value">
        <img
          v-if="recipient !== ''"
          :src="recipient"
          style="width: 133px; height: 50px"
        />
        <button-select v-else @click="sign('recipient')">签字</button-select>
      </div>
      <i
        class="iconfont icon-icon--tianjia icon"
        style="color: #4a80fc"
        @click="addItem"
      ></i>
    </div>
    <div
      v-for="(item, index) in recipientList"
      :key="index"
      class="safety-disclosures-item"
    >
      <div class="disclosures-item-name">接受交底人签字</div>
      <div class="disclosures-item-value">
        <img
          v-if="item && item !== ''"
          :src="item"
          style="width: 133px; height: 50px"
        />
        <button-select v-else @click="sign(index)">签字</button-select>
      </div>
      <i
        class="iconfont icon-a-zu20182 icon"
        style="color: #ff0000"
        @click="deleteItem(index)"
      ></i>
    </div>
    <div style="text-align: center; margin-top: 50px">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="warning" @click="close">取消</el-button>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      safety: "",
      recipient: "",
      recipientList: [],
    };
  },
  methods: {
    addItem() {
      this.recipientList.push("");
    },
    deleteItem(index) {
      this.recipientList.splice(index, 1);
    },
    // 签字
    sign(type) {
      this.$refs.signDialogRef.open(type);
    },

    // 获取签字图片
    getSignImg(imgSrc, type) {
      switch (type) {
        case "safety":
          this.safety = imgSrc;
          break;
        case "recipient":
          this.recipient = imgSrc;
          break;
        default:
          this.$set(this.recipientList, type, imgSrc);
          break;
      }
    },

    submit() {},
  },
};
</script>

<style lang="scss" scoped>
.safety-disclosures-item {
  display: flex;
  .disclosures-item-name {
    width: 224px;
    height: 52px;
    padding: 0 15px 0 0;
    line-height: 52px;
    background: #f0f5ff;
    border: 1px solid #d0e0ff;
    margin-bottom: -1px;
    margin-right: -1px;
    text-align: right;
    font-size: 14px;
  }
  .disclosures-item-value {
    width: 1287px;
    height: 52px;
    line-height: 52px;
    background: #ffffff;
    border: 1px solid #d0e0ff;
    margin-bottom: -1px;
    margin-right: -1px;
    padding: 0px 10px;
  }
  .icon {
    font-size: 33px;
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>