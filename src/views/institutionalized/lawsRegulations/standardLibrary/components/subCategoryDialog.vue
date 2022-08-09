<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="780"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div
          style="display: flex; justify-content: end; margin: 8px 0px 15px 0px"
        >
          <el-button type="primary" size="small" @click="addSubCategory"
            ><i
              class="iconfont icon-jia"
              style="font-size: 13px; margin-right: 3px"
            ></i
            >新增</el-button
          >
        </div>
        <dom-size-listen style="flex: 1; height: 45vh" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            row-key="id"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            :tree-config="{
              children: 'children',
            }"
          /> </dom-size-listen
      ></template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <sub-category-edit-dialog
      ref="subCategoryEditDialogRef"
      @refresh="getTableData"
    ></sub-category-edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import {
  subCategoryListAPI,
  subCategoryDeleteAPI,
} from "@/api/institutionalized/lawsRegulations/subCategory";
import subCategoryEditDialog from "./subCategoryEditDialog.vue";

export default {
  mixins: [tableMixins],
  components: {
    subCategoryEditDialog,
  },

  data() {
    return {
      icon: "icon-xinzeng",
      title: "",
      openEdit: false,
      tableData: [],
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
          fixed: "left",
          align: "center",
        },
        {
          field: "name",
          title: "类别",
          align: "center",
          treeNode: "true",
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
      operateButtonList: ["bianji", "shanchu"],
      ids: [],
    };
  },

  methods: {
    // 打开
    open() {
      this.openEdit = true;
      this.title = "小类别管理";
      this.getTableData();
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
    addSubCategory() {
      this.$refs.subCategoryEditDialogRef.open(this.tableData);
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "bianji":
          this.$refs.subCategoryEditDialogRef.open(this.tableData, row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },

    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await subCategoryListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },

    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await subCategoryDeleteAPI({
            ids: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData({});
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
  },
};
</script>

<style></style>
