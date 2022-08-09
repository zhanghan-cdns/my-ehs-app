<template>
  <div class="gridcheckresult-view">
    <basicDialog
      icon="icon-chakan"
      title="查看维保记录"
      width="1084"
      height="828"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      :showFooter="false"
    >
      <template #content>
        <div class="container">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="'100%'"
            :data="tableData"
            :columns="columns"
          />
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
    </basicDialog>
    <add-record-dialog ref="addRecordDialogRef" @refreshDataList="update">
    </add-record-dialog>
  </div>
</template>
<script>
import { maintainPageAPI, maintainDeleteAPI } from "@/api/emergency/maintain";
import addRecordDialog from "./editRecordDialog.vue";
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { addRecordDialog },
  data() {
    return {
      openEdit: false,
      tableData: [{}],
      maintainType: "equipment", // 维保类型
      ids: [],
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
          field: "maintainPerson",
          title: "保养人",
          align: "center",
        },
        {
          field: "maintainContent",
          title: "保养内容",
          align: "center",
        },
        {
          field: "latelyMaintainTime",
          title: "最近保养时间",
          align: "center",
        },
        {
          field: "nextMaintainTime",
          title: "下次保养时间",
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
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      operateButtonList: ["chakan", "bianji", "shanchu"],
    };
  },
  created() {},
  methods: {
    close() {
      this.openEdit = false;
    },
    async open() {
      this.getTableData();
      this.openEdit = true;
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.addRecordDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.addRecordDialogRef.open(row, "bianji");
          break;
        case "shanchu":
          this.ids = [row.id];
          this.deleteTableData();
          break;
      }
    },

    // 获取列表数据
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        maintainType: this.maintainType,
      };
      const res = await maintainPageAPI(params);
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
        maintainDeleteAPI({ ids: this.ids.join(",") }).then((res) => {
          if (res && res.code === 200) {
            this.getTableData();
            return this.$message.success("删除成功");
          } else {
            return this.$message.error("删除失败");
          }
        });
      });
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
.container {
  height: 90%;
}
</style>
