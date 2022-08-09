<template>
  <div class="role">
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div style="display:flex">
            <el-input v-model="query.name" placeholder="请输入建筑/区域名称"></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table
            row-key="id"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            :tree-config="{
              children: 'children',
            }"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" :building-area="tableData" @refreshDataList="getTableData"></edit-dialog>
  </div>
</template>
<script>
import editDialog from "./editDialog";
import {buildingAreaBatchRemoveAPI, buildingAreaListAPI} from "@/api/location/buildingarea/buildingarea";
import tableMixins from "@/mixins/table";

export default {
  mixins: [tableMixins],
  components: { editDialog },
  data() {
    return {
      query: {
        name: '',
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
          field: "name",
          title: "建筑名称",
          align: "center",
          treeNode: "true",
        },
        {
          field: "type",
          title: "类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.type.value}</div>
          }

        },
        {
          field: "floor",
          title: "楼层",
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
          this.deleteTable(row.id);
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
        buildingAreaBatchRemoveAPI({ ids: id }).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 99999999
      };
      const res = await buildingAreaListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    }
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
