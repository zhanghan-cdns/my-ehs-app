<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入法律法规名称"
              clearable
              v-model="query.flfgmc"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-select
              placeholder="请选择大类别"
              clearable
              v-model="query.dlb"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in dlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择小类别"
              clearable
              v-model="query.xlb"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in xlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
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
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
    <distinguish-dialog ref="distinguishDialogRef"></distinguish-dialog>
    <sub-category-dialog ref="subCategoryDialogRef"></sub-category-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import distinguishDialog from "./components/distinguishDialog.vue";
import subCategoryDialog from "./components/subCategoryDialog.vue";
import {
  standardLibraryListAPI,
  standardLibraryDeleteAPI,
} from "@/api/institutionalized/lawsRegulations/standardLibrary";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    distinguishDialog,
    subCategoryDialog,
  },
  data() {
    return {
      dlbList: [],
      xlbList: [],
      tableData: [
        {
          flfgmc: "111",
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
          field: "dlb",
          title: "大类别",
          align: "center",
        },
        {
          field: "xlb",
          title: "小类别",
          align: "center",
        },
        {
          field: "flfgmc",
          title: "法律法规名称",
          align: "center",
        },
        {
          field: "fgbh",
          title: "法规编号",
          align: "center",
        },
        {
          field: "fbjg",
          title: "发布机构",
          align: "center",
        },
        {
          field: "qyrq",
          title: "启用日期",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            if (row.status) {
              return (
                <operate-button
                  operateButtonList={this.operateButtonList2}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            } else {
              return (
                <operate-button
                  operateButtonList={this.operateButtonList1}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            }
          },
        },
      ],
      operateButtonList1: ["chakan", "bianji", "shanchu", "weishibie"],
      operateButtonList2: ["chakan", "bianji", "shanchu", "shibie"],
      query: {
        flfgmc: "",
        dlb: "",
        xlb: "",
      },
      ids: [],
    };
  },

  created() {
    this.getTableData({ query: this.query });
  },

  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData({ query: this.query });
        case "chongzhi":
          this.query = {
            flfgmc: "",
            dlb: "",
            xlb: "",
          };
          this.getTableData({ query: this.query });
          break;
        case "xiaoleibie":
          this.$refs.subCategoryDialogRef.open();
          break;
      }
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      console.log(records, "records");
    },

    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      if (query) {
        params = {
          ...params,
          ...query,
        };
      }
      const res = await standardLibraryListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.total;
      }
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "weishibie":
          this.$refs.distinguishDialogRef.open(row);
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
          const res = await standardLibraryDeleteAPI({
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
  },
};
</script>

<style lang="scss" scoped></style>
