<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
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
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      :dict="{ educationSetExamstatus, commonJudge, educationSetQuestionType }"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
// import dict from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/rewardPunishmentRecords/rewardPunishmentRecords";
export default {
  components: { editDialog },
  mixins: [tableMixins],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "type",
          type: "Select",
          placeholder: "请选择奖惩类型",
          disabled: false,
          width: "200px",
          children:[{
            value:0,
            label:"奖励"
          },
          {
            value:1,
            label:"惩罚"
          }
          ],
        },
        {
          prop: "date",
          type: "Date",
          placeholder: "请选择奖惩日期",
          disabled: false,
          width: "200px",
        },
        {
          prop: "personName",
          type: "Input",
          placeholder: "请输入被奖惩者",
          disabled: false,
          width: "200px",
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "type",
          title: "奖惩类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            if(row.type==0){
               return <div>奖励</div>;
            }else if(row.type==1){
               return <div>惩罚</div>;
            }
          },
        },
        {
          field: "person.personName",
          title: "被奖惩人",
          align: "center",
        },
        {
          field: "amount",
          title: "奖惩金额",
          align: "center",
        },
        {
          field: "date",
          title: "奖惩日期",
          align: "center",
        },
        {
          field: "content",
          title: "奖惩内容",
          align: "center",
        },
        {
          field: "reason",
          title: "奖惩依据",
          align: "center",
        },
        {
          field: "remark",
          title: "备注",
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
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let params = {
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getList();
      }
    },
    operateButtonClick(type, row) {
      if (type == "chakan") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "bianji") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type == "shanchu") {
        this.delete(row.id);
      }
    },
    // 删除
    async delete(id) {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteAPI({ ids: id });
          if (res.code === 200) {
            this.getList();
            this.$message.success("删除成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
  },
};
</script>
<style scoped lang="scss">
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
