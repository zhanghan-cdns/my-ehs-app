<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1348"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="container">
          <div class="container-left">
            <!-- 基本信息 -->
            <div>
              <div class="container-title">
                <i class="icon-jichuxinxi1 container-title-icon"></i>基本信息
              </div>
              <div style="padding: 20px 30px">
                <el-row>
                  <el-col :span="8">
                    <span class="attr-name">点位号:</span>
                    <span class="attr-value">{{ alarmData.tagNumber }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">指标名称:</span>
                    <span class="attr-value">{{ alarmData.indexName }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">指标编码:</span>
                    <span class="attr-value">{{ alarmData.indexCode }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="attr-name">设备名称:</span>
                    <span class="attr-value">{{
                      alarmData.equipmentName
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">报警值:</span>
                    <span class="attr-value">{{ alarmData.alarmValue }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">报警级别:</span>
                    <span class="attr-value">{{ alarmData.alarmLevel }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="attr-name">当前报警/消警阈值:</span>
                    <span class="attr-value">{{ alarmData.threeHold }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">报警类型:</span>
                    <span class="attr-value">{{
                      alarmData.hazardEquipAlarm
                        ? alarmData.hazardEquipAlarm.alarmType
                        : ""
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">报警位号:</span>
                    <span class="attr-value">{{ alarmData.alarmNo }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="attr-name">报警开始时间:</span>
                    <span class="attr-value">{{
                      alarmData.hazardEquipAlarm
                        ? alarmData.hazardEquipAlarm.starTime
                        : ""
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">报警结束时间:</span>
                    <span class="attr-value">{{
                      alarmData.hazardEquipAlarm
                        ? alarmData.hazardEquipAlarm.endTime
                        : ""
                    }}</span>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 报警闭环步骤 -->
            <div>
              <div
                class="container-title"
                style="color: #ff7f46; border-bottom: 1px solid #ff7f46"
              >
                <i
                  class="icon-baojingbihuanbuzhou container-title-icon"
                  style="color: #ff7f46"
                ></i
                >报警闭环步骤
              </div>
              <div style="padding: 20px 30px">
                <div style="display: flex; align-items: center">
                  <!-- <div class="bihuan-box">
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">核实人员：</span>
                      <span class="bihuan-box-value">陈磊</span>
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">核实时间：</span>
                      <span class="bihuan-box-value"
                        >2022-03-17 22：20：17</span
                      >
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">核实结果：</span>
                      <span class="bihuan-box-value">顺酐储罐温度过高</span>
                    </div>
                  </div>

                  <div class="bihuan-next">
                    <i class="icon-xiayibujiantou" style="color: #ff7f46"></i>
                  </div> -->

                  <div class="bihuan-box">
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">处置人员：</span>
                      <span class="bihuan-box-value">{{
                        row.hazardEquipAlarm.dealPerson || ""
                      }}</span>
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">处置时间：</span>
                      <span class="bihuan-box-value">{{
                        row.hazardEquipAlarm.dealTime || ""
                      }}</span>
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">处置结果：</span>
                      <span class="bihuan-box-value">{{
                        row.hazardEquipAlarm.dealResult || ""
                      }}</span>
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">处置措施：</span>
                      <span class="bihuan-box-value">{{
                        row.hazardEquipAlarm.dealMeasures || ""
                      }}</span>
                    </div>
                  </div>
                  <!-- <div class="bihuan-next">
                    <i class="icon-xiayibujiantou" style="color: #ff7f46"></i>
                  </div>

                  <div class="bihuan-box">
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">复查人员：</span>
                      <span class="bihuan-box-value">陈磊</span>
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">复查时间：</span>
                      <span class="bihuan-box-value"
                        >2022-03-17 22：20：17</span
                      >
                    </div>
                    <div class="bihuan-box-row">
                      <span class="bihuan-box-name">复查结果：</span>
                      <span class="bihuan-box-value">已消警</span>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- 报警推送信息 -->
            <div>
              <div class="container-title">
                <i class="icon-baojingtuisong container-title-icon"></i
                >报警推送信息
              </div>
              <div style="padding: 20px 30px">
                <el-row>
                  <el-col :span="8">
                    <span class="attr-name">报警推送人:</span>
                    <span class="attr-value"></span>
                  </el-col>
                  <el-col :span="8">
                    <span class="attr-name">推送时间:</span>
                    <span class="attr-value"></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="attr-name">推送内容:</span>
                    <span class="attr-value"></span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="container-right">
            <!-- 报警点前后一个小时波动图 -->
            <div>
              <div class="container-title">
                <i class="icon-baojingdianqianhou container-title-icon"></i
                >报警点前后一个小时波动图
              </div>
              <div>
                <div style="width: 446px; height: 260px">
                  <chart
                    :realData="realData"
                    :xData="xData"
                    :yData="yData"
                  ></chart>
                </div>
              </div>
            </div>

            <!-- 绑定设备的现场视频 -->
            <div>
              <div class="container-title">
                <i class="icon-bangdingshipin container-title-icon"></i
                >绑定设备的现场视频
              </div>
              <div style="padding: 20px 30px"></div>
            </div>
          </div>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import { hazardEquipAlarmViewAPI } from "@/api/hazard/hazardEquipAlarm";
import chart from "@/views/hazard/realtimeData/components/chart.vue";
import { storageTankHistoryChartListAPI } from "@/api/hazard/realtimeData/index";
import dayjs from "dayjs";

export default {
  components: {
    chart,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看报警信息",
      openEdit: false,
      row: {},
      alarmData: {},
      timeFrameValue: [],
      realData: {},
      xData: [],
      yData: [],
    };
  },

  methods: {
    open(row) {
      this.openEdit = true;
      if (row) {
        this.row = row;
        this.getAlarmData();
        this.getTableData();
      }
    },

    // 获取近一小时时间段
    getOneHour() {
      this.timeFrameValue = [];
      let td = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let btd = dayjs().add(-1, "hour").format("YYYY-MM-DD HH:mm:ss");
      this.$set(this.timeFrameValue, 0, btd);
      this.$set(this.timeFrameValue, 1, td);
      console.log(this.timeFrameValue, "timeFrameValue");
    },

    async getAlarmData() {
      let params = { id: this.row.id };
      const res = await hazardEquipAlarmViewAPI(params);
      if (res && res.code === 200) {
        this.alarmData = res.data;
      }
    },

    // 获取图表数据
    async getTableData() {
      this.getOneHour();
      let params = {
        indexCode: this.row.indexCode,
        startTime: this.timeFrameValue[0],
        endTime: this.timeFrameValue[1],
      };
      const res = await storageTankHistoryChartListAPI(params);
      if (res && res.code === 200) {
        this.xData = res.data.map((item) => item.cjsj);
        this.yData = res.data.map((item) => item.value);
      }
    },

    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  .container-left {
    width: 60%;
  }
  .container-right {
    width: 35%;
  }
}

.container-title {
  padding: 0px 0px 5px 17px;
  border-bottom: 1px solid #46aeff;
  font-size: 16px;
  font-weight: 500;
  color: #008fff;
}

.container-title-icon {
  color: #008fff;
  vertical-align: middle;
  margin-right: 8px;
}

/deep/ .el-row {
  margin: 10px 0px;
}

.attr-name {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #595959;
}

.attr-value {
  font-size: 14px;
  font-weight: 400;
  color: #008fff;
}

.bihuan-box {
  width: 30%;
  height: 190px;
  padding: 20px;
  background: #f6f6f6;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #afafaf;
}

.bihuan-box-row {
  margin: 10px 0px;
}

.bihuan-next {
  margin: 0px 10px;
}

.bihuan-box-name {
  font-size: 12px;
  font-weight: 400;
  color: #595959;
  margin-right: 5px;
}

.bihuan-box-value {
  font-size: 12px;
  font-weight: 400;
  color: #ff7f46;
}
</style>