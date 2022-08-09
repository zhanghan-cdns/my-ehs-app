<template>
  <div v-if="dataInfo.safety">
    <!-- 标题 -->
    <div class="title">
        <img src="../../../../assets/images/security.png" alt="">
        <span>安全管理信息</span>
    </div>
    <!-- 内容 -->
    <div class="content">

        <img class="securityInfo" src="../../../../assets/images/security_info.png" alt="">
      <div class="dataList">
        <div>安全标准化等级：
          <span class="yellowSpan">{{dataInfo.safety.entSafeStandLevel&&dataInfo.safety.entSafeStandLevel.value}}</span>
        </div>
        <div class="listD">
          <div>安全生产许可证有效期起始日期：{{dataInfo.safety.entSafetyProductionLicenseStart}}</div>
          <div>安全生产许可证有效期终止日期：{{dataInfo.safety.entSafetyProductionLicenseEnd}}</div>
          <div>标准化证书有效期起始日期：{{dataInfo.safety.entSafeStandCertVldStart}}</div>
          <div>标准化证书有效期终止日期：{{dataInfo.safety.entSafeStandCertVldEnd}}</div>
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
      top: 18px;
      line-height: 40px;
  .listD{
    display: flex;
     flex-wrap: wrap;
     div{
       width: 50%;
     }

  }

  }


}

.yellowSpan{
  color: #FF8D1A;
}

</style>
