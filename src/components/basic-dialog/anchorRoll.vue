<template>
  <div class="container">
    <!-- 
      dataList 传入配置数组
      slot 动态插槽名，
      headerConfig 标题组件配置
      示例
      dataList: [
        {
          slot: "basic",
          headerConfig: {
            headerTitle: "基础信息",
            icon: "jichuxinxi", //svg图标
          },
        },
      ],
     -->
    <div class="left_box">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        @click="handleClick(item.slot)"
        :class="isActive === item.slot ? 'active' : ''"
        class="left_nav_item"
      >
        <div>
          <svg-icon :icon-class="item.headerConfig.icon"></svg-icon>
          {{ item.headerConfig.headerTitle }}
        </div>
      </div>
    </div>
    <div class="right_box">
      <div class="content_box">
        <div
          class="content_item"
          v-for="(item, index) in dataList"
          :key="index"
          :id="item.slot"
        >
          <dialog-header
            style="width: auto"
            :headerConfig="item.headerConfig"
          ></dialog-header>
          <slot :name="item.slot"></slot>
        </div>
      </div>
      <div class="buttom_box">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
<script>
// 弹窗锚点滚动组件
export default {
  name: "anchorRoll",
  computed: {
    dataList() {
      return this.$attrs.dataList;
    },
  },
  data() {
    return {
      isActive: "",
    };
  },
  created() {},
  mounted() {
    // 监听滚动条
    window.addEventListener("scroll", this.scrollEvent, true);
  },
  methods: {
    scrollEvent(e) {
      let scrollItems = document.querySelectorAll(".content_item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.isActive = this.dataList[i].slot;
          break;
        }
      }
      // 滚动条触底了
      if (
        e.srcElement.scrollTop + e.srcElement.offsetHeight ===
        e.srcElement.scrollHeight
      ) {
        this.isActive = this.dataList[scrollItems.length - 1].slot;
      }
    },
    // 左侧点击
    handleClick(dom) {
      this.isActive = dom;
      this.$nextTick(() => {
        document.getElementById(dom).scrollIntoView({
          behavior: "smooth", // 平滑过渡
          block: "start", // 上边框与视窗顶部平齐。默认值
        });
      });
    },
  },
  destroyed(){
    // 组件销毁的时候移除监听器
    window.removeEventListener("scroll", this.scrollEvent, true);
  }
};
</script>

<style scoped lang='scss'>
.active {
  background: #f1f6fd;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  .left_box {
    width: 20%;
    background: #fff;
    border-radius: 4px;
    margin-right: 8px;
    padding: 5px;
    padding-top: 20px;
    white-space: normal;
    .left_nav_item {
      padding: 10px 15px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right_box {
    // width: 80%;
    flex: 1;
    background: #fff;
    border-radius: 4px;
    padding: 0 10px;
    .content_box {
      overflow: scroll;
      height: 85%;
      // width: 100%;
    }
    .buttom_box {
      height: 15%;
      border-top: 1px solid #e2e2e2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>