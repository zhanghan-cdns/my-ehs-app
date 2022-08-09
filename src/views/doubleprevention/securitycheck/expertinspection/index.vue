<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button @headerButtonClick="headerButtonMethods">
          </header-button>
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
    <add-dialog ref="addDialogRef"></add-dialog>
    <review-records
      ref="reviewRecordsRef"
      :dict="{ commonJudge }"
    ></review-records>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import addDialog from "./components/addDialog";
import reviewRecords from "./components/reviewRecords";
export default {
  mixins: [tableMixins, dict],
  components: { addDialog, reviewRecords },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      search_data: {},
      search_item: [
        {
          prop: "deptName",
          type: "Select",
          placeholder: "整改状态",
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
          title: "检查单位",
          align: "center",
        },
        {
          field: "sfz",
          title: "检查人员",
          align: "left",
        },
        {
          field: "departmentName",
          title: "整改期限",
          align: "center",
        },
        {
          field: "cj",
          title: "整改负责人",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          render: (h, { row, column, $index }) => {
            //  再次复查
            return (
              <div class="operateButton">
                <div
                  on-click={() => {
                    this.operateButtonClick("chakan");
                  }}
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="查看"
                    placement="top"
                    popper-class="testtooltip"
                  >
                    <i class="iconfont icon-chakan2" style="color: #4a80fc"></i>
                  </el-tooltip>
                </div>
                <div
                  on-click={() => {
                    this.operateButtonClick("ccfucha");
                  }}
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="初次复查"
                    placement="top"
                    popper-class="testtooltip"
                  >
                    <i
                      class="iconfont icon-a-zu20175"
                      style="color: #497FFB"
                    ></i>
                  </el-tooltip>
                </div>
                <div
                  on-click={() => {
                    this.operateButtonClick("zcfucha");
                  }}
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="再次复查"
                    placement="top"
                    popper-class="testtooltip"
                  >
                    <i
                      class="iconfont icon-a-lujing10094"
                      style="color: #497FFB"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
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
      if (type == "xinzeng") {
        this.$refs.addDialogRef.open(type);
      } else if (type == "chaxun") {
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
          this.$refs.addDialogRef.open(type, row);
          break;
        case "ccfucha":
          this.$refs.addDialogRef.open(type, row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "fucha":
          this.$refs.reviewRecordsRef.open(type, row);
          break;
        case "zcfucha":
          this.$refs.reviewRecordsRef.open(type, row);
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
.btn_orange {
  width: 101px;
  height: 31px;
  background: #fb7543;
  border-radius: 3px;
  border: 1px solid #c13417;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}

.btn_blue {
  width: 101px;
  height: 31px;
  background: #2e82e2;
  border-radius: 3px;
  border: 1px solid #2e82e2;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/.cell_btn {
  height: 28px;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  padding: 0 10px;
  border-radius: 2px;
  min-width: 64px;
  display: inline-block;
  box-sizing: border-box;
}
/deep/ .green {
  background: #fcfffb;
  border: 1px solid #52c41a;
  font-size: 14px;
  color: #52c41a;
  font-weight: 500;
}
/deep/ .red {
  background: #fff8f2;
  border: 1px solid #f5892b;
  font-size: 14px;
  color: #f5892b;
  font-weight: 500;
}
/deep/ .yellow {
  background: #fff9e9;
  border: 1px solid #ffbb00;
  font-size: 14px;
  color: #ffbb00;
  font-weight: 500;
}
/deep/.operateButton {
  display: flex;
  justify-content: space-around;
  div {
    width: 22px;
    height: 18px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
