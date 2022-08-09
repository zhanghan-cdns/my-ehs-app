<template>
  <div>
    <list-container>
      <template #left>1424</template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              placeholder="请输入申报人姓名"
              clearable
              v-model="query.declarantName"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select
              placeholder="工伤类型"
              clearable
              v-model="query.workInjuryLevel"
            >
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
    <edit-dialog
      ref="editDialogRef"
      @refresh="getTableData()"
      :dictConfig="{ declarantGender, workInjuryLevel }"
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
} from "@/api/incidentmanagement/workinjurydeclaration/index";
import { imgUrl } from "@/router/axios";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        declarantName: "",
        workInjuryLevel: "",
      },
      IMG_URL: imgUrl,
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
          field: "declarantName",
          title: "申报人姓名",
          align: "center",
        },
        {
          field: "declarantGender",
          title: "申报人性别",
          align: "center",
        },
        {
          field: "declarantDep",
          title: "申报人部门",
          align: "center",
        },
        {
          field: "accidentName",
          title: "事故名称",
          align: "center",
        },
        {
          field: "accidentTime",
          title: "事故发生时间",
          align: "center",
        },
        {
          field: "workInjuryLevel",
          title: "工伤类型",
          align: "center",
        },
        {
          field: "declarantTime",
          title: "申报日期",
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
          declarantName: "",
          workInjuryLevel: "",
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
    downCheckNum(e, row) {
      this.$refs.viewDialogRef.open(row);
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
  background: #409eff;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #438ceb;
  color: #fff;
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
