<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="100%"
      height="100%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <div class="wrap">
          <div class="title">培训课程调查</div>
          <div class="box">
            <div class="top">
              <div class="topic">选择您最想培训过的课程</div>
              <div class="statistics-btn" @click="checkStatistics">
                统计信息
              </div>
            </div>
            <div class="bottom">
              <el-form
                ref="basicFormRef"
                :model="form"
                label-width="auto"
                :rules="rules"
              >
                <el-form-item>
                  <el-radio-group
                    v-model="form.courseName"
                    v-for="item in rowData.courseNames"
                    :key="item.courseName"
                  >
                    <div
                      style="
                        display: flex;
                        border-bottom: 1px dashed #e0e0e0;
                        height: 120px;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 20px;
                      "
                    >
                      <el-radio :label="item.courseName">{{
                        item.courseName
                      }}</el-radio>
                      <div style="font-size: 18px">{{ item.voteNum }}票</div>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <img src="@/assets/images/education/vote_bg.png" alt="" />
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <statistics-dialog ref="statisticsDialogRef"></statistics-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  voteAPI,
  getDetailAPI,
} from "@/api/education/dailyTraining/trainingPlan/trainingDemandSurvey";
import statisticsDialog from "./statisticsDialog.vue";
export default {
  name: "courseDialogRef",
  mixins: [tableMixins],
  components: { statisticsDialog },
  data() {
    return {
      title: "开始投票",
      icon: "icon-xinzeng",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        courseName: "",
      },
      personId: "",
      rowData: "",
    };
  },
  mounted() {
    this.personId = this.$store.state.user.currentUserInfo.id;
  },
  methods: {
    // 打开
    open(row) {
      this.openFlag = true;
      this.getDetail(row.id);
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      if (!this.form.courseName) {
        this.$message.warning("请先选择一个投票项");
        return;
      }
      let params = {
        ...this.form,
        personId: this.personId,
        id: this.rowData.id,
      };
      voteAPI(params).then((res) => {
        if (res.code == 200) {
          this.$message.success("投票成功！");
          this.close();
          this.$parent.getList();
        } else {
          this.$message.warning("投票失败！");
          this.close();
          this.$parent.getList();
        }
      });
    },
    //打开统计信息
    checkStatistics() {
      this.$refs.statisticsDialogRef.open(this.rowData);
    },
    // 获取详情
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.rowData = res.data;
      }
    },
  },
};
</script>
<style scoped lang="scss">
/deep/.wrap {
  width: 100%;
  height: 100%;
  background: #daf3ff;
  padding-top: 83px;
  box-sizing: border-box;
  padding-left: 300px;
  .title {
    font-size: 38px;
    font-weight: 500;
    color: #226afa;
    line-height: 20px;
    margin-bottom: 50px;
  }
  .box {
    width: 905px;
    height: 500px;
    background: white;
    position: relative;
    z-index: 1;
  }
  img {
    width: 665px;
    height: 524px;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #77acfd;
    height: 100px;
    align-items: center;
    padding: 0 45px;
    .topic {
      font-size: 22px;
      font-weight: 500;
      color: #251f1e;
    }
    .statistics-btn {
      width: 108px;
      height: 40px;
      background: #2f9cfb;
      border-radius: 4px 4px 4px 4px;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      white-space: normal;
    }
  }
  .bottom {
    padding: 0 45px;
  }
}
/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 0;
}
/deep/ .el-radio-group {
  display: block;
  label {
    display: flex;
    align-items: center;
  }
  .el-radio__label {
    font-size: 18px;
  }
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
}
</style>
