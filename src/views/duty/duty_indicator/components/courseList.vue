<template>
  <div class="courseTree">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="月度" name="DUTY_ALLOCATION_CHECK_FREQUENCY:4">
          <div
            v-for="(item, index) in listMon"
            :key="index"
            style="margin-top: 10px"
          >
            <div
              style="width: 90%"
              :class="
                currentIndex == index ? 'div-content-active' : 'div-content'
              "
              @click="selectCourseType(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="季度" name="DUTY_ALLOCATION_CHECK_FREQUENCY:3">
          <div
            v-for="(item, index) in quarter"
            :key="index"
            style="margin-top: 10px"
          >
            <div
              style="width: 90%"
              :class="
                currentIndex == index ? 'div-content-active' : 'div-content'
              "
              @click="selectCourseType(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="半年度" name="DUTY_ALLOCATION_CHECK_FREQUENCY:2">
          <div
            v-for="(item, index) in half"
            :key="index"
            style="margin-top: 10px"
          >
            <div
              style="width: 90%"
              :class="
                currentIndex == index ? 'div-content-active' : 'div-content'
              "
              @click="selectCourseType(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="年度"
          name="DUTY_ALLOCATION_CHECK_FREQUENCY:1"
          class="listMon-style"
        >
          <div
            v-for="(item, index) in listYear"
            :key="index"
            style="margin-top: 10px"
          >
            <div
              style="width: 90%"
              :class="
                currentIndex == index ? 'div-content-active' : 'div-content'
              "
              @click="selectCourseType(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseTree",
  data() {
    return {
      activeName: "DUTY_ALLOCATION_CHECK_FREQUENCY:4",
      // 用户输入的筛选条件
      inputVal: "",
      currentIndex: "", //切换对应的下标
      courseTypeList: [], //数据源
      listMon: [
        { name: "一月" },
        { name: "二月" },
        { name: "三月" },
        { name: "四月" },
        { name: "五月" },
        { name: "六月" },
        { name: "七月" },
        { name: "八月" },
        { name: "九月" },
        { name: "十月" },
        { name: "十一月" },
        { name: "十二月" },
      ],
      // "第一季度", "第二季度", "第三季度", "第四季度"
      quarter: [
        {
          name: "第一季度",
        },
        {
          name: "第二季度",
        },
        {
          name: "第三季度",
        },
        {
          name: "第四季度",
        },
      ],
      // "上半年", "下半年", "全年"
      half: [
        {
          name: "上半年",
        },
        {
          name: "下半年",
        },
        {
          name: "下半年",
        },
      ],
      listYear: [
        {
          name: "2021",
        },
        {
          name: "2022",
        },
        {
          name: "2023",
        },
      ],
    };
  },
  created() {
    // this.getTreeData();
  },
  methods: {
    // 点击事件
    selectCourseType(value, index) {
      this.currentIndex = index;
      this.$emit("selectCourseType", value);
    },
    handleClick(tab) {
      if (tab.name == "DUTY_ALLOCATION_CHECK_FREQUENCY:4") {
        this.$emit("selectCourseTitle", tab);
      } else if (tab.name == "DUTY_ALLOCATION_CHECK_FREQUENCY:3") {
        this.$emit("selectCourseTitle", tab);
      } else if (tab.name == "DUTY_ALLOCATION_CHECK_FREQUENCY:2") {
        this.$emit("selectCourseTitle", tab);
      } else if (tab.name == "DUTY_ALLOCATION_CHECK_FREQUENCY:1") {
        this.$emit("selectCourseTitle", tab);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.courseTree {
  height: 100%;
  flex: 1;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .content {
    width: 98%;
    height: 100%;
    text-align: center;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    .listMon-style {
      margin: 10px 0px;
    }
  }
  .div-content-active {
    padding: 8px 10px;
    background: #d0e0ff;
    // border: 1px dashed #409eff;
    border-radius: 4px;
    color: #4789e9;
    opacity: 0.8;
  }
  .div-content {
    padding: 8px 10px;
    background: #fff;
    // border: 1px dashed #dcdfe6;
    border-radius: 4px;
    color: #656565;
  }
  /deep/ .el-tabs {
    .el-tabs__header {
      padding-bottom: 15px;
      border-bottom: 1px dashed #a5c1f8;
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            .el-tabs__active-bar {
              display: none;
            }
            .el-tabs__item {
              width: 73px;
              height: 28px;
              padding: 0;
              text-align: center;
              line-height: 28px;
              font-size: 12px;
              color: #bbbbbb;
              border-radius: 4px;
            }
            .el-tabs__item.is-active {
              color: #ffffff;
              background: #5090ff;
            }
          }
        }
      }
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }
}
</style>
