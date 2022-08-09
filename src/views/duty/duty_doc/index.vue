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
              v-model="query.jobName"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <el-select
              placeholder="请选择部门"
              v-model="query.deptName"
              style="width: 200px; margin-right: 5px"
            >
              <el-option></el-option>
            </el-select>
            <el-select placeholder="请选择下发状态" v-model="query.status">
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
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <!-- :span-method="mergeRowMethod" -->
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData()"
    ></edit-dialog>
    <view-dialog
      ref="viewDialogRef"
      :dictConfig="{}"
      @refresh="getTableData()"
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
  safeInfoListAPI,
  safeInfoDeleteAPI,
  safeInfoUpdateAPI,
  safeInfoSendAPI,
} from "@/api/duty/duty_doc/index";
import dayjs from "dayjs";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewDialog,
  },
  name: "indexProvide",
  // dayjs().format("YYYY-MM-DD HH:mm:ss");
  data() {
    return {
      query: {
        jobName: "",
        deptName: "",
        status: "",
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
          field: "year",
          title: "年度",
          align: "center",
        },
        {
          field: "jobName",
          title: "岗位名称",
          align: "center",
        },
        {
          field: "deptName",
          title: "所属部门",
          align: "center",
        },
        {
          field: "updateTime",
          title: "更新时间",
          align: "center",
          // render: (h, { row }) => {
          //   return <div>{this.$dayjs(row.updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>;
          // },
        },
        {
          field: "leader",
          title: "领导签订",
          align: "center",
          render: (h, { row }) => {
            if (row.status == "0") {
              return <div class="signedNot">未签订</div>;
            } else if (row.status > Number("1")) {
              <div class="Signed">已签订</div>;
            }
          },
        },
        {
          field: "checkRate",
          title: "岗位签订",
          align: "center",
          render: (h, { row }) => {
            if (row.checkRate) {
              return (
                <div class="status">
                  <span style="color:#4A80FC">12</span>/
                  <span style="color:#999999">98</span>
                </div>
              );
            }
          },
        },
        {
          field: "status",
          title: "下发状态",
          align: "center",
          render: (h, { row }) => {
            if (row.status == "0") {
              return <div class="issue-not">未下发</div>;
            } else if (row.status == "1") {
              return <div class="issue">已下发</div>;
            }
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
      ids: [],
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
          jobName: "",
          deptName: "",
          status: "",
        };
        this.getTableData();
      } else if (type === "piliangxiafa") {
        this.deleteSomeTable();
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
          // this.ids = [row.id];
          this.deleteData(row);
          break;
        case "xiafa":
          this.issueData(row);
          break;
      }
    },
    // 批量删除
    deleteSomeTable() {
      if (this.ids.length == 0) {
        return this.$message.warning("请勾选需要删除的数据");
      }
      this.deleteDatas();
    },

    async deleteDatas() {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await safeInfoSendAPI({
            ids: this.ids.join(","),
          });
          if (res.code === 200) {
            this.$message.success("下发成功");
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async issueData(row) {
      row.status = "1";
      row.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      // row.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.$confirm("确认下发安全责任书吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await safeInfoUpdateAPI({
            id: row.id,
            ...row,
          });
          if (res.code === 200) {
            this.$message.success("下发成功");
            this.getTableData();
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await safeInfoDeleteAPI({
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

      const res = await safeInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },

    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
      console.log(this.ids, "ids");
    },
    // mergeRowMethod({ row, _rowIndex, column, visibleData }) {
    //   const fields = ["year"];
    //   const cellValue = row[column.property];
    //   if (cellValue && fields.includes(column.property)) {
    //     const prevRow = visibleData[_rowIndex - 1];
    //     let nextRow = visibleData[_rowIndex + 1];
    //     if (prevRow && prevRow[column.property] === cellValue) {
    //       return { rowspan: 0, colspan: 0 };
    //     } else {
    //       let countRowspan = 1;
    //       while (nextRow && nextRow[column.property] === cellValue) {
    //         nextRow = visibleData[++countRowspan + _rowIndex];
    //       }
    //       if (countRowspan > 1) {
    //         return { rowspan: countRowspan, colspan: 1 };
    //       }
    //     }
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
/deep/.signedNot {
  width: 81px;
  height: 33px;
  line-height: 33px;
  margin: 0 auto;
  background: #dcdfe6;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  color: #999999;
}

/deep/.signed {
  width: 81px;
  height: 33px;
  background: #4a80fc;
  line-height: 33px;
  margin: 0 auto;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  color: #ffff;
}
/deep/ .issue-not {
  width: 78px;
  height: 32px;
  line-height: 33px;
  margin: 0 auto;
  background: #fffdf0;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px dashed #faad14;
  color: #faad14;
}

/deep/ .issue {
  width: 78px;
  height: 32px;
  line-height: 33px;
  margin: 0 auto;
  background: #fffdf0;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px dashed #52c41a;
  color: #52c41a;
}
</style>
