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
                  :disabled="canApproval"
                  type="textarea"
                  resize="none"
                  rows="3"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否通过" :style="width">
                <el-radio-group
                  v-model="form.isExamBindHours"
                  :disabled="canApproval"
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
                <img :src="signImg" alt="" style="width:80px;height:80px">
                <el-button type="primary" @click="signClick">签字</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="relateDpartyInformation">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>相关方信息</span
            >
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>相关方信息</span>
            </div>
            <el-form
              ref="form"
              :model="form"
              label-width="108px"
              :inline="true"
            >
              <el-form-item label="单位名称">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入课程名称"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
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
              <el-form-item label="相关方类别" prop="trainCategory">
                <el-select
                  v-model="form.trainCategory"
                  placeholder="请选择相关方类别"
                  style="width: 320px"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in dict.commonJudge"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行业类型" prop="trainCategory">
                <el-select
                  v-model="form.trainCategory"
                  placeholder="请选择行业类型"
                  style="width: 320px"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in dict.commonJudge"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="法人代表">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入法人代表"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人电话">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入法人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入联系人"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人电话">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入联系人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="经营范围">
                <el-input
                  v-model="form.courseName"
                  placeholder="请输入经营范围"
                  :style="width2"
                  :disabled="disabled"
                  type="textarea"
                  resize="none"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="营业执照"
                :style="width"
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
              <el-form-item label="附件" :style="width2" :disabled="disabled">
                <basic-upload
                  key="file"
                  @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
                  @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
                  :photos="form.courseWare"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
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
          </el-tab-pane>
          <el-tab-pane name="qualificationInformation">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>资质信息</span
            >
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>资质信息</span>
            </div>
            <qualification-information
              :operateButtonList="['chakan']"
            ></qualification-information>
          </el-tab-pane>
          <el-tab-pane name="operators">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>作业人员</span
            >
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>作业人员</span>
            </div>
            <operators-list :operateButtonList="['chakan']"></operators-list>
          </el-tab-pane>
          <el-tab-pane name="constructionTeam">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>施工队伍</span
            >
            <div class="title">
              <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
              ><span>施工队伍</span>
            </div>
            <construction-team
              :operateButtonList="['chakan']"
            ></construction-team>
          </el-tab-pane>
        </el-tabs>
        <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
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
import qualificationInformation from "./qualificationInformation";
import operatorsList from "./operatorsList";
import constructionTeam from "./constructionTeam";
export default {
  components: {
    qualificationInformation,
    operatorsList,
    constructionTeam,
  },
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
      signImg:"",
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
    signClick() {
      this.$refs.signDialogRef.open();
    },
    getSignImg(img) {
      console.log(img);
      this.signImg=img;
    },
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
  margin-bottom: 20px;
}
</style>
