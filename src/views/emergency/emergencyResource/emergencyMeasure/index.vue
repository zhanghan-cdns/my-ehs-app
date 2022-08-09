<template>
  <div class="role">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <div style="display: flex">
            <el-select
              clearable
              style="width: 280px"
              v-model="query.measureType"
              placeholder="预案类型"
            >
              <el-option
                v-for="item in certificateTypeList"
                :key="item.dictValue"
                :label="item.dictValueName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen v-model="sizeCon" style="height: 86%">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refreshDataList="update"></edit-dialog>
    <render-import
      ref="renderImportRef"
      title="应急预案导入"
      templateUrl="/enterprise/emergencyMeasure/import-template"
      @refreshDataList="getTableData"
    ></render-import>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  emergencyMeasureListAPI,
  emergencyMeasuresDeleteAPI,
  emergencyMeasuresAPI,
} from "@/api/emergency/emergencyMeasure";
import { imgUrl } from "@/router/axios";
// import { templateDown } from "@/router/axios";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { editDialog },
  provide() {
    return {
      uploadRoot: this,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      tableData: [{}],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      imgUrl,
      query: {
        measureType: "",
      },
      pdfUrl: "",
      certificateTypeList: [],
      // templateDown,
      ids: [],
      uploadTemplateAPI: emergencyMeasuresAPI, //导入
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
          field: "recordCode",
          title: "备案编号",
          align: "center",
        },
        {
          field: "recordDate",
          title: "备案日期",
          align: "center",
        },
        {
          field: "measureType",
          title: "预案类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <span>{row.measureType ? row.measureType.value : ""}</span>;
          },
        },
        {
          field: "attachment",
          title: "文件下载",
          align: "center",
          // render: (h, { row, column, $index }) => {
          //   return (
          //     <div
          //       onclick={(e) => this.myFunction(e, row)}
          //       style="padding:5px;border:1px dashed #4A80FC;color:#4A80FC"
          //     >
          //       {row.attachment.originalFilename
          //         ? row.attachment.originalFilename
          //         : "/"}
          //     </div>
          //   );
          // },
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
    this.getDicMap("measure_type", "certificateTypeList");
  },

  methods: {
    update() {
      this.getTableData();
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },

    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chongzhi":
          this.query.measureType = "";
          this.getTableData();
          break;
        case "chaxun":
          this.getTableData();
          break;

        case "daoru":
          this.$refs.renderImportRef.open();
          break;
        case "daochu":
          this.handleExportData();
          break;
      }
    },
    // 导出
    // handleExportData() {
    //   if (this.ids.length > 0) {
    //     this.$confirm("是否导出报表数据?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }).then((res) => {
    //       let url =
    //         templateDown +
    //         `/enterprise/emergencyMeasure/export-data?ids=${this.ids}`;
    //       console.log(url, "url");
    //       let a = document.createElement("a");
    //       a.href = url;
    //       a.click();
    //     });
    //   } else {
    //     this.$message.warning("请勾选要导出的数据");
    //   }
    // },
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
        emergencyMeasuresDeleteAPI({ ids: id }).then((res) => {
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
      const res = await emergencyMeasureListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    myFunction(e, row) {
      let url = this.imgUrl + row.attachment.url;
      let a = document.createElement("a");
      a.href = url;
      a.click();
    },
  },
};
</script>

<style scoped lang="scss">
.left_container {
  height: calc(100% - 30px);
  flex: 1;
  display: flex;
  width: 91%;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 15px 10px;
}
::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: #f0f5ff; //背景色
  color: #000;
}

::v-deep .el-tree-node__label {
  width: 91%;
  // margin-top: 12px;
  float: right;
  font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #999999;
  letter-spacing: 1px;
}

.search-tree {
  width: 91%;
  height: auto;
  margin-top: 15px;
}
.el-row {
  height: 100%;
  margin-bottom: 20px;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
