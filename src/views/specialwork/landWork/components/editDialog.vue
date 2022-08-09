<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1317"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-card style="height: auto; margin-bottom: 10px">
          <common-steps
            :stepList="stepList"
            :activeIndex="activeIndex"
            @change="onStepChange"
          ></common-steps>
        </el-card>
        <el-card style="height: 85%; overflow: scroll">
          <div v-if="activeIndex === 0">
            <base-info :dictConfig="dictConfig"></base-info>
          </div>
          <div v-if="activeIndex === 1">
            <risk-ident :dictConfig="dictConfig"></risk-ident>
          </div>
          <div v-if="activeIndex === 2">
            <measure-confirm></measure-confirm>
          </div>
          <div v-if="activeIndex === 3">
            <safety-disclosure></safety-disclosure>
          </div>
          <div v-if="activeIndex === 4">
            <approval-steps></approval-steps>
          </div>
        </el-card>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="nextStep">下一步</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import baseInfo from "./baseInfo.vue";
import riskIdent from "./riskIdent.vue";
import measureConfirm from "./measureConfirm.vue";
import safetyDisclosure from "./safetyDisclosure.vue";
import approvalSteps from "./approvalSteps.vue";

export default {
  components: {
    baseInfo,
    riskIdent,
    measureConfirm,
    safetyDisclosure,
    approvalSteps,
  },

  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      openEdit: false,
      activeIndex: 0,
      stepList: [
        {
          icon: "icon-fujiaxinxi",
          name: "基础信息",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "风险辨识",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "措施确认",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "安全交底",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "审批步骤",
        },
      ],
    };
  },

  methods: {
    open() {
      this.openEdit = true;
    },

    nextStep() {
      if (this.activeIndex == 4) {
        this.activeIndex = 0;
      } else {
        this.activeIndex++;
      }
    },

    // 更新activeIndex,用于可点击step切换
    onStepChange(val) {
      this.activeIndex = val;
    },

    close() {
      this.openEdit = false;
      this.activeIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>