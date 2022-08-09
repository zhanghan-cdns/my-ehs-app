<template>
  <div>
    <basic-dialog
      icon="icon-bianji"
      title="在线考试"
      width="100%"
      height="100%"
      @close="close"
      :openFlag="openFlag"
      :showFooter="false"
    >
      <template #content>
        <div class="textPaper">
          <img src="@/assets/images/test_paper_bg.png" alt="" class="bg_img" />
          <div class="content">
            <div class="wrap">
              <div class="wrap_right">
                <div class="wrap_right_head">
                  <div class="line_left"></div>
                  <div class="title">考试记录</div>
                  <div class="line_right"></div>
                </div>
                <div class="wrap_right_list">
                  <single-choice
                    @singleChoiceChange="singleChoiceChange"
                    :single_choice_form="single_choice_form"
                  ></single-choice>
                  <multiple-selection
                    @multipleSelectionChange="multipleSelectionChange"
                    :multiple_selection_form="multiple_selection_form"
                  ></multiple-selection>
                  <judge
                    @judgeChange="judgeChange"
                    :judge_from="judge_from"
                  ></judge>
                  <black
                    @blankFromChange="blankFromChange"
                    :blank_from="blank_from"
                  ></black>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #bottom></template>
    </basic-dialog>
  </div>
</template>
<script>
import singleChoice from "./singleChoice";
import multipleSelection from "./multipleSelection";
import judge from "./judge";
import black from "./fillBlanks.vue";
import { viewAPI } from "@/api/education/threeLevel/onlineTrainingRecords";
export default {
  name: "textPaper",
  components: { singleChoice, multipleSelection, judge, black },
  data() {
    return {
      examDuration: "", //考试时间
      courseId: "",
      examRule: "",
      personId: "",
      openFlag: false,
      tipFlag: false,
      single_choice_form: [],
      multiple_selection_form: [],
      judge_from: [],
      blank_from: [],
      timer: "",
      hour: "0",
      minute: "0",
      second: "0",
      single: {}, //单选，
      multiple: {}, //多选
      judge: {}, //判断
      fillBlank: {}, //填空
    };
  },
  mounted() {
    this.personId = this.$store.state.user.currentUserInfo.id;
  },
  methods: {
    open(courseId) {
      this.courseId = courseId;
      this.openFlag = true;
      this.getPaper(courseId);
    },
    async getPaper(courseId) {
      let params = {
        id: courseId,
      };
      let res = await viewAPI(params);
      if (res.code == 200) {
        this.examRule = res.data.examRule;
        this.qualifiedScoreLine = res.data.examRule.qualifiedScoreLine;
        //分值
        this.single.score = res.data.single.score;
        this.multiple.score = res.data.multiple.score;
        this.judge.score = res.data.judge.score;
        this.fillBlank.score = res.data.fillBlank.score;
        //时长
        this.examDuration = res.data.examRule.examDuration;
        //
        this.single_choice_form = res.data.single.data;
        res.data.multiple.data.map((item) => {
          item.personAnswer = [];
        });
        this.multiple_selection_form = res.data.multiple.data;
        this.judge_from = res.data.judge.data;
        this.blank_from = res.data.fillBlank.data;
      }
    },
    close() {
      this.openFlag = false;
      this.tipFlag = false;
      clearInterval(this.timer);
    },
    jump(index) {
      let id = index;
      var element = document.getElementById(id);
      element.scrollIntoView();
      // let scrollTop = $(".textPaper").scrollTop();
      // let num = $(id).offset().top + scrollTop - $(".textPaper").offset().top;
      // $(".textPaper").animate({ scrollTop: num }, 100);
    },
    // 单选题数据变化
    singleChoiceChange(value) {
      this.single_choice_form = value;
      let finalAnswer = [];
      this.single_choice_form.map((item) => {
        let obj = {
          id: item.id,
          answer: item.personAnswer,
          rightKey: item.answer,
        };
        finalAnswer.push(obj);
      });
      this.single.finalAnswer = finalAnswer;
      console.log(this.single);
    },
    //多选
    multipleSelectionChange(value) {
      let finalAnswer = [];
      value.map((item) => {
        item.leftAnswer = item.personAnswer.sort().join("、");
        let obj = {
          id: item.id,
          answer: item.personAnswer.sort().join(""),
          rightKey: item.answer,
        };
        finalAnswer.push(obj);
      });
      this.multiple_selection_form = JSON.parse(JSON.stringify(value));
      this.multiple.finalAnswer = finalAnswer;
      console.log(this.multiple_selection_form, this.multiple);
    },
    //判断
    judgeChange(value) {
      this.judge_from = value;
      console.log(value);
      let finalAnswer = [];
      this.judge_from.map((item) => {
        let obj = {
          id: item.id,
          answer: item.personAnswer,
          rightKey: item.answer,
        };
        finalAnswer.push(obj);
      });
      this.judge.finalAnswer = finalAnswer;
      console.log(this.judge);
    },
    //填空题
    blankFromChange(value) {
      this.blank_from = value;
      let finalAnswer = [];
      this.blank_from.map((item) => {
        let obj = {
          id: item.id,
          answer: item.personAnswer,
          rightKey: item.answer,
        };
        finalAnswer.push(obj);
      });
      this.fillBlank.finalAnswer = finalAnswer;
      console.log(this.fillBlank);
    },
    //开始考试
    startExam() {
      this.tipFlag = false;
      this.timeHandle(this.examDuration);
    },
    //倒计时
    timeHandle(time) {
      time = time * 60 * 1000;
      let now = new Date(); //获取当前时间
      let endTime = now.getTime() + time; //定义结束时间
      this.timer = setInterval(() => {
        var data = new Date();
        var chaTime = endTime - data.getTime();
        if (chaTime > 0) {
          let lefttime = endTime - data.getTime(), //距离结束时间的毫秒数
            leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
            lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
            leftm = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
            lefts = Math.floor((lefttime / 1000) % 60); //计算秒数
          this.hour = lefth;
          this.minute = leftm;
          this.second = lefts;
        } else {
          //考试结束
          clearInterval(this.timer);
          this.$message.success("考试结束！");
          this.$parent.getList();
          this.openFlag = false;
        }
      }, 1000);
    },
    //提交
    async submit() {
      let msg = this.isJudge() ? "是否结束考试" : "有试题未完成，是否结束考试";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let useTime =
            this.examDuration -
            (this.hour * 60 + this.minute + Math.floor(this.second / 60));
          let params = {
            courseId: this.courseId,
            examMode: 0,
            inBlanks: this.fillBlank,
            judge: this.judge,
            multi: this.multiple,
            personId: this.personId,
            single: this.single,
            useTime: useTime,
            ruleId: this.examRule.id,
            qualifiedScoreLine: this.examRule.qualifiedScoreLine,
          };
          submitExamAPI(params).then((res) => {
            if (res.code == 200) {
              this.$message.success("考试完成！");
              this.$parent.getList();
              this.openFlag = false;
              console.log(res);
            }
          });
        })
        .catch(() => {});
    },
    isJudge() {
      let judge = true;
      console.log(this.multiple_selection_form);
      this.single_choice_form.map((item) => {
        if (!item.personAnswer) {
          judge = false;
          return;
        }
      });
      this.multiple_selection_form.map((item) => {
        if (!item.personAnswer || item.personAnswer.length == 0) {
          judge = false;
          return;
        }
      });
      this.judge_from.map((item) => {
        if (!item.personAnswer) {
          judge = false;
          return;
        }
      });
      this.blank_from.map((item) => {
        if (!item.personAnswer) {
          judge = false;
          return;
        }
      });
      return judge;
    },
  },
};
</script>
<style scoped lang="scss">
.textPaper {
  background: #86c5ff;
  position: relative;
  padding-top: 17.9%;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* firefox */
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.bg_img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content {
  width: 100%;
  // height: 100%;
}

.wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-left: -114px;
  margin-bottom: 30px;
}
.wrap_left {
  width: 236px;
  min-height: 670px;
  background: white;
  padding: 0 8px;
}
.wrap_right {
  width: 49%;
  min-height: 670px;
  margin-left: 20px;
  background: white;
}

