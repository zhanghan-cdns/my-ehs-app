<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入岗位名称"
              clearable
              v-model="query.safetyTarget"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select
              placeholder="请选择部门"
              v-model="query.targetType"
              style="width: 200px; margin-right: 5px"
            >
              <el-option></el-option>
            </el-select>
            <el-select placeholder="请选择下发状态" v-model="query.checkRate">
              <el-option></el-option>
            </el-select>
            <!-- <el-select
              clearable
              style="width:200px;width:200px;margin-right: 5px"
              v-model="query.trainingResult"
              placeholder="请选择培训结果"
            >
              <el-option
                v-for="item in eduList"
                :key="item.dictValue"
                :label="item.dictValueName"
                :value="item.dictValue"
              ></el-option>
            </el-select> -->
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
import viewDialog from "./components/viewDialog.vue";
import {
  adpInfoListAPI,
  sdpInfoDeleteAPI,
} from "@/api/duty/duty_doc/index";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewDialog
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
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyTarget",
          title: "年度",
          align: "center",
        },
        {
          field: "targetCode",
          title: "岗位名称",
          align: "center",
        },
        {
          field: "year",
          title: "所属部门",
          align: "center",
        },
        {
          field: "targetName",
          title: "更新时间",
          align: "center",
        },
        {
          field: "targetType",
          title: "领导签订",
          align: "center",
        },
        {
          field: "checkRate",
          title: "岗位签订",
          align: "center",
        },
        {
          field: "checkValue",
          title: "下发状态",
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
    };
  },
  created() {},
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {
          // restrictSpaceName:""
        };
        // this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "xiafa":
          this.issueData(row);
          break;
      }
    },
    async issueData(row){
       this.$confirm("确认下发安全责任书吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(222)
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });

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
