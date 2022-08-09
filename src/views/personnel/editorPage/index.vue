<template>
  <div ref="contentInfoRef">
    <div class="content">
      <!-- 左侧 -->
      <div class="leftContent">
        <el-steps
          :active="active"
          space-size="50px"
          direction="vertical"
          finish-status="wait"
          align-center
          :space="80"
          style="margin-top: 20px"
        >
          <el-step style="cursor: pointer" @click.native="active=0;" title="企业基本信息" icon="iconfont icon-qiyejibenxinxi">
          </el-step>
          <el-step
            style="cursor: pointer"
            @click.native="active=1"
            title="位置分布人员信息"
            icon="iconfont icon-a-weizhifenbujiben"
          >
          </el-step>
          <el-step style="cursor: pointer" @click.native="active=2" title="人员统计基本信息" icon="iconfont icon-a-zu19815">
          </el-step>
          <el-step style="cursor: pointer" @click.native="active=3" title="企业机构信息" icon="iconfont icon-a-qiyejigoujiben">
          </el-step>
          <el-step
            style="cursor: pointer"
            @click.native="active=4"
            title="安全管理信息"
            icon="iconfont icon-a-anquanguanlijiben"
          >
          </el-step>
          <el-step
            style="cursor: pointer"
            @click.native="active=5"
            title="企业风险及重大危险源信息"
            icon="iconfont icon-a-qiyefengxianjiben"
          >
          </el-step>
          <el-step style="cursor: pointer" @click.native="active=6" title="附加信息" icon="iconfont icon-a-fujiajiben">
          </el-step>
        </el-steps>
      </div>

      <!-- 右侧 -->
      <div class="rightContent">
        <!-- 企业基础信息 -->
        <template v-if="active === 0">
          <enterprise-base
            :dict-config="{
            commonJudge,
            entBusinessStatus,
            entSubordination,
            entBusinessType,
            entScale,
            entEconomyTypeB,
            entIndustryRegulaB,
            entIndustryCategory}" ref="enterpriseBaseRef"></enterprise-base>
        </template>
        <!-- 位置分布人员信息 -->
        <template v-else-if="active === 1">
          <location-personnel
            :dict-config="{commonJudge}"
            ref="locationPersonnelRef"></location-personnel>
        </template>
        <!-- 人员统计基本信息 -->
        <template v-else-if="active === 2">
          <statistical-basic :dict-config="{commonJudge}" ref="statisticalBasicRef"></statistical-basic>
        </template>

        <!-- 企业机构信息 -->
        <template v-else-if="active === 3">
          <enterprise-institutions :dict-config="{commonJudge}"
                                   ref="enterpriseInstitutionsRef"></enterprise-institutions>
        </template>

        <!-- 安全管理信息 -->
        <template v-else-if="active === 4">
          <security-management :dict-config="{commonJudge,entSafeStandLevel}"
                               ref="securityManagementRef"></security-management>
        </template>

        <!-- 企业风险及重大危险源信息 -->
        <template v-else-if="active === 5">
          <enterprise-risk :dict-config="{
          commonJudge,
          entRiskLevel,
          entDangerLevel,
          entHighestDangerLevel}" ref="enterpriseRiskRef"></enterprise-risk>
        </template>

        <!-- 附加信息 -->
        <template v-else-if="active === 6">
          <additional-info :dict-config="{
            commonJudge,
          entSafetySupervisionLevel,
          entRegulatoryClassification,
          entBusinessLicenseCategory}" ref="additionalInfoRef"></additional-info>
        </template>

        <!-- 下一步按钮 -->
        <!-- <el-button class="buttonNext" style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
// import "@/assets/icon/editorPage/iconfont.css";

import SecurityManagement from "./component/securityManagement.vue";
import enterpriseBase from "./component/enterpriseBasic.vue";
import EnterpriseInstitutions from "./component/enterpriseInstitutions.vue";
import LocationPersonnel from "./component/locationPersonnel.vue";
import StatisticalBasic from "./component/statisticalBasic.vue";
import EnterpriseRisk from "./component/enterpriseRisk.vue";
import AdditionalInfo from "./component/additionalInfo.vue";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [dictMixin],
  components: {
    enterpriseBase,
    LocationPersonnel,
    StatisticalBasic,
    EnterpriseInstitutions,
    SecurityManagement,
    EnterpriseRisk,
    AdditionalInfo,
  },
  data() {
    return {
      active: 0,
      form: {},
      isShow: false,
      componentList: {
        0: "enterpriseBaseRef",
        1: "locationPersonnelRef",
        2: "statisticalBasicRef",
        3: "enterpriseInstitutionsRef",
        4: "securityManagementRef",
        5: "enterpriseRiskRef",
        6: "additionalInfoRef",
      }
    };
  },
  watch: {},
  created() {

  },
  methods: {
    //下一步
    next() {
      if (this.active++ > 5) this.active = 6;
      this.$refs.contentInfoRef.scrollTop = 0
    },
    // 上一步
    previous() {
      if (this.active-- < 0) this.active = 0;
      this.$refs.contentInfoRef.scrollTop = 0
    },

  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 99%;

  .leftContent {
    width: 20%;
    //height:2200px;
    min-height: 100%;
    background: white;
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.1607843137254902);
    border-radius: 4px;
  }

  .rightContent {
    position: relative;
    margin-left: 10px;
    width: 79%;
    //height:2200px;
    min-height: 100%;
    background: white;
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.1607843137254902);
    border-radius: 4px;
  }
}

.buttonNext {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.iconfontColor {
  color: black;
  width: 1em;
  height: 1em;
}

.step01 {
  color: red;
}

/deep/ .el-steps {
  width: 80%;

  .el-step {
    left: 35px;
  }

  .el-step__icon {
    // width:56px;
    // height:56px;
  }

  .el-step__line {
    width: 0px;
  }

  .el-step__title.is-process {
    color: #0c66ff;
    font-size: 18px;
  }

  .el-step__head.is-process {
    color: #0c66ff;
  }

  // .el-step__head.is-finish{
  //   border-color: #285edf;
  // }
  .el-step__title.is-finish {
    color: #285edf;
  }

  .el-step__icon.is-icon {
    background: transparent;
  }

  .el-step__title.is-wait {
    color: #c0c4cc;
    font-size: 18px;
  }
}

.iconfont {
  font-size: 18px;
}
</style>
