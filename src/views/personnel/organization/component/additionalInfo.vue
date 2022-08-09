<template>
  <div v-if="dataInfo.extra">
    <!-- 标题 -->
    <div class="title">
        <img src="../../../../assets/images/additional.png" alt="">
        <span>企业附加信息一</span>
    </div>

    <!-- 列表内容 -->
    <div class="data-list">
        <div class="listD">
          <div>企业简称：{{ dataInfo.extra.enterpriseAbbreviation }}</div>
          <div>安全监管等级：{{ dataInfo.safetySupervisionLevel }}</div>
          <div>一企一档编码:{{ dataInfo.extra.enterpriseFileNum }}</div>
          <div>职工人数：{{ dataInfo.extra.employeeNum }}</div>
          <div>企业编码：{{ dataInfo.extra.enterpriseCode }}</div>
          <div>危险化学品作业人员人数:{{ dataInfo.extra.hazardousChemicalNum }}</div>
          <div>父级企业编码：{{ dataInfo.extra.parentEnterpriseCode }}</div>
          <div>剧毒化学品作业人员人数：{{ dataInfo.extra.highlyToxicChemicalNum }}</div>
          <div>网关编码：{{ dataInfo.extra.gatewayCode }}</div>
          <div>专职应急管理人员数：{{ dataInfo.extra.emergencyManagerNum }}</div>
          <div>化学品登记系统编码：{{ dataInfo.extra.chemicalRegistrationSystemCode }}</div>
          <div>兼职安全生产管理人员数：{{ dataInfo.extra.safetyManagerNum }}</div>
          <div>化工行业编码：{{ dataInfo.extra.chemicalIndustryCode }}</div>
          <div>是否涉及高危工艺：
            <span class="greenSpan">{{ dataInfo.extra.isHighRiskProcesses && dataInfo.extra.isHighRiskProcesses.value}}</span>
          </div>
          <div>属地安监机构：{{ dataInfo.territorialSafetySupervisionAgency }}</div>
          <div>是否涉及重点监管危化品：
            <span class="greenSpan">{{ dataInfo.extra.isKeySupervision&&dataInfo.extra.isKeySupervision.value }}</span>
          </div>
          <div>监管分类：{{ dataInfo.extra.regulatoryClassification&& dataInfo.extra.regulatoryClassification.value }}</div>
          <div>是否涉及剧毒品生产或使用：
            <span class="redSpan">{{ dataInfo.extra.isUseDramaDrug&&dataInfo.extra.isUseDramaDrug.value }}</span>
          </div>
        </div>
    </div>
  <!-- <button @click="sendData">按钮</button> -->
  </div>
</template>

<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: {},
    }
  },
  methods:{
    sendData(){
      console.log('data',this.dataInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;
  align-items: center;
  font-weight: bold;
  font-size: 20px ;
  span{
    margin-left: 10px;
  }
}
.data-list{
  padding: 22px;
  line-height: 54px;
  .listD{
    display: flex;
     flex-wrap: wrap;
     div{
       width: 50%;
       .greenSpan{
         color: green;
       }
       .redSpan{
         color: red;
       }
     }

  }


}


</style>
