<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="tab-wrap">
          <div :class="tabId == 1 ? 'tab tab-now' : 'tab'" @click="choseTab(1)">
            待学习
          </div>
          <div :class="tabId == 2 ? 'tab tab-now' : 'tab'" @click="choseTab(2)">
            已学完
          </div>
          <div :class="tabId == 3 ? 'tab tab-now' : 'tab'" @click="choseTab(3)">
            已过期
          </div>
        </div>
        <div class="tab-content" v-show="tabId == 1">
          <div class="no-curriculum" v-if="noCurriculum">
            <div class="img-box">
              <img src="@/assets/images/noCurriculum.png" alt="" />
              <p>暂无学习课程</p>
            </div>
          </div>
          <div class="curriculum-list">
            <div
              class="curriculum-item"
              v-for="item in waitLearnData"
              :key="item"
            >
              <div class="planned-time">
                {{ `计划时间：${item.startTime}—${item.endTime}` }}
              </div>
              <div class="curriculum-title">{{ item.courseName }}</div>
              <div class="flex-box">
                <div class="half curriculum-progress-text">学习进度</div>
                <div class="half curriculum-progress-time">
                  {{ item.learnDuration }}m/{{ item.courseHours }}m
                </div>
              </div>
              <div class="curriculum-progress">
                <div
                  class="curriculum-progress-line"
                  :style="'width:' + item.progress"
                ></div>
              </div>
              <div class="flex-box">
                <div class="half curriculum-status">
                  <span>学习状态：</span>
                  <span style="font-size: 14px; color: #faad14">{{
                    item.examNum > 0 ? item.examState : "待学习"
                  }}</span>
                </div>
              </div>
              <div class="flex-box role-act">
                <el-button
                  type="info"
                  plain
                  class="btn-start"
                  :disabled="true"
                  v-if="item.isNeedExam !== 'COMMON_JUDGE:TRUE'"
                  >无需考试</el-button
                >
                <el-button
                  type="warning"
                  plain
                  class="btn-start"
                  v-else-if="
                    item.learnDuration >= item.courseHours ||
                    item.isExamBindHours !== 'COMMON_JUDGE:TRUE'
                  "
                  @click="goExam(item)"
                  >立即考试</el-button
                >
                <el-button
                  type="info"
                  plain
                  class="btn-start"
                  :disabled="true"
                  v-else-if="item.learnDuration < item.courseHours"
                  >立即考试</el-button
                >
                <el-button
                  type="primary"
                  class="btn-status"
                  @click="goStudy(item)"
                  >立即学习</el-button
                >
              </div>
              <div class="end-date">
                <i
                  class="el-icon-time"
                  style="color: #ff4d4f; margin-top: 1px"
                ></i>
                <div>
                  距离计划结束还剩<span style="color: #ff4d4f">{{
                    item.expirationDate
                  }}</span
                  >天
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content" v-show="tabId == 2">
          <div class="no-curriculum" v-if="no - curriculum">
            <div class="img-box">
              <img src="@/assets/images/noCurriculum.png" alt="" />
              <p>暂无学习课程</p>
            </div>
          </div>
          <div class="curriculum-list">
            <div
              class="curriculum-item"
              v-for="item in finishedLearnData"
              :key="item"
            >
              <div class="planned-time">
                {{ `计划时间：${item.startTime}—${item.endTime}` }}
              </div>
              <div class="curriculum-title">{{ item.courseName }}</div>
              <div class="flex-box">
                <div class="half curriculum-progress-text">学习进度</div>
                <div class="half curriculum-progress-time">
                  {{ item.learnDuration }}m/{{ item.courseHours }}m
                </div>
              </div>
              <div class="curriculum-progress">
                <div
                  class="curriculum-progress-line"
                  :style="'width:' + item.progress"
                ></div>
              </div>
              <div class="flex-box">
                <div class="half curriculum-status">
                  <span>学习状态：</span>
                  <span style="font-size: 14px; color: #faad14">待考试</span>
                </div>
              </div>
              <div class="flex-box role-act">
                <el-button
                  type="info"
                  plain
                  class="btn-start"
                  :disabled="true"
                  v-if="item.isNeedExam !== 'COMMON_JUDGE:TRUE'"
                  >无需考试</el-button
                >
                <el-button
                  type="warning"
                  plain
                  class="btn-start"
                  v-else-if="
                    item.learnDuration >= item.courseHours ||
                    item.isExamBindHours !== 'COMMON_JUDGE:TRUE'
                  "
                  @click="goExam(item)"
                  >立即考试</el-button
                >

                <el-button
                  type="info"
                  plain
                  class="btn-start"
                  :disabled="true"
                  v-else-if="item.learnDuration < item.courseHours"
                  >立即考试</el-button
                >

                <el-button
                  type="primary"
                  class="btn-status"
                  @click="goStudy(item)"
                  >立即学习</el-button
                >
              </div>
              <div class="end-date">
                <i
                  class="el-icon-time"
                  style="color: #ff4d4f; margin-top: 1px"
                ></i>
                <div>
                  距离计划结束还剩<span style="color: #ff4d4f">{{
                    item.expirationDate
                  }}</span
                  >天
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content" v-show="tabId == 3">
          <div class="no-curriculum" v-if="no - curriculum">
            <div class="img-box">
              <img src="@/assets/images/noCurriculum.png" alt="" />
              <p>暂无学习课程</p>
            </div>
          </div>
          <div class="curriculum-list">
            <div
              class="curriculum-item"
              v-for="item in expiredLearnData"
              :key="item"
            >
              <div
                class="planned-time"
                style="background: #f0f0f0; color: #595959"
              >
                {{ `计划时间：${item.startTime}—${item.endTime}` }}
              </div>
              <div class="curriculum-title">{{ item.courseName }}</div>
              <div class="flex-box">
                <div class="half curriculum-progress-text">学习进度</div>
                <div class="half curriculum-progress-time">
                  {{ item.learnDuration }}m/{{ item.courseHours }}m
                </div>
              </div>
              <div class="curriculum-progress">
                <div
                  class="curriculum-progress-line"
                  :style="'width:' + item.progress"
                ></div>
              </div>
              <div class="flex-box">
                <div class="half curriculum-status">
                  <span>学习状态：</span>
                  <span style="font-size: 14px; color: #faad14">{{
                    item.examNum > 0 ? item.examState : "待学习"
                  }}</span>
                </div>
              </div>
              <div class="flex-box role-act">
                <el-button
                  type="warning"
                  plain
                  class="btn-start"
                  style="
                    background: #f0f0f0;
                    color: #595959;
                    border-color: #f0f0f0;
                  "
                  >立即考试</el-button
                >
                <el-button
                  type="primary"
                  class="btn-status"
                  style="
                    background: #f0f0f0;
                    color: #595959;
                    border-color: #f0f0f0;
                  "
                  >继续学习</el-button
                >
              </div>
              <div
                class="end-date"
                style="background: #fff0f0; justify-content: center"
              >
                <i
                  class="el-icon-time"
                  style="color: #ff4d4f; margin-top: 1px"
                ></i>
                <div style="color: #ff4d4f">超期未学完</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </list-container>
    <basic-dialog
      icon="icon-bianji"
      title="学习提醒"
      width="596px"
      height="320px"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
      :showFooter="false"
    >
      <template #content>
        <div class="dialog-content">
          <p>1.学习过程中有摄像头抓拍请勿长时间离开屏幕前。</p>
          <p>
            2.学习结束后请点击右上角<span style="color: #ff4646">结束学习</span
            >按钮，点击其他关闭按钮将无法累计学时。
          </p>
          <p>3.确定要开始学习吗？</p>
          <div class="btn-wrap">
            <div class="btn-start">开始学习</div>
            <div class="btn-close" @click="close">取消</div>
          </div>
        </div>
      </template>
    </basic-dialog>
    <study-dialog ref="studyDialogRef"></study-dialog>
    <test-paper ref="testPaperRef" :trainLevelKey="trainLevelKey"></test-paper>
  </div>
