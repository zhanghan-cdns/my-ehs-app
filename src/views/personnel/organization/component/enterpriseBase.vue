<template>

  <!-- 页面布景 -->
  <div class="leftContent">
    <!-- <div class="backgorundCT"></div> -->
    <!--      <img  class="companyBackground" src="../../../../assets/images/company_backgrund.png" alt="">-->
<!--    <img class="logo" :src="imgUrl+dataInfo.entLogo" alt="">-->
    <img class="companyBackgroundBottom" src="../../../../assets/images/company_bottom_backgrund.png" alt="">
    <div class="title">
      <img src="../../../../assets/images/additional.png" alt="">
      <span>企业基本信息</span>
    </div>
    <!-- 右边内容 -->
    <div class="rightContent">
<!--      <h4 style="margin-top: 0;">单位名称：{{ dataInfo.entName }}</h4>-->
      <!-- 列表内容 -->
      <div class="list-item">
        <div>企业编码：{{ dataInfo.entCode }}</div>
        <div>统一社会信用代码：{{ dataInfo.entUscc }}</div>
      </div>
      <div>行政区域：{{ dataInfo.entProvince }}&nbsp{{ dataInfo.entCity }}&nbsp{{ dataInfo.entCountry }}</div>
      <div>行政区划：{{ dataInfo.entDistrict }}</div>
      <div>所在县（市、区）行政区域编码：{{ dataInfo.entCountryCode }}</div>
      <div>所在乡镇（街道）行政区域编码：{{ dataInfo.entTownCode }}</div>
      <div>所在村（社区）行政区域编码：{{ dataInfo.entVillageCode }}</div>
      <div>工商注册地址：{{ dataInfo.entRegAddr }}</div>
      <div>生产经营地址：{{ dataInfo.entProdAddr }}</div>
      <div class="list-item">
        <div>邮政编码：{{ dataInfo.entPostalCode }}</div>
        <div>成立日期：{{ dataInfo.entFoundDate }}</div>
        <div>安全值班电话：{{ dataInfo.entSafetyDutyTel }}</div>
        <div>企业联系电话：{{ dataInfo.entFixPhone }}</div>
        <div>是否为国有企业：
          <span class="redSpan">{{ dataInfo.entIsStateEnt && dataInfo.entIsStateEnt.value }}</span>
        </div>
        <div>电子邮箱：{{ dataInfo.entEmail }}</div>
        <div>注册资金（万元）：{{ dataInfo.entRegFund }}</div>
        <div>经营状态：{{ dataInfo.entBusinessStatus && dataInfo.entBusinessStatus.value }}</div>
        <div>是否有母公司：{{ dataInfo.entHasParentCompany && dataInfo.entHasParentCompany.value }}</div>
        <div>集团公司名称：{{ dataInfo.entGroupName }}</div>
        <div>企业隶属关系：{{ dataInfo.entSubordination&&dataInfo.entSubordination.value }}</div>
      </div>
      <div>营业执照：
        <el-image
          style="width: 200px;height: 200px"
          v-for="item in dataInfo.entBusinessLicense"
          :key="item.id"
          :src="imgUrl+item.url"
          :preview-src-list="[imgUrl+item.url]"
        ></el-image>
      </div>
      <div class="list-item">
        <div>经济类型大类：{{ dataInfo.entEconomyTypeB && dataInfo.entEconomyTypeB.value }}</div>
        <div>经济类型小类：{{ dataInfo.entEconomyTypeS && dataInfo.entEconomyTypeS.value }}</div>
        <div>行业监管大类：{{ dataInfo.entIndustryRegulaB && dataInfo.entIndustryRegulaB.value }}</div>
        <div>行业监管小类：{{ dataInfo.entIndustryRegulaS && dataInfo.entIndustryRegulaS.value }}</div>
        <div>所属行业门类：{{ dataInfo.IndustryCategory }}</div>
        <div>所属行业大类：{{ dataInfo.IndustryTypeB }}</div>
        <div>所属行业中类：{{ dataInfo.IndustryType }}</div>
        <div>所属行业小类：{{ dataInfo.IndustryTypeS }}</div>
      </div>
      <div>安全生产许可证编号：{{ dataInfo.safetyProductionLicense }}</div>
      <div class="list-item">
        <div>企业类型/领证类型：{{ dataInfo.businessType && dataInfo.businessType.value }}</div>
        <div>年销售收入（万元）：{{ dataInfo.annualSalesRevenue }}</div>
        <div>企业规模：{{ dataInfo.entScale && dataInfo.entScale.value }}</div>
        <div>安全管理机构成员数量：{{ dataInfo.entSafeOrgEmpNum }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import {imgUrl} from "@/router/axios";

export default {
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
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
  align-items: center;
  font-size: 20px;
  span{
    margin-left: 10px;
  }
}
.leftContent {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  box-sizing: border-box;
  .companyBackgroundBottom {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .logo {
    left: 26px;
    top: 26px;
    width: 92px;
    height: 92px;
    position: absolute;
  }

  .rightContent {
    width: 100%;
    padding:0 22px;
    box-sizing: border-box;
    line-height: 50px;
    .list-item {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 50%;
      }
      .redSpan {
        color: red;
      }
    }
  }
}


</style>
