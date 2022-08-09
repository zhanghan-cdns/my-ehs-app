<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header>
          <header-search :searchData="search_data" :searchItem="search_item" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </header>
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
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <fabu-dialog
      ref="fabuDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></fabu-dialog>
    <look-dialog
      ref="lookDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></look-dialog>
    <evaluation-dialog
      ref="evaluationDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></evaluation-dialog>
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
import editDialog from "./components/editDialog.vue";
import fabuDialog from "./components/fabuDialog.vue";
import lookDialog from "./components/lookDialog.vue";
import evaluationDialog from "./components/evaluationDialog.vue";
import viewDialog from "./components/viewDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    lookDialog,
    fabuDialog,
    evaluationDialog,
    viewDialog,
  },
  name: "indexProvide",
  data() {
    return {
      search_item: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "请输入演练计划",
          disabled: false,
          width: "200px",
          children: "",
        },
        {
          prop: "courseNames",
          type: "SelectDict",
          placeholder: "演练级别",
          disabled: false,
          width: "200px",
          children: "",
        },
      ],
      search_data: {
        label: "test",
      },
      tableData: [{ safetyTarget: "1" }],
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
          field: "year",
          title: "年度",
          align: "center",
        },
        {
          field: "month",
          title: "月份",
          align: "center",
        },
        {
          field: "exercisePlan",
          title: "演练计划",
          align: "center",
        },
        {
          field: "organizer",
          title: "主办单位",
          align: "center",
        },
        {
          field: "responsePlan",
          title: "应急预案",
          align: "center",
        },
        {
          field: "level",
          title: "演练级别",
          align: "center",
        },
        {
          field: "rehearsalTime",
          title: "计划演练时间",
          align: "center",
        },
        {
          field: "note",
          width:200,
          title: "状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div class="returnBtn">
                <el-button class="Btn" onClick={(e) => this.add()}>
                  已发布
                </el-button>
              </div>
            );
          },
        },

        {
          title: "操作",
          align: "center",
          fixed: "right",
          width: 300,
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
      headvalue: "",
    };
  },
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type === "chaxun") {
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.lookDialogRef.open(type, row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(type, row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "fabu2":
          this.$refs.fabuDialogRef.open(type, row);
          break;
        case "xinzengpingjia":
          this.$refs.evaluationDialogRef.open(type, row);
          break;
         case "chakanpingjia":
           this.$refs.viewDialogRef.open(type, row);
           break;
      }
    },

    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await sdpInfoDeleteAPI({
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
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.Btn {
  width: 60%;
  color: #008eff;
  border: 1px solid #008eff;
  font-weight: bold;
  background-color: #ebfafd;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.violationsLabel {
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
}
</style>
