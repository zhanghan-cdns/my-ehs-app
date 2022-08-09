<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
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
    <apply-dialog
      ref="applyDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></apply-dialog>
    <view-dialog
      ref="viewDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import applyDialog from "./components/applyDialog.vue";
import viewDialog from "./components/viewDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { applyDialog, viewDialog },
  name: "indexProvide",
  data() {
    return {
      query: {
        safetyTarget: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
      search_data: {},
      search_item: [
        {
          prop: "deptName",
          type: "Select",
          placeholder: "请输入作业证编号",
          disabled: false,
          width: "200px",
          children: [],
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
          field: "illegal",
          title: "变更项目名称",
          align: "center",
        },
        {
          field: "illegalName",
          title: "申请部门",
          align: "center",
        },
        {
          field: "illegalDate",
          title: "申请人",
          width: 150,
          align: "center",
        },
        {
          field: "projectName",
          title: "计划完成时间",
          align: "center",
          width: 150,
        },
        {
          field: "scorePoints",
          title: "变更类别",
          align: "center",
        },
        {
          field: "assess",
          title: "变更级别",
          align: "center",
        },
        {
          field: "deliveryTime",
          title: "变更状态",
          align: "center",
          render: (h, { row }) => {
            if (1) {
              return (
                <el-button
                  class="rectification"
                  onClick={(e) => this.feedback()}
                >
                  待验收
                </el-button>
              );
            } else {
              return (
                <el-button class="review" onClick={(e) => this.feedback()}>
                  已验收
                </el-button>
              );
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
    };
  },
  created() {},

  methods: {
    headerButtonMethods(type) {
      if (type == "xinzeng") {
        this.$refs.applyDialogRef.open();
      } else if (type == "chaxun") {
        this.$refs.viewDialogRef.open();
      } else if (type == "chongzhi") {
      }
    },
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row, type);
          break;
        case "yanshoushenqing":
          this.$refs.applyDialogRef.open(row, type);
          break;
        case "yanshou2":
          this.$refs.acceptanceDialogRef.open(row, type);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await adpInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.rectification {
  border: 1px solid #f7cf74;
  color: #e9b44d;
  background: #fff9f2;
}
.violationsLabel {
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
}
.header {
  display: flex;
  justify-content: end;
}
/deep/ .header p {
  margin: 8px 0;
  font-size: 14px;
  color: #00b5ff;
  font-weight: bold;
  cursor: pointer;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
/deep/ .returnBtn .el-button {
  padding: 8px 8px;
}
.returnBtn {
  display: flex;
  justify-content: center;
}
/deep/.el-button--success {
  background: #17b693;
}
/deep/.el-button--success:hover {
  background: hsl(179, 39%, 58%);
  border-color: hsl(179, 39%, 58%);
  color: #fff;
}
</style>
