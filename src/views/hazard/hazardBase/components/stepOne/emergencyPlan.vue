<template>
  <div>
    <header-container v-if="type !== 'chakan'">
      <header-button
        @headerButtonClick="headerButtonMethods"
        :headerButtonList="headerButtonList"
      />
    </header-container>
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

  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },

  components: {},

  data() {
    return {
      headerButtonList: ["xinzeng", "piliangshanchu"],
      tableData: [
        {
          id: 1,
          hazardName: "21312",
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
          field: "hazardName",
          title: "预案名称",
          align: "center",
        },
        {
          field: "hazardCode",
          title: "备案编号",
          align: "center",
        },
        {
          field: "hazardType",
          title: "备案日期",
          align: "center",
        },
        {
          field: "rvalue",
          title: "预案类型",
          align: "center",
        },
        {
          field: "mainDirectName",
          title: "编制人",
          align: "center",
        },
        {
          field: "mainDirectMobi",
          title: "编制部门",
          align: "center",
        },
      ],
      ids: [],
    };
  },

  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.addSubstanceDialogRef.open();
      } else if (type === "piliangshanchu") {
        this.deleteTableData();
      }
    },
    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
    // 批量删除
    deleteTableData() {},
  },
};
</script>

<style lang="scss" scoped>
.div-headerbutton {
  text-align: left;
}
</style>