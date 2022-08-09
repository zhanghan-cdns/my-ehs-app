<template>
  <div>
    <list-container>
      <template #left>
      </template>
      <template #right>
        <header>
          <el-input placeholder="请输入项目名称" style="width:220px;"></el-input>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"

          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
        <edit-dialog
          ref="editDialogRef"
          @refreshDataList="getTableData"
        ></edit-dialog>
        <view-dialog ref="viewDialogRef" :dictConfig="{entAccidentType}"></view-dialog>
      </template>
    </list-container>
  </div>
</template>

<script>
import {projectThreeSimListAPI} from '@/api/enterprise/projectThreeSim/index'
import viewDialog from '@/views/enterprise/projectThreeSim/components/editDialogView.vue';
import editDialog from './components/editDialog.vue';
import ListContainer from "@/components/list-page-container";
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],
  components: {ListContainer, editDialog, viewDialog},
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15
      },
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
          field: "projectName",
          title: "项目名称",
          align: "center",
        },
        {
          field: "projectNo",
          title: "项目编号",
          align: "center",
        },
        {
          field: "projectNature.value",
          title: "项目性质",
          align: "center",
        },
        {
          field: "projectBuildUnit",
          title: "项目建设单位",
          align: "center",
        },
        {
          field: "projectBeginDate",
          title: "项目开工日期",
          align: "center",
        },
        {
          field: "projectFinishDate",
          title: "项目竣工验收日期",
          align: "center",
        },
        {
          field: "projectDescribe",
          title: "项目描述",
          align: "center",
        },
        {
          field: "projectSafeFacThreeSim",
          title: "安全设施三同时",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chongzhi":
          this.query.dictKeyName = "";
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
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteDictKeyDataAPI({ids: id}).then((res) => {
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
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await projectThreeSimListAPI(params);
      console.log('res.data大表格', res.data)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
