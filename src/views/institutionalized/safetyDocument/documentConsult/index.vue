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
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import fileDialog from "@/views/institutionalized/safetyDocument/documentRelease/components/fileDialog.vue";
import { monitoringIndicatorsListAPI } from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin],
  components: {
    HeaderContainer,
    fileDialog,
  },
  data() {
    return {
      tableData: [
        {
          wjmc: "2021年度培训计划",
          status: "0",
          cyqk: "0",
          xzqk: "1",
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
            if (row.cyqk === "0") {
              return (
                <el-button size="mini" class="status-button red">
                  未查看
                </el-button>
              );
            } else if (row.cyqk === "1") {
              return (
                <el-button size="mini" class="status-butto green">
                  已下载
                </el-button>
              );
            }
          },
        },
        {
          field: "xzqk",
          title: "下载情况",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.xzqk === "0") {
              return (
                <el-button size="mini" class="status-button red">
                  未下载
                </el-button>
              );
            } else if (row.xzqk === "1") {
              return (
                <el-button size="mini" class="status-butto green">
                  已下载
                </el-button>
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

    openCirculation(row) {},

    openDownload(row) {},

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

/deep/ .status-button {
  width: 77px;
}

/deep/ .red {
  color: #ff3d2e;
  background-color: #fff6f6;
  border: 1px solid #ff5a5a;
}

/deep/ .green {
  color: #0cbb0c;
  background-color: #fbfffb;
  border: 1px solid #13b844;
}
</style>
