<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="tab_wrap">
          <div :class="tabId == 1 ? 'tab tab_now' : 'tab'" @click="choseTab(1)">
            作业中
          </div>
          <div :class="tabId == 2 ? 'tab tab_now' : 'tab'" @click="choseTab(2)">
            已过期
          </div>
          <div :class="tabId == 3 ? 'tab tab_now' : 'tab'" @click="choseTab(3)">
            全部
          </div>
        </div>
        <div class="tab_content" v-if="tabId == 1">
          <div class="role_operation_box">
            <header-search
              :searchData="search_data"
              :searchItem="search_item"
            ></header-search>
            <header-button
              :headerButtonList="headerButtonListNow"
              @headerButtonClick="headerButtonMethodsNow"
            >
            </header-button>
          </div>
          <dom-size-listen style="flex: 1; height: 64vh" v-model="sizeCon">
            <render-table
              @checkbox-change="selectChangeEvent"
              @checkbox-all="selectChangeEvent"
              :height="sizeCon.height"
              :data="tableDataNow"
              :columns="columns"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
        <div class="tab_content" v-if="tabId == 2">
          <div class="role_operation_box">
            <header-search
              :searchData="search_data"
              :searchItem="search_item"
            ></header-search>
            <header-button
              :headerButtonList="headerButtonListLate"
              @headerButtonClick="headerButtonMethodsLate"
            >
            </header-button>
          </div>
          <dom-size-listen style="flex: 1; height: 64vh" v-model="sizeCon">
            <render-table
              @checkbox-change="selectChangeEvent"
              @checkbox-all="selectChangeEvent"
              :height="sizeCon.height"
              :data="tableDataLate"
              :columns="columns"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
        <div class="tab_content" v-if="tabId == 3">
          <div class="role_operation_box">
            <header-search
              :searchData="search_data"
              :searchItem="search_item"
            ></header-search>
            <header-button
              :headerButtonList="headerButtonListAll"
              @headerButtonClick="headerButtonMethodsAll"
            >
            </header-button>
          </div>
          <dom-size-listen style="flex: 1; height: 64vh" v-model="sizeCon">
            <render-table
              @checkbox-change="selectChangeEvent"
              @checkbox-all="selectChangeEvent"
              :height="sizeCon.height"
              :data="tableDataAll"
              :columns="columns"
            />
          </dom-size-listen>
          <basicPager :page="page" @pageChange="pageChange"></basicPager>
        </div>
      </template>
    </list-container>
    <delegate-dialog ref="delegateDialogRef" :dictConfig="{}"></delegate-dialog>
    <edit-dialog ref="editDialogRef"></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dictMixin from "@/mixins/dict";
import delegateDialog from "./components/delegateDialog.vue";
import editDialog from "./components/editDialog.vue";

export default {
  mixins: [tableMixins, dictMixin],
  components: {
    delegateDialog,
    editDialog,
  },
  data() {
    return {
      tabId: 1,
      search_item: [
        {
          prop: "workCertName",
          type: "Input",
          placeholder: "请输入作业证编号",
          disabled: false,
          width: "200px",
        },
        {
          prop: "workCertType",
          type: "SelectDict",
          placeholder: "请选择作业级别",
          disabled: false,
          width: "200px",
          children: "workCertType",
        },
        {
          prop: "workCertStatus",
          type: "SelectDict",
          placeholder: "请选择作业证状态",
          disabled: false,
          width: "200px",
          children: "workCertStatus",
        },
      ],
      search_data: {
        workCertName: "",
        workCertType: "",
        workCertStatus: "",
      },
      headerButtonListNow: ["chaxun", "shenpiyijian", "weipai"],
      headerButtonListLate: ["chaxun", "shenpiyijian"],
      headerButtonListAll: ["chaxun", "shenpiyijian", "weipai"],
      tableDataNow: [{ code: "001" }],
      tableDataLate: [{ code: "002" }],
      tableDataAll: [{ code: "001" }, { code: "002" }],
      operateButtonListNow: ["chakan", "fenxi", "cuoshiqueren"],
      operateButtonListLate: ["chakan"],
      operateButtonListAll: ["chakan", "fenxi", "cuoshiqueren"],
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
          field: "workCertName",
          title: "类型",
          align: "center",
        },
        {
          field: "department",
          title: "部门",
          align: "center",
        },
        {
          field: "applicant",
          title: "申请人",
          align: "center",
        },
        {
          field: "code",
          title: "编码",
          align: "center",
        },
        {
          field: "applicationTime",
          title: "申请时间",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            if (this.tabId === 1) {
              return (
                <operate-button
                  operateButtonList={this.operateButtonListNow}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            } else if (this.tabId === 2) {
              return (
                <operate-button
                  operateButtonList={this.operateButtonListLate}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            } else if (this.tabId === 3) {
              return (
                <operate-button
                  operateButtonList={this.operateButtonListAll}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            }
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
    //tab选项切换
    choseTab(id) {
      this.tabId = id;
    },
    headerButtonMethods(type) {
      switch (type) {
        case "weipai":
          this.$refs.delegateDialogRef.open();
          break;
        case "chaxun":
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
        case "fenxi":
          this.$refs.editDialogRef.open();
          break;
        case "cuoshiqueren":
          this.$refs.editDialogRef.open();
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
.tab_wrap {
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid #1890ff;
  .tab {
    cursor: pointer;
    width: 126px;
    height: 38px;
    margin: 0px 10px;
    line-height: 38px;
    text-align: center;
  }
  .tab_now {
    color: white;
    background: url("../../../assets/images//education/tab_bg.png") no-repeat
      center/cover;
  }
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
}
.tab_content {
  height: 800px;
}
</style>
