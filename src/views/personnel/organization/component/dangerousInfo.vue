<template>
  <div>
    <!-- 标题 -->
    <div class="title">
        <img src="../../../../assets/images/enterprise_risk.png" alt="">
        <span>企业风险及重大危险源信息</span>
    </div>
    <!-- 内容 -->
    <div class="content"  v-if="dataInfo.safety">

        <img class="securityInfo" src="../../../../assets/images/enterprise_dangerous.png" alt="">
      <div class="dataList">
        <div class="listD">
          <div>企业风险等级：
            <span>{{ dataInfo.safety.entRiskLevel&&dataInfo.safety.entRiskLevel.value }}</span>
          </div>
          <div>企业最高重大危险源等级：{{ dataInfo.safety.entHighestDangerLevel &&dataInfo.safety.entHighestDangerLevel.value}}</div>
          <div>是否构成重大危险源：
            <span >{{ dataInfo.safety.whetherConstituteDangerLevel&&dataInfo.safety.whetherConstituteDangerLevel.value }}</span>
          </div>
          <div>重大危险源等级：{{ dataInfo.safety.entDangerLevel&&dataInfo.safety.entDangerLevel.value }}</div>
        </div>
      </div>

    </div>

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

.content{
  position: relative;
  .securityInfo{
    left: 26px;
    top: 26px;
    position: absolute;
  }
  .dataList{
      position: absolute;
      left: 135px;
      top: 22px;
      line-height: 44px;
  .listD{
    display: flex;
     flex-wrap: wrap;
     div{
       width: 50%;
       .greenSpan{
         color: green;
       }
     }

  }

  }


}

</style>
