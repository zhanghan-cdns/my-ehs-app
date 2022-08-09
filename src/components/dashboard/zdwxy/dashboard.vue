<template>
  <grid-layout
    ref="gridLayout"
    :layout.sync="layout"
    :col-num="12"
    :row-height="rowHeight"
    :is-draggable="false"
    :is-resizable="false"
    :use-css-transforms="true"
    :vertical-compact="false"
    :responsive="false"
    style="height: 100%"
  >
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
    >
      <div style="background: #fff; width: 100%; height: 100%">
        <div>异常图表</div>
        <component :is="item.c"></component>
      </div>
    </grid-item>
  </grid-layout>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import configs from "../index";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  created() {},
  mounted() {
    let height = document.documentElement.clientHeight;
    if (height >= 1080) {
      this.rowHeight = 35;
    } else if (height >= 1000) {
      this.rowHeight = 33;
    } else if (height >= 969) {
      this.rowHeight = 30;
    } else if (height >= 900) {
      this.rowHeight = 26;
    } else if (height >= 836) {
      this.rowHeight = 23;
    } else if (height >= 800) {
      this.rowHeight = 21;
    } else if (height >= 768) {
      this.rowHeight = 20;
    }
  },
  data() {
    return {
      layout: configs.zdwxy.layout,
      rowHeight: 30,
    };
  },
  methods: {},
};
</script>

<style scoped lang=''>
</style>