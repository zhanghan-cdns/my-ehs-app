<template>
  <div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectChangeEvent"
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

  data() {
    return {
      tableData: [
        {
          id: "1",
          safetyMeasure:
            "动火设备内部构件清理干净，蒸汽吹扫或水洗合格，达到用火条件",
          isInvolve: 1,
        },
        {
          id: "2",
          safetyMeasure:
            "动火设备内部构件清理干净，蒸汽吹扫或水洗合格，达到用火条件",
          isInvolve: 0,
        },
      ],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyMeasure",
          title: "安全措施",
          align: "center",
        },
        {
          field: "caozuo",
          title: "操作",
          align: "center",
          width: 255,
          render: (h, { row }) => {
            return (
              <div>
                <el-radio-group v-model={row.isInvolve}>
                  <el-radio label={1}>涉及</el-radio>
                  <el-radio label={0}>不涉及</el-radio>
                </el-radio-group>
              </div>
            );
          },
        },
        {
          field: "selectPerson",
          title: "选择人员",
          align: "center",
          width: 100,
          render: (h, { row }) => {
            return (
              <div>
                <button-select
                  onClick={() => {
                    this.onSelect(row);
                  }}
                >
                  选择
                </button-select>
              </div>
            );
          },
        },
      ],
    };
  },

  methods: {
    onSelect(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>