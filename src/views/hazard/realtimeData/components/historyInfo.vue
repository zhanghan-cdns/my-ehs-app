<template>
  <div>
    <header-container>
      <div>
        <span style="margin-right: 8px">请选择时间范围：</span>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeSelect"
        >
        </el-date-picker>
      </div>
      <header-button
        :headerButtonList="headerButtonList"
        @headerButtonClick="headerButtonMethods"
      />
    </header-container>
    <dom-size-listen style="flex: 1; height: 62vh" v-model="sizeCon">
      <render-table
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <basicPager :page="page" @pageChange="pageChange"></basicPager>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import { storageTankHistoryListAPI } from "@/api/hazard/realtimeData/index";

export default {
  mixins: [tableMixins],

  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  components: {
    HeaderContainer,
  },

  data() {
    return {
      time: "",
      headerButtonList: ["daochu"],
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "facility_purpose",
          title: "点位号",
          align: "center",
          render: (h, { row }) => {
            return <div>{this.row ? this.row.facility_purpose : ""}</div>;
          },
        },
        {
          field: "index_type_name",
          title: "监测类型",
          align: "center",
          render: (h, { row }) => {
            return <div>{this.row ? this.row.index_type_name : ""}</div>;
          },
        },
        {
          field: "value",
          title: "监测数据",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                {row.value || row.value === 0 ? row.value : ""}
                {this.row.unit ? this.row.unit : ""}
              </div>
            );
          },
        },
        {
          field: "cjsj",
          title: "采集时间",
          align: "center",
        },
      ],
      startTime: "",
      endTime: "",
      code: "",
    };
  },

  methods: {
    onTimeSelect(val) {
      console.log(val, "val");
      if (val) {
        this.startTime = val[0];
        this.endTime = val[1];
        this.getTableData(this.code);
      } else {
        this.startTime = "";
        this.endTime = "";
        this.getTableData(this.code);
      }
    },

    async getTableData(code) {
      console.log(code, "code");
      this.code = code;
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        indexCode: code,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      const res = await storageTankHistoryListAPI(params);
      if (res && res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
  },
};
</script>

<style scoped>
</style>