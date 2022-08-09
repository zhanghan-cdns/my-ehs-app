<template>
  <!-- 查看检测信息 -->
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
          field: "testManName",
          title: "检测人",
          align: "center",
          render: (h, { row }) => {
            return (
              <span>
                {row.testManName ? row.testManName.entPersonName : ""}
              </span>
            );
          },
        },
        {
          field: "testContent",
          title: "检测内容",
          align: "center",
        },
        {
          field: "testDate",
          title: "检查日期",
          align: "center",
        },
        {
          field: "testResult",
          title: "检查结果",
          align: "center",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
