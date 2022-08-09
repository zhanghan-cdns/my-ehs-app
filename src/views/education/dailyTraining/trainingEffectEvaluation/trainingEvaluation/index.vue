<template>
  <div>
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="tab_wrap">
          <div :class="tabId == 1 ? 'tab tab_now' : 'tab'" @click="choseTab(1)">
            总体评估
          </div>
          <div :class="tabId == 2 ? 'tab tab_now' : 'tab'" @click="choseTab(2)">
            个人评估
          </div>
        </div>
        <div class="tab_content" v-show="tabId == 1">
          <div class="role_operation_box">
            <header-search
              :searchItem="totality_searchItem"
              :searchData="totality_searchData"
            />
            <header-button @headerButtonClick="totality_headerButtonMethods" />
          </div>
          <dom-size-listen style="flex: 1" v-model="sizeCon">
            <render-table
              :height="sizeCon.height"
              :data="totality_tableData"
              :columns="totality_columns"
            />
          </dom-size-listen>
          <basicPager
            :page="totality_page"
            @pageChange="totality_page_change"
          ></basicPager>
        </div>
        <div class="tab_content" v-show="tabId == 2">
          <div class="role_operation_box">
            <header-search
              :searchItem="personal_searchItem"
              :searchData="personal_searchData"
            />
            <header-button
              @headerButtonClick="personal_headerButtonMethods"
              :headerButtonList="['chaxun', 'chongzhi']"
            >
            </header-button>
          </div>
          <dom-size-listen style="flex: 1" v-model="sizeCon">
            <render-table
              :height="sizeCon.height"
              :data="personal_tableData"
              :columns="personal_columns"
            />
          </dom-size-listen>
          <basicPager
            :page="personal_page"
            @pageChange="personal_page_change"
          ></basicPager>
        </div>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef"></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue"
export default {
  name: "onlineDialog",
  mixins: [tableMixins],
  components:{editDialog},
  data() {
    return {
      tabId: 1,
      totality_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "请输入姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择培训类型",
          disabled: false,
          width: "200px",
        },
      ],
      totality_searchData: {},
      totality_tableData: [{}],
      totality_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "培训计划",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
          align: "center",
        },
        {
          field: "xm",
          title: "评估率",
          align: "center",
        },
        {
          field: "xm",
          title: "总体评价状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (1) {
              return <div class="green cell_btn">优</div>;
            } else if (2) {
              return <div class="blue cell_btn">良</div>;
            } else if (3) {
              return <div class="gary cell_btn">中</div>;
            } else if (4) {
              return <div class="red cell_btn">差</div>;
            } else {
              return <div style="#FAAD14">未评估</div>;
            }
          },
        },
        {
          field: "xm",
          title: "员工评价结果",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (1) {
              return <div class="green cell">优</div>;
            } else if (2) {
              return <div class="blue cell">良</div>;
            } else if (3) {
              return <div class="orange cell">中</div>;
            } else if (4) {
              return <div class="red cell">差</div>;
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
                  this.totality_headerButtonMethods(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      totality_page: {
        currentPage: 1,
        pageSize: 15,
      },
      personal_searchItem: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "请输入姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "请选择培训类型",
          disabled: false,
          width: "200px",
        },
      ],
      personal_searchData: {},
      personal_tableData: [{}],
      personal_columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "xm",
          title: "所属计划",
          align: "center",
        },
        {
          field: "xm",
          title: "课程名称",
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
          title: "评估结果",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (1) {
              return <div class="green cell">优</div>;
            } else if (2) {
              return <div class="blue cell">良</div>;
            } else if (3) {
              return <div class="gary cell">中</div>;
            } else if (4) {
              return <div class="red cell">差</div>;
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
      personal_page: {
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
  mounted() {},
  methods: {
    //tab选项切换
    choseTab(id) {
      this.tabId = id;
    },
    totality_headerButtonMethods(type) {},
    personal_headerButtonMethods(type) {},
    totality_page_change(data) {
      this.totality_page.pageSize = data.pageSize;
      this.totality_page.currentPage = data.currentPage;
    },
    personal_page_change(data) {
      this.personal_page.pageSize = data.pageSize;
      this.personal_page.currentPage = data.currentPage;
    },
    totality_headerButtonMethods(type){
      if(type=="pinggu"){
        this.$refs.editDialogRef.open()
      }
    }
  },
};
</script>

<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tab_wrap {
  margin: 20px 0px;
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
    color: #595959;
    font-size: 14px;
  }
  .tab_now {
    color: white;
    background: url("../../../../../assets/images//education/tab_bg.png")
      no-repeat center/cover;
  }
}
/deep/.cell_btn {
  width: 76px;
  height: 30px;
  border-radius: 0px 0px 0px 0px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
}
/deep/.green {
  border: 1px dashed #52c41a;
  color: #52c41a;
}
/deep/.blue {
  border: 1px dashed #4a80fc;
  color: #4a80fc;
}
/deep/.orange {
  border: 1px dashed #faad14;
  color: #faad14;
}
/deep/.red {
  border: 1px dashed #ff4646;
  color: #ff4646;
}
</style>
