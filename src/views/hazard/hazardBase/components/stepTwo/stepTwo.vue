<template>
  <div>
    <header-container v-if="type !== 'chakan'">
      <header-button
        @headerButtonClick="headerButtonMethods"
        :headerButtonList="headerButtonList"
      />
    </header-container>
    <dom-size-listen style="flex: 1; height: 500px" v-model="sizeCon">
      <render-table
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectChangeEvent"
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <add-substance-dialog
      ref="addSubstanceDialogRef"
      @refresh="getTableData({})"
      :baseInfo="baseInfo"
    ></add-substance-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import addSubstanceDialog from "./addSubstanceDialog.vue";
import {
  majorHazardIdentificationListAPI,
  majorHazardIdentificationDeleteAPI,
} from "@/api/hazard/majorHazardIdentification/index";

export default {
  mixins: [tableMixins],

  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },

  components: {
    addSubstanceDialog,
  },

  data() {
    return {
      headerButtonList: ["xinzeng", "piliangshanchu"],
      tableData: [],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          field: "identifySubstance",
          title: "辨识物质",
          align: "center",
          width: 200,
        },
        {
          field: "correctionCoefficient",
          title: "校正系数",
          align: "center",
          width: 100,
        },
        {
          field: "actualQuantity",
          title: "实际存在量(t)",
          align: "center",
          width: 100,
        },
        {
          field: "criticalReserves",
          title: "临界储量(t)",
          align: "center",
          width: 140,
        },
        {
          field: "hazardClassificationDescription",
          title: "危险性分类及说明",
          align: "center",
          width: 305,
        },
        {
          field: "remark",
          title: "备注",
          align: "center",
          width: 150,
        },
      ],
      ids: [],
    };
  },

  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.addSubstanceDialogRef.open();
      } else if (type === "piliangshanchu") {
        this.deleteData(row);
      }
    },
    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        hazardBaseId: this.baseInfo.id,
      };
      const res = await majorHazardIdentificationListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.total = res.data.total;
      }
    },
    // 批量删除
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await majorHazardIdentificationDeleteAPI({
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

<style>
</style>