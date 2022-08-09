<template>
  <!-- 查看维修信息 -->
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
          field: "facilityName",
          title: "装置设施名称",
          align: "center",
        },
        {
          field: "facilityException",
          title: "检测异常项",
          align: "center",
        },
        {
          field: "chargeManName",
          title: "维修负责人",
          align: "center",
          render: (h, { row }) => {
            return (
              <span>
                {row.chargeManName ? row.chargeManName.entPersonName : ""}
              </span>
            );
          },
        },
        {
          field: "repairStartDate",
          title: "维修开始日期",
          align: "center",
        },
        {
          field: "repairEndDate",
          title: "维修结束日期",
          align: "center",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
