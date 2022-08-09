<template>
  <div class="container" v-show="openFlag">
    <div class="wrap">
      <img src="@/assets/images/education/pz_bg.png" alt="" />
      <div class="title">外来方人员考试信息</div>
      <div class="box">
        <div class="item">
          <span>外来方单位名称：</span>
          <span>江苏天力建设集团有限公司</span>
        </div>
        <div class="item">
          <span>考试人员：</span>
          <span>1</span>
        </div>
        <div class="item">
          <span>身份证号：</span>
          <span>34242219945656255</span>
        </div>
        <div class="item">
          <span>考试成绩：</span>
          <span>100</span>
        </div>
        <div class="item">
          <span>考试结果：</span>
          <span>合格</span>
        </div>
        <div class="item">
          <span>有效期：</span>
          <span>2020-5-06 至 2023-06-09</span>
        </div>
        <div class="code">
          <img src="@/assets/images/education/pz_bg.png" alt="" />
        </div>
      </div>
      <div class="bot">
        <div class="btn" @click="close">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openFlag: true,
      form: {},
    };
  },
  methods: {
    open() {
      this.openFlag = true;
    },
    close(){
      this.openFlag=false;
    }
  },
};
</script>
<style scoped lang="scss">
.container {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  // display: none;
}
.wrap {
  width: 375px;
  height: 667px;
  position: absolute;
  top: calc(50% - 333px);
  left: calc(50% - 186px);
  img {
    width: 100%;
  }
  background: gainsboro;
  z-index: 10;
  .title {
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: white;
  }
}
.box {
  width: 96%;
  position: absolute;
  top: 82px;
  height: 532px;
  background: white;
  border-radius: 4px;
  left: 2%;
  .item {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    height: 48px;
    border-bottom: 1px solid #efefef;
    padding: 0 10px;
  }
}
.bot {
  width: 100%;
  height: 50px;
  background: white;
  position: absolute;
  left: 0px;
  bottom: 0px;
  .btn{
    height: 28px;
    width:58px;
    background-color: #1E9FFF;
    border-radius: 2px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
  }
}
.code {
  width: 187px;
  height: 187px;
  border: solid 1px #eee;
  padding: 4px;
  border-radius: 4px;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90%;
    height: 90%;
  }
}
</style>
