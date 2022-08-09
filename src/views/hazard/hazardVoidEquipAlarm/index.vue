<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入报警设备IP"
              clearable
              v-model="query.alarmdeviceIP"
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
    <view-dialog ref="viewDialogRef" :dictConfig="{}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import viewDialog from "./components/viewDialog.vue";
import {
  hazardVoidEquipAlarmListAPI,
} from "@/api/hazard/hazardVoidEquipAlarm/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
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
          field: "name",
          title: "报警设备名称",
          align: "center",
        },
        {
          field: "channelNumber",
          title: "报警触发通信号",
          align: "center",
        },
        {
          field: "starTime",
          title: "报警开始时间",
          align: "center",
        },
        {
          field: "endTime",
          title: "报警结束时间",
          align: "center",
        },
        {
          field: "alarmPusher",
          title: "报警推送人",
          align: "center",
        },
        {
          field: "backgroundMap",
          title: "背景图",
          align: "center",
          render: (h, { row }) => {
            if (row.hazardLevel) {
              if (row.hazardLevel.value === "高报") {
                return (
                  <div class="btn-level orange">{row.hazardLevel.value}</div>
                );
              }
              if (row.hazardLevel.value === "高高报") {
                return <div class="btn-level red">{row.hazardLevel.value}</div>;
              }
              if (row.hazardLevel.value === "低报") {
                return (
                  <div class="btn-level blue">{row.hazardLevel.value}</div>
                );
              }
              if (row.hazardLevel.value === "低低报") {
                return (
                  <div class="btn-level skyblue">{row.hazardLevel.value}</div>
                );
              }
            }
          },
        },
        {
          field: "snapshot",
          title: "抓拍图",
          align: "center",
          render: (h, { row }) => {
            return (
              <div style="color:red;">{`【裂化工艺】-【F1裂化釜R-3202F1】-【122.45℃】（低于45摄氏度或高于80℃）`}</div>
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
        alarmdeviceIP: "",
        tagNumber: "",
      },
    };
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
          this.getTableData({ query: this.query });
          break;
        case "chongzhi":
          this.query = {
            alarmdeviceIP: "",
          };
          this.getTableData({});
          break;
      }
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await hazardVoidEquipAlarmListAPI(params);
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
      }
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
