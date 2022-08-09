<template>
  <!-- 查看停用信息 -->
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
          field: "stopReason",
          title: "停用理由",
          align: "center",
        },
        {
          field: "stopManName",
          title: "停用提交人",
          align: "center",
          render: (h, { row }) => {
            return (
              <span>
                {row.stopManName ? row.stopManName.entPersonName : ""}
              </span>
            );
          },
        },
        {
          field: "stopCreateDate",
          title: "停用提交日期",
          align: "center",
        },
        {
          field: "realStopDate",
          title: "实际停用日期",
          align: "center",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
