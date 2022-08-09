<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <label for="mettingTheme" class="violationsLabel">违章相关方</label>
            <el-input
              placeholder="请输入违章相关方"
              clearable
              id="mettingTheme"
              v-model="query.contractor"
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
    <record-dialog
      ref="recordDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></record-dialog>
    <history-dialog
      ref="historyDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></history-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import recordDialog from "./recordDialog.vue";
import historyDialog from "./historyDialog.vue";
import { informationUrlListAPI } from "@/api/stakeholdermanagement/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: { recordDialog, historyDialog },
  name: "indexProvide",
  data() {
    return {
      query: {
        contractor: "",
      },
      tableData: [],
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
          field: "contractor",
          title: "违章相关方",
          align: "center",
        },
        {
          field: "violationName",
          title: "违章人姓名",
          align: "center",
        },
        {
          field: "violationDate",
          title: "违章日期",
          width: 150,
          align: "center",
        },
        {
          field: "projectName",
          title: "项目名称",
          align: "center",
          width: 150,
        },
        {
          field: "pointsDeducted",
          title: "扣分分值",
          align: "center",
        },
        {
          field: "rater",
          title: "评定人",
          align: "center",
        },
         {
          field: "assess",
          title: "相关责任人",
          align: "center",
        },
        {
          title: "操作",
          width: 300,
          align: "center",
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <div class="returnBtn">
                <el-button
                  type="success"
                  class="Btn"
                  onClick={(e) => this.add()}
                >
                  添加违规记录
                </el-button>
                <el-button
                  type="primary"
                  class="Btn"
                  onClick={(e) => this.look(row)}
                >
                  查看历史记录
                </el-button>
              </div>
            );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
  },

  methods: {
    add() {
      this.$refs.recordDialogRef.open();
    },
    look(row) {
      this.$refs.historyDialogRef.open(row);
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },
    headerButtonMethods(type) {
      if (type === "chaxun") {
        this.getTableData();
      }
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...this.query
      };
      const res = await informationUrlListAPI(params);
      if (res.code === 200) {
        // console.log(res);
         this.tableData = res.data.content;
         this.page.totalResult = res.data.totalElements;
      }
    },
    
  },
};
</script>

<style scoped lang="scss">
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
