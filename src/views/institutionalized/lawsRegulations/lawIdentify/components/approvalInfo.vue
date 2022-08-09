<template>
  <div>
    <div class="form-title">
      <i class="iconfont icon-bianji form-title-icon"></i
      ><span class="form-title-name">审批信息</span>
    </div>
    <div>
      <el-row style="margin: 0px 0px 0px 35px">
        <el-col :span="7"
          ><div class="box">
            <div class="attr">
              <span class="attr-name">申请人员:</span
              ><span class="attr-value">陈磊</span>
            </div>
            <div class="attr">
              <span class="attr-name">申请时间:</span
              ><span class="attr-value">2022-03-17 22：20：17</span>
            </div>
          </div></el-col
        >
        <div v-for="(item, index) in data" :key="index">
          <el-col :span="8"
            ><img class="next" src="@/assets/images/nextstep.png" />
            <div class="box">
              <div class="attr">
                <span class="attr-name">审批人员:</span
                ><span class="attr-value">{{ item.spry }}</span>
              </div>
              <div class="attr">
                <span class="attr-name">审批时间:</span
                ><span class="attr-value">{{ item.spsj }}</span>
              </div>
              <div class="attr">
                <span class="attr-name">审批意见:</span
                ><span class="attr-value">{{ item.spyj }}</span>
              </div>
              <div class="attr">
                <span class="attr-name">是否通过:</span
                ><span class="attr-value">{{ item.sftg }}</span>
              </div>
              <div class="attr">
                <span class="attr-name">审批人签字:</span
                ><span class="attr-value">{{ item.sprqz }}</span>
              </div>
            </div></el-col
          >
        </div>
        <el-col :span="8" v-if="status === 'yifabu'"
          ><img class="next" src="@/assets/images/nextstep.png" />
          <div class="box">
            <img src="@/assets/images/yifabu.png" style="margin-left: 32px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    approvalData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      openEdit: false,
      status: "yifabu",
      data: [
        {
          spry: "王琴",
          spsj: "2022-03-17  22：20：17",
          spyj: "/",
          sftg: "通过",
          sprqz: "",
        },
        {
          spry: "王琴",
          spsj: "2022-03-17  22：20：17",
          spyj: "/",
          sftg: "通过",
          sprqz: "",
        },
      ],
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
/deep/ .el-col {
  display: flex;
  justify-content: end;
  align-items: center;
}

.box {
  width: 85%;
  height: 235px;
  margin-bottom: 20px;
  padding: 29px 23px 0px;
  background: #f6fcff;
  border-radius: 4px 4px 4px 4px;
  border: 2px solid #0a8def;
  .attr {
    margin-bottom: 21px;
    .attr-name {
      font-size: 14px;
      color: #595959;
      letter-spacing: 1px;
      margin-right: 3px;
    }
    .attr-value {
      font-size: 14px;
      color: #0a8def;
    }
  }
}

.next {
  width: 38px;
  height: 20px;
  margin: 0px 12px;
}

/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

.form-title {
  margin: 30px 72px;
  .form-title-icon {
    font-size: 20px;
    color: #0a8def;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 11px;
  }
}
</style>
