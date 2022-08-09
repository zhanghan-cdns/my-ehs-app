<template>
  <div class="container_box" :style="$attrs.headerConfig.padding?`padding:${$attrs.headerConfig.padding}`:''" v-if="$attrs.headerConfig">
    <svg-icon
      :icon-class="$attrs.headerConfig.icon?$attrs.headerConfig.icon:'jichuxinxi'"
      style="width: 20px; height: 20px"
    />
    <div class="header_title">{{ $attrs.headerConfig?$attrs.headerConfig.headerTitle:'基础信息' }}</div>
  </div>
</template>
<script>
// 组件传值配置
// headerConfig: {
//   icon: "jichuxinxi",
//   headerTitle: "基础信息",
// },
export default {
  name:'dialogHeader',
  data() {
    return {};
  },
  created() {
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.container_box {
  display: flex;
  padding: 0 50px;
  padding-top: 10px;
  align-items: center;
  .header_title {
    padding: 0 5px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #515151;
  }
}
</style>