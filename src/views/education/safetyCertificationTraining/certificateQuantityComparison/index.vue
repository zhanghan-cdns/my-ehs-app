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
      :dict="{ educationSafetrainCerType }"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import dict from "@/mixins/dict";
import editDialog from "./components/editDialog.vue";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/safetyCertificationTraining/certificateQuantityComparison";
export default {
  name: "certificateQuantityComparison",
  components: { editDialog },
  mixins: [tableMixins, dict],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "certificateName",
          type: "Input",
          placeholder: "证书名称",
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
          field: "jobName",
          title: "岗位",
          align: "center",
        },
        {
          field: "credentialsType",
          title: "证件类别",
          align: "center",
        },
        {
          field: "number",
          title: "应有数量",
          align: "center",
        },
        {
          field: "actualNum",
          title: "实际数量",
          align: "center",
          render: (h, { row }) => {
            if (row.actualNum < row.number) {
              return <div class="red">{row.actualNum}</div>;
            } else {
              return <div class="green">{row.actualNum}</div>;
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
      tableData: [],
      courseList: [],
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
      this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
    },
    headerButtonMethods(type) {
      if (type === "chaxun") {
        this.getList();
      } else if (type === "xinzeng") {
        this.$refs.editDialogRef.open(type);
      } else if (type === "chongzhi") {
        this.searchData = {};
        this.getList();
        this.$refs.leftTreeRef.refresh();
      }
    },
    operateButtonClick(type, row) {
      if (type === "chakan") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type === "bianji") {
        this.$refs.editDialogRef.open(type, row);
      } else if (type === "shanchu") {
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
          console.log(2222);
          const res = await deleteAPI({ ids: id });
          console.log(res);
          if (res.code === 200) {
            this.getList();
            this.$message.success("删除成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 页码切换
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
/deep/.red,
/deep/.green {
  width: 68px;
  height: 30px;
  background: #fff9f9;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #ff4646;
  text-align: center;
  line-height: 30px;
  color: #ff4646;
  margin: 0 auto;
}

/deep/.green {
  border: 1px solid #52c41a;
  color: #52c41a;
}
</style>
