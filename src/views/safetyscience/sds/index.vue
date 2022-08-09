<template>
  <div class="operation">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="header">
          <div>
            <el-input
              v-model="query.cnName"
              placeholder="请输入化学品名称"
              style="width: 280px; margin-right: 5px"
              clearable
            ></el-input>
            <el-input
              v-model="query.cnName2"
              placeholder="请输入中文名称2"
              style="width: 280px; margin-right: 5px"
              clearable
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
    <render-import
      ref="renderImportRef"
      title="sds导入"
      templateUrl="/enterprise/sds/import-template"
      @refreshDataList="getTableData"
    ></render-import>
  </div>
</template>
<script>
import editDialog from "./editDialog.vue";
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import { templateDown } from "@/router/axios";

export default {
  // 混入树形组件
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { editDialog },
  data() {
    return {
      tableData: [{cnName:'3'}],
      domainList: [],
      templateDown,
      ids: [],
      ids: [],
      query: {
        cnName: "",
        cnName2: "",
      },
      sizeCon: {
        height: "580px",
      },
      certificateTypeList: [],
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
          field: "cnName",
          title: "化学品中文名",
          align: "center",
        },
        {
          field: "enName",
          title: "化学品英文名称",
          align: "center",
        },
        {
          field: "cnName2",
          title: "中文名称2",
          align: "center",
        },
        {
          field: "enName2",
          title: "英文名称2",
          align: "center",
        },
        {
          field: "instructionCode",
          title: "技术说明书编号",
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
       page:{
        currentPage:1,
        pageSize:10,
      },
    };
  },
  created() {
    // this.getTableData();
  },
  methods: {
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },
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
            queryHierarchy_orgName: "",
            accidentType: "",
          };
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
    handleExportData() {
      if (this.ids.length > 0) {
        this.$confirm("是否导出报表数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then((res) => {
          let url =
            templateDown + `/enterprise/sds/export-data?ids=${this.ids}`;
          console.log(url, "url");
          let a = document.createElement("a");
          a.href = url;
          a.click();
        });
      } else {
        this.$message.warning("请勾选要导出的数据");
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$router.push({
            name: "sds详情",
            params: { row: row, chakan: "chakan" },
          });
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTableData(row.id);
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
      // const res = await safeListAPI(params);
      // if (res.code !== 200) {
      //   return this.$message.error("获取列表数据失败");
      // }
      // this.tableData = res.data.content;
      // this.page.totalResult = res.data.totalElements;
    },

    // 删除列表数据
    deleteTableData(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        safeDeleteAPI({ ids: id }).then((res) => {
          this.$message.success("删除成功");
          this.getTableData();
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
