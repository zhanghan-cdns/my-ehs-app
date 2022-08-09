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
import {reactive, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import {commonMethods} from "@views/doubleprevention/riskclamancon/shifttasksettings/components/table";

export default {
  name: "myTaskSetting",
  setup(props, ctx) {
    const {pageChange, page, tableData} = useTable()
    const {operateButtonClick} = commonMethods(ctx)
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
          title: "巡检点类型",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "时间范围",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "巡检人",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "班次类型",
          align: "center",
        }, {
          field: "dictKeyName",
          title: "完成情况",
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
                attrs: {operateButtonList: ['chakan']},
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
