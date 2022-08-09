<template>
  <div class="sign">
    <div class="sign-tab">
      <div
        @click="currentIndex = 0"
        :class="currentIndex == 0 ? 'div-content-active' : 'div-content'"
      >
        我的回执书
        <span>2</span>
      </div>
      <div
        @click="currentIndex = 1"
        :class="currentIndex == 1 ? 'div-content-active' : 'div-content'"
      >
        主管签订
        <span>21</span>
      </div>
    </div>
    <div class="sign-tab-content">
      <div class="wrap" v-for="(v, i) in list" :key="i">
        <div class="wrap-left">
          <el-steps
            :space="72"
            :active="v.resultActive"
            finish-status="success"
            direction="vertical"
          >
            <el-step title="上层主管签订"></el-step>
            <el-step title="岗位签订"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class="wrap-right">
          <div class="wrap-right-title">2021安全责任书修订</div>
          <div>岗位名称：{{ v.aa }}</div>
          <div>姓名：{{ v.bb }}</div>
          <div>联系电话：{{ v.cc }}</div>
          <div v-show="v.resultActive == 0">
            <div @click="signed(i)" class="postSign">签订</div>
          </div>
          <div v-show="v.resultActive == 1">
            <div @click="sign(i)" v-if="isDisabled" class="postSign">签订</div>
          </div>
          <div v-if="v.isHide" class="footer-btn">
            <el-button type="warning" @click="signName" class="export"
              >导出word</el-button
            >
            <el-button type="primary" @click="view(i)">查看</el-button>
          </div>
        </div>
      </div>
    </div>
    <view-dialog
      ref="viewDialogRef"
      @refresh="upDate"
      :currentIndex="currentIndex"
    ></view-dialog>
  </div>
</template>
<script>
import viewDialog from "./components/viewDialog.vue";
export default {
  components: {
    viewDialog,
  },
  data() {
    return {
      openEdit: false,
      newDialogFormVisible: false, //内层弹窗
      currentIndex: 1,
      isDisabled: false, //禁止点击
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "",
      resultImg: "", //主管签订结果
      resultImgBook: "", //回执书签订结果
      resultActive: "0",
      isHide: false, //签订完查看
      // form: {
      //   signImg: "",
      // },
      status: "",
      list: [
        {
          aa: "1",
          bb: "1",
          cc: "2",
          resultActive: 0,
          isHide: false,
          form: {
            directorSignImg: "",
            positionSignImg: "",
          },
        },
        {
          aa: "1",
          bb: "1",
          cc: "2",
          resultActive: 0,
          isHide: false,
          form: {
            directorSignImg: "",
            positionSignImg: "",
          },
        },
      ],
    };
  },
  methods: {
    sign(i) {
      console.log(i, "jk");
      //回执书签订
      this.isDisabled = true;
      this.openEdit = true;
      this.$refs.viewDialogRef.open(i,this.list[i].form);
      console.log("我的回执书");
    },
    signed(i) {
      console.log(i, "jkk");
      //主管签订
      console.log("主管签订");
      this.currentIndex = 1;
      this.$refs.viewDialogRef.open(i,this.list[i].form);
    },
    upDate(index, from) {
      if (this.currentIndex == 1) {
        // 主管
        this.isDisabled = true;
        this.currentIndex = 0;
        this.list[index].resultActive = 1;
        this.list[index].form = from;
        this.close();
      } else {
        // 岗位
        this.isDisabled = false;
        this.list[index].resultActive = 2;
        this.list[index].isHide = true;
        this.list[index].form = from;
        this.close();
      }
    },
    //查看
    view(i){
      this.$refs.viewDialogRef.open(i,this.list[i].form,"chakan");
    },
    signName() {
      //签名弹窗
      this.newDialogFormVisible = true;
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {},
  },
};
</script>
<style scoped lang="scss">
.sign-tab {
  width: 100%;
  height: 82px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  display: flex;
  div:nth-of-type(1) {
    width: 144px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    text-align: center;
    margin: 20px 20px;
    position: relative;
  }
  div:nth-of-type(2) {
    width: 144px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    text-align: center;
    margin: 20px 0px;
    position: relative;
  }
  span:nth-of-type(1) {
    width: 28px;
    height: 28px;
    line-height: 28px;
    background: #ff4646;
    opacity: 1;
    border: 1px solid #ffffff;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    display: inline-block;
    position: absolute;
    top: -15px;
    right: -8px;
  }
  span:nth-of-type(2) {
    width: 28px;
    height: 28px;
    line-height: 28px;
    background: #ff4646;
    border: 1px solid #ffffff;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    display: inline-block;
    position: absolute;
    top: -15px;
    right: -8px;
  }
}
.sign-tab-content {
  width: 100%;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  .wrap {
    width: 535px;
    height: 244px;
    background: #ffffff;
    box-shadow: 0px 1px 10px 1px #d6e4ff;
    border-radius: 4px 4px 4px 4px;
    display: flex;
    margin: 9px;
    .wrap-left {
      width: 204px;
      text-align: center;
      margin: 20px 0px 0px 33px;
      border-right: 1px dashed #eee;
    }
    .wrap-right {
      width: 331px;
      .wrap-right-title {
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        text-align: center;
        margin-left: 30px;
        margin-top: 20px;
        border-bottom: 1px dashed #eee;
        margin-bottom: 10px;
      }
      div:nth-of-type(2) {
        height: 30px;
        line-height: 30px;
        margin-left: 30px;
      }

      div:nth-of-type(3) {
        height: 30px;
        line-height: 30px;
        margin-left: 30px;
      }
      div:nth-of-type(4) {
        height: 30px;
        line-height: 30px;
        margin-left: 30px;
      }
      .postSign {
        width: 108px;
        height: 39px;
        line-height: 39px;
        background: #4a80fc;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        text-align: center;
        color: #fff;
        margin: 10px 0px 0px 160px;
      }
    }
  }
}
.div-content-active {
  border-radius: 4px;
  color: #fff;
  background: #4a80fc;
}
.div-content {
  border-radius: 4px;
  color: #595959;
  background: #dcdfe6;
}
.right {
  width: 100px;
  height: 65px;
  text-align: right;
  float: right;
}
.left {
  width: 100px;
  height: 65px;
  text-align: left;
  float: left;
}
.esign-btn {
  display: flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
}
.footer-btn {
  width: 100%;
  height: 40px;
  padding: 8px 0px 0px 89px;
}
/deep/ .export {
  background: #d6ffda;
  border-radius: 0px 0px 0px 0px;
  color: #52c41a;
  border: none;
}
</style>
