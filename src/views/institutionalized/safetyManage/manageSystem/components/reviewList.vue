<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <header-button
            :headerButtonList="headerButtonList"
            @headerButtonClick="headerButtonMethods"
          />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <!-- <basicPager :page="page" @pageChange="pageChange"></basicPager> -->
      </template>
    </list-container>
    <review-dialog ref="reviewDialogRef"></review-dialog>
    <view-review-dialog ref="viewReviewDialogRef"></view-review-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import reviewDialog from "./dialog/reviewDialog.vue";
import viewReviewDialog from "./dialog/viewReviewDialog.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],

  components: {
    HeaderContainer,
    reviewDialog,
    viewReviewDialog,
  },

  props: {
    selectRowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      headerButtonList: ["chakan", "pingshen"],
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
          field: "zdbh",
          title: "安全管理制度",
          align: "center",
        },
        {
          field: "zdmc",
          title: "评审主题",
          align: "center",
        },
        {
          field: "xlb",
          title: "评审人",
          align: "center",
        },
        {
          field: "xlb",
          title: "评审日期",
          align: "center",
        },
        {
          field: "xlb",
          title: "地点",
          align: "center",
        },
      ],
      query: {
        aqglmc: "",
      },
      row: {},
    };
  },

  created() {
    this.getTableData(this.selectRowData);
  },

  watch: {
    selectRowData: function (val) {
      console.log(val,'review');
      this.getTableData(val);
    },
  },

  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "chakan":
          if (this.viewData) {
            this.$refs.viewReviewDialogRef.open(this.viewData);
          } else {
            this.$message.warning("请选择查看项");
          }
          break;
        case "pingshen":
          this.$refs.reviewDialogRef.open(this.row);
          break;
      }
    },

    async getTableData(data) {
      console.log(data, "data");
      this.row = data;
      // let params = {
      //   "queryParams[pageNum]": this.page.currentPage,
      //   "queryParams[pageSize]": this.page.pageSize,
      // };

      // const res = await monitoringIndicatorsListAPI(params);
      // if (res.code === 200) {
      //   this.tableData = res.data.content;
      //   this.page.totalResult = res.data.total;
      // }
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
      this.viewData = records[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-right {
  padding: 0px;
}
</style>
