<template>
    <div>
      <el-row style="margin: 10px 0px 0px 35px">
        <el-col style="margin-top:20px;" :span="8"
          ><div class="box">
            <div class="attr">
              <span class="attr-name">申请人员:</span
              ><span class="attr-value">{{approvalData['shenqing'][0]}}</span>
            </div>
            <div class="attr">
              <span class="attr-name">申请时间:</span
              ><span class="attr-value">{{approvalData['shenqing'][1]}}</span>
            </div>
          </div><img class="next" src="@/assets/images/nextstep.png" />
          </el-col>
        <div v-for="(item, index) in approvalData['shenhe']" :key="index">
          <el-col style="margin-top:20px;" :span="8"
            >
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
            </div>
            <img :style="index !== approvalData['shenhe']['length']-1?'':'visibility:hidden'" class="next" src="@/assets/images/nextstep.png" />
            </el-col>
        </div>
      </el-row>
    </div>
</template>
<script>
export default {
  name:'basicApproval',
  props: {
    approvalData: {

        //案例
        //approvalData:{
        //   shenqing:['陈磊','2022-03-17 22：20：17'],
        //   shenhe:[
        //   {
        //     spry: "王琴",
        //     spsj: "2022-03-17  22：20：17",
        //     spyj: "/",
        //     sftg: "通过",
        //     sprqz: "",
        //     }],
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      openEdit: false,
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
  width: 78%;
  min-height: 160px;
  padding: 14px 16px 0px 16px;
  background: #f6fcff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #0a8def;
  .attr {
    margin-bottom: 6px;
    .attr-name {
      font-size: 12px;
      color: #595959;
      letter-spacing: 1px;
      margin-right: 3px;
    }
    .attr-value {
      font-size: 12px;
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
