<template>
  <div>
    <div class="top">
      <div class="top-left">
        <div class="title">
          <div class="icon-box"><i class="icon-liebiao1 icon"></i></div>
          <div class="title-name">实时数据</div>
        </div>
        <div
          class="data-bg"
          :style="{ backgroundImage: 'url(' + bg.url + ')' }"
        >
          <span class="data-font">{{ realData.realtimeData }}</span
          >&nbsp;<span>{{ realData.unit }}</span>
        </div>
        <div class="data-list">
          <div class="data-item">
            <span class="data-item-attr">{{ row.index_type_name }}阈值上限</span
            ><span class="data-item-value"
              >{{ realData.threUpVal }}{{ realData.unit }}</span
            >
          </div>
          <div class="data-item">
            <span class="data-item-attr">{{ row.index_type_name }}阈值下限</span
            ><span class="data-item-value"
              >{{ realData.threDownVal }}{{ realData.unit }}</span
            >
          </div>
          <div class="data-item">
            <span class="data-item-attr">报警{{ row.index_type_name }}</span
            ><span class="data-item-value"
              >{{ realData.realtimeData }}{{ realData.unit }}</span
            >
          </div>
          <div class="data-item">
            <span class="data-item-attr">采集时间</span
            ><span class="data-item-value">{{ realData.acquisitionTime }}</span>
          </div>
        </div>
      </div>
      <div class="top-right">
        <div class="title">
          <div class="icon-box"><i class="icon-liebiao1 icon"></i></div>
          <div class="title-name">历史波动图</div>
        </div>
        <div class="chart-radio">
          <el-radio-group v-model="radioValue" @change="radioChange">
            <el-radio label="twoHour">两小时</el-radio>
            <el-radio label="oneDay">当天</el-radio>
            <el-radio label="oneWeek">本周</el-radio>
          </el-radio-group>
        </div>
        <div style="width: 635px; height: 327px">
          <chart :realData="realData" :xData="xData" :yData="yData"></chart>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <div class="icon-box"><i class="icon-liebiao1 icon"></i></div>
        <div class="title-name">基础信息</div>
      </div>
      <!-- 储罐 -->
      <el-form
        v-if="type === 'storageTank'"
        label-width="140px"
        label-position="right"
        :model="storageForm"
        :rules="storageFormRules"
        ref="storageFormRef"
        disabled
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="储罐名称" prop="storageName">
              <el-input
                clearable
                v-model="storageForm.tankFarmDevice.storageName"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="所属罐区" prop="tankFarmDevice">
              <el-input
                clearable
                v-model="storageForm.tankFarmDevice.factoryPosition"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="所属危险化学品重大危险源单元"
              prop="majHazUnit"
            >
              <el-input
                clearable
                v-model="storageForm.majHazUnit"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="储罐编号" prop="danGooNumber">
              <el-input
                clearable
                v-model="storageForm.danGooNumber"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="储罐容积(m³)" prop="storageVolume">
              <el-input
                clearable
                v-model="storageForm.storageVolume"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="储罐形式" prop="storageForm">
              <el-input
                clearable
                v-model="storageForm.storageForm.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="储罐结构" prop="storageStructure">
              <el-input
                clearable
                v-model="storageForm.storageStructure.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="储罐位置分类" prop="locationCla">
              <el-input
                clearable
                v-model="storageForm.locationCla.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="储存介质" prop="storageStructure">
              <el-input
                clearable
                v-model="storageForm.material.materialName"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="物质状态" prop="materialState">
              <el-input
                clearable
                v-model="storageForm.material.materialForm"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="有无围堰" prop="cofferdam">
              <el-radio-group v-model="storageForm.cofferdam">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              prop="cofMeasure"
              label="围堰所围面积"
              v-if="storageForm.cofferdam === 1"
            >
              <el-input
                clearable
                v-model="storageForm.cofMeasure"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="现场照片">
              <el-image
                v-for="item in storageForm.scenePhotos"
                :key="item.url"
                style="width: 100px; height: 100px"
                :src="imgUrl + item.url"
                :preview-src-list="[imgUrl + item.url]"
              ></el-image>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 气体 -->
      <el-form
        v-if="type === 'gas'"
        label-width="140px"
        label-position="right"
        :model="gasForm"
        :rules="gasFormRules"
        ref="gasFormRef"
        disabled
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="设备编码" prop="majHazUnit">
              <el-input
                clearable
                v-model="gasForm.majHazUnit"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 高位工艺 -->
      <el-form
        v-if="type === 'workmanship'"
        label-width="152px"
        label-position="right"
        :model="workmanshipForm"
        :rules="workmanshipFormRules"
        ref="workmanshipFormRef"
        disabled
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="生产工艺名称" prop="productionProcessName">
              <el-input
                clearable
                v-model="workmanshipForm.productionProcessName.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="工艺编号" prop="processCode">
              <el-input
                clearable
                v-model="workmanshipForm.processCode"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="控制方式" prop="controlMode">
              <el-input
                clearable
                v-model="workmanshipForm.controlMode"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="工艺参数" prop="monitorProcessPara">
              <el-input
                clearable
                v-model="workmanshipForm.monitorProcessPara"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="自动控制措施" prop="autoControlMeasures">
              <el-input
                clearable
                v-model="workmanshipForm.autoControlMeasures"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="设备编号" prop="majHazUnit">
              <el-input
                clearable
                v-model="workmanshipForm.majHazUnit"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="是否满足国家规定的控制要求"
              prop="isStipulated"
            >
              <el-input
                clearable
                v-model="workmanshipForm.isStipulated.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="是否重点监管化工工艺"
              prop="isImportantProcess	"
            >
              <el-input
                clearable
                v-model="workmanshipForm.isImportantProcess.value"
                :style="`width:${width}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="自动控制措施" prop="autoControlMeasures">
              <el-input
                clearable
                type="textarea"
                :rows="3"
                v-model="workmanshipForm.autoControlMeasures"
                :style="`width:${width2}`"
                :size="size"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/router/axios";
