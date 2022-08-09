<template>
  <div class="operation">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="header">
          <div>
            <el-select
              v-model="query.accidentType"
              clearable
              placeholder="类别"
              style="width: 200px"
            >
              <el-option
                v-for="(item, index) in certificateTypeList"
                :key="index"
                :label="item.dictValueName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
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
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import { templateDown } from "@/router/axios";
import editDialog from "./editDialog.vue";

export default {
  // 混入树形组件
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { editDialog },
  data() {
    return {
      tableData: [],
      domainList: [],
      ids: [],
      query: {
        certificateName: "",
        accidentType: "",
      },
      certificateTypeList: [],
      templateDown,
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
        // {
        //   field: "queryHierarchy_orgName ",
        //   title: "企业名称",
        //   align: "center",
        //   visible: getUserType() !== 2 ? true : false, //判断用户类型是政府段还是企业端 1是政府2是企业
        // },
        {
          field: "accidentType",
          title: "类别",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.accidentType != null) {
              return <span>{row.accidentType.value}</span>;
            }
          },
        },
        {
          field: "attachment",
          title: "附件",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <span>{row.attachment.originalFilename}</span>;
          },
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
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      sizeCon: {
        height: "580px",
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
      console.log(this.ids, "kkkkkk");
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
            templateDown +
            `/enterprise/accidentExample/export-data?ids=${this.ids}`;
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
          this.$refs.editDialogRef.open(row, "chakan");
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
