<!--  -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入被考核相关方"
              clearable
              v-model="query.job"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select placeholder="请选择评定等级">
              <el-option></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager
          :page="page"
          @pageChange="pageChange"
        ></basicPager></template
    ></list-container>
    <add-dialog ref="addDialogRef" @refresh="getTableData()"></add-dialog>
    <evaluate-dialog ref="evaluateDialogRef" @refresh="getTableData()"></evaluate-dialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog.vue";
import evaluateDialog from "./components/evaluateDialog.vue";
import {getListAPI,deleteAPI,importdataAPI,importtemplateAPI} from "@/api/stakeholdermanagement/assessmentmanage";
export default {
  components: {
    addDialog,
    evaluateDialog
  },
  data() {
    return {
      query: {
        job: "",
      },
      sizeCon: {
        height:"600px",
      },
      tableData: [{ status: "0" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "job",
          title: "被考核相关方",
          align: "center",
        },
        {
          field: "safetyDuty",
          title: "考核日期",
          align: "center",
        },
        {
          field: "editor",
          title: "标题",
          align: "center",
        },
        {
          field: "attachment",
          title: "得分",
          align: "center",
        },
        {
          field: "attachment",
          title: "考核结果",
          align: "center",
        },
        {
          field: "status",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
            if (row.status == "0") {
              return (
                <div
                  class="investigation"
                  onClick={(e) => this.downCheckNum(e, row)}
                >
                  未评定
                </div>
              );
            } else if (row.status == "1") {
              return <div class="investigation-under">已评定</div>;
            }
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
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
  mounted() {},
  methods: {
    getList(){
    
    },
    headerButtonMethods(type) {
      if (type === "pingdingneirongshezhi") {
        this.$refs.addDialogRef.open();
      } else if (type === "pingding") {
         this.$refs.evaluateDialogRef.open();
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.evaluateDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.evaluateDialogRef.open(row);
          break;
      }
    },
    // async deleteData(row) {
    //   this.$confirm("确定删除该条数据吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(async () => {
    //       const res = await sdpInfoDeleteAPI({
    //         ids: row.id,
    //       });
    //       if (res.code === 200) {
    //         this.$message.success("删除成功");
    //         this.getTableData();
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.info("已取消删除");
    //     });
    // },
    // async getTableData() {
    //   let params = {
    //     "queryParams[pageNum]": this.page.currentPage,
    //     "queryParams[pageSize]": this.page.pageSize,
    //     ...this.query,
    //   };
    //   const res = await adpInfoListAPI(params);
    //   if (res.code === 200) {
    //     this.tableData = res.data.content;
    //     this.page.totalResult = res.data.totalElements;
    //   }
    // },
  },
};
</script>
<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
/deep/ .investigation {
  width: 71px;
  height: 31px;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  color: #f15008;
  margin: 0 auto;
  background: #fff6f2;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #f15008;
}
/deep/ .investigation-under {
  width: 71px;
  height: 31px;
  line-height: 31px;
  background: #f1f8ff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #438ceb;
  color: #1f84ec;
  margin: 0 auto;
}
</style>