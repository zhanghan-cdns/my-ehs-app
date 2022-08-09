<template>
  <div>
    <div
      v-for="(item, index) in tabList"
      :key="index"
      :class="[activeTab === item.value ? activeClass : '', tabsItem]"
      @click="tabChange(item.value)"
    >
      <div style="width: 50%; text-align: left">
        <i :class="'iconfont ' + item.icon" style="margin-right: 5px"> </i>
        <span>{{ item.name }}</span>
      </div>
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
    activeTab: {
      type: String,
      default() {
        return "";
      },
    },
  },

  data() {
    return {
      activeClass: "activeClass",
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
    tabChange(value) {
      this.activeTab = value;
      this.$emit("tabChange", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 6px 6px 6px 6px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
}

.activeClass {
  color: #29f8ff;
  background: #687dbf;
}
</style>