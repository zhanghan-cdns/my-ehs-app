<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              placeholder="请输入装置设施名称"
              clearable
              v-model="query.facilityName"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-select
              placeholder="请输入装置设施类型"
              clearable
              v-model="query.menuDifferent"
              style="width: 200px; margin-right: 10px"
            >
              <el-option
                v-for="item in menuDifferentList"
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
      :dictConfig="dictConfig"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog ref="viewDialogRef"></view-dialog>
    <maintain-dialog ref="maintainDialogRef"></maintain-dialog>
    <monitor-dialog ref="monitorDialogRef"></monitor-dialog>
    <inspect-dialog ref="inspectDialogRef"></inspect-dialog>
    <test-dialog ref="testDialogRef"></test-dialog>
    <repair-dialog ref="repairDialogRef"></repair-dialog>
    <stop-dialog ref="stopDialogRef"></stop-dialog>
    <recovery-dialog ref="recoveryDialogRef"></recovery-dialog>
    <scrap-dialog ref="scrapDialogRef"></scrap-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "../components/editDialog.vue";
import viewDialog from "../components/viewDialog.vue";
import maintainDialog from "../components/dialog/maintainDialog.vue";
import monitorDialog from "../components/dialog/monitorDialog.vue";
import inspectDialog from "../components/dialog/inspectDialog.vue";
import testDialog from "../components/dialog/testDialog.vue";
import repairDialog from "../components/dialog/repairDialog.vue";
import stopDialog from "../components/dialog/stopDialog.vue";
import recoveryDialog from "../components/dialog/recoveryDialog.vue";
import scrapDialog from "../components/dialog/scrapDialog.vue";
import {
  specialEquipmentListAPI,
  specialEquipmentDeleteAPI,
} from "@/api/enterprise/safetyManagement/specialEquipment/index";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    maintainDialog,
    monitorDialog,
    inspectDialog,
    testDialog,
    repairDialog,
    stopDialog,
    recoveryDialog,
    scrapDialog,
  },
  data() {
    return {
      menu: "specialEquipment",
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "productionFacilities",
          title: "装置设施名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            console.log(row.productionFacilities, "row");
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.facilityName
                    ? row.productionFacilities.facilityName
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "productionFacilities",
          title: "装置设施位号",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.facilityPurpose
                    ? row.productionFacilities.facilityPurpose
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "productionFacilities",
          title: "装置设施类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.menuDifferent
                    ? row.productionFacilities.menuDifferent.value
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "productionFacilities",
          title: "装置设施型号",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.typeForeignKey
                    ? row.productionFacilities.typeForeignKey
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "productionFacilities",
          title: "投用日期",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.repairDate
                    ? row.productionFacilities.repairDate
                    : ""}
                </span>
              );
            }
          },
        },
        {
          field: "productionFacilities",
          title: "维修状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              if (row.productionFacilities.maintenanceStatus) {
                return (
                  <span>
                    {row.productionFacilities.maintenanceStatus === 1
                      ? "完好"
                      : "维修中"}
                  </span>
                );
              }
            }
          },
        },
        {
          field: "productionFacilities",
          title: "上次检查日期",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.productionFacilities) {
              return (
                <span>
                  {row.productionFacilities.lastCheckDate
                    ? row.productionFacilities.lastCheckDate
                    : ""}
                </span>
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
              <span style="display:flex;justify-content: space-around;">
                <div style="width:100px;">
                  <operate-button
                    operateButtonList={this.operateButtonList}
                    on-operateButtonClick={(type) => {
                      this.operateButtonClick(type, row);
                    }}
                  ></operate-button>
                </div>
                <el-popover placement="bottom" width="200" trigger="hover">
                  <operate-button
                    operateButtonList={this.operateButtonListMore}
                    on-operateButtonClick={(type) => {
                      this.operateButtonClick(type, row);
                    }}
                  ></operate-button>
                  <span slot="reference">
                    <operate-button
                      operateButtonList={this.operateButtonMore}
                      on-operateButtonClick={(type) => {
                        this.operateButtonClick(type, row);
                      }}
                    ></operate-button>
                  </span>
                </el-popover>
              </span>
            );
          },
        },
      ],
      operateButtonList: ["bianji", "shanchu", "chakan"],
      operateButtonMore: ["gengduo"],
      operateButtonListMore: [
        "baoyang",
        "jiance1",
        "jiancha",
        "jiance2",
        "weixiu",
        "tingyong",
        "huifu",
        "baofei",
      ],
      query: {
        facilityName: "",
      },
      menuDifferentList: [],
    };
  },
  created() {
    this.getDicMap("ENT_BASE_MENU_DIFFERENT", "menuDifferentList");
    this.getTableData({});
  },
  methods: {
    // 表头操作按钮
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open({}, type, this.menu);
      } else if (type === "chaxun") {
        this.getTableData({ query: this.query });
      } else if (type === "chongzhi") {
        this.query = {
          facilityName: "",
        };
        this.getTableData({});
      }
    },

    // 获取列表数据
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await specialEquipmentListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },

    // 表格内操作按钮
    operateButtonClick(type, row) {
      console.log(type);
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row, type, this.menu);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row, type, this.menu);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "baoyang":
          this.$refs.maintainDialogRef.open(row);
          break;
        case "jiance1":
          this.$refs.monitorDialogRef.open(row);
          break;
        case "jiancha":
          this.$refs.inspectDialogRef.open(row);
          break;
        case "jiance2":
          this.$refs.testDialogRef.open(row);
          break;
        case "weixiu":
          this.$refs.repairDialogRef.open(row);
          break;
        case "tingyong":
          this.$refs.stopDialogRef.open(row);
          break;
        case "huifu":
          this.$refs.recoveryDialogRef.open(row);
          break;
        case "baofei":
          this.$refs.scrapDialogRef.open(row);
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
          const res = await specialEquipmentDeleteAPI({
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

<style scoped>
</style>
