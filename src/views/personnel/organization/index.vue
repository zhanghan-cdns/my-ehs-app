<template>
  <div class="content-info">
    <!-- 编辑 -->
    <div class="header-wrapper" style="position: relative">
      <div class="header-text">
        <el-image
          style="width: 50px;height: 50px"
          v-for="item in dataInfo.entLogo"
          :key="item.id"
          :src="imgUrl+item.url"
          :preview-src-list="[imgUrl+item.url]"
        ></el-image>
        {{dataInfo.entName}}
      </div>
      <el-button style="position: absolute;right: 10px;" type="primary" @click="sendPage">
        <i class="el-icon-edit"></i>
        编辑
      </el-button>
    </div>
    <!-- 左侧 -->
    <div class="oneLine" style="font-size: 14px;color: #4C4C4C;">
      <div class="baseInfoLeft">
        <div class="baseInfo common-border">
          <enterprise-base :dataInfo='dataInfo'></enterprise-base>
        </div>
        <div class="baseBottom common-border">
          <security-info :dataInfo='dataInfo'></security-info>
        </div>
        <div class="enterpriseInfo common-border">
          <institutions-info :dataInfo='dataInfo'></institutions-info>
        </div>
        <div class="additionalInfo common-border">
          <additional-info :dataInfo='dataInfo'></additional-info>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="baseInfoRight">
        <div class="locationInfo common-border">
          <location-distribution ref="locationDistribution" :dataInfo='dataInfo'></location-distribution>
        </div>
        <div class="securityInfo common-border">
          <security-management :dataInfo='dataInfo'></security-management>
        </div>
        <div class="dangerousInfo common-border">
          <dangerous-info :dataInfo='dataInfo'></dangerous-info>
        </div>
        <div class="enterpriseAdditionalInfo common-border">
          <enterprise-additional-info :dataInfo='dataInfo'></enterprise-additional-info>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AdditionalInfo from './component/additionalInfo.vue';
import DangerousInfo from "./component/dangerousInfo.vue";
import EnterpriseAdditionalInfo from './component/enterpriseAdditionalInfo.vue';
import EnterpriseBase from "./component/enterpriseBase.vue";
import InstitutionsInfo from "./component/institutionsInfo.vue";
import locationDistribution from "./component/locationDistribution.vue";
import SecurityInfo from "./component/securityInfo.vue";
import securityManagement from "./component/securityManagement.vue";
import {enterpriseNewListAPI} from "@/api/personnel/organization/index";
import {imgUrl} from "@/router/axios";

export default {
  components: {
    locationDistribution,
    securityManagement,
    EnterpriseBase,
    SecurityInfo,
    InstitutionsInfo,
    DangerousInfo,
    AdditionalInfo,
    EnterpriseAdditionalInfo,
  },
  data() {
    return {
      dataInfo: {},
      imgUrl
    }
  },
  created() {
    this.getEnterpriseInfo()
  },
  methods: {
    sendPage() {
      this.$router.push('/editorPage')
    },
    // 获取企业基本信息
    async getEnterpriseInfo() {
      const res = await enterpriseNewListAPI()
      if (res.code === 200) {
        this.dataInfo = res.data
        console.log('企业基本信息', res.data)
        this.$refs.locationDistribution.returnWall(this.dataInfo.mapRegion);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.content-info {
  overflow: auto;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
  background: #fff;
  padding: 20px 10px;
  position: sticky !important;
  border-bottom: 1px solid #ccc;
  z-index: 100;
  top:0;
  .header-text {
    color: #355E92;
    font-weight: bold;
    font-size: 28px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  }
}

.common-border {
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.1607843137254902);
}

.oneLine {
  display: flex;
  justify-content: space-around;

  .baseInfoLeft {
    width: 49%;

    .baseInfo {
      height: 1440px;
      margin-bottom: 15px;

    }

    .baseBottom {
      height: 236px;
      margin-bottom: 15px;

    }

    .enterpriseInfo {
      height: 216px;
      margin-bottom: 15px;

    }

    .additionalInfo {
      height: 592px;
      margin-bottom: 15px;

    }

  }

  .baseInfoRight {
    width: 50%;

    .locationInfo {
      height: 810px;


    }

    .securityInfo {
      margin-top: 10px;
      height: 870px;
      margin-bottom: 15px;

    }

    .dangerousInfo {
      // width: 805px;
      height: 216px;
      // background: red;
      margin-bottom: 15px;

    }

    .enterpriseAdditionalInfo {
      height: 592px;
      margin-bottom: 15px;

    }
  }
}

</style>
