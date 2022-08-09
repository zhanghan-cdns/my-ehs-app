<template>
  <div>
    <div class="top">
      <div
        class="top-item"
        style="margin-right: 30px"
        @click="handleClick('list')"
      >
        <i :class="[listIcon, isActive === 'list' ? activeIcon : '']"></i>
        <span :class="[topItemName, isActive === 'list' ? activeItemName : '']"
          >列表显示</span
        >
      </div>
      <div class="top-item" @click="handleClick('graph')">
        <i :class="[graphIcon, isActive === 'graph' ? activeIcon : '']"></i>
        <span :class="[topItemName, isActive === 'graph' ? activeItemName : '']"
          >图形显示</span
        >
      </div>
    </div>
    <div v-if="isActive === 'list'">
      <slot name="list"></slot>
    </div>
    <div v-if="isActive === 'graph'">
      <slot name="graph"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "list",
      listIcon: "icon-liebiao",
      graphIcon: "icon-tongyong1",
      activeIcon: "active-icon-style",
      topItemName: "top-item-name",
      activeItemName: "active-item-name",
    };
  },

  methods: {
    handleClick(val) {
      this.isActive = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  padding: 20px 7px 15px;
  border-bottom: 1px solid #0e96ff;
}
.top-item {
  cursor: pointer;
  color: #9b9b9b;
}
.top-item-name {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
}
.active-icon-style {
  color: #0f67ff;
}
.active-item-name {
  color: #333333;
}
</style>