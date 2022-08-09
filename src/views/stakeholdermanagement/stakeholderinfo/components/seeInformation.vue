<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
      :showFooter="false"
    >
      <template #content>
        <div class="title">
          <i class="icon-jichuxinxi1 tab-icon" style="color: #0a8def"></i
          ><span>相关信息</span>
        </div>
        <el-form ref="form" :model="form" label-width="108px" :inline="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称">
                <el-input
                  v-model="form.unitName"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group
                  v-model="form.status"
                  :style="width"
                  :disabled="disabled"
                >
                  <el-radio :label="1" key="1" value="1">有效</el-radio>
                  <el-radio :label="0" key="0" value="0">无效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="相关方类别" prop="trainCategory">
                <el-select
                  v-model="form.relatedInfoRelatedPartyCategory"
                  placeholder="请选择相关方类别"
                  style="width: 320px"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in dict.relatedInfoRelatedPartyCategory"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行业类型" prop="relatedInfoIndustryType">
                <el-select
                  v-model="form.relatedInfoIndustryType"
                  placeholder="请选择行业类型"
                  style="width: 320px"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in dict.relatedInfoIndustryType"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法人代表">
                <el-input
                  v-model="form.legalRepresentative"
                  placeholder="请输入法人代表"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人电话">
                <el-input
                  v-model="form.legalRepresentativeContactNumber"
                  placeholder="请输入法人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input
                  v-model="form.contactPerson"
                  placeholder="请输入联系人"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人电话">
                <el-input
                  v-model="form.contactPhone"
                  placeholder="请输入联系人电话"
                  :style="width"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营范围">
                <el-input
                  v-model="form.businessScope"
                  placeholder="请输入经营范围"
                  :style="width2"
                  :disabled="disabled"
                  type="textarea"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="营业执照"
                :disabled="disabled"
                :style="width2"
              >
                <basic-upload
                  key="file"
                  @onSuccess="
                    (fileList) => onSuccess(fileList, 'businessLicense')
                  "
                  @onRemove="
                    (fileList) => onRemove(fileList, 'businessLicense')
                  "
                  :photos="form.businessLicense"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件" :style="width2" :disabled="disabled">
                <basic-upload
                  key="file"
                  @onSuccess="
                    (fileList) => onSuccess(fileList, 'theAttachment')
                  "
                  @onRemove="(fileList) => onRemove(fileList, 'theAttachment')"
                  :photos="form.theAttachment"
                  :limit="2"
                  :disabled="disabled"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  v-model="form.remark"
                  placeholder="请输入备注"
                  :style="width2"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          tab-position="top"
          stretch
          style="height: 100%"
        >
          <el-tab-pane name="qualificationInformation">
            <span slot="label"
              ><i class="icon-jichuxinxi1 tab-icon"></i>资质信息表</span
            >
            <qualification-information
              :operateButtonList="['chakan']"
              :headerButtonList="['chaxun']"
            ></qualification-information>
          </el-tab-pane>
          <el-tab-pane name="distinguish">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>作业人员表</span
            >
            <operators-list
              :operateButtonList="['chakan']"
              :headerButtonList="['chaxun']"
            ></operators-list>
          </el-tab-pane>
          <el-tab-pane name="approval">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>施工队伍</span
            >
            <construction-team
              :operateButtonList="['chakan']"
              :headerButtonList="['chaxun']"
            ></construction-team>
          </el-tab-pane>
          <el-tab-pane name="projectmanage">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>服务项目</span
            >
            <project-manage :operateButtonList="['chakan']"></project-manage>
          </el-tab-pane>
          <el-tab-pane name="assessmentmanage">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>评定记录</span
            >
            <assessment-Manage
              :operateButtonList="['chakan']"
            ></assessment-Manage>
          </el-tab-pane>
          <el-tab-pane name="violationrecord">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>违规记录</span
            >
            <violation-record
              :operateButtonList="['chakan']"
            ></violation-record>
          </el-tab-pane>
          <el-tab-pane name="examination">
            <span slot="label"
              ><i class="icon-jiancha tab-icon"></i>审核记录</span
            >
            <basic-approval :approvalData="approvalData"></basic-approval>
          </el-tab-pane>
        </el-tabs>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import qualificationInformation from "./qualificationInformation";
import operatorsList from "./operatorsList";
import constructionTeam from "./constructionTeam";
import projectManage from "./projectmanage";
import assessmentManage from "./assessmentmanage";
import violationRecord from "./violationrecord";
import { getDetailAPI } from "@/api/stakeholdermanagement/stakeholderinfo";
export default {
  components: {
    qualificationInformation,
    operatorsList,
    constructionTeam,
    projectManage,
    assessmentManage,
    violationRecord,
  },
  data() {
    return {
      width: "width:320px",
      width2: "width:804px",
      form: {
        unitName: "",
        status: "",
        relatedInfoRelatedPartyCategory: "",
        relatedInfoIndustryType: "",
        legalRepresentative: "",
        legalRepresentativeContactNumber: "",
        contactPerson: "",
        contactPhone: "",
        businessScope: "",
        businessLicense: "",
        theAttachment: "",
        remark: "",
      },
      icon: "icon-chakan2",
      title: "查看相关信息111",
      openFlag: false,
      activeName: "qualificationInformation",
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
      disabled: true,
    };
  },
  props: {
    dict: Object,
    default: {},
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

    open(type, row) {
      this.getDetail(row.id);
      this.openFlag = true;
    },
    close() {
      this.openFlag = false;
    },
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.form = { ...res.data };
        console.log(this.form)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
