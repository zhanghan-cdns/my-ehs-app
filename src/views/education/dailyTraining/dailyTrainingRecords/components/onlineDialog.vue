<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="90%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <div class="wrap">
          <div class="tab_wrap">
            <div
              :class="tabId == 1 ? 'tab tab_now' : 'tab'"
              @click="choseTab(1)"
            >
              考试记录
            </div>
            <div
              :class="tabId == 2 ? 'tab tab_now' : 'tab'"
              @click="choseTab(2)"
            >
              课程进度
            </div>
            <div
              :class="tabId == 3 ? 'tab tab_now' : 'tab'"
              @click="choseTab(3)"
            >
              学习记录
            </div>
            <div
              :class="tabId == 4 ? 'tab tab_now' : 'tab'"
              @click="choseTab(4)"
            >
              订正记录
            </div>
          </div>
          <div class="tab_content" v-show="tabId == 1">
            <div class="role_operation_box">
              <header-search
                :searchItem="examination_searchItem"
                :searchData="examination_searchData"
              />
              <header-button
                @headerButtonClick="examination_headerButtonMethods"
              >
                <div class="btn">
                  <img
                    src="@/assets/images/education/dz.png"
                    alt=""
                    class="dz"
                  />
                  <span>错题订正</span>
                </div>
              </header-button>
            </div>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="examination_tableData"
                :columns="examination_columns"
                :mergeRowMethod="mergeRowMethod"
              />
            </dom-size-listen>
            <basicPager
              :page="examination_page"
              @pageChange="examination_page"
            ></basicPager>
          </div>
          <div class="tab_content" v-show="tabId == 2">
            <div class="role_operation_box">
              <header-search
                :searchItem="course_searchItem"
                :searchData="course_searchData"
              />
              <header-button
                @headerButtonClick="course_headerButtonMethods"
                :headerButtonList="['chaxun', 'chongzhi']"
              >
              </header-button>
            </div>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="course_tableData"
                :columns="course_columns"
                :mergeRowMethod="mergeRowMethod"
              />
            </dom-size-listen>
            <basicPager
              :page="course_page"
              @pageChange="course_page"
            ></basicPager>
          </div>
          <div class="tab_content" v-show="tabId == 3">
            <div class="role_operation_box">
              <header-search
                :searchItem="study_searchItem"
                :searchData="study_searchData"
              />
              <header-button
                @headerButtonClick="study_headerButtonMethods"
                :headerButtonList="['chaxun', 'chongzhi']"
              >
              </header-button>
            </div>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="study_tableData"
                :columns="study_columns"
                :mergeRowMethod="mergeRowMethod"
              />
            </dom-size-listen>
            <basicPager
              :page="study_page"
              @pageChange="study_page"
            ></basicPager>
          </div>
          <div class="tab_content" v-show="tabId == 4">
            <div class="role_operation_box">
              <header-search
                :searchItem="dz_searchItem"
                :searchData="dz_searchData"
              />
              <header-button
                @headerButtonClick="dz_headerButtonMethods"
                :headerButtonList="['chaxun', 'chongzhi']"
              >
              </header-button>
            </div>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="dz_tableData"
                :columns="dz_columns"
                :mergeRowMethod="mergeRowMethod"
              />
            </dom-size-listen>
            <basicPager :page="dz_page" @pageChange="dz_page"></basicPager>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  name: "onlineDialog",
  mixins: [tableMixins],
  props: {
    rowData: {
      type: Object,
    },
  },
  data() {
    return {
      tabId: 4,
      title: "查看",
      icon: "icon-xinzeng",
      openFlag: true,
      isDisabled: false,
      editId: "",
      form: {},
      rules: {
        // courseId: [
        //   { required: true, message: "请选择课程名称", trigger: "change" },
        // ],
        // stem: [{ required: true, message: "请输入题干", trigger: "blur" }],
      },
      // 考试
      examination_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "员工姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "部门名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "考试结果",
          disabled: false,
          width: "200px",
        },
      ],
      examination_searchData: {},
      examination_tableData: [],
      examination_page: {
        currentPage: 1,
        pageSize: 15,
      },
      examination_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "姓名",
          align: "center",
        },
        {
          field: "xm",
          title: "部门",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
          align: "center",
        },
        {
          field: "xm",
          title: "培训讲师",
          align: "center",
        },
        {
          field: "xm",
          title: "学时",
          align: "center",
        },
        {
          field: "xm",
          title: "考试时间",
          align: "center",
        },
        {
          field: "xm",
          title: "考试成绩",
          align: "center",
        },
        {
          field: "xm",
          title: "考试结果",
          align: "center",
        },
        {
          field: "xm",
          title: "用时（分钟）",
          align: "center",
        },
        {
          field: "xm",
          title: "试卷标识",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
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
      // 课程
      course_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "员工姓名",
          disabled: false,
          width: "200px",
        },
      ],
      course_searchData: {},
      course_tableData: [{}],
      course_page: {
        currentPage: 1,
        pageSize: 15,
      },
      course_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "姓名",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
          align: "center",
        },
        {
          field: "xm",
          title: "开始时间",
          align: "center",
        },
        {
          field: "xm",
          title: "结束时间",
          align: "center",
        },
        {
          field: "xm",
          title: "学时",
          align: "center",
        },
        {
          field: "xm",
          title: "学习时长",
          align: "center",
        },
        {
          field: "xm",
          title: "考试成绩",
          align: "center",
        },
        {
          field: "xm",
          title: "课程学时",
          align: "center",
        },
        {
          field: "xm",
          title: "学习进度",
          align: "center",
          render: () => {
            return (
              <el-progress
                text-inside="true"
                stroke-width="24"
                percentage="100"
                status="success"
              ></el-progress>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
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
      // 学习
      study_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "员工姓名",
          disabled: false,
          width: "200px",
        },
      ],
      study_searchData: {},
      study_tableData: [{}],
      study_page: {
        currentPage: 1,
        pageSize: 15,
      },
      study_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "姓名",
          align: "center",
        },
        {
          field: "xm",
          title: "工号",
          align: "center",
        },
        {
          field: "xm",
          title: "培训讲师",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
          align: "center",
        },
        {
          field: "xm",
          title: "开始时间",
          align: "center",
        },
        {
          field: "xm",
          title: "结束时间",
          align: "center",
        },
        {
          field: "xm",
          title: "学习时长（分钟）",
          align: "center",
        },
        {
          field: "xm",
          title: "学时",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
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
      // 订正
      dz_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "课程名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Input",
          placeholder: "员工姓名",
          disabled: false,
          width: "200px",
        },
      ],
      dz_searchData: {},
      dz_tableData: [{}],
      dz_page: {
        currentPage: 1,
        pageSize: 15,
      },
      dz_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "员工姓名",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
          align: "center",
        },
        {
          field: "xm",
          title: "培训讲师",
          align: "center",
        },
        {
          field: "xm",
          title: "学时",
          align: "center",
        },
        {
          field: "xm",
          title: "开始时间",
          align: "center",
        },
        {
          field: "xm",
          title: "订正时间",
          align: "center",
        },
        {
          field: "xm",
          title: "订正成绩",
          align: "center",
        },
        {
          field: "xm",
          title: "订正结果",
          align: "center",
          render: (h, { row }) => {
            if (row.id) {
              return <div class="green cell_btn">合格</div>;
            } else {
              return <div class="red cell_btn">不合格</div>;
            }
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row }) => {
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
    };
  },
  watch: {
    rowData(v) {
      console.log(1111, v);
    },
  },
  mounted() {},
  methods: {
    // 打开
    open() {
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {};
      this.multipleAnswer = [];
      this.$refs.basicFormRef.resetFields();
    },
    // tab选项切换
    choseTab(id) {
      this.tabId = id;
    },
    examination_headerButtonMethods(type) {
      console.log(type);
    },
    examination_pageChange() {},
    // 合并单元格
    // 通用行合并函数（将相同多列数据合并为一行）
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      const fields = ["xm", "gh"];
      const cellValue = row[column.property];
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },
    // study_page() {},
    // course_page() {},
  },
};
</script>

