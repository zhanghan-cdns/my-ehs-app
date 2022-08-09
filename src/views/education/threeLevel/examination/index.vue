<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="page_title">三级安全教育考试课程选择</div>
        <div class="noCurriculum" v-if="listData.length == 0">
          <div class="img_box">
            <img src="@/assets/images/noCurriculum.png" alt="" />
            <p>暂无学习课程</p>
          </div>
        </div>
        <div class="curriculum_list" v-if="listData.length > 0">
          <div class="curriculum_item" v-for="item in listData" :key="item">
            <div class="curriculum_title">{{ item.courseName }}</div>
            <div class="flex_box">
              <div class="half curriculum_progress_text">学习进度</div>
              <div class="half curriculum_progress_time">
                {{ item.learnDuration }}m/{{ item.courseHours }}m
              </div>
            </div>
            <div class="curriculum_progress">
              <div
                class="curriculum_progress_line"
                :style="'width:' + item.progress"
              ></div>
            </div>
            <div class="flex_box">
              <div class="half curriculum_status">
                <span>考试状态：</span>
                <span
                  style="font-size: 14px; color: #52c41a"
                  v-if="item.examResult==1"
                  >已通过</span
                >
                <span
                  style="font-size: 14px; color: #faad14"
                  v-else-if="item.examResult == null"
                  >待考试</span
                >
                <span
                  style="font-size: 14px; color: #ff4d4f"
                  v-else-if="item.examResult==0"
                  >未通过</span
                >
              </div>
            </div>
            <div class="flex_box role_act">
               <el-button
                type="success"
                class="btn_status"
                v-if="item.status == 0"
                @click="
                  goStudy(item.courseId, item.trainLevelKey, item.learnDuration)
                "
                >已学完</el-button
              >
              <el-button
                type="primary"
                class="btn_status"
                v-else-if="item.status == 1"
                @click="
                  goStudy(item.courseId, item.trainLevelKey, item.learnDuration)
                "
                >继续学习</el-button
              >
              <el-button
                type="primary"
                class="btn_status"
                v-else-if="item.status == 2"
                @click="
                  goStudy(item.courseId, item.trainLevelKey, item.learnDuration)
                "
                >开始学习</el-button
              >
              <el-button
                type="primary"
                class="btn_status"
                v-else-if="item.status == 3"
                disabled
                >开始学习</el-button
              >
              <el-button
                type="info"
                class="btn_start"
                v-if="item.canExam == false"
                disabled
                >立即考试</el-button
              >
              <el-button
                type="warning"
                class="btn_start"
                v-if="item.canExam == true"
                @click="goExam(item)"
                >立即考试</el-button
              >
            </div>
            <!-- <div class="end_date">
              <i
                class="el-icon-time"
                style="color: #ff4d4f; margin-top: 1px"
              ></i>
              <div>距离计划结束还剩<span style="color: #ff4d4f">5</span>天</div>
            </div> -->
          </div>
        </div>
      </template>
    </list-container>
    <study-dialog ref="studyDialogRef"></study-dialog>
    <test-paper ref="testPaperRef"></test-paper>
  </div>
