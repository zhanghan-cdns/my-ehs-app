<template>
  <div>
    <!-- 标题 -->
    <div class="title">
        <img src="../../../../assets/images/enterprise_info.png" alt="">
        <span>企业机构信息</span>
    </div>
    <!-- 内容 -->
    <div class="content">

        <img class="securityInfo" src="../../../../assets/images/institutions_info.png" alt="">
      <div class="dataList">
        <div class="listD">
          <div>安全管理机构名称：{{ dataInfo.entSafeOrgName }}</div>
          <div>安全管理机构成立文号：{{ dataInfo.entSafeOrgNameNum }}</div>
          <div>安全管理机构成员数量：{{ dataInfo.entSafeOrgEmpNum }}</div>
          <div>安全管理机构职责：{{ dataInfo.entSafeOrgDuty }}</div>
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
     }

  }

  }


}

</style>
