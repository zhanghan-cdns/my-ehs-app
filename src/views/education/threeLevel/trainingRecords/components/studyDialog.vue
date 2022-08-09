<template>
  <div>
    <basic-dialog
      icon="icon-bianji"
      title="在线学习"
      width="100%"
      height="100%"
      @close="close"
      :openFlag="openFlag"
      :showFooter="false"
    >
      <template #content>
        <div class="courseware">
          <div class="courseware_left">
            <div class="courseware_left_title">课件</div>
            <div class="courseware_list">
              <div
                class="item"
                v-for="item in coursewareList"
                :key="item"
                @click="selectCourseType(item)"
              >
                {{ item.originalFilename }}
              </div>
            </div>
          </div>
          <div class="courseware_right">
            <div class="courseware_right_top">
              <div class="courseware_right_title">
                {{ nowCourseTitle ? nowCourseTitle : "请选择左侧课件" }}
              </div>
              <div class="study_time">
                已累计学习：{{ hour }}小时{{ minute }}分钟{{ second }}秒
              </div>
              <el-button type="danger" class="btn_finish" @click="saveProgress"
                >结束学习</el-button
              >
            </div>
            <div class="courseware_right_content">
              <render-pdf ref="renderPdfRef" v-if="type == 'pdf'"></render-pdf>
              <render-video
                ref="renderVideoRef"
                v-if="type == 'mp4'"
              ></render-video>
              <render-docx
                ref="renderDocxRef"
                v-if="type == 'docx'"
              ></render-docx>
            </div>
          </div>
        </div>
      </template>
      <template #bottom> </template>
    </basic-dialog>
    <basic-dialog
      icon="icon-bianji"
      title="学习提醒"
      width="596px"
      height="320px"
      v-bind="$attrs"
      @close="close"
      :openFlag="tipFlag"
      :showFooter="false"
    >
      <template #content>
        <div class="dialog_content">
          <p>1.学习过程中有摄像头抓拍请勿长时间离开屏幕前。</p>
          <p>
            2.学习结束后请点击右上角<span style="color: #ff4646">结束学习</span
            >按钮，点击其他关闭按钮将无法累计学时。
          </p>
          <p>3.确定要开始学习吗？</p>
          <div class="btn_wrap">
            <div class="btn_start" @click="start">开始学习</div>
            <div class="btn_close" @click="close">取消</div>
          </div>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import { getCourseWareAPI } from "@/api/education/trainingSettings/courseManagement";
