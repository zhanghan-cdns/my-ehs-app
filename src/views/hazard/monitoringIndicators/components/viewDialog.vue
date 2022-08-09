<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1117px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="left"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="baseInfo">
            <span slot="label"
              ><i class="icon-jiance1 tab-icon"></i>指标基本信息</span
            >
            <view-base-info
              ref="baseInfoRef"
              :dictConfig="dictConfig"
            ></view-base-info>
          </el-tab-pane>
          <el-tab-pane name="bindDeviceInfo">
            <span slot="label"
              ><i class="icon-xunjian tab-icon"></i>绑定设备信息</span
            >
            <view-bind-device-info
              ref="bindDeviceInfoRef"
              :dictConfig="dictConfig"
            ></view-bind-device-info>
          </el-tab-pane>
          <el-tab-pane name="bindDCSInfo">
            <span slot="label"
              ><i class="icon-baojing tab-icon"></i>绑定DCS信息</span
            >
            <view-bind-dcs-info ref="bindDcsInfoRef"></view-bind-dcs-info>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import viewBaseInfo from "./viewInfo/viewBaseInfo.vue";
import viewBindDeviceInfo from "./viewInfo/viewBindDeviceInfo.vue";
import viewBindDcsInfo from "./viewInfo/viewBindDcsInfo.vue";
import { monitoringIndicatorsViewAPI } from "@/api/hazard/monitoringIndicators/index";

export default {
  components: {
    viewBaseInfo,
    viewBindDeviceInfo,
    viewBindDcsInfo,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icon: "icon-chakan2",
      title: "查看指标绑定设备信息",
      openEdit: false,
      activeName: "baseInfo",
      row: {},
    };
  },

  methods: {
    open(row) {
      this.openEdit = true;
      this.row = row;
      this.getBaseInfo(row.id);
    },

    close() {
      this.openEdit = false;
      this.activeName = "baseInfo";
    },

    handleClick(tab, event) {
      console.log(tab.name, "tab");
      switch (tab.name) {
        case "baseInfo":
          this.getBaseInfo(this.row.id);
          break;
        case "bindDeviceInfo":
          this.getBindDeviceInfo(this.row.id);
          break;
        case "bindDCSInfo":
          this.getBindDCSInfo(this.row.id);
          break;
      }
    },

    // 获取指标基本信息
    async getBaseInfo(id) {
      try {
        const res = await monitoringIndicatorsViewAPI({ id });
        if (res.code === 200) {
          this.$refs.baseInfoRef.form = {
            ...res.data,
          };
          this.$refs.baseInfoRef.form.indexType = res.data.indexType
            ? res.data.indexType.key
            : "";
          this.$refs.baseInfoRef.form.alarmType = res.data.alarmType
            ? res.data.alarmType.key
            : "";
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 获取绑定设备信息
    getBindDeviceInfo(id) {},

    // 获取绑定DCS信息
    getBindDCSInfo(id) {},
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
  height: 100%;
  overflow: scroll;
}

/deep/ .el-tabs--left .el-tabs__item.is-left {
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0px 10px 20px 0px;
}

/deep/ .el-tabs .is-active {
  background: rgba(70, 133, 249, 0.09);
}

.tab-icon {
  font-size: 18px !important;
  vertical-align: bottom;
  margin-right: 10px;
}

/deep/ .el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}
</style>