</template>
<script>
import {
  waitLearnAPI,
  finishedLearnAPI,
  expiredLearnAPI,
} from "@/api/education/dailyTraining/onlineLearningAndExamination/onlineLearning";
import studyDialog from "../components/studyDialog.vue";
import testPaper from "../components/testPaper";
export default {
  name: "onlineLearning",
  components: { studyDialog, testPaper },
  data() {
    return {
      noCurriculum: false,
      curriculumStatus: 0,
      openFlag: false,
      tableData: [],
      tabId: 1,
      waitLearnData: [],
      finishedLearnData: [],
      expiredLearnData: [],
      personId: "",
    };
  },
  mounted() {
    this.personId = this.$store.state.user.currentUserInfo.id;
    this.getList(1);
  },
  methods: {
    async getList(id) {
      let params = {
        trainCategory: "EDUCATION_SET_TRAININGCATEGORY:ONE",
        personId: this.personId,
      };

      if (id === 1) {
        const res = await waitLearnAPI(params);
        this.dataHandle(res, 1);
      } else if (id === 2) {
        const res = await finishedLearnAPI(params);
        this.dataHandle(res, 2);
      } else if (id === 3) {
        const res = await expiredLearnAPI(params);
        this.dataHandle(res, 3);
      }
    },
    close() {
      this.openFlag = false;
    },
    // tab选项切换
    choseTab(id) {
      this.tabId = id;
      this.getList(id);
    },
    // 开始学习
    goStudy(data) {
      this.$refs.studyDialogRef.open(data);
    },
    dataHandle(res, id) {
      res.data.forEach((item) => {
        item.courseHours = Math.floor(Number(item.courseHours) * 45);
        item.startTime = this.$dayjs(item.startTime).format("YYYY-MM-DD");
        item.endTime = this.$dayjs(item.endTime).format("YYYY-MM-DD");
        if (item.learnDuration > item.courseHours) {
          item.learnDuration = item.courseHours;
        }
        item.progress =
          (item.learnDuration / item.courseHours).toFixed(2) * 100 + "%";
        let endTime = this.$dayjs(new Date(item.endTime));
        item.expirationDate = endTime.diff(new Date(), "day");
      });
      if (id === 1) {
        this.waitLearnData = res.data;
      } else if (id === 2) {
        this.finishedLearnData = res.data;
      } else if (id === 3) {
        this.expiredLearnData = res.data;
      }
    },
    // 开始考试
    goExam(item) {
      this.$refs.testPaperRef.open(item);
    },
  },
};
</script>

