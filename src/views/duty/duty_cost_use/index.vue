<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-date-picker
              style="width: 280px; margin-right: 5px"
              v-model="useDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dataTimeChange"
            >
            </el-date-picker>
            <el-input
              placeholder="请输入经办人"
              clearable
              v-model="query.manager"
              style="width: 200px"
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
      @refresh="getTableData()"
      :dictConfig="{ dutyCostBugetType }"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  dcuInfoListAPI,
  dcuInfoDeleteAPI,
} from "@/api/duty/duty_cost_use/index";
import dayjs from "dayjs";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        useDate: "",
        manager: "",
        startTime: "",
        endTime: "",
      },
      useDate: "",
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "useDate",
          title: "日期",
          align: "center",
        },
        {
          field: "department",
          title: "使用部门",
          align: "center",
        },
        {
          field: "type",
          title: "支出项目类别",
          align: "center",
        },
        {
          field: "useOf",
          title: "具体用途",
          align: "center",
        },
        {
          field: "value",
          title: "金额（万元）",
          align: "center",
        },
        {
          field: "manager",
          title: "经办人",
          align: "center",
        },
        {
          field: "checker",
          title: "审核人",
          align: "center",
        },
        {
          field: "approver",
          title: "批准人",
          align: "center",
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
  created() {
    this.getTableData();
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData();
      } else if (type === "chongzhi") {
        this.query = {
          manager: "",
          startTime: "",
          endTime: "",
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
          const res = await dcuInfoDeleteAPI({
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
    // 选中时间查询
    dataTimeChange(val) {
      // this.useDate = val;
      this.query.startTime = val[0] = dayjs().format("YYYY-MM-DD");
      this.query.endTime = val[1] = dayjs().format("YYYY-MM-DD");
    },
    dateFormat(date) {
      //转义时间格式
      return moment(date).format("YYYY-MM-DD");
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        startTime: "",
        endTime: "",
      };
      const res = await dcuInfoListAPI(params);
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
