<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入文件名称"
              clearable
              v-model="query.pszt"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <file-dialog ref="fileDialogRef"></file-dialog>
    <read-dialog ref="readDialogRef"></read-dialog>
    <download-dialog ref="downloadDialogRef"></download-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import fileDialog from "@/views/institutionalized/safetyDocument/documentRelease/components/fileDialog.vue";
import readDialog from "./components/readDialog.vue";
import downloadDialog from "./components/downloadDialog.vue";
import { monitoringIndicatorsListAPI } from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin],
  components: {
    HeaderContainer,
    fileDialog,
    readDialog,
    downloadDialog,
  },
  data() {
    return {
      tableData: [
        {
          wjmc: "2021年度培训计划",
          status: "0",
          cyqk: "2/3",
          xzqk: "2/3",
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },

        {
          field: "wjmc",
          title: "文件名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.wjmc) {
              return (
                <div
                  class="data-blue"
                  onClick={() => {
                    this.openFile(row);
                  }}
                >
                  {row.wjmc}
                </div>
              );
            }
          },
        },
        {
          field: "wjbh",
          title: "文件编号",
          align: "center",
        },
        {
          field: "fbjg",
          title: "发布人",
          align: "center",
        },
        {
          field: "qyrq",
          title: "发布日期",
          align: "center",
        },
        {
          field: "cyqk",
          title: "传阅情况",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.wjmc) {
              return (
                <div
                  class="data-blue"
                  onClick={() => {
                    this.openread(row);
                  }}
                >
                  {row.cyqk}
                </div>
              );
            }
          },
        },
        {
          field: "xzqk",
          title: "下载情况",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.wjmc) {
              return (
                <div
                  class="data-blue"
                  onClick={() => {
                    this.openDownload(row);
                  }}
                >
                  {row.xzqk}
                </div>
              );
            }
          },
        },
      ],
      query: {
        pszt: "",
      },
    };
  },

  created() {
    // this.getTableData({ query: this.query });
  },

  methods: {
    openFile(row) {
      console.log(row, "row");
      this.$refs.fileDialogRef.open(row);
    },

    openread(row) {
      this.$refs.readDialogRef.open(row);
    },

    openDownload(row) {
      this.$refs.downloadDialogRef.open(row);
    },

    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      if (query) {
        params = {
          ...params,
          ...query,
        };
      }
      const res = await monitoringIndicatorsListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .data-blue {
  color: #3c81e6;
  cursor: pointer;
}
</style>
