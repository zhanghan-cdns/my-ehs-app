<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <label for="mettingTheme" class="projectLabel">项目名称</label>
            <el-input
              placeholder="请输入项目名称"
              clearable
              id="mettingTheme"
              v-model="query.projectName"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
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
    <toview-dialog
      ref="toviewDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></toview-dialog>
    <add-dialog
      ref="addDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></add-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import { projectmanageListAPI } from "@/api/stakeholdermanagement/index";
import dictMixin from "@/mixins/dict";
import addDialog from "./addDialog.vue";
import toviewDialog from "./toviewDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { addDialog, toviewDialog },
  name: "indexProvide",
  data() {
    return {
      query: {
        projectName: "",
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
          field: "projectType",
          title: "项目类型",
          align: "center",
        },
        {
          field: "projectName",
          title: "项目名称",
          align: "center",
        },
        {
          field: "serviceContent",
          title: "服务项目内容",
          width: 150,
          align: "center",
        },
        {
          field: "projectLeader",
          title: "项目负责人",
          align: "center",
          width: 150,
        },
        {
          field: "projectContractFunds",
          title: "项目合同资金(万元)",
          align: "center",
        },
        {
          title: "操作",
          width: 250,
          align: "center",
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
    this.getTableData(0);
  },

  methods: {
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...this.query,
      };
      const res = await projectmanageListAPI(params);
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    headerButtonMethods(type, row) {
      if (type === "xinzeng") {
        this.$refs.addDialogRef.open(row, "xinzeng");
      } else if (type === "chaxun") {
        this.getTableData();
      }
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          console.log(type);
          this.$refs.toviewDialogRef.open(row, "chakan");
          this.getTableData();

          break;
        case "bianji":
          console.log(this.isDisabled);
          this.$refs.addDialogRef.open(row, "bianji");
          break;
        case "shanchu":
          
      }
    },
  },
};
</script>

<style scoped lang="scss">
.projectLabel {
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
