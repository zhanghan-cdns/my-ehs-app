<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <div class="tab_wrap">
          <div :class="tabId == 1 ? 'tab tab_now' : 'tab'" @click="choseTab(1)">
            学习记录
          </div>
          <div :class="tabId == 2 ? 'tab tab_now' : 'tab'" @click="choseTab(2)">
            考试记录
          </div>
        </div>
        <div class="tab_content" v-show="tabId == 1">
            <render-table
              :height="tableHeight.height"
              :data="studyTableData"
              :columns="studyColumns"
            />
          <basicPager
            :page="studyPage"
            @pageChange="studyPageChange"
          ></basicPager>
        </div>
        <div class="tab_content" v-show="tabId == 2">
            <render-table
              :height="tableHeight.height"
              :data="examTableData"
              :columns="examColumns"
            />
          <basicPager
            :page="examPage"
            @pageChange="examPageChange"
          ></basicPager>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">关闭</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "detailsDialog",
  data() {
    return {
      tableHeight: {
        height: 420,
      },
      studyPage: {
        currentPage: 1,
        pageSize: 15,
      },
      examPage: {
        currentPage: 1,
        pageSize: 15,
      },
      title: "课程学习详情",
      icon: "icon-chakan2",
      openFlag: true,
      tabId: 1,
      studyTableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      studyColumns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "courseName",
          title: "年度",
          align: "center",
        },
        {
          field: "courseName",
          title: "计划名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "学习时长",
          align: "center",
        },
        {
          field: "courseName",
          title: "学习进度",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-progress
                text-inside="true"
                stroke-width="24"
                percentage="100"
              ></el-progress>
            );
          },
        },
        {
          field: "courseName",
          title: "考试成绩",
          align: "center",
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
      examTableData: [{}, {}],
      examColumns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "courseName",
          title: "姓名",
          align: "center",
        },
        {
          field: "courseName",
          title: "工号",
          align: "center",
        },
        {
          field: "courseName",
          title: "课程名称",
          align: "center",
        },
        {
          field: "courseName",
          title: "考试时间",
          align: "center",
        },
        {
          field: "courseName",
          title: "考试成绩",
          align: "center",
        },
        {
          field: "courseName",
          title: "考试结果",
          align: "center",
        },
        {
          field: "courseName",
          title: "考试用时",
          align: "center",
        },
      ],
    };
  },
  methods: {
    // 打开
    open(type, row) {
      this.getDetail(row.id);
    },
    // 关闭
    close() {
      this.openFlag = false;
    },
    // 获取详情
    async getDetail(id) {},
    //tab选项切换
    choseTab(id) {
      this.tabId = id;
    },
    studyPageChange(data) {
      this.studyPage.pageSize = data.pageSize;
      this.studyPage.currentPage = data.currentPage;
    },
    examPageChange(data) {
      this.examPage.pageSize = data.pageSize;
      this.examPage.currentPage = data.currentPage;
    },
  },
};
</script>

<style scoped lang="scss">
.tab_wrap {
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid #1890ff;
  .tab {
    cursor: pointer;
    width: 126px;
    height: 38px;
    margin: 0px 10px;
    line-height: 38px;
    text-align: center;
    white-space: normal;
  }
  .tab_now {
    color: white;
    background: url("../../../../../../assets/images/education/tab_bg.png")
      no-repeat center/cover;
  }
}
</style>
