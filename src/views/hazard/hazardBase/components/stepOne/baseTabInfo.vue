<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="应急预案" name="yjya">
        <emergency-plan
          ref="emergencyPlanRef"
          :baseInfo="baseInfo"
          :type="type"
        ></emergency-plan>
        <div class="btn-submit"></div
      ></el-tab-pane>
      <el-tab-pane label="DCS图" name="dcs">
        <bind-dcs
          ref="bindDcsRef"
          :baseInfo="baseInfo"
          :type="type"
          @refreshDcs="getBindDcsList"
        ></bind-dcs>
      </el-tab-pane>
      <el-tab-pane label="绑定视频" name="bdsp">
        <bind-video
          ref="bindVideoRef"
          :baseInfo="baseInfo"
          :type="type"
          @refreshCamera="getBindCameraList"
        ></bind-video>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import emergencyPlan from "./emergencyPlan.vue";
import bindDcs from "./bindDcs.vue";
import bindVideo from "./bindVideo.vue";
import { bindDcsListAPI } from "@/api/hazard/dcsInfo/index";
import { bindCameraListAPI } from "@/api/hazard/hazardBase/index";

export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    emergencyPlan,
    bindDcs,
    bindVideo,
  },

  data() {
    return {
      activeName: "yjya",
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab.name, "tab");
      switch (tab.name) {
        case "yjya":
          break;
        case "dcs":
          this.getBindDcsList();
          break;
        case "bdsp":
          this.getBindCameraList();
          break;
      }
    },

    // 获取绑定dcs列表
    async getBindDcsList() {
      console.log(this.baseInfo.id, "this.baseInfo.id");
      if (this.baseInfo && this.baseInfo.id) {
        let params = { id: this.baseInfo.id };
        const res = await bindDcsListAPI(params);
        if (res && res.code === 200) {
          this.$refs.bindDcsRef.dcsPictureList = res.data;
        }
      }
    },

    // 获取绑定视频列表
    async getBindCameraList() {
      console.log(this.baseInfo.id, "this.baseInfo.id");
      if (this.baseInfo && this.baseInfo.id) {
        let params = { id: this.baseInfo.id };
        const res = await bindCameraListAPI(params);
        if (res && res.code === 200) {
          let videoList = [];
          res.data.forEach((item) => {
            videoList.push({
              id: item.id,
              camName: item.camName,
              src: item.videoAddress,
            });
          });
          this.$refs.bindVideoRef.videoList = videoList;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__nav .is-top {
  margin-top: 0px !important;
}
.btn-submit {
  margin-top: 5px;
  text-align: right;
}
</style>