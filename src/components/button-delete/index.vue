<template>
  <span class="button-delete" @click="click">
    <i
      class="iconfont icon-a-zu20182"
      style="font-size: 14px; margin-right: 5px"
    ></i>
    <span>删除</span>
  </span>
</template>

<script>
export default {
  name: "buttonDelete",
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.button-delete {
  display: inline-block;
  width: 76px;
  height: 30px;
  margin-left: 10px;
  line-height: 30px;
  border-radius: 2px 2px 2px 2px;
  background: #FFF0F0;
  border: 1px solid #FFD0D0;
  text-align: center;
  font-size: 14px;
  color: #FF4646;
  cursor: pointer;
}
</style>