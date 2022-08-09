<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1438"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="col-left">
              <space-tabs
                :activeTab="tabValue"
                :tabList="tabList"
                @tabChange="onTabChange"
              ></space-tabs>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="col-right">
              <div v-if="tabValue === 'write'">
                <write-info></write-info>
              </div>
              <div v-if="tabValue === 'assess'">
                <assess-info></assess-info>
              </div>
              <div v-if="tabValue === 'approval'">
                <approval-info></approval-info>
              </div>
              <div v-if="tabValue === 'check'">
                <check-info></check-info>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import spaceTabs from "./spaceTabs.vue";
import writeInfo from "./writeInfo.vue";
import assessInfo from "./assessInfo.vue";
import approvalInfo from "./approvalInfo.vue";
import checkInfo from "./checkInfo.vue";

export default {
  components: {
    spaceTabs,
    writeInfo,
    assessInfo,
    approvalInfo,
    checkInfo,
  },

  data() {
    return {
      icon: "icon-pingjiabaogao",
      title: "变更申请",
      openEdit: false,
      tabList: [
        {
          value: "write",
          name: "变更单填写",
          icon: "icon-fujiaxinxi",
        },
        {
          value: "assess",
          name: "风险评估",
          icon: "icon-fujiaxinxi",
        },
        {
          value: "approval",
          name: "变更审批",
          icon: "icon-fujiaxinxi",
        },
        {
          value: "check",
          name: "变更验收",
          icon: "icon-fujiaxinxi",
        },
      ],
      tabValue: "write",
      row: "",
    };
  },

  methods: {
    open(row, type) {
      console.log(type, "type");
      this.row = row;
      if (type && type !== "") {
        this.tabValue = type;
      }
      this.openEdit = true;
    },

    onTabChange(val) {
      console.log(val, "val");
      this.tabValue = val;
    },

    close() {
      this.openEdit = false;
      this.tabValue = "write";
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .vxe-modal--content {
  padding: 10px 20px;
  background-color: #eee;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.col-left {
  height: calc(100% - 60px);
  background: #405394;
  border-radius: 4px 4px 4px 4px;
  padding: 30px 18px;
}

.col-right {
  height: calc(100% - 20px);
  padding: 20px 20px 0px 20px;
  background-color: #fff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #e2e2e2;
  overflow: auto;
}
</style>