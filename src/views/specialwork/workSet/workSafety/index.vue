<!--suppress ALL -->
<template>
  <div>
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
    <edit-dialog ref="editDialogRef" :dictConfig="{}"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
  },
  data() {
    return {
      search_item: [
        {
          prop: "workSteps",
          type: "SelectDict",
          placeholder: "工作步骤",
          disabled: false,
          width: "200px",
          children: "workSteps",
        },
        {
          prop: "jobType",
          type: "SelectDict",
          placeholder: "作业类型",
          disabled: false,
          width: "200px",
          children: "jobType",
        },
        {
          prop: "riskFactors",
          type: "Input",
          placeholder: "危险因素",
          disabled: false,
          width: "200px",
        },
        {
          prop: "controlMeasures",
          type: "Input",
          placeholder: "控制措施",
          disabled: false,
          width: "200px",
        },
      ],
      search_data: {
        riskFactors: "",
        jobType: "",
        workSteps: "",
        controlMeasures: "",
      },

      tableData: [
        {
          id: "001",
        },
        {
          id: "002",
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
          field: "jobType",
          title: "作业类型",
          align: "center",
        },
        {
          field: "workSteps",
          title: "工作步骤",
          align: "center",
        },
        {
          field: "riskFactors",
          title: "危险因素",
          align: "center",
        },
        {
          field: "consequences",
          title: "导致的后果",
          align: "center",
        },
        {
          field: "controlMeasures",
          title: "控制措施",
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
            riskFactors: "",
            jobType: "",
            workSteps: "",
            controlMeasures: "",
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
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
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
</style>
