<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1200"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="left"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="approval">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>审批信息</span
            >
            <el-form
              ref="form"
              :model="form"
              label-width="108px"
              :inline="true"
            >
              <div class="title">
                <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
                ><span>审批信息</span>
              </div>
              <el-form-item label="审批意见">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入审批意见"
                  :style="width2"
                  :disabled="!canApproval"
                  type="textarea"
                  resize="none"
                  rows="3"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否通过" :style="width">
                <el-radio-group
                  v-model="form.isExamBindHours"
                  :disabled="!canApproval"
                >
                  <el-radio
                    v-for="item in dict.commonJudge"
                    :label="item.dictValue"
                    :key="item.id"
                    :value="item.dictValue"
                    >{{ item.dictValueName }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审批人签字" :style="width">
                <el-button type="primary">签字</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="constructionTeam">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>施工队伍</span
            >
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>施工队伍</span>
            </div>
            <el-form
              ref="form"
              :model="form"
              label-width="108px"
              :inline="true"
            >
              <el-form-item label="所属相关方">
                <el-select
                  v-model="form.trainCategory"
                  placeholder="关联承包商信息"
                  :disabled="disabled"
                  :style="width"
                >
                  <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="施工队伍营业等级">
                <el-select
                  v-model="form.trainCategory"
                  placeholder="施工队伍营业等级"
                  :disabled="disabled"
                  :style="width"
                >
                  <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="责任书签订日期">
                <el-date-picker
                  v-model="form.courseName"
                  placeholder="请选择日期"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="责任书到期日期">
                <el-date-picker
                  v-model="form.courseName"
                  placeholder="请选择日期"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入统一社会信用代码"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照编号">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入营业执照编号"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="施工队伍负责人">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入施工队伍负责人"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="安全负责人">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入安全负责人"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="施工队伍负责人电话">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入施工队伍负责人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="安全负责人电话">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入安全负责人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="施工队伍负责人身份证">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入施工队伍负责人身份证"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="安全负责人身份证">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入安全负责人身份证"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="进厂日期">
                <el-date-picker
                  v-model="form.courseName"
                  placeholder="请选择到期日期"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="考核日期">
                <el-date-picker
                  v-model="form.courseName"
                  placeholder="请选择考核日期"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="施工单位简介">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入备注"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否在黑名单中" :style="width2">
                <el-radio-group
                  v-model="form.isExamBindHours"
                  :style="width"
                  :disabled="disabled"
                >
                  <el-radio
                    v-for="item in dict.commonJudge"
                    :label="item.dictValue"
                    :key="item.id"
                    :value="item.dictValue"
                    >{{ item.dictValueName }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="特种设备安装许可证"
                style="width: 380px"
                :disabled="disabled"
              >
                <basic-upload
                  key="file"
                  @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
                  @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                  :photos="form.courseWare"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
              </el-form-item>
              <el-form-item
                label="安全协议附件"
                style="width: 380px"
                :disabled="disabled"
              >
                <basic-upload
                  key="file"
                  @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
                  @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                  :photos="form.courseWare"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
              </el-form-item>
              <el-form-item label="进厂日期">
                <el-date-picker
                  v-model="form.courseName"
                  placeholder="请选择到期日期"
                  :style="width"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入备注"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>审批确认</span>
            </div>
            <basic-approval :approvalData="approvalData"></basic-approval>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="canApproval"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="canApproval"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      icon: "icon-xinzeng",
      title: "审核信息",
      openFlag: false,
      activeName: "approval",
      form: {},
      width: "width:320px",
      width2: "width:820px",
      disabled: true,
      canApproval: true,
      approvalData: {
        shenqing: ["陈磊", "2022-03-17 22：20：17"],
        shenhe: [
          {
            spry: "王琴",
            spsj: "2022-03-17  22：20：17",
            spyj: "/",
            sftg: "通过",
            sprqz: "",
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "laws":
          break;
        case "distinguish":
          break;
        case "approval":
          break;
      }
    },

    open(type) {
      this.openFlag = true;
      this.activeName = "approval";
    },
    close() {
      this.openFlag = false;
    },
    select(){
      console.log(11)
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
  height: 100%;
  overflow: scroll;
}

/deep/ .el-tabs--left .el-tabs__item.is-left {
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 0px 10px 20px 0px;
}

/deep/ .el-tabs .is-active {
  background: rgba(70, 133, 249, 0.09);
}

.tab-icon {
  font-size: 18px !important;
  vertical-align: bottom;
  margin-right: 10px;
}

/deep/ .el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}
.title {
  font-size: 18px;
  color: #444444;
  font-weight: bold;
  padding-left: 36px;
  margin: 20px 0px;
}
</style>
