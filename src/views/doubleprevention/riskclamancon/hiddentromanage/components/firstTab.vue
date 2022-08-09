<template>
  <div class="firstTab">
    <div class="header">
      <div>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择检查单位"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择检查来源"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择检查人"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择隐患状态"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <br>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择隐患审核"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择整改责任单位"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择整改责任人"
          style="width:200px;margin-right:5px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
        <el-select
          clearable
          filterable
          v-model="query.hiddenFactors"
          @change="getTableData"
          placeholder="请选择隐患因素"
          style="width:200px;margin-right:3px;margin-top:8px;"
        >
          <el-option
            v-for="item in hiddenFactorsList"
            :key="item.id"
            :label="item.dictValueName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </div>
      <div style="text-align: right; margin: 10px 0px">
        <el-button
          size="small"
          type="primary"
          @click="headerButtonMethods('chaxun')"
        >
          <i class="iconfont icon-chaxun" style="font-size:13px"></i>查询
        </el-button>
        <el-button
          size="small"
          type="success"
          @click="headerButtonMethods('xinzeng')"
        >
          <i class="iconfont icon-xinzeng" style="font-size:13px"></i>新增
        </el-button>
        <el-button
          size="small"
          class="export_btn primary_btn"
          @click="headerButtonMethods('chongzhi')"
        >
          <i class="iconfont icon-zhongzhi" style="font-size:13px"></i>刷新
        </el-button>
        <el-button
          size="small"
          class="export_btn primary_btn"
          @click="headerButtonMethods('daochu')"
        >
          <i class="iconfont icon-daochu" style="font-size:13px"></i>导出
        </el-button>
        <el-button
          size="small"
          class="export_btn primary_btn"
          @click="headerButtonMethods('daochuzhenggaitongzhishu')"
        >
          <i class="iconfont icon-daochu" style="font-size:13px"></i
          >导出整改通知书
        </el-button>
      </div>
    </div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table
        :height="sizeCon.height"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <basicPager :page="page" @pageChange="pageChange"></basicPager>
    <!-- 新增、编辑 -->
    <edit-dialog
      ref="editDialogRef"
      @refreshDataList="getTableData"
    ></edit-dialog>
    <!-- 延期记录 -->
    <delay-record ref="delayRecordRef"></delay-record>
    <view-dialog ref='viewDialogRef'></view-dialog>
     <!-- <process ref="processRef" @refreshDataList="getTableData"></process> -->
  </div>
</template>
<script>
// import {createDiagram} from "@/api/flowable/definition";
// import {hiddenDangerListAPI,deleteHiddenDangerDataAPI} from "@/api/inspection/hiddenTroManage"
import editDialog from "./editDialog";
import delayRecord from "./delayRecord";
import viewDialog from "./viewDialog.vue";
export default {
  components: { editDialog, delayRecord,viewDialog},
  data() {
    return {
      hiddenFactorsList: [],
      readImage: {
        open: false,
        title: "",
        imgSrc: ""
      },
      sizeCon: {
        height: "280px"
      },
      query: {
        hiddenFactors: ""
      },
      tableData: [{ sourceOfHiddenDanger: "1" }],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center"
        },
        {
          field: "sourceOfHiddenDanger",
          title: "隐患来源",
          align: "center"
        },
        {
          field: "hazardDiscoveryTime",
          title: "隐患发现时间",
          align: "center"
        },
        {
          field: "inspectionDepartment",
          title: "检查单位",
          align: "center"
        },
        {
          field: "inspector",
          title: "检查人员",
          align: "center"
        },
        {
          field: "hiddenLevel",
          title: "隐患级别",
          align: "center"
        },
        {
          field: "hiddenFactors",
          title: "隐患因素",
          align: "center"
        },
        {
          field: "rectificationDepartment",
          title: "责任整改单位",
          align: "center"
        },
        {
          field: "rectifyDate",
          title: "计划整改完成时间",
          align: "center"
        },
        {
          field: "correctionDate",
          title: "整改时间",
          align: "center"
        },
        {
          field: "dangerStatus",
          title: "隐患状态",
          align: "center"
        },
        {
          field: "reviewDate",
          title: "复查时间",
          align: "center"
        },
        {
          field: "closedLoopDate",
          title: "结案时间",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          }
        }
      ]
    };
  },
  created() {
    // this.getTableData();
  },
  methods: {
    // 头部按钮
    headerButtonMethods(type) {
      switch (type) {
        case "chaxun":
          this.getTableData();
          break;
        case "chongzhi":
          this.query.hiddenFactors = "";
          this.getTableData();
          break;
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "daochu":
          break;
        case "daochuzhenggaitongzhishu":
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "yanqijilu":
          this.$refs.delayRecordRef.open(row);
          break;
        case "chakanshenpi":
          this.handleReadImage(row.processInstanceId);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteHiddenDangerDataAPI({ ids: id }).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize
      };
      const res = await hiddenDangerListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    // 流程图查看
    handleReadImage(processInstanceId) {
      this.readImage.title = "查看审批流程";
      this.readImage.open = true;
      createDiagram(processInstanceId).then(res => {
        // 将返回的文件流数据转化为路径
        this.readImage.imgSrc = window.URL.createObjectURL(
          new Blob([res], { type: "image/jpeg" })
        );
      });
    }
  }
};
</script>

<style scoped lang="scss">
.firstTab {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>
