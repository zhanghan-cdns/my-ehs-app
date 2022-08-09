<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="main-container">
          <div class="container-left">
            <course-list
              @selectCourseType="selectCourseType"
              @selectCourseTitle="selectCourseTitle"
              ref="courseTreeRef"
            ></course-list>
          </div>
          <div class="container-right">
            <div class="role_operation_box">
              <div>
                <el-input
                  placeholder="请输入考核项目"
                  clearable
                  v-model="query.restrictSpaceName"
                  style="width: 200px; margin-right: 5px"
                ></el-input>
                <el-select
                  placeholder="请选择考核部门"
                  style="width: 200px; margin-right: 5px"
                >
                  <el-option></el-option>
                </el-select>
              </div>
              <header-button @headerButtonClick="headerButtonMethods" />
            </div>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </div>
        </div>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refresh="getTableData()"></edit-dialog>
    <assessment-dialog
      ref="assessmentDialogRef"
      @refresh="getTableData()"
      :dictConfig="{ dutyAllocationYear, dutyTargetAssessMonth }"
    ></assessment-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import editDialog from "@views/duty/duty_indicator/components/editDialog.vue";
import assessmentDialog from "@views/duty/duty_indicator/components/assessmentDialog.vue";
import courseList from "@views/duty/duty_indicator/components/courseList.vue";
import { astInfoListAPI, astInfoDeleteAPI } from "@/api/duty/duty_indicator";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    editDialog,
    courseList,
    assessmentDialog,
  },
  name: "indexProvide",
  data() {
    return {
      //响应式
      sizeCon: {
        height: 580,
      },
      query: {
        targetCode: "",
        department: "",
        rate: "DUTY_ALLOCATION_CHECK_FREQUENCY:4", //默认
        data: "一月",
      },
      headerTitle: "月度",
      monthValue: "一月", //月份
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
          field: "allocationYear",
          title: "年度",
          align: "center",
          render: (h, { row }) => {
            if (row.allocationYear) {
              return (
                <span>
                  {row.allocationYear.value ? row.allocationYear.value : ""}
                </span>
              );
            }
          },
        },
        {
          field: "month",
          title: () => this.headerTitle,
          align: "center",
          render: (h, {}) => {
            return <span>{this.monthValue}</span>;
          },
        },
        {
          field: "department",
          title: "考核部门",
          align: "center",
        },
        {
          field: "result",
          title: "考核结果",
          align: "center",
          render: (h, { row }) => {
            if (!row.result) {
              return <div class="self">待考核</div>;
            } else if (row.result == "0") {
              return <div class="notStarand">达标</div>;
            } else if (row.result == "1") {
              return <div class="notStarand">不达标</div>;
            }
          },
        },
        {
          field: "status",
          title: "流程状态",
          align: "center",
          render: (h, { row }) => {
            if (!row.status) {
              return <div class="self">待自评</div>;
            } else if (row.status == "0") {
              return <div class="ast">待考核</div>;
            } else if (row.status == "1") {
              return <div class="finesh">已完成</div>;
            }
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
            let operateButtonList=[]
            if (!row.status) {
              operateButtonList = ["ziping", "chakan", "bianji"]
            } else if (row.status == "0") {
              operateButtonList = ["kaohe", "chakan", "bianji"]
            } else {
              operateButtonList = ["shanchu", "chakan", "bianji"]
            }
            return (
                <operate-button
                operateButtonList={operateButtonList}
                  on-operateButtonClick={(type) => {
                    this.operateButtonClick(type, row);
                  }}
                ></operate-button>
              );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData();
      } else if (type === "chongzhi") {
        this.query = {
          targetCode: "",
          department: "",
          rate: "",
          data: "",
        };
        this.getTableData();
      }
    },
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.assessmentDialogRef.open(row, "chakan");
          break;
        case "bianji":
          this.$refs.assessmentDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
        case "ziping":
          this.$refs.editDialogRef.open(row);
          break;
        case "kaohe":
          this.$refs.assessmentDialogRef.open(row);
          break;
      }
    },
    // 获取月份下的值
    selectCourseType(data) {
      this.monthValue = data.name;
      this.query.data = data.name;
      this.getTableData();
    },
    // 获取频次的动态表头
    selectCourseTitle(data) {
      this.query.rate = data.name; //赋值频次字典key
      this.headerTitle = data.label;
      if (this.headerTitle == "月度") {
        this.monthValue = "一月";
        this.query.data = "一月";
        this.getTableData();
      } else if (this.headerTitle == "季度") {
        this.monthValue = "第一季度";
        this.query.data = "第一季度";
        this.getTableData();
      } else if (this.headerTitle == "半年度") {
        this.monthValue = "上半年";
        this.query.data = "上半年";
        this.getTableData();
      } else if (this.headerTitle == "年度") {
        this.monthValue = "2021";
        this.query.data = "2021";
        this.getTableData();
      }
    },

    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await astInfoDeleteAPI({
            ids: row.id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async getTableData() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...this.query,
      };
      const res = await astInfoListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #eeeeee;

  .container-left {
    padding: 10px;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    margin-right: 10px;
  }

  .container-right {
    width: 80%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
  }
}
/deep/ .notStarand {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #fff2f2;
  border: 1px solid #c41a1a;
  color: #c41a1a;
}
/deep/ .standard {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #f6fff2;
  border: 1px solid #52c41a;
  color: #52c41a;
  margin:0 auto;
}
/deep/ .ast {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #fffaee;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #eabd28;
  color: #eabd28;
  margin:0 auto;
}
/deep/.finesh {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #fbfdff;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #2889ea;
  color: #2889ea;
  margin:0 auto;
}
/deep/ .self {
  width: 80px;
  height: 33px;
  line-height: 33px;
  background: #fff3ee;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #ea7c28;
  color: #eabd28;
  margin:0 auto;
}
</style>
