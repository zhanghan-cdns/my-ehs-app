<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1700"
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
            <gas-analysis></gas-analysis>
          </div>
          <div v-if="activeIndex === 1">
            <measure-confirm></measure-confirm>
          </div>
          <div v-if="activeIndex === 2">
            <safety-disclosure></safety-disclosure>
          </div>
          <div v-if="activeIndex === 3">
            <job-approval></job-approval>
          </div>
          <div v-if="activeIndex === 4">
            <guardian-confirm></guardian-confirm>
          </div>
          <div v-if="activeIndex === 5">
            <complete-acceptance></complete-acceptance>
          </div>
        </el-card>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import gasAnalysis from "./gasAnalysis.vue";
import measureConfirm from "./measureConfirm.vue";
import safetyDisclosure from "./safetyDisclosure.vue";
import jobApproval from "./jobApproval.vue";
import guardianConfirm from "./guardianConfirm.vue";
import completeAcceptance from "./completeAcceptance.vue";

export default {
  components: {
    gasAnalysis,
    measureConfirm,
    safetyDisclosure,
    jobApproval,
    guardianConfirm,
    completeAcceptance,
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
          name: "气体分析",
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
          name: "作业审批",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "监护人确认",
        },
        {
          icon: "icon-fujiaxinxi",
          name: "完工验收",
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