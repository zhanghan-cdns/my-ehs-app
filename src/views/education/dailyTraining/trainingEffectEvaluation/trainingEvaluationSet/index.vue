<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            :mergeRowMethod="mergeRowMethod"
            @currentChange="currentChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dict="{commonJudge}"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
export default {
  components: {editDialog},
  mixins: [tableMixins,dict],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "姓名",
          align: "center",
        },
        {
          field: "gh",
          title: "评估项",
          align: "center",
        },
        {
          field: "pxlx",
          title: "评估等级",
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
      tableData: [
        {
          xm: "张三",
          gh: "111",
          pxlx: "日常",
          pxkc: "课程",
        },
        {
          xm: "张三",
          gh: "111",
          pxlx: "日常222",
          pxkc: "课程",
        },
        {
          xm: "张三",
          gh: "111",
          pxlx: "日常3333",
          pxkc: "课程",
        },
      ],
      courseList: [],
      choseRow: "", //选中行
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async getList() {
      let params = {
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
      this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type == "chakan") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "bianji") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "shanchu") {
        this.delete(row.id);
      }
    },
    // 删除
    async delete(id) {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteAPI({ ids: id });
          if (res.code === 200) {
            this.getList();
            this.$message.success("删除成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    //合并单元格
    // 通用行合并函数（将相同多列数据合并为一行）
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      const fields = ["xm"];
      const cellValue = row[column.property];
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },
    //打开奖惩弹窗
    openRewardsDialog() {
      if (!this.choseRow) {
        this.$message.warning("请先选中奖惩人");
        return;
      }
      this.$refs.rewardsDialogRef.open();
    },
    //选中行
    currentChange(row) {
      this.choseRow = this.tableData[row.$rowIndex];
      console.log(this.choseRow);
    },
    //打开线下
    openOffline(){
      this.$refs.editDialogRef.open("chakan");
    }
  },
};
</script>
<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  cursor: pointer;
  display: inline-block;
  width: 72px;
  height: 30px;
  background: #fffcf5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #faad14;
  color: #989898;
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  .jp {
    width: 22px;
    height: 22px;
  }
}
/deep/.div-headerbutton {
  display: flex;
  align-items: center;
}
/deep/.cell_btn {
  width: 74px;
  height: 30px;
  background: #fbfff9;
  border-radius: 2px 2px 2px 2px;
   font-size: 12px;
  text-align: center;
  line-height: 30px;
   margin: 0 auto;
}
/deep/.green {
  border: 1px solid #52c41a;
  color: #52c41a;
}
/deep/.red {
  border: 1px solid #ff4646;
  color: #ff4646;
  margin: 0 auto;
}

/deep/.orange {
  border: 1px solid #faad14;
  color: #faad14;
}

/deep/.blue {
  border: 1px solid #409eff;
  color: #409eff;
}
</style>
