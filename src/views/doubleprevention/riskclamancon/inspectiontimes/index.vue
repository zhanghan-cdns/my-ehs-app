<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <header-search :searchData="searchData" :searchItem="searchItem"/>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header-container>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          >
          </render-table>
        </dom-size-listen>
        <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
      </template>
    </list-container>
  </div>
</template>

<script>
import {useTable} from "@/hooks/useTable";
import {reactive, toRefs} from "@vue/composition-api/dist/vue-composition-api";
import headerContainer from "@views/enterprise/dust/components/HeaderContainer";
export default {
  name: "index",
  components:{headerContainer},
  setup() {
    const {pageChange, page, tableData, sizeCon} = useTable()
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
          title: "应巡检次数",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "有效巡检次数",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "巡检率",
          align: "center",
        },
      ],
      searchData: {},
      searchItem: [
        {
          prop: "courseName",
          type: "Date",
          placeholder: "所属区域",
          disabled: false,
          width: "350px",
          dateType: 'datetimerange'
        },
      ]
    })
    const headerButtonMethods = (type) => {
      console.log(type)
    }
    return {
      pageChange,
      page,
      tableData,
      sizeCon,
      headerButtonMethods,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
