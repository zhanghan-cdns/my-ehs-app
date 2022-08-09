<template>
  <div>
    <list-container>
      <template #left>
      </template>
      <template #right>
        <header>
          <div>
            <el-button
              :type="inspectionRecordType==='team'?'primary':''"
              size="small"
              @click="tabInspectType('team')"
            >班次巡检记录
            </el-button>
            <el-button
              :type="inspectionRecordType==='all'?'primary':''"
              size="small"
              @click="tabInspectType('all')"
            >全部巡检记录
            </el-button>
          </div>
          <div class="header-button">
            <el-radio-group
              v-if="inspectionRecordType==='team'"
              v-model="query.value"
              size="small"
            >
              <el-radio-button label="日检"></el-radio-button>
              <el-radio-button label="周检"></el-radio-button>
              <el-radio-button label="月检"></el-radio-button>
              <el-radio-button label="年检"></el-radio-button>
            </el-radio-group>
            <header-search
              v-if="inspectionRecordType==='all'"
              :searchData="search_data"
              :searchItem="search_item"
            />
            <header-button @headerButtonClick="headerButtonMethods"/>
          </div>
        </header>
        <!--    班次巡检     -->
        <team-inspection-table
          v-if="inspectionRecordType==='team'"
          @operateButtonClick="operateButtonClick"
        ></team-inspection-table>
        <!--    全部巡检     -->
        <all-inspection-table
          v-if="inspectionRecordType==='all'"
          @operateButtonClick="operateButtonClick"
        ></all-inspection-table>
      </template>
    </list-container>
    <!-- 查看班次详情   -->
    <view-schedule-details
      ref="viewScheduleDetailsRef"
    ></view-schedule-details>
    <!-- 查看巡检轨迹   -->
    <view-inspection-track
      ref="viewInspectionTrackRef"
    ></view-inspection-track>
  </div>
</template>

<script>

import dictMixin from "@/mixins/dict";
import teamInspectionTable from "@views/doubleprevention/riskclamancon/inspectionecord/components/teamInspectionTable";
import allInspectionTable from "@views/doubleprevention/riskclamancon/inspectionecord/components/allInspectionTable";
import viewScheduleDetails from "@views/doubleprevention/riskclamancon/inspectionecord/components/viewScheduleDetails";
import viewInspectionTrack from "@views/doubleprevention/riskclamancon/inspectionecord/components/viewInspectionTrack";

export default {
  mixins: [dictMixin],
  name: "inspectionecord",
  components: {
    allInspectionTable,
    teamInspectionTable,
    viewScheduleDetails,//巡检班次详情
    viewInspectionTrack//巡检轨迹
  },
  data() {
    return {
      query: {},
      search_data: {},
      search_item: [
        {
          prop: "courseName",
          type: "Select",
          placeholder: "年度",
          disabled: false,
          width: "150px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "检查点名称",
          disabled: false,
          width: "150px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "所属班次",
          disabled: false,
          width: "150px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "所属区域",
          disabled: false,
          width: "150px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Date",
          placeholder: "所属区域",
          disabled: false,
          width: "350px",
          dateType: 'datetimerange'
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "检查结果",
          disabled: false,
          width: "150px",
          children: [],
        },
      ],
      inspectionRecordType: 'team',//巡检记录类型

    }
  },
  methods: {
    operateButtonClick({type, row}) {
      if (type === 'chakan') {
        this.$refs.viewScheduleDetailsRef.open(row)
      } else if (type === 'xunjianguiji') {
        this.$refs.viewInspectionTrackRef.open(row)
      } else if (type === 'shanchu') {
        this.deleteTable(id)
      }
    },
    headerButtonMethods(type) {
      if (type === 'xinzeng') {
      }
    },
    // 切换巡检类型
    tabInspectType(type) {
      this.inspectionRecordType = type
      if (type === 'all') {

      } else if (type === 'team') {

      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

      });
    },
  }


}
</script>

<style lang="scss" scoped>
header {
  padding: 10px 0;
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
