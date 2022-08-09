<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <label for="activeName" style="font-size:14px;font-weight:bold;padding-right:10px">活动名称</label>
            <el-input
            id="activeName"
              placeholder="请输入活动名称"
              clearable
              v-model="query.safetyTarget"
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
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./editDialog.vue";
// import { Checkbox } from 'element-ui';
// import editDialog from "@views/duty/commitment/components/editDialog.vue";
// import viewDialog from "@views/duty/commitment/components/viewDialog.vue";
// import { adpInfoListAPI, sdpInfoDeleteAPI } from "@/api/duty/safe/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    // viewDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        safetyTarget: "",
        targetType: "",
        checkRate: "",
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
          field: "safetyTarget",
          title: "活动标题",
          align: "center",
        },
        {
          field: "safetytime",
          title: "活动时间",
          align: "center",
        },
        {
          field: "safetyplace",
          title: "活动地点",
          align: "center",
        },
        {
          field: "hostDepartment",
          title: "主办部门",
          align: "center",
        },
        {
          field: "eventHost",
          title: "活动主持人",
          align: "center",
        },
        {
          field: "state",
          title: "状态",
          align: "center",
            render: (h, { row, column, $index }) => {
            return (
           <div>
              <el-button type="warning" style="width:50%">
                结束
              </el-button>
        
              </div>
              
            );
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
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } 
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
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
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
