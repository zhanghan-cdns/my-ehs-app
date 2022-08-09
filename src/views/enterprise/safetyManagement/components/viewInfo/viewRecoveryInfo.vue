<template>
  <!-- 查看恢复信息 -->
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
          field: "recoveryReason",
          title: "恢复理由",
          align: "center",
        },
        {
          field: "recoveryCreateDate",
          title: "恢复填报日期",
          align: "center",
        },
        {
          field: "realRecoveryDate",
          title: "实际恢复日期",
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
