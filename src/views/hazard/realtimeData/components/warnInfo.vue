<template>
  <div>
    <dom-size-listen style="flex: 1; height: 67vh" v-model="sizeCon">
      <render-table
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <basicPager :page="page" @pageChange="pageChange"></basicPager>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import { storageTankWarnListAPI } from "@/api/hazard/realtimeData/index";

export default {
  mixins: [tableMixins],

  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "alarmValue",
          title: "报警信息",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                {row.alarmValue || row.alarmValue === 0 ? row.alarmValue : ""}
                {this.row.unit ? this.row.unit.value : ""}
              </div>
            );
          },
        },
        {
          field: "alarmLevel",
          title: "报警类型",
          align: "center",
        },
        {
          field: "hazardEquipAlarm.starTime",
          title: "报警时间",
          align: "center",
        },
      ],
    };
  },

  methods: {
    async getTableData(id) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        indexId: id ? id : "",
      };
      const res = await storageTankWarnListAPI(params);
      if (res && res.code === 200) {
        this.tableData = res.data;
        this.page.totalResult = res.data.totalElements;
      }
    },
  },
};
</script>

<style scoped>
</style>