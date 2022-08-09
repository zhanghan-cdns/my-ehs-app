<template>
  <div>
    <header-container>
      <div>
        <el-select placeholder="请选择储罐类型">
          <el-option
            v-for="item in entHazardBaseinfoType"
            v-model="query.storageType"
            :key="item.dictKeyId"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </div>
      <header-button @headerButtonClick="headerButtonMethods" />
    </header-container>
    <dom-size-listen style="flex: 1; height: 65vh" v-model="sizeCon">
      <render-table
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <basicPager :page="page" @pageChange="pageChange"></basicPager>
    <view-dialog ref="viewDialogRef"></view-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import viewDialog from "../../components/viewDialog.vue";
import { storageTankListAPI } from "@/api/hazard/realtimeData/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    viewDialog,
  },
  data() {
    return {
      tableData: [],
      query: {
        storageType: "",
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "storage_form",
          title: "储罐类型",
          align: "center",
          render: (h, { row }) => {
            return (
              <span>
                {row.storage_form ? row.storage_form.replace("储罐", "") : ""}
                {row.storage_structure ? row.storage_structure : ""}
              </span>
            );
          },
        },
        {
          field: "material_name",
          title: "存储物料名称",
          align: "center",
        },
        {
          field: "facility_purpose",
          title: "存储位号",
          align: "center",
        },
        {
          field: "index_type_name",
          title: "监测类型",
          align: "center",
        },
        {
          field: "is_alarm",
          title: "是否报警",
          align: "center",
          render: (h, { row }) => {
            if (row.is_alarm === 1) {
              return <i class="icon-a-lujing10059" style="color:#FF3535;"></i>;
            } else if (row.is_alarm === 0) {
              return <span>否</span>;
            }
          },
        },
        {
          field: "realtime_data",
          title: "监测数据",
          align: "center",
          render: (h, { row }) => {
            if (row.realtime_data) {
              return (
                <span>
                  {row.realtime_data}
                  {row.unit}
                </span>
              );
            } else {
              return <span></span>;
            }
          },
        },
        {
          field: "acquisition_time",
          title: "采集时间",
          align: "center",
        },
        {
          field: "state",
          title: "状态",
          align: "center",
          render: (h, { row }) => {
            if (row.state === "onLine") {
              return <i class="icon-a-lujing9996" style="color:#52C41A;"></i>;
            } else if (row.state === "offLine") {
              return <i class="icon-a-lujing10002" style="color:#BCBCBC;"></i>;
            } else if (row.state === "stop") {
              return <i class="icon-a-zu20182" style="color:#FF0C0C;"></i>;
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
                operateButtonList={this.operateButtonList}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      operateButtonList: ["chakan"],
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
      }
    },

    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row, "storageTank");
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
      const res = await storageTankListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 10px 0px;
}
</style>