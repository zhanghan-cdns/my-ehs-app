<!--  -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div id="risk">
          <div class="risk-title">{{ rowDate && rowDate.restrictSpaceName }}22222</div>
          <div class="risk-main">
            <div class="risk-main-left">
              <div
                v-for="(item, index) in list"
                :key="index"
                style="margin-top: 30px"
              >
                <div
                  :class="
              currentIndex == index ? 'div-content-active' : 'div-content'
            "
                  style="width: 60%; text-align: center; margin: 0 auto"
                  @click="selectCourseType(item, index)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <div class="risk-main-right">
              <base-info v-show="currentIndex === 0" :type="type"></base-info>
              <map-info v-show="currentIndex === 1" :type="type" ></map-info>
              <risk-info v-show="currentIndex === 2" :type="type"></risk-info>
              <control-info v-show="currentIndex === 3" :type="type"></control-info>
              <grade-info v-show="currentIndex === 4" :type="type"></grade-info>
              <div class="footer-btn">
                <el-button
                  v-if="
              currentIndex === 0 ||
              currentIndex === 1 ||
              currentIndex === 2 ||
              currentIndex === 3 ||
              currentIndex === 4
            "
                  :size="size"
                  plain
                  type="info"
                  @click="previous"
                >上一步
                </el-button>
                <el-button
                  v-if="
              currentIndex === 0 ||
              currentIndex === 1 ||
              currentIndex === 2 ||
              currentIndex === 3
            "
                  v-show="isShow"
                  :size="size"
                  type="success"
                  @click="finish"
                >保存
                </el-button>
                <el-button
                  v-if="
              currentIndex === 0 ||
              currentIndex === 1 ||
              currentIndex === 2 ||
              currentIndex === 3
            "
                  v-show="isShowNext"
                  :size="size"
                  type="primary"
                  @click="next"
                >下一步
                </el-button
                >
                <el-button
                  v-if="currentIndex === 4"
                  :size="size"
                  type="primary"
                  @click="next"
                >完成
                </el-button
                >
                <el-button
                  v-if="
              currentIndex === 0 ||
              currentIndex === 1 ||
              currentIndex === 2 ||
              currentIndex === 3
            "
                  v-show="isNext"
                  :size="size"
                  type="primary"
                  @click="nextBtn"
                >下一步
                </el-button
                >
              </div>
            </div>
          </div>
        </div>

      </template>
    </list-container>
  </div>


</template>

<script>
import baseInfo from "./components/baseInfo.vue"; //基本信息
import mapInfo from "./components/mapInfo.vue"; //地图绘制
import riskInfo from "./components/riskInfo.vue"; //固有分险
import controlInfo from "./components/controlInfo.vue"; //控制分险
import gradeInfo from "./components/gradeInfo.vue"; //风险校正
export default {
  components: {
    baseInfo,
    mapInfo,
    riskInfo,
    controlInfo,
    gradeInfo,
  },
  data() {
    return {
      rowDate: "",
      type: "",
      isShow: true,
      isNext: false,
      isShowNext: true,
      currentIndex: 0, //切换对应的下标
      list: [
        "基本信息",
        "地图区域绘制",
        "固有风险评估",
        "控制风险评估",
        "风险校正等级",
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.rowDate = this.$route.params.row;
    this.type = this.$route.params.type;
    console.log(this.$route.params.row, "jk1");
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
  },
  methods: {
    selectCourseType(value, index) {
      console.log(value, "value");
      this.currentIndex = index;
    },
    next() {
      //下一步
      if (this.currentIndex == 0) {
        this.currentIndex++;
        this.isShow = true;
      } else if (this.currentIndex == 1) {
        this.currentIndex++;
        this.isShow = true;
      } else if (this.currentIndex == 2) {
        this.currentIndex++;
        this.isShow = true;
      } else if (this.currentIndex == 3) {
        this.currentIndex++;
        this.isShow = true;
      } else if (this.currentIndex == this.list.length - 1) {
        this.$message.error("当前已是最后一页");
        return;
      }
    },
    previous() {
      //上一步
      if (this.currentIndex == 0) {
        this.$message.error("当前已是第一页");
        return;
      } else if (this.currentIndex < this.list.length) {
        this.currentIndex--;
        this.isShow = false;
        this.isNext = true;
        this.isShowNext = false;
      }
    },
    finish() {
      if (this.currentIndex == 0) {
        // this.currentIndex++;
        this.isShow = false;
      } else if (this.currentIndex == 1) {
        // this.currentIndex++;
        this.isShow = false;
      } else if (this.currentIndex == 2) {
        this.isShow = false;
        // this.currentIndex++;
      } else if (this.currentIndex == 3) {
        this.isShow = false;
        // /this.currentIndex++;
      }
    },
    nextBtn() {
      //下一步
      this.currentIndex++;
      // if (this.currentIndex == 0) {
      //   this.currentIndex++;
      // } else if (this.currentIndex == this.list.length - 1) {
      //   this.$message.error("当前已是最后一页");
      //   return;
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
#risk {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
/deep/ .contain-right{
  background: none;
  padding: 0;
}
// background: #ffff;
.risk-title {
  width: 100%;
  height: 64px;
  padding-left: 25px;
  line-height: 64px;
  background: #fff;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.risk-main {
  display: flex;
  width: 100%;
  height:90%;
  //flex: 1;
  .risk-main-left {
    width: 20%;
    background: #fff;
    margin-right: 8px;
    overflow:auto;
  }

  .risk-main-right {
    width: 80%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    overflow:auto;
    .footer-btn {
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
    }
  }
}

.div-content-active {
  padding: 8px 10px;
  background: #d0e0ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #4a80fc;
}

.div-content {
  padding: 8px 10px;
  //border: 1px dashed #dcdfe6;
  border-radius: 4px;
  color: #666666;
  background: #F8F8F9;
  cursor:pointer;
}
</style>