<style scoped lang="scss">
.tab-wrap {
  margin: 20px 0px;
  display: flex;
  border-bottom: 1px solid #1890ff;
  .tab {
    cursor: pointer;
    width: 126px;
    height: 38px;
    margin: 0px 10px;
    line-height: 38px;
    text-align: center;
  }
  .tab-now {
    color: white;
    background: url("../../../../../assets/images//education/tab_bg.png")
      no-repeat center/cover;
  }
}
.no-curriculum {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .img-box {
    img {
      width: 368px;
      height: auto;
    }
    p {
      font-size: 22px;
      text-align: center;
      color: #999999;
    }
  }
}
.tab-content {
  height: 100%;
  overflow-y: auto;
}
.curriculum-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-bottom: 35px;
}
.curriculum-item {
  width: 30%;
  height: 255px;
  background: #ffffff;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px 4px 4px 4px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 12px;
  position: relative;
  box-sizing: border-box;
  margin: 0 1.6%;
  margin-bottom: 35px;
  display: flex;
}
.planned-time {
  width: 261px;
  height: 30px;
  background: #1890ff;
  border-radius: 0px 0px 15px 15px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}
.curriculum-title {
  font-size: 20px;
  color: #251f1e;
  width: 100%;
  margin: 16px 0px;
}
.flex-box {
  display: flex;
  width: 100%;
  .half {
    width: 50%;
  }
  margin-bottom: 10px;
}
.curriculum-progress-text {
  font-size: 12px;
  font-weight: normal;
  color: #595959;
  margin-bottom: 4px;
}
.curriculum-progress-time {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  color: #597ef7;
}
.curriculum-progress {
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 10px;
}
.curriculum-progress-line {
  background: #4a80fc;
  height: 100%;
  border-radius: 5px 5px 5px 5px;
}
.curriculum-type,
.curriculum-status {
  span {
    font-size: 12px;
  }
}
.training-level {
  font-size: 12px;
  margin: 15px 0px;
}
.role-act {
  justify-content: space-between;
}
.btn-start {
  width: 123px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #faad14;
  letter-spacing: 2px;
}
.btn-status {
  width: 123px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
  background: #597ef7;
}
.btn-start-disabled {
  color: #999999;
  font-weight: bold;
  font-size: 14px;
}
.end-date {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 28px;
  background: #f0f5ff;
  border-radius: 0px 0px 4px 4px;
  opacity: 1;
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
  box-sizing: border-box;
  letter-spacing: 2px;
}

// 弹窗
.dialog-content {
  padding: 30px 38px;
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 22px;
    .btn-start {
      width: 80px;
      height: 32px;
      background: #409eff;
      font-size: 14px;
      color: #ffffff;
      margin-right: 10px;
      line-height: 32px;
      border-radius: 2px 2px 2px 2px;
      border: 1px solid #2888ea;
      text-align: center;
      cursor: pointer;
    }
    .btn-close {
      width: 80px;
      height: 32px;
      background: #ffffff;
      font-size: 14px;
      color: #474747;
      line-height: 32px;
      border-radius: 2px 2px 2px 2px;
      border: 1px solid #606060;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
