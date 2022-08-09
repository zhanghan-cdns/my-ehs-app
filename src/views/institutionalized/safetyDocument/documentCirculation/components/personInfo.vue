<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <!-- <basicPager :page="page" @pageChange="pageChange"></basicPager> -->
      </template>
    </list-container>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";

export default {
  mixins: [tableMixins],

  components: {
    HeaderContainer,
  },

  data() {
    return {
      tableData: [],
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
          field: "dept",
          title: "部门",
          align: "center",
        },
        {
          field: "name",
          title: "姓名",
          align: "center",
        },
      ],
      row: {},
    };
  },

  created() {},

  methods: {
    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .contain-right {
  padding: 0px;
}
</style>
