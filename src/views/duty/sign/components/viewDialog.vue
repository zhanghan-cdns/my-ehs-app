<template>
  <div class="choosePersonDialog">
    <basicDialog
      :icon="icon"
      :title="title"
      width="1100px"
      height="95%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content">
          <div class="wrap">
            <div class="title">安全责任书</div>
            <div class="wrap-content">
              {{dutyContent}}
            </div>
            <div class="sign">
              <div class="sign-left">
                <el-row>
                  <el-col :span="12">
                    <p>经理：</p>
                    <p>2020年1月1日</p>
                  </el-col>
                  <el-col :span="12">
                    <el-image
                      v-if="directorSignImg !== ''"
                      style="width: 133px; height: 50px"
                      :src="directorSignImg"
                      :fit="fit"
                    ></el-image>
                  </el-col>
                </el-row>
              </div>
              <div class="sign-right">
                <el-row>
                  <el-col :span="12">
                    <p>文员：</p>
                    <p>2020年1月1日</p>
                  </el-col>
                  <el-col :span="12">
                    <el-image
                      v-if="positionSignImg !== ''"
                      style="width: 133px; height: 50px"
                      :src="positionSignImg"
                      :fit="fit"
                    ></el-image>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <el-button
                type="primary"
                size="small"
                style="margin-left: 420px"
                @click="sign"
                :disabled="disable"
              >
                <span
                  v-if="directorSignImg === '' || positionSignImg === ''
                  "
                  >签字</span
                >
                <span v-else>重新签字</span>
              </el-button>
            </div>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit" :disabled="disable"
            >保存</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>
<script>
import { getDeptListAPI } from "@/api/system/common";
import signDialog from "./signDialog.vue";
import {
  safeInfoUpdateAPI,
  safeRecordCreateAPI,
} from "@/api/duty/duty_doc/index";
export default {
  props: ["form"],
  components: {
    signDialog,
  },
  data() {
    return {
      openEdit: false,
      resultActive: "",//步骤条状态
      directorSignImg: "",
      positionSignImg: "",
      disable: false,
      title: "",
      icon: "",
      index:"",
      dutyContent:'',
      rowData:'',
      row:{},
    };
  },
  props: {
    title: {
      type: String,
      default: "查看安全责任回执",
    },
    chooseType: {
      // 选择类型
      type: String,
      default: "single",
    },
    currentIndex: {
      type: Number,
    },
    isHide: {
      type: Number,
    },
    status: {
      type: Number,
    },
  },
  created() {
    // this.getTreeData();
    console.log(this.currentIndex, "kkkk");
  },
  methods: {
    close() {
      this.openEdit = false;
      this.records = [];
    },
    open(i,v, type) {
      // if (type == "chakan") {
      //   this.disable = true;
      //   this.title = "查看责任回执";
      //   this.icon = "icon-fujiaxinxi";
      // } else {
      //   this.disable = false;
      //   this.title = "新增责任回执";
      //   this.icon = "icon-xinzeng";
      console.log(v,'vvv')
      this.dutyContent = v.dutyContent
      this.rowDate = v.id;
      this.row = v;
      // }

      this.openEdit = true;
      this.resultActive = v.resultActive;
 
      this.directorSignImg = v.directorSignImg;
      this.positionSignImg = v.positionSignImg;
    },
    sign() {
      this.$refs.signDialogRef.open();
    },
    getSignImg(resultImg) {
      if (this.currentIndex == 1) {
        // 主管
        this.directorSignImg = resultImg;
      } else {
        // 岗位
        this.positionSignImg = resultImg;
      }
    },
    // 保存签名
    submit() {
      if (this.currentIndex == 1) {
        // this.$emit("refresh",this.directorSignImg,);
        console.log(this.directorSignImg,'jj')
        // if (this.rowData.id) this.modify();
        //   else this.modify();
        this.modify();
        this.add();
      } else {
        // this.$emit("refresh",this.positionSignImg,);
      }
      this.openEdit = false;
    },

        // 新增
    async add() {
      try {
        let params = {
          job:this.row.job,
          attachment:this.directorSignImg
        }
        const res = await safeRecordCreateAPI(params);
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        this.row.status = "2"
        const res = await safeInfoUpdateAPI(this.row);
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.choosePersonDialog {
  /deep/ .vxe-modal--content {
    background: #eeeeee;
    padding: 10px;
    padding-bottom: 5px;
  }
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #fff;
    .wrap {
      width: 956px;
      height: 671px;
      border: 1px solid #7e7e7e;
      margin: 10px auto;
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 25px;
        padding-top: 30px;
      }
      .wrap-content {
        width: 100%;
        height: 430px;
        padding-left: 15px;
        // background: #eee;
      }
      .sign {
        display: flex;
        text-align: right;
        width: 400px;
        height: 80px;
        padding-left: 500px;
        .sign-left {
          width: 200px;
          height: 300px;
        }
        .sign-right {
          width: 200px;
          height: 300px;
        }
      }
    }
  }
}
</style>
