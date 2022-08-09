<template>
  <div class="operation">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="header">
          <div>
            <el-input
              style="width: 205px; margin-right: 5px"
              placeholder="请输入物资名称"
              clearable
              v-model="query.materialName"
            ></el-input>
          </div>
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
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refreshDataList="update"> </edit-dialog>
    <edit-record-dialog ref="addRecordDialogRef" @refreshDataList="update">
    </edit-record-dialog>
    <view-record-dialog ref="viewRecordDialogRef"> </view-record-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import { materialPageAPI, materialDeleteAPI } from "@/api/emergency/material";
import editDialog from "./components/editDialog.vue";
import editRecordDialog from "./components/editRecordDialog.vue";
import viewRecordDialog from "./components/viewRecordDialog.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { editDialog, editRecordDialog, viewRecordDialog },
  data() {
    return {
      tableData: [{}],
      ids: [],
      query: {
        materialName: "",
      },
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "materialName",
          title: "物资名称",
          align: "center",
        },
        {
          field: "materialCategory",
          title: "物资类别",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div>
                {row.materialCategory ? row.materialCategory.value : ""}
              </div>
            );
          },
        },
        {
          field: "quantity",
          title: "数量",
          align: "center",
        },
        {
          field: "liaisonPerson",
          title: "联系人",
          align: "center",
        },
        {
          field: "telephoneNumber",
          title: "应急电话",
          align: "center",
        },
        {
          field: "storageAddress",
          title: "地址",
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
                on-operateButtonClick={(type) => {
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
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
          this.getTableData();
          break;
        case "xinzeng":
          this.$refs.editDialogRef.open();
          this.getTableData();
          break;
        case "chongzhi":
          this.query = {
            materialName: "",
          };
          this.getTableData();
          break;
        case "piliangshanchu":
          this.deleteSomeTable();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.ids = [row.id];
          this.deleteTableData();
          break;
        case "weibao":
          this.$refs.addRecordDialogRef.open(row, "weibao");
          break;
        case "weibaojilu":
          this.$refs.viewRecordDialogRef.open();
          break;
      }
    },

    // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await materialPageAPI(params);
      if (res.code !== 200) {
        return this.$message.error("获取列表数据失败");
      }
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
    },

    // 删除列表数据
    deleteTableData() {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        materialDeleteAPI({ ids: this.ids.join(",") }).then((res) => {
          if (res && res.code === 200) {
            this.getTableData();
            return this.$message.success("删除成功");
          } else {
            return this.$message.error("删除失败");
          }
        });
      });
    },

    // 批量删除
    deleteSomeTable() {
      if (this.ids.length == 0) {
        return this.$message.warning("请勾选需要删除的数据");
      }
      this.deleteTableData();
    },

    // 分页改变
    pageChange() {
      this.getTableData();
    },

    // 刷新
    update() {
      this.getTableData();
    },

    // 复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
  },
};
</script>

<style scoped lang="scss">
.operation {
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }
}
</style>