.wrap_left_head {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px dashed #d0e0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.wrap_left_head .line {
  width: 4px;
  height: 20px;
  background: #4a80fc;
  border-radius: 2px 2px 2px 2px;
  margin-right: 10px;
}
.topic_type {
  margin-bottom: 16px;
}
.topic_list {
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
}
.topic_list_item {
  margin-right: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  .topic_answer {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    height: 32px;
    background: #ffffff;
    box-shadow: inset 0px -1px 4px 1px #d0e0ff;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid rgba(208, 224, 255, 0.15);
    font-size: 14px;
    color: #4a80fc;
    padding: 0 10px;
    box-sizing: border-box;
    white-space: normal;
  }
  .topic_index {
    font-size: 14px;
    color: #251f1e;
    text-align: center;
  }
  .topic_answer_blank {
    min-width: 104px;
  }
}
.btn_sumbit {
  width: 81px;
  height: 32px;
  background: #409eff;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #2888ea;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 16px;
  cursor: pointer;
}

.wrap_right_head {
  min-height: 72px;
  border-bottom: 1px dashed #d0e0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  .line_left {
    width: 195px;
    height: 6px;
    background: linear-gradient(
      270deg,
      #4a80fc 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 0px 0px 0px 0px;
  }
  .line_right {
    width: 195px;
    height: 6px;
    background: linear-gradient(90deg, #4a80fc 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 0px 0px 0px 0px;
  }
  .title {
    font-size: 32px;
    font-weight: 500;
    color: #4a80fc;
    margin: 0 16px;
    text-align: center;
  }
}
.time_hourglass {
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 18px;
  margin-top: 8px;
  margin-bottom: 20px;
  .block {
    width: 29px;
    height: 37px;
    background: #f0f5ff;
    border-radius: 4px 4px 4px 4px;
    text-align: center;
    line-height: 37px;
    font-size: 14px;
    color: #4a80fc;
    margin-right: 4px;
    letter-spacing: 2px;
    padding: 0 4px;
    text-align: center;
  }
}
.time_hourglass > div:nth-of-type(1) {
  font-size: 14px;
  color: #595959;
}
.wrap_right_list {
  padding: 0 40px;
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
