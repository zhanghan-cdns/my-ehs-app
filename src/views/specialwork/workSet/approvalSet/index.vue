<template>
  <div class="approvalset-container">
    <div class="approvalset-box">
      <div class="box-left">
        <div class="box-left-title">作业设置</div>
      </div>
      <div class="box-right">
        <el-row>
          <el-col :span="12" v-for="(item, index) in workList" :key="index">
            <div class="approvalset-item" @click="openDialog(item.value)">
              <div>
                <img class="work-img" :src="item.workImgSrc" />
              </div>
              <div class="work-name">{{ item.workName }}</div>
              <div>
                <img
                  class="set-img"
                  src="@/assets/images/specialWork/set.png"
                />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="approvalset-item">
              <div>
                <img
                  class="work-img"
                  src="@/assets/images/specialWork/ticketWork.png"
                />
              </div>
              <div class="work-name">作业票预约</div>
              <div>
                <el-switch v-model="switchValue" @change="onSwitchChange">
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <edit-dialog ref="editDialogRef"></edit-dialog>
  </div>
</template>

<script>
import editDialog from "./components/editDialog.vue";

export default {
  components: {
    editDialog,
  },

  data() {
    return {
      workList: [
        {
          workImgSrc: require("@/assets/images/specialWork/fireWork.png"),
          workName: "动火作业",
          value: "fireWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/spaceWork.png"),
          workName: "受限空间作业",
          value: "spaceWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/highWork.png"),
          workName: "高出作业",
          value: "highWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/hoistingWork.png"),
          workName: "吊装作业",
          value: "hoistingWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/groundWork.png"),
          workName: "动土作业",
          value: "groundWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/roadWork.png"),
          workName: "断路作业",
          value: "roadWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/electricWork.png"),
          workName: "临时用电",
          value: "electricWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/blindWork.png"),
          workName: "盲板抽堵作业",
          value: "blindWork",
        },
        {
          workImgSrc: require("@/assets/images/specialWork/repairWork.png"),
          workName: "检维修作业",
          value: "repairWork",
        },
      ],
      switchValue: true,
    };
  },

  methods: {
    onSwitchChange(val) {
      console.log(val, "val");
    },

    openDialog(workName) {
      this.$refs.editDialogRef.open(workName);
    },
  },
};
</script>

<style lang="scss" scoped>
.approvalset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/images/specialWork/set_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.approvalset-box {
  display: flex;
  width: 561px;
  height: 456px;
  background: #ffffff;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 27px 27px 27px 27px;
  border: 1px solid #409eff;
  .box-left {
    display: flex;
    align-items: center;
    width: 48px;
    height: 100%;
    .box-left-title {
      width: 100%;
      height: 170px;
      background: #3399ff;
      border-radius: 0px 16px 16px 0px;
      font-size: 18px;
      color: #ffffff;
      writing-mode: vertical-lr;
      text-align: center;
      line-height: 48px;
      letter-spacing: 10px;
    }
  }

  .box-right {
    margin: 40px 15px 40px 47px;
    .approvalset-item {
      display: flex;
      align-items: center;
      width: 166px;
      height: 32px;
      padding: 14px 16px 14px 12px;
      background: #eeeff1;
      border-radius: 4px 4px 4px 4px;
      margin-right: 32px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}

.work-img {
  width: 32px;
  height: 32px;
  margin-top: 4px;
}

.work-name {
  width: 115px;
  margin-left: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #161616;
}

.set-img {
  width: 16px;
  height: 16px;
  margin-top: 4px;
}
</style>