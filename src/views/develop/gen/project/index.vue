<template>
  <div class="role">
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div style="display:flex">
            <el-input v-model="query.projectName" placeholder="请输入工程名称"></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refreshDataList="getTableData"></edit-dialog>
    <preview-dialog ref="previewDialog"></preview-dialog>
  </div>
</template>
<script>
import editDialog from "./editDialog";
import previewDialog from "./previewDialog";
import {projectListAPI, projectBatchRemoveAPI, projectDownloadAPI} from "@/api/develop/gen/project/project";
import {baseUrl} from "@/config/env";
import tableMixins from "@/mixins/table";

export default {
  mixins:[tableMixins],
  components: { editDialog, previewDialog },
  data() {
    return {
      query: {
        projectName: '',
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "projectName",
          title: "工程名称",
          align: "center"
        },
        {
          field: "devModel",
          title: "模型名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.devModel.modelName?row.devModel.modelName:'未知'}</div>
          }
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chongzhi":
          this.query.projectName = ''
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
          this.deleteTable(row.id);
          break;
        case "chakan":
          this.previewCode(row.id);
          break;
        case "xiazai":
          this.downloadCode(row.id);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        projectBatchRemoveAPI({ ids: id }).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize
      };
      const res = await projectListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    // 预览代码
    previewCode(id){
      this.$refs.previewDialog.open(id);
    },
    // 下载代码
    downloadCode(id){
      let path = baseUrl + "/api/develop/gen/project/download?projectId=" + id
      window.open(path);
    },
  }
};
</script>

<style scoped lang='scss'>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
