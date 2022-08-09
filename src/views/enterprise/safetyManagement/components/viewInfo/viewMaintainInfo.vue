<template>
  <!-- 查看保养信息 -->
  <div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table
        :columns="columns"
        :height="sizeCon.height"
        :data="tableData"
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
          field: "maintainSituation",
          title: "保养情况",
          align: "center",
        },
        {
          field: "chargeManName",
          title: "保养负责人",
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
          field: "maintainDate",
          title: "保养日期",
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

<style lang="scss" scoped></style>