import { saveProgressAPI } from "@/api/education/threeLevel/curriculum";
import { imgUrl } from "@/router/axios";
export default {
  name: "studyDialog",
  mixins: [tableMixins],
  data() {
    return {
      imgUrl: imgUrl,
      openFlag: false,
      tipFlag: false,
      timer: "",
      second: 0,
      minute: 0,
      hour: 0,
      courseId: "",
      personId: "",
      trainLevel: "",
      coursewareList: [],
      type: "",
    };
  },
  mounted() {
    this.personId = this.$store.state.user.currentUserInfo.id;
  },
  methods: {
    close() {
      this.openFlag = false;
      this.tipFlag = false;
      clearInterval(this.timer);
    },
    start() {
      this.tipFlag = false;
      this.timer = setInterval(() => {
        this.second += 1;
        if (this.second >= 60) {
          this.minute += 1;
          this.second = 0;
        }
        if (this.minute >= 60) {
          this.hour += 1;
          this.minute = 0;
        }
      }, 1000);
    },
    open(id, trainLevelKey, learnDuration) {
      this.openFlag = true;
      this.tipFlag = true;
      this.courseId = id;
      this.trainLevelKey = trainLevelKey;
      this.timeHandle(learnDuration);
      let params = {
        courseId: id,
      };
      this.getCourseWare(params);
    },
    //课件列表
    async getCourseWare(params) {
      this.coursewareList = [];
      let res = await getCourseWareAPI(params);
      res.data.privateWare = JSON.parse(
        res.data.privateWare[0].privateCourseWare
      );
      this.coursewareList = this.coursewareList.concat(res.data.privateWare);
    },
    async saveProgress() {
      clearInterval(this.timer);
      let min = Number(
        this.hour * 60 + this.minute + Math.floor(this.second / 60)
      );
      let params = {
        courseId: this.courseId,
        learnDuration: min,
        personId: this.personId,
        trainLevelKey: this.trainLevelKey,
      };
      let res = await saveProgressAPI(params);
      console.log(res);
      if (res.code == 200) {
        this.close();
        this.$parent.getList();
      }
    },
    //时间处理
    timeHandle(time) {
      this.hour = Math.floor(time / 60);
      this.minute = this.hour > 0 ? Math.floor(time - this.hour * 60) : time;
      this.second =
        this.minute > 0
          ? Math.floor(time * 60 - this.hour * 3600 - this.minute * 60)
          : time;
    },
    //选择课件
    selectCourseType(item) {
      this.nowCourseTitle = item.originalFilename.substring(
        0,
        item.originalFilename.lastIndexOf(".")
      );
      this.type = item.ext;
      // if (item.ext != "pdf" && item.ext != "mp4"&&item.ext != "docx") {
      //   return this.$message.warning("只能在线预览pdf、MP4、docx格式文件");
      // }
      let url = this.imgUrl + item.url;
      if (item.ext == "pdf") {
        this.$nextTick(() => {
          this.$refs.renderPdfRef.open(url);
        });
      } else if (item.ext == "mp4") {
        this.$nextTick(() => {
          this.$refs.renderVideoRef.open(url);
        });
      } else if (item.ext == "docx") {
        this.$nextTick(() => {
          console.log(this.$refs.renderDocxRef);
          this.$refs.renderDocxRef.open(url);
        });
      } 
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.vxe-modal--body {
  background: #eeeeee;
}
/deep/ .contain-right {
  padding: 0px;
  background: #f0f2f5;
}
.courseware {
  display: flex;
  width: 100%;
  height: 100%;
}
.courseware_left {
  width: 246px;
  height: 100%;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  margin-right: 10px;
}
.courseware_right {
  height: calc(100% - 48px);
  flex: 1;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  padding: 24px;
}
.courseware_right_top {
  height: 78px;
  border-bottom: 1px solid #e0e0e0;
}
.courseware_left_title {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  color: #251f1e;
  border-bottom: 1px dashed #e0e0e0;
}
.courseware_list {
  padding: 30px 16px;
  height: calc(100% - 109px);
  overflow-y: auto;
  overflow-x: hidden;
  .item {
    width: 214px;
    height: 50px;
    // display: flex;
    // align-items: center;
    line-height: 50px;
    cursor: pointer;
    padding: 0px 20px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background: #d0e0ff;
      border-radius: 6px 6px 6px 6px;
    }
  }
}
.courseware_right_title {
  font-size: 20px;
  font-weight: normal;
  color: #251f1e;
  border-left: 4px solid #4a80fc;
  padding-left: 8px;
  margin-bottom: 16px;
  line-height: 20px;
  white-space: normal;
}
.study_time {
  font-size: 14px;
  font-weight: normal;
  color: #4a80fc;
  line-height: 14px;
}
.btn_finish {
  width: 118px;
  height: 40px;
  background: #ff4646;
  border-radius: 4px 4px 4px 4px;
  font-size: 14px;
  font-weight: normal;
  color: #ffffff;
  position: absolute;
  top: 42px;
  right: 40px;
}

.courseware_right_content {
  height: calc(100% - 78px);
  width: 100%;
  padding-bottom: 24px;
  div {
    width: 60%;
    height: 100%;
    margin: 0 auto;
  }
}
.dialog_content {
  padding: 30px 38px;
  white-space: normal;
  .btn_wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
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
