<template>
  <div>
    <div class="search-group">
      <el-select
        v-model="timeSlotValue"
        placeholder="时间段"
        :size="size"
        style="width: 130px; margin-right: 7px"
        clearable
        @change="onTimeSlotChange"
      >
        <el-option
          v-for="item in timeSlotList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        style="width: 320px; margin-right: 7px"
        v-model="timeFrameValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :size="size"
        clearable
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="onTimeSelect"
      >
      </el-date-picker>
      <el-button type="success" :size="size" round @click="search"
        ><i class="icon-chaxun icon"></i>查询</el-button
      >
      <el-button type="success" :size="size" round @click="searchAll"
        ><i class="icon-shuaxin icon"></i>全部</el-button
      >
      <el-button type="success" :size="size" round @click="showThreshold"
        ><i class="icon-zhexiantu icon"></i>显示阈值</el-button
      >
      <el-button type="success" :size="size" round @click="showDetail"
        ><i class="icon-chakan2 icon"></i>显示详细</el-button
      >
    </div>
    <div style="width: 930px; height: 350px">
      <chart ref="chartRef" :realData="realData" :xData="xData" :yData="yData"></chart>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { storageTankHistoryChartListAPI } from "@/api/hazard/realtimeData/index";
import { monitoringIndicatorsViewAPI } from "@/api/hazard/monitoringIndicators/index";
import chart from "./chart.vue";

export default {
  components: {
    chart,
  },

  data() {
    return {
      size: "mini",
      timeSlotValue: "",
      timeFrameValue: [],
      timeSlotList: [
        {
          label: "近一周",
          value: "oneWeek",
        },
        {
          label: "近一个月",
          value: "oneMonth",
        },
        {
          label: "近三个月",
          value: "threeMonth",
        },
      ],
      code: "",
      realData: {},
      xData: [],
      yData: [],
    };
  },

  methods: {
    onTimeSlotChange(val) {
      this.timeFrameValue = [];
      let td = dayjs().format("YYYY-MM-DD HH:mm:ss");
      if (val === "oneWeek") {
        let btd = dayjs().add(-7, "day").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      } else if (val === "oneMonth") {
        let btd = dayjs().add(-30, "day").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      } else if (val === "threeMonth") {
        let btd = dayjs().add(-90, "day").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      }
    },

    async getRealData(real_id) {
      // 获取实时数据
      const res = await monitoringIndicatorsViewAPI({
        id: real_id,
      });
      if (res && res.code === 200) {
        this.realData = res.data;
      }
    },

    async getTableData(code) {
      this.code = code;
      let params = {
        indexCode: code,
        startTime: this.timeFrameValue[0],
        endTime: this.timeFrameValue[1],
      };
      const res = await storageTankHistoryChartListAPI(params);
      if (res && res.code === 200) {
        this.xData = res.data.map((item) => item.cjsj);
        this.yData = res.data.map((item) => item.value);
      }
    },

    onTimeSelect(val) {
      console.log(val, "val");
    },

    search() {
      this.getTableData(this.code);
    },

    searchAll() {
      this.timeFrameValue = [];
      this.timeSlotValue = [];
      this.getTableData(this.code);
    },

    showThreshold() {},

    showDetail() {},
  },
};
</script>

<style lang="scss" scoped>
#historyChart {
  width: 930px;
  height: 350px;
}

.search-group {
  text-align: center;
}

.icon {
  font-size: 12px !important;
  margin-right: 3px;
}
</style>