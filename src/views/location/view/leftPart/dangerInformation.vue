<template>
  <div class="common-box">
    <div class="common-title">报警信息</div>
    <div class="common-content">
      <div class="danger-box">
        <div class="danger-item" v-for="(item, index) in bjdata" :key="index">
          <span class="item-name">{{ item.name }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "departmentOnlineRate",
  data() {
    return {
      bjdata: [
        { name: "丁健平审核，在球罐区", time: "2022-04-10 15:20:14" },
        { name: "李云琴主动报警", time: "2022-04-10 15:20:14" },
        { name: "丁健平审核，在球罐区", time: "2022-04-10 15:20:14" },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.common-box {
  width: 100%;
  margin: 16px 0;
  .common-title {
    font-size: 14px;
    color: #fff;
    height: 42px;
    line-height: 42px;
    padding-left: 32px;
    background: url("/img/rydw/left-title.png") no-repeat;
    background-size: 100% 42px;
    position: relative;
  }
  .common-title::before {
    content: "";
    width: 15px;
    height: 15px;
    background: url("/img/rydw/circle.png") no-repeat;
    background-size: 15px 15px;
    position: absolute;
    top: 13px;
    left: 10px;
  }
  .common-content {
    color: #fff;
    background: rgba(1, 21, 52, 0.8);
    opacity: 1;
    border: 1px solid #0162b3;
    overflow-y: scroll;
    max-height: 180px;
    .danger-box {
      margin: 10px;
      .danger-item {
        padding: 4px 8px;
        margin: 6px 0;
        background: #051a3a;
        border-radius: 2px 2px 2px 2px;
        opacity: 1;
        border: 1px solid #ff0000;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          font-size: 10px;
        }
        .item-name {
          color: red;
        }
      }
    }
  }
}
  // 滚动条样式
  .common-content::-webkit-scrollbar {
    width: 9px;
    height: 10px;
    background-color: rgba(0,45,117,0);
  }
  .common-content::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #2B3358;
  }
</style>
