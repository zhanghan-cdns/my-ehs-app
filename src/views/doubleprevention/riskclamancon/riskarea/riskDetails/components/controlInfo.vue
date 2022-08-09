<!--  -->
<template>
  <div class="wrap">
    <div class="wrap-left">
      <div class="wrap-left-title">
        <span style="color:#597EF7;padding-right:5px;">|</span>
        <span>风险分析对象名称</span>
      </div>
    </div>
    <div class="wrap-right">
        <render-table
          :columns="columns"
          :data="tableData"
          :height="sizeCon.height"
        />
      <basicPager :page="page" @pageChange="pageChange"></basicPager>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeCon: {
        height: "90%"
      },
      tableData: [{restrictSpaceName: "1", affiliatedFunctionId: "33"}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "areaName",
          title: "风险分析对象名称",
          align: "center"
        },
        {
          field: "affiliatedFunctionId",
          title: "类型",
          align: "center"
        },
        {
          field: "mainSubstance",
          title: "责任部门",
          align: "center"
        },
        {
          field: "num",
          title: "责任人",
          align: "center"
        },
        {
          field: "num",
          title: "区域",
          align: "center"
        },
      ]

    }
  },
//生命周期 - 创建完成（访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.wrap {
  // width:100%;
  height: 90%;
  //background: #fcc;
  display: flex;

  .wrap-left {
    width: 25%;
    height: 100%;
    //background: #f00;
    border-right: 1px solid #ccc;
    margin-right: 5px;
    .wrap-left-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }

  .wrap-right {
    width: 75%;
    height: 100%;
    //background: #0f0;
    //margin: 10px;
  }
}

</style>
