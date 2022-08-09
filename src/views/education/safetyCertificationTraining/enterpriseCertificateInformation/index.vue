<template>
  <div class="courseManagement">
    <list-container>
      <template #left> </template>
      <template #right>
        <div class="role-operation-box">
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
      :dict="{
        educationSafetrainCerType,
        educationSafetrainOfficialType,
      }"
      @refresh="getList()"
    ></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue";
import dict from "@/mixins/dict";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/safetyCertificationTraining/enterpriseCertificateInformation";
export default {
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
          placeholder: "请输入证书名称",
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
          field: "certificateName",
          title: "证书名称",
          align: "center",
        },
        {
          field: "certificateType",
          title: "证书类型",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.certificateType.value}</div>;
          },
        },
        {
          field: "official",
          title: "发证机构",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.official.value}</div>;
          },
        },
        {
          field: "validTime",
          title: "有效期",
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
.role-operation-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
