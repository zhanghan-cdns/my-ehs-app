<template>
  <div>
    <div class="tabs-title">作业类型</div>
    <div
      v-for="(item, index) in tabList"
      :key="index"
      :class="[activeTab === item.value ? activeClass : '', tabsItem]"
      @click="onTabChange(item.value)"
    >
      <div class="tabs-img">
        <img class="work-img" :src="item.workImgSrc" />
      </div>
      <div class="tabs-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      activeTab: "",
      activeClass: "active",
      tabsItem: "tabs-item",
    };
  },

  created() {
    // 默认选择第一个
    if (this.tabList.length > 0) {
      this.activeTab = this.tabList[0].value;
    }
  },

  methods: {
    onTabChange(value) {
      this.activeTab = value;
      this.$emit("onTabChange", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-title {
  width: 100%;
  height: 42px;
  background: #f5f7fa;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
  line-height: 42px;
  font-size: 16px;
  font-weight: 500;
  color: #161616;
  margin-bottom: 11px;
}

.tabs-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 37px;
  cursor: pointer;
  margin-bottom: 11px;
}

.iconfont {
  width: 16px;
  height: 16px;
}

.tabs-img {
  width: 30%;
  text-align: right;
  margin-right: 10px;
}

.work-img {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}

.tabs-name {
  width: 70%;
  text-align: left;
  font-size: 14px;
  color: #595959;
}

.active {
  background: #f0f5ff;
  border-left: 2px solid #597ef7;
}
</style>