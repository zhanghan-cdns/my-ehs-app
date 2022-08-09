<template>
  <div v-if="dataInfo.extra">
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/additional.png" alt="">
      <span>企业附加信息二</span>
    </div>

    <!-- 列表内容 -->
    <div class="data-list">
      <div class="listD">
        <div>营业执照类别：{{ dataInfo.extra.businessLicenseCategory && dataInfo.extra.businessLicenseCategory.value }}</div>
        <div>联系微信：{{ dataInfo.extra.contactWechatAccount }}</div>
        <div>年利润（万元）：{{ dataInfo.extra.annualProfit }}</div>
        <div>企业邮箱：{{ dataInfo.extra.enterpriseMailbox }}</div>
        <div>企业资产总额（万元）：{{ dataInfo.extra.totalAssets }}</div>
        <div>企业邮箱授权码：{{ dataInfo.extra.enterpriseMailboxAuthorizationCode }}</div>
        <div>安全负责人固定电话：{{ dataInfo.extra.securityManNum }}</div>
        <div>企业固定电话：{{ dataInfo.extra.enterpriseLandlineTele }}</div>
        <div>安全负责人电子邮箱：{{ dataInfo.emailAddress }}</div>
        <div>企业官网网站地址：{{ dataInfo.extra.officialWebsiteAddress }}</div>
        <div>企业照片：
          <div class="imgT">
            <el-image
              v-for="item in dataInfo.extra.corporatePhoto"
              :key="item.url"
              style="width: 100%;height:100%"
              :src="imgUrl+ item.url"
              :preview-src-list="[imgUrl+item.url]"
            ></el-image>
          </div>
        </div>
        <div>企业风险四色图：
          <div class="imgT">
            <el-image
              v-for="item in dataInfo.extra.enterpriseRiskColorDiagram"
              :key="item.url"
              style="width: 100%;height:100%"
              :src="imgUrl+ item.url"
              :preview-src-list="[imgUrl+item.url]"
            ></el-image>
          </div>
        </div>
        <div>隐患排查治理制度（单文件）：

          <show-file style="width: 100%" :data="dataInfo.extra.hiddenTroubleInvestigationSystem"></show-file>

        </div>
        <div>隐患排查治理计划（单文件）：
          <show-file style="width: 100%" :data="dataInfo.extra.hiddenTroubleInvestigationPlan"></show-file>
        </div>

      </div>
      <div>营业执照经营范围：{{ dataInfo.extra.businessScope }}</div>
    </div>

  </div>
</template>
<script>
import {imgUrl} from "@/router/axios";
import showFile from "@/components/show-file/index";

export default {
  components: {
    showFile
  },
  props: {
    dataInfo: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;
  align-items: center;
  font-weight: bold;
  font-size: 20px ;
  span {
    margin-left: 10px;
  }
}

.data-list {
  padding: 22px;
  line-height: 45px;
  padding-bottom: 0;
  box-sizing: border-box;
  .listD {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 50%;
      .imgT {
        width: 212px;
        height: 100px;
      }
    }

  }


}


</style>
