<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入指标编码"
              clearable
              v-model="query.indexCode"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-input
              placeholder="请输入报警点位"
              clearable
              v-model="query.tagNumber"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
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
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import {
  hazardEquipAlarmListAPI,
  hazardEquipAlarmDeleteAPI,
} from "@/api/hazard/hazardEquipAlarm/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
  },
  data() {
    return {
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "equipmentName",
          title: "设备名称",
          align: "center",
        },
        {
          field: "indexName",
          title: "指标名称",
          align: "center",
        },
        {
          field: "alarmLevel",
          title: "报警级别",
          align: "center",
          width: 93,
          render: (h, { row }) => {
            if (row.alarmLevel) {
              if (row.alarmLevel === "高报") {
                return <div class="btn-level orange">{row.alarmLevel}</div>;
              }
              if (row.alarmLevel === "高高报") {
                return <div class="btn-level red">{row.alarmLevel}</div>;
              }
              if (row.alarmLevel === "低报") {
                return <div class="btn-level blue">{row.alarmLevel}</div>;
              }
              if (row.alarmLevel === "低低报") {
                return <div class="btn-level skyblue">{row.alarmLevel}</div>;
              }
            }
          },
        },
        {
          field: "message",
          title: "短信推送",
          align: "center",
          render: (h, { row }) => {
            return (
              <div style="color:red;">{`【裂化工艺】-【F1裂化釜R-3202F1】-【122.45℃】（低于45摄氏度或高于80℃）`}</div>
            );
          },
        },
        {
          field: "hazardEquipAlarm",
          title: "报警开始时间",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                {row.hazardEquipAlarm ? row.hazardEquipAlarm.starTime : ""}
              </div>
            );
          },
        },
        {
          field: "hazardEquipAlarm",
          title: "报警结束时间",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                {row.hazardEquipAlarm ? row.hazardEquipAlarm.endTime : ""}
              </div>
            );
          },
        },
        {
          field: "dealTime",
          title: "处理时间",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                {row.hazardEquipAlarm ? row.hazardEquipAlarm.dealTime : ""}
              </div>
            );
          },
        },
        {
          field: "status",
          title: "状态",
          align: "center",
          width: 90,
          render: (h, { row }) => {
            if (row.hazardEquipAlarm && row.hazardEquipAlarm.dealTime) {
              return (
                <div
                  class="handle"
                  style="color:#3B84F1;border: 1px solid #3B84F1;"
                >
                  已处理
                </div>
              );
            } else {
              return (
                <div
                  class="handle"
                  style="color:#FF1C1C;border: 1px solid #F13B3B;"
                >
                  未处理
                </div>
              );
            }
          },
        },

        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
            if (row.dealTime && row.dealTime !== "") {
              return (
                <operate-button
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            } else {
              return (
                <operate-button
                  operateButtonList={this.operateButtonList}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
            }
          },
        },
      ],
      operateButtonList: ["chakan", "chuzhi"],
      query: {
        indexCode: "",
        tagNumber: "",
      },
    };
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {
          indexCode: "",
          tagNumber: "",
        };
        this.getTableData({});
      }
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await hazardEquipAlarmListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.total = res.data.total;
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "chuzhi":
          this.$refs.editDialogRef.open(row);
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
          const res = await hazardEquipAlarmDeleteAPI({
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
/deep/ .btn-level {
  width: 67px;
  height: 29px;
  line-height: 29px;
  border-radius: 2px 2px 2px 2px;
  margin: 0 auto;
  opacity: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 5px;
}

/deep/ .handle {
  width: 67px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  background: #eff5ff;
  border-radius: 2px 2px 2px 2px;
}

/deep/ .blue {
  background: #3d7dfd;
}

/deep/ .skyblue {
  background: #3dc5f6;
}

/deep/ .orange {
  background: #ff9046;
}

/deep/ .red {
  background: #ff5a5a;
}
</style>
