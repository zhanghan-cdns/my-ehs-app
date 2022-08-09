<template>
  <div class="historyChart" id="historyChart"></div>
</template>

<script>
export default {
  props: {
    realData: {
      type: Object,
      default() {
        return {};
      },
    },
    xData: {
      type: Array,
      default() {
        return [];
      },
    },
    yData: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      historyChart: null,
      historyChartOption: {
        option: null,
      },
      code: "",
    };
  },

  mounted() {
    // 加入延时让图标自适应
    if (this.xData.length > 0 && this.yData.length > 0) {
      this.initChart();
    }
  },

  beforeDestory() {
    echarts.dispose(this.chart);
    this.chart = null;
  },

  watch: {
    "realData.threUpVal": function (newVal) {
      console.log(newVal, "realData.threUpVal");
      this.initChart();
    },
    xData: function (newVal) {
      console.log(newVal, "xData");
      if (newVal.length > 0) {
        this.initChart();
      }
    },
    yData: function (newVal) {
      if (newVal.length > 0) {
        this.initChart();
      }
    },
  },

  methods: {
    initChart() {
      let option = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(255,255,255)",
          formatter: function (params) {
            return `
            <div style="padding:11px">
                <div style="display:flex;text-align:center;font-size: 10px;color: #6F6F6F;">
                    <div style="width:8px;height:8px;border-radius:8px;background:#3CAAFF;margin-right:7px;margin-top:7px"></div>
                    <div>${params.name}</div>
                </div>
                <div style="text-align:center;font-size: 11px;color: #0090FF;">${params.value}m</div>
            </div>
            `;
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
          axisLabel: {
            interval: 1,
            showMinLabel: true,
            showMaxLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yData,
            type: "line",
            smooth: "true",
            itemStyle: {
              color: "rgba(60, 170, 255, 1)",
            },
            areaStyle: {
              color: ["rgba(60, 170, 255, 0.2784313725490196)"],
            },
            markLine: {
              symbol: ["none", "none"], // none为标线两端的样式为无，可更改
              data: [
                {
                  silent: false,
                  yAxis: this.realData.threUpVal, // 表现自定义的位置，可赋值
                  label: {
                    position: "insideEndTop", // 表现内容展示的位置
                    formatter: "阈值上限", // 标线展示的内容
                    color: "#EB7617", // 展示内容颜色
                  },
                  lineStyle: { type: "solid", color: "#FF933C", width: 3 }, // 样式： 线型、颜色、线宽
                },
                {
                  silent: false,
                  yAxis: this.realData.threDownVal, // 表现自定义的位置，可赋值
                  label: {
                    position: "insideEndTop", // 表现内容展示的位置
                    formatter: "阈值下限", // 标线展示的内容
                    color: "#108BEB", // 展示内容颜色
                  },
                  lineStyle: { type: "solid", color: "#3CAAFF", width: 3 }, // 样式： 线型、颜色、线宽
                },
              ],
            },
          },
        ],
      };
      this.$set(this.historyChartOption, "option", option);
      this.historyChart = this.$echarts.init(
        document.getElementById("historyChart")
      );
      this.historyChart.setOption(this.historyChartOption.option, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.historyChart {
  width: 100%;
  height: 100%;
}
</style>