import dayjs from "dayjs";
import { monitoringIndicatorsViewAPI } from "@/api/hazard/monitoringIndicators/index";
import { storageTankHistoryChartListAPI } from "@/api/hazard/realtimeData/index";
import { storageTankViewAPI } from "@/api/enterprise/safetyManagement/storageTank";
import { processViewAPI } from "@/api/enterprise/process/index";
import chart from "./chart.vue";

export default {
  components: {
    chart,
  },

  props: {
    type: {
      type: String,
      default() {
        return "";
      },
    },
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      imgUrl,
      width: "260px",
      size: "small",
      realData: {
        threUpVal: 0,
        threDownVal: 0,
      },
      timeFrameValue: [],
      baseData: {},
      bg: {
        url: require("@/assets/images/realTimeData/common.png"),
      },
      radioValue: "twoHour",
      storageForm: {
        tankFarmDevice: {
          storageName: "",
          factoryPosition: "",
        },
        cofferdam: 1,
        majHazUnit: "",
        danGooNumber: "",
        storageVolume: "",
        storageForm: {
          value: "",
        },
        storageStructure: {
          value: "",
        },
        locationCla: {
          value: "",
        },
        material: {
          materialName: "",
          materialForm: "",
        },
        cofMeasure: "",
        scenePhotos: [],
      },
      gasForm: {},
      workmanshipForm: {
        productionProcessName: {
          value: "",
        },
        processCode: "",
        controlMode: "",
        monitorProcessPara: "",
        autoControlMeasures: "",
        majHazUnit: "",
        isStipulated: {
          value: "",
        },
        isImportantProcess: {
          value: "",
        },
      },
      xData: [],
      yData: [],
    };
  },

  methods: {
    radioChange(val) {
      this.timeFrameValue = [];
      let td = dayjs().format("YYYY-MM-DD HH:mm:ss");
      if (val === "twoHour") {
        let btd = dayjs().add(-2, "hour").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      } else if (val === "oneDay") {
        let btd = dayjs().add(-1, "day").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      } else if (val === "oneWeek") {
        let btd = dayjs().add(-7, "day").format("YYYY-MM-DD HH:mm:ss");
        this.$set(this.timeFrameValue, 0, btd);
        this.$set(this.timeFrameValue, 1, td);
      }
      this.getTableData(this.code);
    },

    async getRealData(real_id) {
      // 获取实时数据
      const res = await monitoringIndicatorsViewAPI({
        id: real_id,
      });
      if (res && res.code === 200) {
        this.realData = res.data;
        this.realData.unit = res.data.unit ? res.data.unit.value : "";
      }
    },

    async getTableData(code) {
      let td = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let btd = dayjs().add(-2, "hour").format("YYYY-MM-DD HH:mm:ss");
      this.$set(this.timeFrameValue, 0, btd);
      this.$set(this.timeFrameValue, 1, td);
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

    async getBaseData(id) {
      // 获取基础信息
      let res = {};
      if (this.type === "storageTank") {
        res = await storageTankViewAPI({
          id,
        });
        if (res && res.code === 200 && res.data) {
          this.storageForm = res.data;
        }
      } else if (this.type === "gas") {
      } else if (this.type === "workmanship") {
        res = await processViewAPI({
          id,
        });
        if (res && res.code === 200 && res.data) {
          this.workmanshipForm = res.data;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/font.scss";

/deep/ .el-form-item {
  margin-bottom: 0px;
}

/deep/ .el-radio {
  margin-right: 10px;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.icon-box {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  line-height: 23px;
  border-radius: 24px;
  background: #4789e9;
  text-align: center;
}
.icon {
  color: #fff;
  font-size: 14px !important;
}
.title-name {
  font-size: 14px;
  color: #515151;
  font-weight: 700;
}

.top {
  display: flex;
  .top-left {
    width: 282px;
    height: 296px;
    margin-right: 30px;
    padding: 17px;
    background: rgba(208, 227, 254, 0.25);
    border: 1px dashed #4789e9;
  }
  .top-right {
  }
}

.data-bg {
  width: 150px;
  height: 63px;
  line-height: 68px;
  padding-left: 70px;
  margin: 6px 24px 26px 24px;
  text-align: center;
  font-size: 20px;
  color: #04b15e;
  overflow: hidden;
}

.data-font {
  font-family: "DS-DIGIB";
  font-size: 40px;
}

.chart-radio {
  position: absolute;
  left: 75%;
  top: 6%;
  z-index: 9999 !important;
}

.data-list {
  margin: 0px 24px;
}

.data-item {
  margin-bottom: 10px;
}

.data-item-attr {
  font-size: 14px;
  font-weight: normal;
  color: #5e5e5e;
  margin-right: 16px;
}

.data-item-value {
  font-size: 16px;
  font-weight: normal;
  color: #3c81e6;
}

#baseChart {
  top: -50px;
  width: 635px;
  height: 386px;
}

.bottom {
}
</style>