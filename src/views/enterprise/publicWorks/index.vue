<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <!-- 上部分 -->
        <header>
          <div>
            <el-input placeholder="请输入公用工程名称" style="width:220px;margin-right: 5px"></el-input>
            <el-select placeholder="请选择公用工程类型">
              <el-option label="在业" value="shanghai"></el-option>
              <el-option label="停产" value="beijing"></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header>
        <!-- 表格 -->
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>


    </list-container>
    <edit-dialog
      ref="editDialogRef"
      @refresh="getTableData({})"
    ></edit-dialog>
    <edit-dialog-view ref="viewDialogRef"></edit-dialog-view>
  </div>
</template>

<script>
import editDialog from './components/editDialog.vue';
import {publicWorksListAPI, publicWorksRemoveAPI} from '@/api/enterprise/publicWorks/index'
import EditDialogView from './components/editDialogView.vue';
import tableMixins from "@/mixins/table";
import ListContainer from "@/components/list-page-container";

export default {
  mixins: [tableMixins],
  components: {ListContainer, editDialog, EditDialogView},
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 15
      },

      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "name",
          title: "公用工程名称",
          align: "center",
        },
        {
          field: "code",
          title: "公用工程编号",
          align: "center",
        },
        {
          field: "type.value",
          title: "公用工程类型",
          align: "center",
        },
        {
          field: "location",
          title: "公用工程位置",
          align: "center",
        },
        {
          field: "func",
          title: "公用工程功能",
          align: "center",
        },
        {
          field: "mainMaterial",
          title: "主要介质",
          align: "center",
        },
        {
          field: "majFacEquipment",
          title: "主要设施",
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
          this.$refs.viewDialogRef.open(row);
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
        publicWorksRemoveAPI({ids: id}).then((res) => {
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
      const res = await publicWorksListAPI(params);
      console.log('res.data', res.data)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
