<template>
  <div style="height: 80%">
    <dom-size-listen v-model="sizeCon" style="flex: 1">
      <render-table
        :columns="columns"
        :data="tableData"
        :height="sizeCon.height"
      >
      </render-table>
    </dom-size-listen>
    <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],
  name: "allInspectionTable",
  data(){
    return{
      sizeCon: {
        height: 620
      },
      tableData: [1],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查点",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "所属班次",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "最近巡检时间",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查人",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查结果",
          align: "center",
          render:(h,{row})=>{
            return <div style="color:#4A80FC">有隐患</div>
            // return <div style="color:#FF4646">无隐患</div>
          }
        },
        {
          field: "dictKeyName",
          title: "现场照片",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row}) => {
            return (
              <operate-button
                operateButtonList={['chakan','shanchu']}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
      ]
    }
  },
  methods:{
    operateButtonClick(type, row) {
      this.$emit('operateButtonClick', {type, row})
    }
  }
}
</script>

<style scoped>

</style>
