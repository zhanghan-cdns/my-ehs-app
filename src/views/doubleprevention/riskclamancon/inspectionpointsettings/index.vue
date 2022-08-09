<template>
  <list-container>
    <template #left></template>
    <template #right>
      <header>
        <header-search :searchData="search_data" :searchItem="search_item"/>
        <header-button @headerButtonClick="headerButtonMethods"/>
      </header>
      <dom-size-listen v-model="sizeCon" style="flex: 1">
        <render-table
          :columns="columns"
          :data="tableData"
          :height="sizeCon.height"
        >
        </render-table>
      </dom-size-listen>
      <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
      <!-- 自定义巡检新增  -->
      <added-custom-inspection ref="addedCustomInspectionRef"></added-custom-inspection>
    </template>
  </list-container>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import addedCustomInspection
  from "@views/doubleprevention/riskclamancon/inspectionpointsettings/components/addedCustomInspection";

export default {
  mixins: [tableMixins, commonMixin],
  name: "index",
  components: {
    addedCustomInspection
  },
  data() {
    return {
      search_data: {},
      search_item: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "隐患自查点名称",
          disabled: false,
          width: "200px",
        },
      ],
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
          title: "巡查点名称",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "绑定二维码",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "绑定rfid",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "rfid卡批次代码",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "状态",
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
    headerButtonMethods(type) {
      if (type === 'xinzeng') {
          this.$refs.addedCustomInspectionRef.open()
      }
    },
    operateButtonClick() {

    }
  }

}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
