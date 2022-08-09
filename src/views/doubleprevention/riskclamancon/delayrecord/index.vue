<template>
  <div>
    <list-container>
      <template #left>
        <risk-analysis-object-tree @node-click="riskAnalysisObjectClick"></risk-analysis-object-tree>
      </template>
      <template #right>
        <div class="role_operation_box">
          <div>
            <el-input
              v-model="query.safetyTarget"
              clearable
              placeholder="请输入对象名称"
              style="width: 200px; margin-right: 5px"
            ></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>

  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import riskAnalysisObjectTree from '../components/riskAnalysisObjectTree'
import {recordListAPI} from "@/api/doubleprevention/record";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    riskAnalysisObjectTree
  },
  name: "indexProvide",
  data() {
    return {
      query: {},
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
          field: "conMeacheckCycle.riskControlMeasure.riskManConType.value",
          title: "风险分析对象",
          align: "center",
        },
        {
          field: "assessmentMethod",
          title: "风险分析单元",
          align: "center",
        },
        {
          field: "conMeacheckCycle.riskControlMeasure.riskManConType.value",
          title: "管控措施分类",
          align: "center",
        },
        {
          field: "troubleshootingResults.value",
          title: "排查结果",
          align: "center",
        },
        {
          field: "targetType",
          title: "排查结果备注",
          align: "center",
        },
        {
          field: "conMeacheckCycle.inspectorNames",
          title: "排查人",
          align: "center",
        },
        {
          field: "checkValue",
          title: "排查时间",
          align: "center",
        }
      ],
      sizeCon: {
        height: '98%'
      }
    };
  },
  created() {
    this.getTableData({})//tree
  },
  methods: {
    riskAnalysisObjectClick(value){

    },
    headerButtonMethods(type) {
      if (type === "chaxun") {
        this.getTableData(this.query);
      } else if (type === "chongzhi") {
        this.query = {};
        this.getTableData(this.query);
      }
    },
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await recordListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}


</style>
