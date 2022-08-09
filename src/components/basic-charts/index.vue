<template>
  <div class="echarts" :id="$attrs.id"></div>
</template>
<script>
export default {
  name: "basicCharts",
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    // 加入延时让图标自适应
    setTimeout(() => {
      this.init();
    }, 500);
  },
  methods: {
    init() {
      this.myChart = this.$echarts.init(
        document.getElementById(this.$attrs.id)
      );
      this.myChart.setOption(this.option);
      this.myChart.getDom().style.height = "100%";
      setTimeout(() => {
        this.myChart.resize();
      }, 20);
    },
    clear() {
      this.myChart.clear();
    },
  },
};
</script>

<style scoped lang='scss'>
.echarts {
  width: 100%;
  height: 100%;
}
</style>