<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <label
              for="mettingTheme"
              style="font-size: 14px; font-weight: bold; padding-right: 10px"
              >会议主题</label
            >
            <el-input
              placeholder="请输入会议主题"
              clearable
              id="mettingTheme"
              v-model="query.safetyTarget"
              style="width: 200px; margin-right: 5px"
            ></el-input>
            <label
              for="mettingType"
              style="
                font-size: 14px;
                font-weight: bold;
                padding-right: 10px;
                margin-left: 20px;
              "
              >会议类型</label
            >
            <el-select
              placeholder="请选择会议类型"
              id="mettingType"
              v-model="query.checkRate"
            >
              <el-option></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
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
    <metting-dialog
      ref="mettingRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></metting-dialog>
    <delay-dialog
      ref="delayRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></delay-dialog>

        <feedback-dialog
      ref="feedbackRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></feedback-dialog>
        <toview-dialog
      ref="toviewRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></toview-dialog>
        <feedback-dialog
      ref="feedbackRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></feedback-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "./editDialog.vue";
import mettingDialog from "./mettingDialog.vue";
import delayDialog from "./delayDialog.vue";
import feedbackDialog from "./feedbackDialog.vue";
import toviewDialog from "./toviewDialog.vue";
// import { delay } from 'xe-utils';
// import editDialog from "@views/duty/commitment/components/editDialog.vue";
// import viewDialog from "@views/duty/commitment/components/viewDialog.vue";
// import { adpInfoListAPI, sdpInfoDeleteAPI } from "@/api/duty/safe/index.js";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    mettingDialog,
    delayDialog,
    feedbackDialog,
    toviewDialog
    // viewDialog,
  },
  name: "indexProvide",
  data() {
    return {
      query: {
        safetyTarget: "",
        targetType: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
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
          field: "theme",
          title: "会议主题",
          align: "center",
        },
        {
          field: "mettingStart",
          title: "会议开始时间",
          align: "center",
        },
        {
          field: "host",
          title: "主持人",
          width: 150,
          align: "center",
        },
        {
          field: "place",
          title: "地点",
          align: "center",
          width: 150,
        },
        {
          field: "department",
          title: "参加部门",
          align: "center",
        },
        {
          field: "feedback",
          title: "督办事项反馈",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-button type="warning" style="width:70%" ref='feed'  onClick={(e)=>this.feed()}>
                督办事项反馈
              </el-button>
            );
         
          },
        },
        {
          title: "操作",
          align: "center",
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
  created() {},

  methods: {
    feed(){
        this.$refs.feedbackRef.open();
        console.log(1);
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } else if (type === "xiugai") {
        this.query = {
          // restrictSpaceName:""
        };
        // this.getTableData({});
      }
    },
    // 复选框选中
    selectChangeEvent(val) {
      this.ids = [];
      val.records.forEach((v) => {
        this.ids.push(v.id);
      });
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.toviewRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "huiyijiyao":
          this.$refs.mettingRef.open();
          break;
        case "tuichi":
          this.$refs.delayRef.open();

          break;
        // case "xiafa":
        //   this.issueData(row);
        //   break;
      }
    },
    // async issueData(row) {
    //   this.$confirm("确认下发安全责任书吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(async () => {
    //       console.log(222);
    //     })
    //     .catch(() => {
    //       this.$message.info("已取消删除");
    //     });
    // },
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
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
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
