<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="checkboxChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <view-dialog ref="viewDialogRef"></view-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import viewDialog from "./components/viewDialog";
export default {
  mixins: [tableMixins, dict],
  components: { viewDialog },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      search_data: {},
      search_item: [
        {
          prop: "time",
          type: "Date",
          placeholder: "发现时间起",
          disabled: false,
          width: "200px",
        },
        {
          prop: "time",
          type: "Date",
          placeholder: "发现时间止",
          disabled: false,
          width: "200px",
        },
        {
          prop: "deptName",
          type: "Select",
          placeholder: "审核状态",
          disabled: false,
          width: "200px",
          children: [],
        },
        {
          prop: "deptName",
          type: "Select",
          placeholder: "隐患等级",
          disabled: false,
          width: "200px",
          children: [],
        },
      ],
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
          field: "sex",
          title: "发现时间",
          align: "center",
        },
        {
          field: "sfz",
          title: "隐患描述",
          align: "center",
        },
        {
          field: "departmentName",
          title: "隐患发现人",
          align: "center",
        },
        {
          field: "cj",
          title: "隐患照片",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-image
                style="width: 100px; height: 100px"
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
      tableData: [{}],
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    async getList() {
      let params = {
        ...this.search_data,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      getListAPI(params).then((res) => {});
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "chongzhi") {
        this.search_data = {};
      }
    },
    change() {},
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      console.log(22222);
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(type, row);
          break;
      }
    },
    checkboxChange(data) {
      console.log(data.data);
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
