<template>
  <div>
    <list-container>
      <template #left>1424</template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入目标指标名称"
              clearable
              v-model="query.targetCode"
              style="width: 200px; margin-right: 5px"
            ></el-input>

            <el-select
              placeholder="责任部门"
              clearable
              v-model="query.department"
              :style="`width:${width}`"
              :size="size"
              :isDisabled="isDisabled"
              style="width: 200px; margin-right: 5px"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择考核频次"
              clearable
              v-model="query.rate"
              style="width: 200px; margin-right: 5px"
            >
              <el-option
                v-for="item in dutyAllocationCheckFrequency"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
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
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" :dictConfig="{dutyAllocationYear,dutyAllocationCheckFrequency,dutyAllocationType}" @refresh="getTableData()"></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  adpInfoListAPI,
  sdpInfoDeleteAPI,
  sdDepartmentAPI,
} from "@/api/duty/duty_standard_allocation/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        targetCode: "",
        department: "",
        rate: "",
      },
      tableData: [{ year: "1" }],
      columns: [
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
          render: (h, { row}) => {
            if (row.year) {
              return <span>{row.year.value ? row.year.value : ""}</span>;
            }
          },
        },
        {
          field: "department",
          title: "责任部门",
          align: "center",
        },
        {
          field: "targetName",
          title: "目标指标名称",
          align: "center",
        },
        {
          field: "rate",
          title: "频次",
          align: "center",
           render: (h, { row}) => {
            if (row.rate) {
              return <span>{row.rate.value ? row.rate.value : ""}</span>;
            }
          },
        },
        {
          field: "checkMeasure",
          title: "考核办法",
          align: "center",
        },
        {
          field: "targetValue",
          title: "目标值",
          align: "center",
        },
        {
          field: "checkValue",
          title: "考核指标",
          align: "center",
        },
        {
          field: "designer",
          title: "制定人",
          align: "center",
        },

        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row}) => {
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
      dutyAllocationCheckFrequency: [], //考核频次
    };
  },
  created() {

    this.getTableData();
  },
  methods: {
    // 获取责任部门
    async getDepartment() {
      try {
        const res = await sdDepartmentAPI();
        if (res.code === 200) {
          this.departmentList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData();
      } else if (type === "chongzhi") {
        this.query = {
          targetCode: "",
          department: "",
          rate: "",
        };
        this.getTableData();
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
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...this.query,
      };
      const res = await adpInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
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