</template>
<script>
import { courseListAPI } from "@/api/education/threeLevel/curriculum";
import studyDialog from "../curriculum/components/studyDialog.vue";
import testPaper from "../curriculum/components/testPaper";
export default {
  components: { studyDialog, testPaper },
  data() {
    return {
      noCurriculum: false,
      curriculum_status: 0,
      openFlag: false,
      listData: [],
      isThree: false,
      ONE_isQualified: false,
      TWO_isQualified: false,
      THREE_isQualified: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let params = {
        trainCategory: "EDUCATION_SET_TRAININGCATEGORY:TWO",
      };
      const res = await courseListAPI(params);
      let arr = [];
      res.data.map((item) => {
        if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:ONE") {
          arr[0] = item;
        } else if (
          item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:TWO"
        ) {
          arr[1] = item;
        } else if (
          item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:THREE"
        ) {
          arr[2] = item;
        }
      });
      this.listData = arr;
      this.listData.map((item) => {
        item.courseHours = Math.floor(Number(item.courseHours) * 45);
        if (item.learnDuration > item.courseHours) {
          item.learnDuration = item.courseHours;
        }
        item.progress =
          (item.learnDuration / item.courseHours).toFixed(2) * 100 + "%";
        // 判断学习状态
        if (item.learnDuration == 0 || item.learnDuration == null) {
          item.status = 2; //待学习，可开始学习
          if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:ONE") {
            this.ONE_isQualified = item.examResult; //考试成绩大于等于合格线 0是不合格
          }
          //部门级考试结果，需要看公司级课程是否通过
          if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:TWO") {
            this.TWO_isQualified = item.examResult;
            if (this.ONE_isQualified != 1) {
              item.status = 3; //待学习，等待公司级考试通过
            }
          }
          //班组级考试结果,需要看部门级课程是否通过
          if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:THREE") {
            if (this.TWO_isQualified != 1) {
              item.status = 3; //待学习，等待部门级考试通过
            }
          }
        } else if (
          item.learnDuration > 0 &&
          item.learnDuration < item.courseHours
        ) {
          item.status = 1; //学习中
        } else if (item.learnDuration == item.courseHours) {
          item.status = 0; //已学完
        }
        //判断该课程是否可以参加考试
        //是否绑定学时，是则需要全部学完才能考试；
        if (item.isExamBindHours == "COMMON_JUDGE:TRUE") {
          //是否学完
          if (item.learnDuration == item.courseHours) {
            // 根据该课程的级别,判断上一级课程是否考试通过，通过该课程才能考试
            //公司级考试，无需上一级课程；
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:ONE") {
              this.ONE_isQualified = item.examResult;
              item.canExam = true;
            }
            //部门级考试结果，需要看公司级课程是否通过
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:TWO") {
              this.TWO_isQualified = item.examResult;
              if (this.ONE_isQualified == 1) {
                item.canExam = true;
              } else {
                item.canExam = false;
              }
            }
            //班组级考试结果,需要看部门级课程是否通过
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:THREE") {
              if (this.TWO_isQualified == 1) {
                item.canExam = true;
              } else {
                item.canExam = false;
              }
            }
          } else {
            item.canExam = false;
          }
        } else {
          // 无需绑定学时，只要学习过；
          if (item.learnDuration > 0) {
            // 根据该课程的级别,判断上一级课程是否考试通过，通过该课程才能考试
            //公司级考试，无需上一级课程；
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:ONE") {
              this.ONE_isQualified = item.examResult;
              item.canExam = true;
            }
            //部门级考试结果，需要看公司级课程是否通过
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:TWO") {
              this.TWO_isQualified = item.examResult;
              if (this.ONE_isQualified == 1) {
                item.canExam = true;
              } else {
                item.canExam = false;
              }
            }
            //班组级考试结果,需要看部门级课程是否通过
            if (item.trainLevelKey == "EDUCATION_SET_COURSE_TRAINLEVEL:THREE") {
              if (this.TWO_isQualified==1) {
                item.canExam = true;
              } else {
                item.canExam = false;
              }
            }
          } else {
            item.canExam = false;
          }
        }
        //
      });

      console.log(this.listData);
    },
    close() {
      this.openFlag = false;
    },
    //开始学习
    goStudy(id, trainLevelKey, learnDuration) {
      this.$refs.studyDialogRef.open(id, trainLevelKey, learnDuration);
    },
    //开始考试
    goExam(item) {
      this.$refs.testPaperRef.open(item);
    },
  },
};
</script>

<style scoped lang="scss">
.page_title {
  font-size: 16px;
  font-weight: bold;
  color: #4082e8;
  line-height: 60px;
  border-bottom: 1px solid #1890ff;
  height: 57px;
}
.noCurriculum {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .img_box {
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
.curriculum_list {
  display: flex;
  padding: 20px;
  height: 100%;
}
.curriculum_item {
  width: 30%;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px 4px 4px 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 12px;
  position: relative;
  margin-bottom: 30px;
  margin-left: 1%;
}
.planned_time {
  width: 261px;
  height: 30px;
  background: #1890ff;
  border-radius: 0px 0px 15px 15px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 14px;
}
.curriculum_title {
  font-size: 20px;
  color: #251f1e;
  margin-bottom: 14px;
  width: 100%;
  margin-top: 20px;
}
.flex_box {
  display: flex;
  width: 100%;
  .half {
    width: 50%;
  }
}
.curriculum_progress_text {
  font-size: 12px;
  font-weight: normal;
  color: #595959;
  margin-bottom: 4px;
}
.curriculum_progress_time {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  color: #597ef7;
}
.curriculum_progress {
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 15px;
}
.curriculum_progress_line {
  background: #4a80fc;
  height: 100%;
  border-radius: 5px 5px 5px 5px;
}
.curriculum_type,
.curriculum_status {
  margin-bottom: 20px;
  span {
    font-size: 12px;
  }
}
.training_level {
  font-size: 12px;
  margin: 15px 0px;
}
.role_act {
  justify-content: space-between;
}
.btn_start {
  width: 123px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
}
.btn_status {
  width: 123px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
}
.btn_start_disabled {
  color: #999999;
  font-weight: bold;
  font-size: 14px;
}
.end_date {
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
.dialog_content {
  padding: 30px 38px;
  .btn_wrap {
    display: flex;
    justify-content: center;
    margin-top: 22px;
    .btn_start {
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
    .btn_close {
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
