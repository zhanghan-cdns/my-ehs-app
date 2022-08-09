<template>
  <div class="step">
    <div v-for="(item, index) in stepList" :key="index" style="width: 100%">
      <div
        v-if="index === 0"
        class="step-item"
        :style="
          'height:' +
          height +
          'px;background-image:url(' +
          firstBg +
          ');color:' +
          firstColor
        "
        @click="clickFirstStep(index)"
      >
        <div class="step-item-icon">
          <i :class="'iconfont ' + item.icon"></i>
        </div>
        <div>{{ item.name }}</div>
      </div>
      <div
        v-else-if="index === stepList.length - 1"
        class="step-item"
        :style="
          'height:' +
          height +
          'px;background-image:url(' +
          endBg +
          ');color:' +
          endColor
        "
        @click="clickEndStep(index)"
      >
        <div class="step-item-icon">
          <i :class="'iconfont ' + item.icon"></i>
        </div>
        <div>{{ item.name }}</div>
      </div>
      <div
        v-else-if="
          stepList.indexOf(item) !== 0 &&
          stepList.indexOf(item) !== stepList.length &&
          stepList.indexOf(item) < activeIndex
        "
        class="step-item"
        :style="
          'height:' +
          height +
          'px;background-image:url(' +
          middleBeforeBg +
          ');color:' +
          middleBeforeColor
        "
        @click="clickMiddleStep(index)"
      >
        <div class="step-item-icon">
          <i :class="'iconfont ' + item.icon"></i>
        </div>
        <div>{{ item.name }}</div>
      </div>
      <div
        v-else-if="stepList.indexOf(item) === activeIndex"
        class="step-item"
        :style="
          'height:' +
          height +
          'px;background-image:url(' +
          middleSelectBg +
          ');color:' +
          middleSelectColor
        "
        @click="clickMiddleStep(index)"
      >
        <div class="step-item-icon">
          <i :class="'iconfont ' + item.icon"></i>
        </div>
        <div>{{ item.name }}</div>
      </div>
      <div
        v-else-if="
          stepList.indexOf(item) !== 0 &&
          stepList.indexOf(item) !== stepList.length &&
          stepList.indexOf(item) > activeIndex
        "
        class="step-item"
        :style="
          'height:' +
          height +
          'px;background-image:url(' +
          middleAfterBg +
          ');color:' +
          middleAfterColor
        "
        @click="clickMiddleStep(index)"
      >
        <div class="step-item-icon">
          <i :class="'iconfont ' + item.icon"></i>
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepList: {
      type: Array,
      default() {
        return [];
      },
    },

    height: {
      type: Number,
      default() {
        return 48;
      },
    },

    activeIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },

  name: "commonSteps",
  data() {
    return {
      firstBg: require("@/assets/images/uncomplete-first.png"),
      endBg: require("@/assets/images/uncomplete-end.png"),
      middleBeforeBg: require("@/assets/images/uncomplete-middle.png"),
      middleSelectBg: require("@/assets/images/uncomplete-middle.png"),
      middleAfterBg: require("@/assets/images/uncomplete-middle.png"),
      firstColor: "",
      endColor: "",
      middleBeforeColor: "",
      middleSelectColor: "",
      middleAfterColor: "",
    };
  },

  created() {
    this.clickFirstStep(this.activeIndex);
  },

  watch: {
    activeIndex: function (newVal) {
      if (newVal === 0) {
        this.clickFirstStep(newVal);
      } else if (newVal === this.stepList.length - 1) {
        this.clickEndStep(newVal);
      } else {
        this.clickMiddleStep(newVal);
      }
    },
  },

  methods: {
    // 点击第一步
    clickFirstStep(index) {
      this.activeIndex = index;
      this.$emit("change", index);
      this.firstBg = require("@/assets/images/current-first.png");
      this.endBg = require("@/assets/images/uncomplete-end.png");
      this.middleBeforeBg = require("@/assets/images/uncomplete-middle.png");
      this.middleSelectBg = require("@/assets/images/uncomplete-middle.png");
      this.middleAfterBg = require("@/assets/images/uncomplete-middle.png");
      this.firstColor = "#fff";
      this.endColor = "#4a80fc";
      this.middleBeforeColor = "#4a80fc";
      this.middleSelectColor = "#4a80fc";
      this.middleAfterColor = "#4a80fc";
    },

    // 点击最后一步
    clickEndStep(index) {
      this.activeIndex = index;
      this.$emit("change", index);
      this.firstBg = require("@/assets/images/complete-first.png");
      this.endBg = require("@/assets/images/current-end.png");
      this.middleBeforeBg = require("@/assets/images/complete-middle.png");
      this.middleSelectBg = require("@/assets/images/complete-middle.png");
      this.middleAfterBg = require("@/assets/images/complete-middle.png");
      this.firstColor = "#fff";
      this.endColor = "#fff";
      this.middleBeforeColor = "#fff";
      this.middleSelectColor = "#fff";
      this.middleAfterColor = "#fff";
    },

    // 点击中间步骤
    clickMiddleStep(index) {
      this.activeIndex = index;
      this.$emit("change", index);
      this.firstBg = require("@/assets/images/complete-first.png");
      this.endBg = require("@/assets/images/uncomplete-end.png");
      this.middleBeforeBg = require("@/assets/images/complete-middle.png");
      this.middleSelectBg = require("@/assets/images/current-middle.png");
      this.middleAfterBg = require("@/assets/images/uncomplete-middle.png");
      this.firstColor = "#fff";
      this.endColor = "#4a80fc";
      this.middleBeforeColor = "#fff";
      this.middleSelectColor = "#fff";
      this.middleAfterColor = "#4a80fc";
    },
  },
};
</script>

<style lang="scss" scoped>
.step {
  display: flex;
}

.step-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #4a80fc;
  cursor: pointer;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.step-item-icon {
  margin-right: 5px;
}
</style>