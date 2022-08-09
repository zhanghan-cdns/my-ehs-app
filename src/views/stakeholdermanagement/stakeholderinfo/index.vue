<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="search_item" :searchData="search_data" />
          <header-button @headerButtonClick="headerButtonMethods">
            <div class="btn_orange">加入黑名单</div>
            <div class="btn_blue">移除黑名单</div>
          </header-button>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="checkboxChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
        <add-dialog
          ref="addDialogRef"
          :dict="{ relatedInfoRelatedPartyCategory, relatedInfoIndustryType }"
          @refresh="getList()"
        ></add-dialog>
        <relation-dialog ref="relationDialogRef"></relation-dialog>
        <approval-dialog
          ref="approvalDialogRef"
          :dict="{ commonJudge }"
        ></approval-dialog>
        <see-information
          ref="seeInformationRef"
          :dict="{ commonJudge }"
        ></see-information>
      </template>
    </list-container>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import addDialog from "./components/addDialog.vue";
import relationDialog from "./components/relationDialog.vue";
import approvalDialog from "./components/approvalDialog";
import seeInformation from "./components/seeInformation";
import {
  getListAPI,
  deleteAPI,
} from "@/api/stakeholdermanagement/stakeholderinfo";
export default {
  mixins: [tableMixins, dict],
  components: { addDialog, relationDialog, approvalDialog, seeInformation },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      search_data: {},
      search_item: [
        {
          prop: "unitName",
          type: "Input",
          placeholder: "单位名称",
          disabled: false,
          width: "200px",
        },
        {
          prop: "category",
          type: "SelectDict",
          placeholder: "相关方类别",
          disabled: false,
          width: "200px",
          children: "relatedInfoRelatedPartyCategory",
        },
        {
          prop: "industryType",
          type: "SelectDict",
          placeholder: "行业类型",
          disabled: false,
          width: "200px",
          children: "relatedInfoIndustryType",
        },
      ],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "unitName",
          title: "单位名称",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div style="color:#308AFF;margin:auto">{row.unitName}</div>;
          },
        },
        {
          field: "category",
          title: "相关方类别",
          align: "center",
        },
        {
          field: "industryType",
          title: "行业类型",
          align: "left",
        },
        {
          field: "contactPerson",
          title: "联系人",
          align: "center",
        },
        {
          field: "contactPhone",
          title: "联系电话",
          align: "center",
        },
        {
          field: "username",
          title: "状态",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.status === 1) {
              return <div class="green cell_btn">有效</div>;
            } else if (row.status === 0) {
              return <div class="red cell_btn">无效</div>;
            }
          },
        },
        {
          field: "username",
          title: "是否列入黑名单",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.blacklisted === 1) {
              return <div class="red cell_btn">是</div>;
            } else if (row.blacklisted === 0) {
              return <div class="green cell_btn">否</div>;
            }
          },
        },
        {
          field: "username",
          title: "审批情况",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div class="yellow cell_btn">审批中</div>;
            return <div class="green cell_btn">审批完成</div>;
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
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
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    async getList() {
      let params = {
        ...this.search_data,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      getListAPI(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.content;
        }
      });
    },
    headerButtonMethods(type) {
      if (type == "xinzeng") {
        this.$refs.addDialogRef.open(type);
      } else if (type == "chaxun") {
        this.getList();
      } else if (type == "chongzhi") {
        this.search_data = {};
      }
    },
    change() {},
    pageChange() {},
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chakan":
          this.$refs.seeInformationRef.open(type, row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(type, row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "guanlianxinxi":
          this.$refs.relationDialogRef.open(type, row);
          break;
        case "shenpi":
          this.$refs.approvalDialogRef.open(type, row);
          break;
      }
    },
    checkboxChange(data) {
      console.log(data.data);
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
.btn_orange {
  width: 101px;
  height: 31px;
  background: #fb7543;
  border-radius: 3px;
  border: 1px solid #c13417;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}

.btn_blue {
  width: 101px;
  height: 31px;
  background: #2e82e2;
  border-radius: 3px;
  border: 1px solid #2e82e2;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/.cell_btn {
  height: 28px;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  padding: 0 10px;
  border-radius: 2px;
  min-width: 64px;
  display: inline-block;
  box-sizing: border-box;
}
/deep/ .green {
  background: #fcfffb;
  border: 1px solid #52c41a;
  font-size: 14px;
  color: #52c41a;
  font-weight: 500;
}
/deep/ .red {
  background: #fff8f2;
  border: 1px solid #f5892b;
  font-size: 14px;
  color: #f5892b;
  font-weight: 500;
}
/deep/ .yellow {
  background: #fff9e9;
  border: 1px solid #ffbb00;
  font-size: 14px;
  color: #ffbb00;
  font-weight: 500;
}
</style>
