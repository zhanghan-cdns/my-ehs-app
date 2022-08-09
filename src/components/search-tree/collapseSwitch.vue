<template>
  <div class="collapse_switch" @click="handleClick"></div>
</template>
<script>
export default {
  name: "CollapseSpan",
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("collapse");
    },
  },
};
</script>

<style scoped lang='scss'>
.collapse_switch {
  width: 12px;
  height:20px;
  background: pink;
  position: absolute;
  z-index: 1000;
  top: 350px;
  left:-12px
}
</style>