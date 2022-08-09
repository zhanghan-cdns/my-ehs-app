<!--suppress ALL -->
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
              v-model="query.lawsName"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-select
              placeholder="请选择大类别"
              clearable
              v-model="query.largeCategory"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in largeCategoryList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
            <el-select
              placeholder="请选择小类别"
              clearable
              v-model="query.subCategory"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in subCategoryList"
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
    <distinguish-dialog
      ref="distinguishDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></distinguish-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
    <approval-dialog ref="approvalDialogRef"></approval-dialog>
    <export-dialog ref="exportDialogRef"></export-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import distinguishDialog from "@/views/institutionalized/lawsRegulations/standardLibrary/components/distinguishDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import approvalDialog from "./components/approvalDialog.vue";
import exportDialog from "./components/exportDialog.vue";
import {
  lawIdentifyListAPI,
  lawIdentifyDeleteAPI,
} from "@/api/institutionalized/lawsRegulations/lawIdentify";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    viewDialog,
    distinguishDialog,
    approvalDialog,
    exportDialog,
  },
  data() {
    return {
      largeCategoryList: [],
      subCategoryList: [],
      tableData: [
        {
          id: "001",
          status: "0",
        },
        {
          id: "002",
          status: "1",
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
          field: "largeCategory",
          title: "大类别",
          align: "center",
        },
        {
          field: "subCategory",
          title: "小类别",
          align: "center",
        },
        {
          field: "lawsName",
          title: "法律法规名称",
          align: "center",
        },
        {
          field: "fileNumber",
          title: "文件编号",
          align: "center",
        },
        {
          field: "issuingDepartment",
          title: "颁布单位",
          align: "center",
        },
        {
          field: "releaseDate",
          title: "发布日期",
          align: "center",
        },
        {
          field: "approvalStatus",
          title: "状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.approvalStatus === "0") {
              return (
                <el-button size="mini" class="status-button approval">
                  待审批
                </el-button>
              );
            } else if (row.approvalStatus === "1") {
              return (
                <el-button size="mini" class="status-button inapproval">
                  审批中
                </el-button>
              );
            } else if (row.approvalStatus === "2") {
              return (
                <el-button size="mini" class="status-button release">
                  发布
                </el-button>
              );
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
      query: {
        lawsName: "",
        largeCategory: "",
        subCategory: "",
      },
      ids: [],
    };
  },

  created() {
    // this.getTableData({ query: this.query });
  },

  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.distinguishDialogRef.open();
          break;
        case "chaxun":
          this.getTableData({ query: this.query });
        case "chongzhi":
          this.query = {
            lawsName: "",
            largeCategory: "",
            subCategory: "",
          };
          this.getTableData({ query: this.query });
          break;
        case "daochubaogao":
          this.$refs.exportDialogRef.open(this.ids);
          break;
      }
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
      const res = await lawIdentifyListAPI(params);
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
          this.$refs.distinguishDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "shenpi":
          this.$refs.approvalDialogRef.open(row);
          break;
      }
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids.join(",");
    },

    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await lawIdentifyDeleteAPI({
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

<style lang="scss" scoped>
/deep/ .status-button {
  width: 71px;
}

/deep/ .approval {
  color: #f17d08;
  background-color: #fff8f3;
  border: 1px solid #f17d08;
}

/deep/ .inapproval {
  color: #d8ad00;
  background-color: #fff7e2;
  border: 1px solid #c7a500;
}

/deep/ .release {
  color: #0080ff;
  background-color: #e2f3ff;
  border: 1px solid #149efb;
}
</style>
