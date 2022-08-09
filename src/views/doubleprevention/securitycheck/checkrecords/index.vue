<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header>
          <header-search :searchData="search_data" :searchItem="search_item" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </header>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refresh="getTableData()"></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
  },
  name: "index",
  data() {
    return {
      search_item: [
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择检查人",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Date",
          placeholder: "请选择检查时间",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择检查类别",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择状态",
          disabled: false,
          width: "200px",
          children: [],
        },
      ],
      search_data: {},
      tableData: [{ sourceOfHiddenDanger: "124" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "sourceOfHiddenDanger",
          title: "任务名称",
          align: "center",
        },
        {
          field: "hiddenLevel",
          title: "检查人",
          align: "center",
        },
        {
          field: "hiddenFactors",
          title: "检查时间",
          align: "center",
        },
        {
          field: "rectificationDepartment",
          title: "检查结果",
          align: "center",
          render: (h, { row }) => {
            if (!row.rectificationDepartment) {
              return <div class="self">无隐患</div>;
            } else if (row.result == "0") {
              return <div class="notStarand">有隐患</div>;
            }
          },
        },
        {
          field: "rectifyDate",
          title: "问题备注",
          align: "center",
        },
        {
          field: "rectifyDate",
          title: "现场照片",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-image
                style="width: 50px; height: 50px"
                src={
                  "https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200"
                }
                preview-src-list={[
                  "https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200",
                  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-04-23%2F5add84fa3acde_120_80.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659342970&t=db8054ee60c380d5d3976217dccab3a2",
                ]}
              ></el-image>
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
                operateButtonList={this.operateButtonList}
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
  methods: {
    headerButtonMethods(type) {
      if (type === "chaxun") {
        console.log(this.search_data, "search_data");
      } else if (type === "chongzhi") {
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(type, row);
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .notStarand {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #FFF0F0;
  border: 1px solid #FF4646;
  color: #FF4646;
  border-radius: 4px;
}

/deep/ .self {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #F0F5FF;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #4A80FC;
  color: #4A80FC;
  margin:0 auto;
  border-radius: 4px;
}
</style>
