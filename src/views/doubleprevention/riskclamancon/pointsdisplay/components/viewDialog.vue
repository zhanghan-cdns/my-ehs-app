<template>
  <div class="choosePersonDialog">
    <basicDialog
      icon="icon-bianji"
      title="查看积分"
      width="60%"
      height="68%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content">
          <dom-size-listen style="flex: 1" v-model="sizeCon">
            <render-table
              :height="sizeCon.height"
              :data="tableData"
              :columns="columns"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      openEdit: false,
      sizeCon: {
        height: "260px",
      },
      tableData: [{ safetyTarget: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyTarget",
          title: "积分项",
          align: "center",
        },
        {
          field: "targetCode",
          title: "积分时间",
          align: "center",
        },
        {
          field: "year",
          title: "分值",
          align: "center",
        },
      ],
    };
  },
  created() {},

  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
    },
  },
};
</script>

<style scoped lang='scss'>
</style>