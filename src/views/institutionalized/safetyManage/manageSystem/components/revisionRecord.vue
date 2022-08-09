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
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-revision-dialog ref="viewRevisionDialogRef"></view-revision-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./dialog/editDialog.vue";
import viewRevisionDialog from "./dialog/viewRevisionDialog.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    viewRevisionDialog,
    HeaderContainer,
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
      headerButtonList: ["chakan", "xiuding"],
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
          title: "制度编号",
          align: "center",
        },
        {
          field: "zdmc",
          title: "制度名称",
          align: "center",
        },
        {
          field: "xlb",
          title: "版本号",
          align: "center",
        },
        {
          field: "xlb",
          title: "发布日期",
          align: "center",
        },
        {
          field: "xlb",
          title: "修订日期",
          align: "center",
        },
      ],
      row: {},
    };
  },

  watch: {
    selectRowData: function (val) {
      console.log(val, "record");
      this.getTableData(val);
    },
  },

  created() {
    this.getTableData(this.selectRowData);
  },

  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "chakan":
          if (this.viewData) {
            this.$refs.viewRevisionDialogRef.open(this.viewData);
          } else {
            this.$message.warning("请选择查看项");
          }
          break;
        case "xiuding":
          this.$refs.editDialogRef.open(this.row, type);
          break;
      }
    },

    async getTableData(data) {
      let dataArr = [];
      dataArr.push(data);
      this.tableData = dataArr;
      console.log(dataArr, "tabledata");
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
