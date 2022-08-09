<!--suppress ALL -->
<template>
  <div id="change">
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <header-search
            :searchData="search_data"
            :searchItem="search_item"
          ></header-search>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
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
    <edit-dialog ref="editDialogRef"></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
  },
  data() {
    return {
      search_item: [
        {
          prop: "changeLevel",
          type: "SelectDict",
          placeholder: "请选择变更级别",
          disabled: false,
          width: "200px",
          children: "changeLevel",
        },
      ],
      search_data: {
        changeLevel: "",
      },
      tableData: [
        {
          id: "001",
          changeStatus: "0",
        },
        {
          id: "002",
          changeStatus: "3",
        },
      ],
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
          field: "changeProject",
          title: "变更项目名称",
          align: "center",
        },
        {
          field: "requestDepartment",
          title: "申请部门",
          align: "center",
        },
        {
          field: "requestPerson",
          title: "申请人",
          align: "center",
        },
        {
          field: "date",
          title: "计划完成时间",
          align: "center",
        },
        {
          field: "changeType",
          title: "变更类别",
          align: "center",
        },
        {
          field: "changeLevel",
          title: "变更级别",
          align: "center",
        },
        {
          field: "changeStatus",
          title: "变更状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.changeStatus === "0") {
              return <div class="status-button orange">待风险评估</div>;
            } else if (row.changeStatus === "1") {
              return <div class="status-button orange">待审批</div>;
            } else if (row.changeStatus === "2") {
              return <div class="status-button orange">待验收</div>;
            } else if (row.changeStatus === "3") {
              return <div class="status-button blue">已验收</div>;
            }
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
      ids: [],
    };
  },

  created() {
    // this.getTableData({ query: this.search_data });
  },

  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData({ query: this.search_data });
        case "chongzhi":
          this.search_data = {
            changeLevel: "",
          };
          this.getTableData({ query: this.search_data });
          break;
      }
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

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "pinggu":
          this.$refs.editDialogRef.open(row, "assess");
          break;
        case "shenpi":
          this.$refs.editDialogRef.open(row, "approval");
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids.join(",");
    },

    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await monitoringIndicatorsDeleteAPI({
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
  },
};
</script>

<style lang="scss" scoped>
/deep/ .status-button {
  width: 77px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px 4px 4px 4px;
  font-size: 12px;
  text-align: center;
  margin: 0 auto;
}

/deep/ .orange {
  color: #faad14;
  background: #fff9f2;
  border: 1px solid #faad14;
}

/deep/ .blue {
  color: #4a80fc;
  background-color: #f2f6ff;
  border: 1px solid #4a80fc;
}
</style>
