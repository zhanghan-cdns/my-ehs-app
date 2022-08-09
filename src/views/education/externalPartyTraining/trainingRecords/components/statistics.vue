<template>
  <basic-dialog title="三级教育统计" :width="'80%'" :height="'60%'" v-bind="$attrs" @close="openFlag=false" :openFlag="openFlag" :showFooter="false" show-zoom resize>
    <template #content>
      <div class="wrap">
        <div class="item">
          <div class="title">三级安全教育培训合格率</div>
          <myCharts id="passRateId" :option="passRateOption" ref="passRateRef"></myCharts>
        </div>
        <div class="item">
          <div class="title">三级安全教育培训方式</div>
          <myCharts id="modeeId" :option="modeOption" ref="modeRef"></myCharts>
        </div>
        <div class="item">
          <div class="title">三级安全教育培训率</div>
          <myCharts id="trainingRateId" :option="trainingRateOption" ref="trainingRateRef"></myCharts>
        </div>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
export default {
  data() {
    return {
      openFlag: false,
      passRateOption: {},
      modeOption: {},
      trainingRateOption: {},
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    open() {
      this.openFlag = true;
    },
    test() {
      // let res = await getSersor();
      var colorList = ["#EF8B3F", "#4A80FC"];
      this.passRateOption = {
        title: {
          text: "培训总人数",
          subtext: 100,
          left: "center",
          top: "45%",
          textStyle: {
            color: "#000",
            fontSize: 10,
            fontWeight: "normal",
          },
          subtextStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#3BAFFF",
          },
        },
        grid: {
          top: "70%",
          left: "center",
        },
        legend: {
          show: true,
          bottom: "0%",
          itemGap: 20,
        },
        series: [
          // 主要展示层的
          {
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 100,
              },
              color: "#000",
              emphasis: {
                show: true,
              },
            },
            labelLayout: {
              align: "right",
            },

            label: {
              normal: {
                formatter: function (params) {
                  var str = "";
                  switch (params.name) {
                    case "合格":
                      str =
                        "{a|}\n{nameStyle|合格}" +
                        "{rate2|75%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                    case "不合格":
                      str =
                        "{b|}\n{nameStyle|不合格}" +
                        "{rate|25%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                  }
                  return str;
                },
                padding: [0, -110],
                height: 150,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,
                  },
                  nameStyle: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate2: {
                    fontSize: 12,
                    color: "#000",
                  },
                },
              },
            },
            data: [
              { value: 25, name: "不合格" },
              { value: 75, name: "合格" },
            ],
          },
        ],
      };
      this.modeOption = {
        title: {
          text: "培训总人数",
          subtext: 100,
          left: "center",
          top: "45%",
          textStyle: {
            color: "#000",
            fontSize: 10,
            fontWeight: "normal",
          },
          subtextStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#3BAFFF",
          },
        },
        grid: {
          top: "70%",
          left: "center",
        },
        legend: {
          show: true,
          bottom: "0%",
          itemGap: 20,
        },
        series: [
          // 主要展示层的
          {
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name == "线上培训") {
                    return "#FAAD14";
                  } else if (params.name == "线下培训") {
                    return "#409EFF";
                  }
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 100,
              },
              color: "#000",
              emphasis: {
                show: true,
              },
            },
            labelLayout: {
              align: "right",
            },

            label: {
              normal: {
                formatter: function (params) {
                  var str = "";
                  switch (params.name) {
                    case "线下培训":
                      str =
                        "{a|}\n{nameStyle|线下培训}" +
                        "{rate2|75%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                    case "线上培训":
                      str =
                        "{b|}\n{nameStyle|线上培训}" +
                        "{rate|25%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                  }
                  return str;
                },
                padding: [0, -110],
                height: 150,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,
                  },
                  nameStyle: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate2: {
                    fontSize: 12,
                    color: "#000",
                  },
                },
              },
            },
            data: [
              { value: 25, name: "线上培训" },
              { value: 75, name: "线下培训" },
            ],
          },
        ],
      };
      this.trainingRateOption = {
        title: {
          text: "培训总人数",
          subtext: 100,
          left: "center",
          top: "45%",
          textStyle: {
            color: "#000",
            fontSize: 10,
            fontWeight: "normal",
          },
          subtextStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#3BAFFF",
          },
        },
        grid: {
          top: "70%",
          left: "center",
        },
        legend: {
          show: true,
          bottom: "0%",
           itemGap:20,
        },
        series: [
          // 主要展示层的
          {
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name == "已培训") {
                    return "#35C25F";
                  } else if (params.name == "未培训") {
                    return "#F36868";
                  }
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 100,
              },
              color: "#000",
              emphasis: {
                show: true,
              },
            },
            labelLayout: {
              align: "right",
            },

            label: {
              normal: {
                formatter: function (params) {
                  var str = "";
                  switch (params.name) {
                    case "已培训":
                      str =
                        "{a|}\n{nameStyle|已培训}" +
                        "{rate2|75%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                    case "未培训":
                      str =
                        "{b|}\n{nameStyle|未培训}" +
                        "{rate|25%" +
                        "(" +
                        params.value +
                        "人)}";
                      break;
                  }
                  return str;
                },
                padding: [0, -110],
                height: 150,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,
                  },
                  nameStyle: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate: {
                    fontSize: 12,
                    color: "#000",
                  },
                  rate2: {
                    fontSize: 12,
                    color: "#000",
                  },
                },
              },
            },
            data: [
              { value: 25, name: "未培训" },
              { value: 75, name: "已培训" },
            ],
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang='scss'>
.wrap {
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
#passRateId,
#modeeId,
#trainingRateId {
  width: 100%;
  height: 300px !important;
}
.item > .title {
  width: 280px;
  height: 44px;
  background: #f0f5ff;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  text-align: center;
  line-height: 44px;
  font-size: 20px;
  color: #4a80fc;
}
</style>