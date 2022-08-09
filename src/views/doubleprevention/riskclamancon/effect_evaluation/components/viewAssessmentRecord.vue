<template>
  <div class="choosePersonDialog">
    <basic-dialog
      icon="icon-bianji"
      title="查看效果评估"
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
    </basic-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sizeCon: {
        height: "580px",
      },
      openEdit: false,
      tableData: [{ sourceOfHiddenDanger: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "sourceOfHiddenDanger",
          title: "日期",
          align: "center",
        },
        {
          field: "hazardDiscoveryTime",
          title: "生产装置",
          align: "center",
        },
        {
          field: "inspectionDepartment",
          title: "责任部门",
          align: "center",
        },
        {
          field: "inspector",
          title: "责任人",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "分析单元",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "风险事件",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "管控措施分类1",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "管控措施分类2",
          align: "center",
        },
        {
          field: "inspector",
          title: "管控措施分类3",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "岗位",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "岗位人员",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "检查频次",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "检查周期",
          align: "center",
        },


        {
          field: "inspector",
          title: "A : 任务排查完成率",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "B : 排查隐患发现率",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "C : 隐患逾期整改率",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "D : 隐患整改率",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "G : 总分",
          align: "center",
        },
        {
          field: "correctionDate",
          title: "效果评估",
          align: "center",
          render: (h, { row }) => {
            return (
              <div
                style="border:1px solid #597EF7;padding:2px;"
                onClick={(e) => this.downCheckNum(e, row)}
              >
              </div>
            );
          },
        },
      ],
      form: {
        id: "",
      },
      formRules: {
        hazardDiscoveryTime: [
          { required: true, message: "请选择隐患发现时间", trigger: "blur" },
        ],
      },
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
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