<style scoped lang="scss">
.tab_wrap {
  display: flex;
  border-bottom: 1px solid #1890ff;
  .tab {
    cursor: pointer;
    width: 126px;
    height: 38px;
    margin: 0px 10px;
    line-height: 38px;
    text-align: center;
    white-space: nowrap;
    color: #999999;
    font-size: 14px;
  }
  .tab_now {
    color: white;
    background: url("../../../../../assets/images//education/tab_bg.png")
      no-repeat center/cover;
  }
}
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 16px;
}
/deep/.el-checkbox {
  padding-top: 10px;
}
/deep/.vxe-modal--wrapper .vxe-modal--body {
  background: #eeeeee;
}
.wrap {
  width: 100%;
  height: 100%;
  background: white;
  padding: 16px 10px;
  box-sizing: border-box;
}
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: normal;
  /deep/ .el-form {
    height: 39px;
  }
}
.btn {
  display: inline-block;
  width: 90px;
  height: 31px;
  background: #f5fff6;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #52c41a;
  color: #989898;
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  .dz {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
}
/deep/.green {
  border: 1px solid #52c41a;
  color: #52c41a;
}
/deep/.red {
  border: 1px solid #ff4646;
  color: #ff4646;
}

/deep/.cell_btn {
  width: 74px;
  height: 30px;
  background: #fbfff9;
  border-radius: 2px 2px 2px 2px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
</style>
