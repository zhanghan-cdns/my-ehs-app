<template>
  <div class="definition">
    <list-container>
      <template #left>
        <search-tree
          :treeData="treeData"
          :treeProps="treeProps"
          ref="searchTreeRef"
          :lazy="true"
          :indent="8"
          :isTree="false"
          :render-content="renderContent"
          :show-checkbox="true"
          @check="checkNode"
          @change="treeChange"
          :load="treeLayzLoad"
          :defaultExpandedKeys="defaultExpandedKeys"
        >
        </search-tree>
      </template>
      <template #right>
        <div class="definition_operation_box">
          <el-input
            v-model="query.userName"
            placeholder="请输入用户名"
            style="width: 200px"
          ></el-input>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
        <edit-dialog ref="editDialogRef" @refreshDataList="getTableData"></edit-dialog>
      </template>
    </list-container>
  </div>
</template>

<script>
import editDialog from "./editDialog";
import { listDefinition, updateState, delDeployment, addDeployment, updateDeployment, exportDeployment, definitionStart, readXml} from "@/api/flowable/definition";
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],
  components: { editDialog },
  data() {
    return {
      query: {
        name: '',
        category: null,
        key: null,
        tenantId: null,
        deployTime: null,
        derivedFrom: null,
        derivedFromRoot: null,
        parentDeploymentId: null,
        engineVersion: null
      },
      // 分页参数
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 0,
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "deploymentId",
          title: "流程编号",
          align: "center",
        },
        {
          field: "key",
          title: "流程标识",
          align: "center",
        },
        {
          field: "category",
          title: "流程分类",
          align: "center",
        },
        {
          field: "name",
          title: "流程名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div style="color:#1890ff">{row.name}</div> 
          }
        },
        {
          field: "formName",
          title: "业务表单",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div style="color:#1890ff">{row.formId?'row.formName':'暂无表单'}</div> 
          }
        },
        {
          field: "version",
          title: "流程版本",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <el-tag size="medium">v{row.version}</el-tag> 
          }
        },
        {
          field: "suspensionState",
          title: "状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if(row.suspensionState === 1){
              return <el-tag type="success">启用</el-tag>
            }else{
              return <el-tag type="warning">停用</el-tag>
            }
          }
        },
        {
          field: "deploymentTime",
          title: "部署时间",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList(row)}
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    operateButtonList(row) {
      let operateButtonList = [];
      // 启用
      if (row.suspensionState == "1") {
        operateButtonList = ["bianji", "tingyong","shanchu"];
      } else if (row.suspensionState == "2") { // 停用
        operateButtonList = ["bianji", "qiyong","shanchu"];
      } 
      return operateButtonList;
    },
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chongzhi":
          this.query.name = ''
          this.getTableData();
          break;
        case "chaxun":
          this.getTableData();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.deploymentId);
          break;
        case "qiyong":
          this.handleUpdateSuspensionState(row.deploymentId,row.suspensionState)
          break;
        case "tingyong":
          this.handleUpdateSuspensionState(row.deploymentId,row.suspensionState)
          break;
      }
    },
    // 挂起/激活流程 
    handleUpdateSuspensionState(deploymentId,suspensionState){
      let state = 1;
      if (suspensionState === 1) {
        state = 2
      }
      const params = {
        deployId: deploymentId,
        state: state
      }
      updateState(params).then(res => {
        this.$message.success("操作成功");
        this.getTableData();
      });
    },
    // 删除列表数据
    deleteTable(deploymentId) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDeployment({deployId: deploymentId}).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    getTableData() {
      let params = {
        ...this.query,
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      listDefinition(params).then((res) => {
        this.tableData = res.data.records;
        this.page.totalResult = res.data.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.definition_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
