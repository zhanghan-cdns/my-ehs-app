<template>
  <div id="graph">
    <!-- <div class="content-left">
      <div class="content-title">位置分布</div>
      <dom-size-listen style="flex: 1; height: 71vh" v-model="sizeCon">
        <render-table
          @checkbox-change="selectChangeEvent"
          @checkbox-all="selectChangeEvent"
          row-key="id"
          :height="sizeCon.height"
          :data="tableData"
          :columns="columns"
          :tree-config="{
            children: 'children',
          }"
        />
      </dom-size-listen>
    </div> -->
    <div class="content-right" style="width: 100%">
      <div class="content-title">工艺列表</div>
      <div class="graph-container">
        <div class="graph-title">工艺列表</div>
        <div class="graph-content">
          <div class="graph-content-tongji">
            <span class="tongji-attr">工艺点位数:</span>
            <span class="tongji-value dianwei">{{ numList.dcsNum }}</span>
            <span class="tongji-fenhao">;</span>
            <span class="tongji-attr">在线数:</span>
            <span class="tongji-value zaixian">{{ numList.onLineNum }}</span>
            <span class="tongji-fenhao">;</span>
            <span class="tongji-attr">离线数:</span>
            <span class="tongji-value lixian">{{ numList.offLineNum }}</span>
            <span class="tongji-fenhao">;</span>
            <span class="tongji-attr">当前报警数:</span>
            <span class="tongji-value baojing">{{ numList.alarmNum }}</span>
          </div>
          <div>
            <el-row class="graph-row">
              <el-col
                :span="6"
                class="graph-col"
                v-for="item in workmanshipList"
                :key="item.room_id"
              >
                <div class="graph-col-left">
                  <div class="col-left-top">
                    <img
                      class="col-left-img"
                      src="@/assets/images/realTimeData/gaoweigongyi.png"
                      alt=""
                    />
                  </div>
                  <div class="col-left-bottom">{{ item.facility_name }}</div>
                </div>
                <div class="graph-col-right">
                  <div class="col-right-item">
                    <span class="right-item-attr">工艺名称:</span>
                    <span class="right-item-value">{{
                      item.facility_name
                    }}</span>
                  </div>
                  <div v-if="item.monInfo">
                    <div v-for="attrItem in item.monInfo" :key="attrItem.id">
                      <div class="col-right-item">
                        <span class="right-item-attr"
                          >{{ attrItem.indexType.value }}:</span
                        >
                        <span class="right-item-value"
                          >{{ attrItem.realtimeData }}{{ attrItem.unit }}</span
                        >
                        <i
                          v-if="attrItem.state === 'onLine'"
                          class="icon-a-lujing9996"
                          style="color: #52c41a"
                        ></i>
                        <i
                          v-else-if="attrItem.state === 'offLine'"
                          class="icon-a-lujing10002"
                          style="color: #bcbcbc"
                        ></i>
                        <i
                          v-else-if="attrItem.state === 'stop'"
                          class="icon-a-zu20182"
                          style="color: #ff0c0c"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-right-item">
                    <span class="right-item-attr">采集时间:</span>
                    <span class="right-item-value">{{
                      item.monInfo[0] ? item.monInfo[0].acquisitionTime : ""
                    }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
// import { tankFarmListAllAPI } from "@/api/enterprise/tankFarm/index";
import { workmanshipGraphListAPI } from "@/api/hazard/realtimeData/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],

  data() {
    return {
      // tableData: [],
      // columns: [
      //   {
      //     type: "checkbox",
      //     width: 50,
      //     align: "center",
      //     fixed: "left",
      //   },
      //   {
      //     type: "seq",
      //     title: "序号",
      //     width: 50,
      //     fixed: "left",
      //     align: "center",
      //   },
      //   {
      //     field: "storageName",
      //     title: "工艺区",
      //     align: "center",
      //     treeNode: "true",
      //   },
      // ],
      // id: [],
      workmanshipList: [],
      numList: [],
    };
  },

  created() {
    // this.getTankFarmDeviceList();
    this.getWorkmanshipGraphList();
  },

  methods: {
    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
      let id = records.map((item) => item.id);
      this.id = id;
      this.getWorkmanshipGraphList();
    },

    // 获取工艺区列表
    // async getTankFarmDeviceList() {
    //   const res = await tankFarmListAllAPI();
    //   if (res && res.code === 200) {
    //     this.tableData = res.data;
    //   }
    // },

    // 工艺的图形数据
    async getWorkmanshipGraphList() {
      // const res = await workmanshipGraphListAPI({ room: this.id.join(",") });
      const res = await workmanshipGraphListAPI();
      if (res && res.code === 200) {
        this.workmanshipList = res.data.data;
        this.numList = res.data.num;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../css/graph.scss";
</style>