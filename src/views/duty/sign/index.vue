<!--  -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <el-card style="height: auto; margin-bottom: 10px">
          <div class="sign-tab">
            <div
              v-for="(item, index) in tabList"
              :key="index"
              :class="
                currentIndex === index ? 'div-content-active' : 'div-content'
              "
              @click="onTabChange(index)"
            >
              <div>{{ item.name }}</div>
              <div class="tabs-name">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
        <el-card style="height: 85%; overflow: scroll">
          <!-- 主管签订 -->
          <div class="sign-tab-content" v-if="currentIndex == 1">
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
                <div>岗位名称：{{ v.job }}</div>
                <div>姓名：{{ nickName }}</div>
                <div>联系电话：{{ tel }}</div>
                <div v-show="v.resultActive == 0">
                  <!-- 主管签订 -->
                  <div @click="signed(i, v)" class="postSign">签订</div>
                </div>
                <!-- <div v-show="v.resultActive == 1"> -->
                  <!-- 员工签订 -->
                  <!-- <div @click="sign(i, v)" v-if="isDisabled" class="postSign">
                    签订
                  </div> -->
                <!-- </div> -->
                <div v-if="v.isHide" class="footer-btn">
                  <el-button type="warning" @click="signName" class="export"
                    >导出word</el-button
                  >
                  <el-button type="primary" @click="view(i)">查看</el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 员工签订 -->
          <div class="sign-tab-content" v-if="currentIndex == 0">
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
                <div>岗位名称：{{ v.job }}</div>
                <div>姓名：{{ nickName }}</div>
                <div>联系电话：{{ tel }}</div>
                <div v-show="v.resultActive == 0">
                  <!-- 主管签订 -->
                  <div @click="signed(i, v)" class="postSign">签订</div>
                </div>
                <div v-show="v.resultActive == 1">
                  <!-- 员工签订 -->
                  <div @click="sign(i, v)" v-if="isDisabled" class="postSign">
                    签订
                  </div>
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
        </el-card>
      </template></list-container
    >
    <view-dialog
      ref="viewDialogRef"
      @refresh="upDate"
      :currentIndex="currentIndex"
    ></view-dialog>
  </div>
</template>

<script>
import { confirmDespercharAPI } from "@/api/system/organize";
import {
  safeInfoStatusAPI,
  safeInfoLeaderAPI,
} from "@/api/duty/duty_doc/index";
import viewDialog from "./components/viewDialog.vue";
export default {
  components: {
    viewDialog,
  },
  data() {
    return {
      tabList: [
        {
          name: "我的回执书",
          value: "1",
        },
        {
          name: "主管签订",
          value: "3",
        },
      ],
      currentIndex: 1,
      activeClass: "active",
      tabsItem: "tabs-item",
      list: [
        // {
        //   aa: "1",
        //   bb: "1",
        //   cc: "2",
        //   resultActive: 0,
        //   isHide: false,
        //   directorSignImg: "",
        //   positionSignImg: "",
        // },
        // {
        //   aa: "1",
        //   bb: "1",
        //   cc: "2",
        //   resultActive: 0,
        //   isHide: false,
        //   directorSignImg: "",
        //   positionSignImg: "",
        // },
      ],
      isDisabled: false, //控制签订按钮
      active: "",
      nickName: "", //当前用户
      tel: "",
    };
  },

  created() {
    // this.getDetailStatus();
    this.getDetailLeader();
  },

  mounted() {
    this.tel = this.$store.state.user.currentUserInfo.tel;
    this.nickName = this.$store.state.user.currentUserInfo.nickName;
  },
  methods: {
    onTabChange(value) {
      this.currentIndex = value;
    },
    sign(i, v) {
      //回执书签订
      this.active = i;
      // this.isDisabled = true;
      this.openEdit = true;
      this.$refs.viewDialogRef.open(i, v);
      console.log("我的回执书");
    },
    signed(i, v) {
      //主管签订
      console.log("主管签订", v);
      this.currentIndex = 1;
      this.active = i;
      this.$refs.viewDialogRef.open(i, v);
    },
    upDate(resultImg) {
      if (this.currentIndex == 1) {
        // 主管
        this.isDisabled = true;
        // this.currentIndex = 0;
        this.list[this.active].resultActive = 1;
        this.list[this.active].directorSignImg = resultImg;
      } else {
        // 岗位
        this.isDisabled = false;
        this.list[this.active].resultActive = 3;
        this.list[this.active].isHide = true;
        this.list[this.active].positionSignImg = resultImg;
      }
    },

    async getDetailStatus() {
      try {
        const res = await safeInfoStatusAPI();
        if (res.code === 200) {
          console.log(res.data, "jk");
          this.isDisabled = true;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    async getDetailLeader() {
      try {
        const res = await safeInfoLeaderAPI();
        if (res.code === 200) {
          if (res.data.length == 0) {
            this.getDetailStatus();
            console.log(1);
          } else {
            res.data.forEach((item) => {
              // const obj = item;
              this.list.push({
                ...item,
                resultActive: 0,
                isHide: false,
                directorSignImg: "",
                positionSignImg: "",
              });
            });
          }
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    //查看
    view(i) {
      // this.$refs.viewDialogRef.open(i, this.list[i].form, "chakan");
    },
  },
};
</script>
<style scoped lang="scss">
/deep/.contain-right[data-v-76dfa5f5] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  background: none;
  position: relative;
  padding: 0 23px;
  border-radius: 4px;
}
.sign-tab {
  display: flex;
}

.div-content-active {
  width: 144px;
  height: 48px;
  line-height: 48px;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  text-align: center;
  color: #fff;
  background: #4a80fc;
  margin-right: 20px;
  position: relative;
}
.div-content {
  width: 144px;
  height: 48px;
  border-radius: 4px;
  line-height: 48px;
  text-align: center;
  margin-right: 20px;
  color: #595959;
  background: #dcdfe6;
  border-radius: 4px 4px 4px 4px;
  position: relative;
}
.tabs-name {
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
.sign-tab-content {
  display: flex;
  flex-wrap: wrap;
}
.wrap {
  width: 511px;
  height: 244px;
  background: #ffffff;
  box-shadow: 0px 1px 10px 1px #d6e4ff;
  border-radius: 4px 4px 4px 4px;
  display: flex;
  margin: 5px;
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
</style>