<template>
  <span class="button-select" @click="click">
    <i
      class="iconfont icon-icon--tianjia"
      style="font-size: 14px; margin-right: 8px"
    ></i>
    <span><slot></slot></span>
  </span>
</template>

<script>
export default {
  name: "buttonSelect",
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.button-select {
  display: inline-block;
  height: 30px;
  padding: 0px 10px;
  line-height: 30px;
  border-radius: 2px 2px 2px 2px;
  background: #f0f5ff;
  border: 1px solid #d0e0ff;
  text-align: center;
  font-size: 14px;
  color: #4a80fc;
  cursor: pointer;
}
</style>