<!--  -->
<template>
  <div>
    <div style="text-align: right; margin: 10px 0px">
      <el-button
        size="small"
        type="primary"
        @click="headerButtonMethods('yanqishenqing')"
      >
        <i class="iconfont icon-chaxun" style="font-size: 13px"></i>延期申请
      </el-button>
    </div>
    <dom-size-listen v-model="sizeCon" style="flex: 1">
      <render-table
        :columns="columns"
        :data="tableData"
        :height="sizeCon.height"
      />
    </dom-size-listen>
    <basicPager :page="page" @pageChange="pageChange"></basicPager>
    <!-- 延期申请 -->
    <delay-apply ref="delayApplyRef" @refreshDataList="getTableData"></delay-apply>
    <!-- 隐患审核 -->
    <audit ref="auditRef" @refreshDataList="getTableData"></audit>
    <!-- 隐患整改、复查、安全总监闭环 -->
    <process ref="processRef" @refreshDataList="getTableData"></process>
  </div>
</template>

<script>
import delayApply from "./delayApply.vue";
import audit from "./audit"
import process from "./process"

export default {
  components: {delayApply, audit, process},
  data() {
    return {
      sizeCon: {
        height: "500px",
      },
      tableData: [{number: 1}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "number",
          title: "隐患来源",
          align: "center",
        },
        {
          field: "name",
          title: "部门",
          align: "center",
        },
        {
          field: "number",
          title: "提交人",
          align: "center",
        },
        {
          field: "name",
          title: "隐患描述",
          align: "center",
        },
        {
          field: "number",
          title: "提交时间",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            if (row.number === 1) {
              return (
                <div class="status-btn">隐患审核</div>
              );
            }
          },
        },
      ],
      operateButtonList: [
        "yinhuanshenhe",
        "yinhuanzhenggai",
        "fucha",
        "yanshou",
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
  },
  methods: {
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "yanqishenqing":
          this.$refs.delayApplyRef.open();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      // let rowData = {
      //   ...row.inspectHiddenDanger,
      //   delayRecord: row.delayRecord
      // }
      switch (type) {
        // case "yanqishenqing":
        //   this.$refs.delayApplyRef.open(rowData,row.flowTaskDto.taskId)
        //   break;
        case "yinhuanshenhe":
          this.$refs.auditRef.open()
          break;
        case "yanqishenpi":
          this.$refs.processRef.open('shenpi')
          break;
        case "yinhuanzhenggai":
          this.$refs.processRef.open('zhenggai')
          break;
        case "fucha":
          this.$refs.processRef.open('fucha')
          break;
        case "yanshou":
          this.$refs.processRef.open('yanshou')
          break;
      }
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
/deep/ .status-btn {
  margin: 0 auto;
  background: #4A80FC;
  width: 98px;
  height: 28px;
  color: #fff;
  cursor: pointer;
  line-height: 28px;
  border-radius: 4px;
}
</style>
