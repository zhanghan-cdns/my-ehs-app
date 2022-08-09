<!--  -->
<template>
  <div>
    <div class="list">
      <div class="approval">
        <p>上报人员：</p>
        <p>上报时间：</p>
      </div>
      <div class="list-img">
        <img src="../../../../assets/images/repeat.png" alt="" />
      </div>
      <div class="approval">
        <p>审批人员：</p>
        <p>审批时间：</p>
        <p>审批意见：</p>
        <p>是否通过：</p>
        <p>审批人签字：</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.list {
  display: flex;
  justify-content: space-around;

  .list-img {
    padding-top: 155px;
    img {
      width: 37.48px;
      height: 19.26px;
    }
  }
  .approval {
    width: 276px;
    height: 234px;
    background: #f6fcff;
    border-radius: 4px 4px 4px 4px;
    border: 2px solid #0a8def;
    p {
      padding-left: 27px;
      font-size: 14px;
      padding-top: 6px;
    }
  }
}
</style>