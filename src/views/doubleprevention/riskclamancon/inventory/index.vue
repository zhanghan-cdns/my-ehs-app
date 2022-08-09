<template>
  <div>
    <list-container>
      <template #left>
        <risk-analysis-object-tree @afterTreeData="afterTreeData"
                                   @node-click="riskAnalysisObjectClick"></risk-analysis-object-tree>

      </template>
      <template #right>

        <div class="right-top">
          <div v-if="unitName" class="right-top-button mr">{{ unitName }}</div>
          <div class="right-top-item mr">
            <i class="icon-fengxiandiankaiguan blue"></i>
            <div class="top-item-attr">风险事件数量 <span>{{ numMap.eventsNum ? numMap.eventsNum : 0 }}</span></div>
            <!-- <div class="top-item-value">{{ numMap.riskEventNum }}</div> -->
          </div>
          <div class="right-top-item mr">
            <i class="icon-chicunyuwaixingjianchajilubiao blue"></i>
            <div class="top-item-attr">管控措施数量 <span>{{ numMap.actionNum ? numMap.actionNum : 0 }}</span></div>
            <!-- <div class="top-item-value">{{ numMap.riskControlNum }}</div> -->
          </div>
          <div class="right-top-item mr">
            <i class="icon-yinhuanpaichabiao blue"></i>
            <div class="top-item-attr">排查任务数量<span>{{ numMap.taskNum ? numMap.taskNum : 0 }}</span></div>
            <!-- <div class="top-item-value">{{ numMap.riskTaskNum }}</div> -->
          </div>
        </div>
        <div v-for="(item, index) in tableList" :key="item.index">
          <el-collapse v-model="activeNames" @change="handleCollapseChange">
            <el-collapse-item :name="index">
              <template slot="title">
                <svg-icon class="svg_icon" icon-class="riskAnsisWarning" style="margin-right:10px"></svg-icon>
                {{ index + 1 }}、
                1244
                <i class="icon-yinhuandianwei blue"></i
                >
                <!-- {{ item.riskEventName }} -->
              </template>
              <render-table
                :columns="columns"
                :data="item.riskAnalysisControls"
                height=""
              />
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- <basicPager :page="page" @pageChange="pageChange"></basicPager> -->

      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></edit-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
// import editDialog from "./components/editDialog.vue";
import riskAnalysisObjectTree from "@views/doubleprevention/riskclamancon/components/riskAnalysisObjectTree";
import {getcyclesbyunitidAPI, riskAnalysisUnitTaskAPI} from "@/api/doubleprevention/riskevent";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    // editDialog
    riskAnalysisObjectTree
  },
  name: "indexProvide",
  data() {
    return {
      unitName: "",
      numMap: {},
      tableList: [{a: 1}],
      activeNames: 0,
      tableData: [{YJKMC: "1"}],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center"
        },
        {
          field: "dataSrc",
          title: "管控方式",
          align: "center"
        },
        {
          field: "classify1",
          title: "管控措施分类1",
          align: "center"
        },
        {
          field: "classify2",
          title: "管控措施分类2",
          align: "center"
        },
        {
          field: "classify3",
          title: "管控措施分类3",
          align: "center"
        },
        {
          field: "risk_measure_desc",
          title: "管控措施描述",
          align: "center"
        },
        {
          field: "troubleshoot_content",
          title: "隐患排查内容",
          align: "center"
        },

        {
          field: "check_cycle",
          title: "巡检周期",
          align: "center"
        },
        {
          field: "check_cycle_unit",
          title: "巡检周期单位",
          align: "center"
        }
      ]
    };
  },
  created() {
  },
  methods: {
    async getDataList(id) {
      const res = await getcyclesbyunitidAPI({unitId: id})
      console.log(res,'res')
    },
    afterTreeData() {

    },
    // 获取风险单元统计
    async getRiskAnalysisUnitCount(id) {
      const res = await riskAnalysisUnitTaskAPI({id})
      if (res.code === 200) {
        this.numMap = res.data
      }
    },
    //风险单元点击
    riskAnalysisObjectClick(value) {
      if (value.data.riskAnalysisUnits) return
      this.unitName = value.data.unitName
      this.getRiskAnalysisUnitCount(value.data.id)
      this.getDataList(value.data.id)
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        // this.getTableData({query:this.query});
      } else if (type === "chongzhi") {
        this.query = {
          // restrictSpaceName:""
        };
        // this.getTableData({});
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.editDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}


/deep/ .el-collapse-item__header {
  padding: 0 16px;
  margin-bottom: 10px;
  background: #f0f5ff;
  height: 40px;
  line-height: 40px;
  font-size: 14px !important;
  font-weight: 400;
  color: #161616;
}

.tree-title {
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  background: #f5f7fa;
}

.right-top {
  display: flex;
  padding-bottom: 11px;
  border-bottom: 1px solid #4a80fc;
  margin-bottom: 20px;
  margin-top: 20px;
}

.right-top-button {
  width: 165px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background: #52c41a;
  border-radius: 4px 4px 4px 4px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}

.right-top-item {
  width: 165px;
  height: 34px;
  display: flex;
  align-items: center;
  background: #f0f5ff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px dashed #4a80fc;
}

.blue {
  color: #4a80fc;
  margin: 0px 6px;
}

.top-item-attr {
  font-size: 14px;
  font-weight: 700;
  color: #161616;
  margin-right: 6px;
}

.top-item-value {
  width: 36px;
  height: 22px;
  background: #ffffff;
  border-radius: 2px 2px 2px 2px;
  font-size: 14px;
  font-weight: 500;
  color: #597ef7;
  text-align: center;
}

.mr {
  margin-right: 20px;
}

</style>
