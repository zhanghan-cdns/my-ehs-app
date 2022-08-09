<template>
  <div>
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
  name: "teamInspectionTable",
  mixins: [tableMixins],
  data() {
    return {
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
          title: "班次名称",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "最近巡检时间",
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
                operateButtonList={['chakan','xunjianguiji']}
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
  methods: {
    operateButtonClick(type, row) {
      this.$emit('operateButtonClick', {type, row})
    }
  }
}
</script>

<style scoped>

</style>
