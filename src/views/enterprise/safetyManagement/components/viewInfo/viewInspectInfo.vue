<template>
  <!-- 查看检查信息 -->
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
          field: "checkContent",
          title: "检查内容",
          align: "center",
        },
        {
          field: "interlockValue",
          title: "联锁值",
          align: "center",
        },
        {
          field: "checkManName",
          title: "检查人",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <span>
                {row.checkManName ? row.checkManName.entPersonName : ""}
              </span>
            );
          },
        },
        {
          field: "checkDate",
          title: "检查日期",
          align: "center",
        },
        {
          field: "checkResult",
          title: "检查结果",
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
