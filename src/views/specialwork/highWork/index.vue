<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <header-search
            :searchData="search_data"
            :searchItem="search_item"
          ></header-search>
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
    <edit-dialog ref="editDialogRef" :dictConfig="dictConfig"></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
  },
  data() {
    return {
      search_item: [
        {
          prop: "workCertName",
          type: "Input",
          placeholder: "作业证编号",
          disabled: false,
          width: "200px",
        },
        {
          prop: "workCertType",
          type: "SelectDict",
          placeholder: "作业级别",
          disabled: false,
          width: "200px",
          children: "workCertType",
        },
        {
          prop: "workCertStatus",
          type: "SelectDict",
          placeholder: "作业证状态",
          disabled: false,
          width: "200px",
          children: "workCertStatus",
        },
      ],
      search_data: {
        workCertName: "",
        workCertType: "",
        workCertStatus: "",
      },

      tableData: [
        {
          id: "001",
          status: "0",
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
          field: "workCertName",
          title: "作业编号",
          align: "center",
        },
        {
          field: "applicant",
          title: "申请人",
          align: "center",
        },
        {
          field: "applicantUnit",
          title: "申请单位",
          align: "center",
        },
        {
          field: "workCertType",
          title: "作业级别",
          align: "center",
        },
        {
          field: "fromTime",
          title: "作业开始时间",
          align: "center",
        },
        {
          field: "endTime",
          title: "作业关闭时间",
          align: "center",
        },
        {
          field: "safetyMeasures",
          title: "安全措施完成率(%)",
          width: 150,
          align: "center",
        },
        {
          field: "status",
          title: "状态",
          width: 200,
          align: "center",
          render: (h, { row }) => {
            if (row.status === "0") {
              return (
                <div>
                  <span style="color:rgb(223,208,23);font-weight:bold">
                    待验收
                  </span>
                  <br />
                  <span>剩余时间：</span>
                  <span style="color:red">1天1小时1分钟</span>
                </div>
              );
            } else if (row.status === "1") {
              return <div style="color:#e9bd60;font-weight:bold">待分析</div>;
            } else if (row.status === "2") {
              return (
                <div style="color:#e9bd60;font-weight:bold">待措施确认</div>
              );
            } else if (row.status === "3") {
              return (
                <div style="color:#e9bd60;font-weight:bold">待安全交底</div>
              );
            } else if (row.status === "4") {
              return (
                <div style="color:#e9bd60;font-weight:bold">待监护人确认</div>
              );
            } else if (row.status === "5") {
              return (
                <div style="color:#e9bd60;font-weight:bold">待完工验收</div>
              );
            } else if (row.status === "6") {
              return <div style="color:red;font-weight:bold">已过期</div>;
            } else if (row.status === "7") {
              return <div style="color:#ccc;font-weight:bold">作业关闭</div>;
            }
          },
        },
        {
          field: "ballLive",
          title: "布控球直播",
          align: "center",
          width: 120,
          render: (h, { row }) => {
            return (
              <el-popover
                placement="bottom"
                width="76"
                trigger="hover"
                popper-class="live-popper-class"
              >
                <div>
                  <div class="live-btn-box">
                    <el-button
                      size="small"
                      class="live-btn"
                      onClick={(row) => this.ballLive(row)}
                    >
                      直播
                    </el-button>
                  </div>
                  <div class="live-btn-box">
                    <el-button size="small" class="live-btn">
                      进入直播
                    </el-button>
                  </div>
                  <div class="live-btn-box">
                    <el-button size="small" class="live-btn">
                      回放
                    </el-button>
                  </div>
                </div>
                <el-button
                  slot="reference"
                  size="small"
                  style="background:#F0F5FF;border-radius: 2px 2px 2px 2px;color: #4A80FC;border:none;font-weight:600;"
                >
                  直播中
                  <i class="el-icon-arrow-down" style="margin-left:10px"></i>
                </el-button>
              </el-popover>
            );
          },
        },
        {
          field: "live",
          title: "直播",
          width: 120,
          align: "center",
          render: (h, { row }) => {
            return (
              <el-popover
                placement="bottom"
                width="76"
                trigger="hover"
                popper-class="live-popper-class"
              >
                <div>
                  <div class="live-btn-box">
                    <el-button
                      size="small"
                      class="live-btn"
                      onClick={(row) => this.ballLive(row)}
                    >
                      直播
                    </el-button>
                  </div>
                  <div class="live-btn-box">
                    <el-button size="small" class="live-btn">
                      进入直播
                    </el-button>
                  </div>
                  <div class="live-btn-box">
                    <el-button size="small" class="live-btn">
                      回放
                    </el-button>
                  </div>
                </div>
                <el-button
                  slot="reference"
                  size="small"
                  style="background:#F0F5FF;border-radius: 2px 2px 2px 2px;color: #4A80FC;border:none;font-weight:600;"
                >
                  暂无直播
                  <i class="el-icon-arrow-down" style="margin-left:10px"></i>
                </el-button>
              </el-popover>
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
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      query: {
        workCertName: "",
        workCertType: "",
        workCertStatus: "",
      },
      ids: [],
    };
  },

  created() {
    // this.getTableData({ query: this.query });
  },

  methods: {
    // 布控球直播
    ballLive() {},

    headerButtonMethods(type) {
      switch (type) {
        case "zuoyepiao":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData({ query: this.query });
          break;
        case "chongzhi":
          this.query = {
            workCertName: "",
            workCertType: "",
            workCertStatus: "",
          };
          this.getTableData({ query: this.query });
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
      const res = await monitoringIndicatorsListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.total;
      }
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
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
          const res = await monitoringIndicatorsDeleteAPI({
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
</style>
