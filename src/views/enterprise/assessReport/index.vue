<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header>
          <div>
            <el-input placeholder="请输入评价报告名称" style="width:220px;margin-right: 5px"></el-input>
            <el-select placeholder="请选择评价报告类型">
              <el-option label="在业" value="shanghai"></el-option>
              <el-option label="停产" value="beijing"></el-option>
            </el-select>
          </div>
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
        <edit-dialog-view ref="dealogViewRef"></edit-dialog-view>
      </template>
    </list-container>
  </div>
</template>

<script>
import {assessListAPI, assessRemoveAPI} from "@/api/enterprise/assessReport/index";
import editDialog from './components/editDialog.vue';
import EditDialogView from './components/editDialogView.vue';
import ListContainer from "@/components/list-page-container";
import tableMixins from "@/mixins/table";

export default {
  mixins: [tableMixins],
  components: {ListContainer, editDialog, EditDialogView},
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
          field: "evaluationReportName",
          title: "评价报告名称",
          align: "center",
        },
        {
          field: "evaluationReportNum",
          title: "评价报告编号",
          align: "center",
        },
        {
          field: "evaluationReportType.value",
          title: "评价报告类型",
          align: "center",
        },
        {
          field: "validTime",
          title: "有效日期",
          align: "center",
        },
        {
          field: "evaluationOrganization",
          title: "评价机构",
          align: "center",
        },
        {
          field: "reportFile",
          title: "报告附件",
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
        case "dictionary":
          this.$refs.dictValueDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "chakan":
          this.$refs.dealogViewRef.open(row);
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
        assessRemoveAPI({ids: id}).then((res) => {
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
      const res = await assessListAPI(params);
      console.log('评价列表', res.data)
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
