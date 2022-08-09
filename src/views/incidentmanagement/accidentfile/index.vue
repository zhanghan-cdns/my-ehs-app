<template>
  <div>
    <list-container>
      <template #left>1424</template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入事故编码"
              clearable
              v-model="query.job"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-input
              placeholder="请输入事故名称"
              clearable
              v-model="query.job"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select placeholder="事故类型" clearable v-model="query.job">
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
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <view-dialog ref="viewDialogRef" @refresh="getTableData()"></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import viewDialog from "./components/viewDialog.vue";
import {
  adpInfoListAPI,
  sdpInfoDeleteAPI,
} from "@/api/incidentmanagement/accidentexpress/index";
import { imgUrl } from "@/router/axios";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    viewDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        job: "",
      },
      IMG_URL: imgUrl,
      tableData: [{ status: "1" }],
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
          title: "事故编号",
          align: "center",
        },
        {
          field: "safetyDuty",
          title: "上报人",
          align: "center",
        },
        {
          field: "editor",
          title: "事故名称",
          align: "center",
        },
        {
          field: "attachment",
          title: "伤害等级",
          align: "center",
        },
        {
          field: "attachment",
          title: "事故等级",
          align: "center",
        },
        {
          field: "attachment",
          title: "事故类型",
          align: "center",
        },
        {
          field: "attachment",
          title: "发生时间",
          align: "center",
        },
        {
          field: "审批状态",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
            if (row.status == "1") {
              return <div class="investigation">审批中</div>;
            } else {
              return <div class="investigation-under">审批完成</div>;
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
  created() {
    this.getTableData();
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "chaxun") {
        this.getTableData();
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
          this.$refs.viewDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.viewDialogRef.open(row);
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
/deep/ .investigation {
  width: 71px;
  height: 31px;
  line-height: 31px;
  background: #fffcf1;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #eba843;
  color: #e1ad04;
  margin: 0 auto;
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
