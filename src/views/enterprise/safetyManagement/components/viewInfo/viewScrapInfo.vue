<template>
  <!-- 查看报废信息 -->
  <div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";

export default {
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [tableMixins],
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
          field: "facilityName",
          title: "装置设施名称",
          align: "center",
        },
        {
          field: "scrapReason",
          title: "报废理由",
          align: "center",
        },

        {
          field: "scrapCreateDate",
          title: "报废填报日期",
          align: "center",
        },
        {
          field: "realScrapDate",
          title: "实际报废日期",
          align: "center",
        },
        {
          field: "remark",
          title: "备注",
          align: "center",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
