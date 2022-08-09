<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="left">
              <left-tabs
                :tabList="tabList"
                @onTabChange="onTabChange"
              ></left-tabs>
            </div>
          </el-col>
          <el-col :span="20" style="background: #fff">
            <div>
              <header-button @headerButtonClick="headerButtonMethods" />
            </div>
            <dom-size-listen style="flex: 1; height: 85%" v-model="sizeCon">
              <render-table
                @checkbox-change="selectChangeEvent"
                @checkbox-all="selectChangeEvent"
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </el-col>
        </el-row>
      </template>
    </list-container>
    <edit-dialog
      :dictConfig="{}"
      ref="editDialogRef"
      @refresh="getTableData(tabName)"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import leftTabs from "./components/leftTabs.vue";
import editDialog from "./components/editDialog.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],

  components: {
    leftTabs,
    editDialog,
  },

  data() {
    return {
      tabList: [
        {
          value: "fireWork",
          workImgSrc: require("@/assets/images/specialWork/fireWork.png"),
          name: "动火作业",
        },
        {
          value: "spaceWork",
          workImgSrc: require("@/assets/images/specialWork/spaceWork.png"),
          name: "受限空间作业",
        },
        {
          value: "blindWork",
          workImgSrc: require("@/assets/images/specialWork/blindWork.png"),
          name: "盲板抽堵作业",
        },
        {
          value: "highWork",
          workImgSrc: require("@/assets/images/specialWork/highWork.png"),
          name: "高处作业",
        },
        {
          value: "hoistingWork",
          workImgSrc: require("@/assets/images/specialWork/hoistingWork.png"),
          name: "吊装作业",
        },
        {
          value: "electricWork",
          workImgSrc: require("@/assets/images/specialWork/electricWork.png"),
          name: "临时用电",
        },
        {
          value: "groundWork",
          workImgSrc: require("@/assets/images/specialWork/groundWork.png"),
          name: "动土作业",
        },
        {
          value: "roadWork",
          workImgSrc: require("@/assets/images/specialWork/roadWork.png"),
          name: "断路作业",
        },
        {
          value: "repairWork",
          workImgSrc: require("@/assets/images/specialWork/repairWork.png"),
          name: "检维修作业",
        },
      ],
      tabName: "fireWork",
      tableData: [{}],
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
          field: "jobType",
          title: "作业类型",
          align: "center",
        },
        {
          field: "measures",
          title: "措施",
          align: "center",
        },
        {
          field: "sort",
          title: "排序",
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
    };
  },

  created() {
    this.getTableData(this.tabName);
  },

  methods: {
    // 获取tab选择值
    onTabChange(tabName) {
      console.log(tabName, "tabName");
      this.tabName = tabName;
      this.getTableData(tabName);
    },

    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open(this.tabName);
          break;
      }
    },

    async getTableData(tabName) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      let res = {};
      switch (tabName) {
        case "fireWork": // 动火作业
          res = await fireWorkAPI(params);
          break;
        case "spaceWork": // 受限空间作业
          res = await spaceWorkAPI(params);
          break;
        case "blindWork": // 盲板抽堵作业
          res = await blindWorkAPI(params);
          break;
        case "highWork": // 高处作业
          res = await highWorkAPI(params);
          break;
        case "hoistingWork": // 吊装作业
          res = await hoistingWorkAPI(params);
          break;
        case "electricWork": // 临时用电
          res = await electricWorkAPI(params);
          break;
        case "groundWork": // 动土作业
          res = await groundWorkAPI(params);
          break;
        case "roadWork": // 断路作业
          res = await roadWorkAPI(params);
          break;
        case "repairWork": // 检维修作业
          res = await repairWorkAPI(params);
          break;
      }
      if (res && res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.total;
      }
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(this.tabName, row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(this.tabName, row, "bianji");
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
          //   const res = await monitoringIndicatorsDeleteAPI({
          //     ids: row.id,
          //   });
          //   if (res.code === 200) {
          //     this.$message.success("删除成功");
          //     this.getTableData({});
          //   }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .contain-right {
  padding: 0px 10px;
  background: none;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.left {
  background: #fff;
  height: 100%;
}
</style>