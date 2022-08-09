<template>
  <div id>
    <basicDialog
      icon="icon-bianji"
      title="延期记录"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="header">
					<el-select v-model="query.auditStatus" style="width: 200px" clearable placeholder="请选择审批状态">
						<el-option label="已通过" :value="1"></el-option>
						<el-option label="未通过" :value="2"></el-option>
					</el-select>
					<div style="text-align: right; margin: 10px 0px">
						<el-button size="small" type="primary" @click="headerButtonMethods('chaxun')">
							<i class="iconfont icon-chaxun" style="font-size:13px"></i>查询
						</el-button>
						<el-button size="small" class="export_btn primary_btn" @click="headerButtonMethods('chongzhi')">
							<i class="iconfont icon-zhongzhi" style="font-size:13px"></i>刷新
						</el-button>
					</div>
        </div>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table :height="sizeCon.height" :data="tableData" :columns="columns" />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </basicDialog>
  </div>
</template>
<script>
// import {delayRecordListAPI} from "@/api/inspection/hiddenTroManage"

export default {
  data() {
    return {
      openEdit: false,
      query: {
        hiddenDangerId: '',
        auditStatus: ''
      },
      sizeCon:{
        height:'280px'
      },
      tableData:[{applicant:'11'}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center"
        },
        {
          field: "applicant",
          title: "申请人",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.applicant&&row.applicant.nickName}</div>
          }
        },
        {
          field: "applicationDepartment",
          title: "申请部门",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.applicationDepartment&&row.applicationDepartment.deptName}</div>
          }
        },
        {
          field: "approver",
          title: "审批人名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.approver&&row.approver.nickName}</div>
          }
				},
				{
          field: "reason",
          title: "延期原因",
          align: "center"
				},
				{
          field: "originalPlannedDate",
          title: "原计划日期",
          align: "center"
				},
				{
          field: "delayDate",
          title: "计划延期时间",
          align: "center"
				},
				{
          field: "auditContent",
          title: "审核内容",
          align: "center"
				},
				{
          field: "auditStatus",
          title: "审批状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.auditStatus == '1'?'通过':'不通过'}</div>
          }
				},
			]
    };
  },
  created() {},
  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
      this.query.hiddenDangerId = row.id
      this.getTableData();
    },
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
					this.getTableData();
					break;
				case "chongzhi":
					this.query.auditStatus = ''
					this.getTableData();
          break;
      }
    },
    // 获取表格数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize
      };
      const res = await delayRecordListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  display: flex;
  flex-direction: column;
}
.header{
	display:flex;
	flex-direction:row;
	align-items:center;
	justify-content: space-between;
	margin-bottom:10px
}
</style>
