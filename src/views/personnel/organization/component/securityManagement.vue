<template>
  <div>
    <!-- 标题 -->
    <div class="title">
        <img src="../../../../assets/images/personnel.png" alt="">
        <span>人员统计基本信息</span>
    </div>

    <!-- 列表内容 -->
    <div class="dataList">
        <div class="listD">
          <div>法定代表人：{{ dataInfo.legalRepresentative }}</div>
          <div>法定代表人电话：{{ dataInfo.legalRepresentativeNum }}</div>
          <div>实际控制人是否担任法人代表：{{ dataInfo.isLegalRepresent&&dataInfo.isLegalRepresent.value }}</div>
          <div>企业负责人固定电话：{{ dataInfo.enterpriseManNum }}</div>
          <div>安全值班电话：{{ dataInfo.safetyCall }}</div>
          <div>电子邮箱：{{ dataInfo.entEmail }}</div>
        </div>
        <div>单位传真：{{ dataInfo.fax }}</div>
        <div class="listD">
          <div>母公司负责人：{{ dataInfo.parentCompanyMan }}</div>
          <div>母公司负责人联系方式：{{ dataInfo.parentCompanyMan }}</div>
          <div>董事长：{{ dataInfo.chairman }}</div>
          <div>董事长联系方式：{{ dataInfo.chairmanNum }}</div>
          <div>总经理：{{ dataInfo.manager }}</div>
          <div>总经理联系方式：{{ dataInfo.managerNum }}</div>
          <div>第一大股东：{{ dataInfo.largestShareholder }}</div>
          <div>第一大股东联系方式：{{ dataInfo.largestShareholderNum }}</div>
          <div>技术负责人：{{ dataInfo.technicalirector }}</div>
          <div>技术负责人联系方式：{{ dataInfo.technicalirector }}</div>
          <div>安全总监：{{ dataInfo.securityDirector  }}</div>
          <div>安全总监联系方式：{{ dataInfo.securityDirectorNum }}</div>
          <div>安全负责人：{{ dataInfo.headOfSafety }}</div>
          <div>安全负责人联系方式：{{ dataInfo.headOfSafetyNum }}</div>
          <div>从业人员数量：{{ dataInfo.employeesNum }}</div>
          <div>特种作业人员数量：{{ dataInfo.entSpecialWorkNum }}</div>
          <div>当年新招人员数量：{{ dataInfo.recruitedEmployeeNum }}</div>
          <div>注册安全工程师人员数量：{{ dataInfo.entRegSafeEngineerNum }}</div>
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
.dataList{
  line-height: 54px;
  padding: 22px;
  .listD{
    display: flex;
     flex-wrap: wrap;
     div{
       width: 50%;
     }

  }


}


</style>
