<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="901"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          style="padding: 20px 10px"
        >
          <el-tab-pane name="read">
            <span slot="label"
              ><i class="icon-a-zu19815 tab-icon"></i>已阅人员<span
                class="num"
                >{{ readNum }}</span
              ></span
            >
            <person-info ref="readInfoRef"></person-info>
          </el-tab-pane>
          <el-tab-pane name="unread">
            <span slot="label"
              ><i class="icon-a-zu19815 tab-icon"></i>未阅人员<span
                class="num"
                >{{ unreadNum }}</span
              ></span
            >
            <person-info ref="unreadInfoRef"></person-info>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template #bottom>
        <div style="text-align: right">
          <el-button type="primary" @click="close">关闭</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import personInfo from "./personInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";
import { inspectListAllAPI } from "@/api/enterprise/safetyManagement/public/inspect";

export default {
  components: {
    personInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看传阅情况",
      openEdit: false,
      activeName: "read",
      row: {},
      readNum: 2,
      unreadNum: 1,
    };
  },

  created() {},

  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "read":
          this.getReadInfo(this.row.id);
          break;
        case "unread":
          this.getUnreadInfo(this.row.id);
          break;
      }
    },

    open(row) {
      this.openEdit = true;
      this.activeName = "read";
      this.$nextTick(() => {
        this.getReadInfo();
      });
      if (row && row.id) {
        this.row = row;
      }
    },

    created() {},

    close() {
      this.openEdit = false;
    },

    // 获取法律法规信息
    async getReadInfo() {
      this.$refs.readInfoRef.tableData = [
        {
          dept: "生产部",
          name: "王明阳",
        },
        {
          dept: "研发部",
          name: "张三",
        },
      ];
      //   const res = await informationViewAPI();
      //   if (res && res.code === 200) {
      //     this.$refs.viewLawsInfoRef.form = res.data;
      //   }
    },

    // 获取识别信息
    async getUnreadInfo() {
      this.$refs.unreadInfoRef.tableData = [
        {
          dept: "生产部",
          name: "王大锤",
        },
      ];
      //   const res = await inspectListAllAPI();
      //   if (res && res.code === 200) {
      //     this.$refs.viewDistinguishInfoRef.form = res.data;
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.num {
  font-size: 16px;
  margin-left: 10px;
}

/deep/ .el-tabs__nav .is-top {
  margin-top: 0px !important;
}

/deep/ .el-tabs__item {
  width: 150px;
  text-align: center;
  padding: 0px;
}

/deep/ .el-tabs__active-bar {
  background-color: transparent;
}

/deep/ .el-tabs__item.is-active {
  background-color: rgba(64, 158, 255, 0.09);
}

/deep/ .el-tabs__nav-wrap::after {
  background-color: #c6e2ff;
}

/deep/ .el-tabs__content {
  overflow: scroll;
}

.tab-icon {
  margin-right: 10px;
}
</style>