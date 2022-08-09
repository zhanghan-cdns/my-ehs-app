<!--suppress ALL -->
<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-select
              ref="selectEquipCodeRef"
              placeholder="设备位号/编码"
              clearable
              v-model="query.equipCode.equipCodeStr"
              @change="handleEquipCodeSelect"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in equipCodeList"
                :key="item.id"
                :value="item.id + ',' + item.facilitypurpose"
                :label="item.facilitypurpose"
              ></el-option>
            </el-select>
            <el-input
              placeholder="请输入指标名称"
              clearable
              v-model="query.indexName"
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
      :dictConfig="{
        entHazardMonitoringIndextype,
        entHazardMonitoringAlarmtype,
        entHazardMonitoringUnitmeasure,
      }"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog
      ref="viewDialogRef"
      :dictConfig="{
        entHazardMonitoringIndextype,
        entHazardMonitoringAlarmtype,
        entHazardMonitoringUnitmeasure,
      }"
    ></view-dialog>
    <bind-dialog ref="bindDialogRef"></bind-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";
import editDialog from "./components/editDialog.vue";
import viewDialog from "./components/viewDialog.vue";
import bindDialog from "./components/bindDialog.vue";
import {
  monitoringIndicatorsListAPI,
  monitoringIndicatorsDeleteAPI,
} from "@/api/hazard/monitoringIndicators";
import { productionFacilitiesListAPI } from "@/api/enterprise/safetyManagement/information/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    bindDialog,
  },
  data() {
    return {
      equipCodeList: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "equipCode",
          title: "设备位号/编码",
          align: "center",
          render: (h, { row }) => {
            return (
              <span>{row.equipCode ? row.equipCode.facilitypurpose : ""}</span>
            );
          },
        },
        {
          field: "indexName",
          title: "指标名称",
          align: "center",
        },
        {
          field: "indexCode",
          title: "指标编码",
          align: "center",
        },
        {
          field: "threUpVal",
          title: "阈值上限",
          align: "center",
        },
        {
          field: "threUpUpVal",
          title: "阈值上上限",
          align: "center",
        },
        {
          field: "threDownVal",
          title: "阈值下限",
          align: "center",
        },
        {
          field: "threDownDownVal",
          title: "阈值下下限",
          align: "center",
        },
        {
          field: "realtimeData",
          title: "实时数据",
          align: "center",
        },
        {
          field: "acquisitionTime",
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
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      query: {
        equipCode: {
          equipCodeStr: "",
          equipCodeId: "",
        },
        indexName: "",
      },
    };
  },
  created() {
    this.getTableData({ query: this.query });
    this.getEquipCodeList();
  },
  methods: {
    // 获取设备位号列表
    async getEquipCodeList() {
      const res = await productionFacilitiesListAPI();
      if (res && res.code !== 200)
        return this.$message.error("获取设备位号列表失败");
      this.equipCodeList = res.data;
    },

    handleEquipCodeSelect(val) {
      let valArr = val.split(",");
      this.query.equipCode.equipCodeId = valArr[0];
      this.query.equipCode.equipCodeStr = valArr[1];
    },

    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {
          equipCode: {
            equipCodeStr: "",
            equipCodeId: "",
          },
          indexName: "",
        };
        this.getTableData({ query: this.query });
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
          equipCodeStr: query.equipCode.equipCodeStr,
          equipCodeId: query.equipCode.equipCodeId,
          indexName: query.indexName,
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
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "bangdingbiaodian":
          this.$refs.bindDialogRef.open(row);
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
