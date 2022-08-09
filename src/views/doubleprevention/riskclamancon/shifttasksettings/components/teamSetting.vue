<template>
  <section>
    <dom-size-listen v-model="sizeCon" style="flex: 1">
      <render-table
        :columns="columns"
        :data="tableData"
        :height="sizeCon.height"
      >
      </render-table>
    </dom-size-listen>
    <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
  </section>
</template>

<script>
import {useTable} from "@/hooks/useTable";
import {reactive, toRefs} from "@vue/composition-api";
import {commonMethods} from "@views/doubleprevention/riskclamancon/shifttasksettings/components/table";

export default {
  name: "teamSetting",
  setup(props, ctx) {
    const {pageChange, page, tableData} = useTable()
    const state = reactive({
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
          title: "班次类型",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row}) => {
            return h('operate-button',
              {
                attrs: {operateButtonList: ['chakan', 'bianji', 'shanchu']},
                on: {
                  operateButtonClick: (type) => {
                    operateButtonClick(type, row)
                  }
                }
              }
            )
          },
        },
      ],
      sizeCon: {
        height: 620
      },
    })
    const {operateButtonClick} = commonMethods(ctx)
    return {
      pageChange,
      page,
      tableData,
      operateButtonClick,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>
