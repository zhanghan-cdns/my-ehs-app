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
              v-model="query.job"
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
      :dictConfig="{dutyAllocationYear,dutyAllocationType,dutyAllocationCheckFrequency}"
      @refresh="getTableData()"
    ></edit-dialog>
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
} from "@/api/duty/duty_assess_record/index";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        job: "",
      },
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
          field: "job",
          title: "岗位名称",
          align: "center",
        },
        // {
        //   field: "checkRate",
        //   title: "姓名",
        //   align: "center",
        // },
        {
          field: "safetyDuty",
          title: "安全职责",
          align: "center",
        },
        {
          field: "award",
          title: "安全职责考核奖励情况",
          align: "center",
        },
        {
          field: "punishment",
          title: "安全职责考核惩罚情况",
          align: "center",
        },
        {
          field: "result",
          title: "安全职责年度考核结果",
          align: "center",
        },

        {
          field: "checker",
          title: "考核人",
          align: "center",
        },
         {
          field: "assessDate",
          title: "考核日期",
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
    };
  },
  created() {
    this.getTableData()
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {
          job: "",
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
