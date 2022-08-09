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
        educationSafetrainWorkType,
        educationSafetrainOfficialType,
      }"
      @refresh="getList()"
      :userList="userList"
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
} from "@/api/education/safetyCertificationTraining/forensicsTrainingArchives";
import { entPersonnelListAllAPI } from "@/api/enterprise/entPersonnel";
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
          prop: "courseName",
          type: "Input",
          placeholder: "安全培训人员姓名",
          disabled: false,
          width: 160,
        },
        {
          prop: "certificateType",
          type: "SelectDict",
          placeholder: "证书类型",
          disabled: false,
          width: 160,
          children: "educationSafetrainCerType",
        },
        {
          prop: "official",
          type: "SelectDict",
          placeholder: "发证机关",
          disabled: false,
          width: 160,
          children: "educationSafetrainOfficialType",
        },
        {
          prop: "certificateName",
          type: "Input",
          placeholder: "证书名称",
          width: 160,
          disabled: false,
        },
        {
          prop: "nextTime",
          type: "Date",
          placeholder: "下次培训时间",
          width: 160,
          disabled: false,
        },
        {
          prop: "validTime",
          type: "Date",
          placeholder: "有效期查询",
          width: 160,
          disabled: false,
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
          field: "courseInfo",
          title: "培训人员姓名",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.courseInfo.personName}</div>;
          },
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
          field: "certificateName",
          title: "证书名称",
          align: "center",
        },
        {
          field: "certificateNo",
          title: "证书编号",
          align: "center",
        },
        {
          field: "latelyTime",
          title: "最近培训时间",
          align: "center",
        },
        {
          field: "nextTime",
          title: "下次培训时间",
          align: "center",
        },
        {
          field: "courseName",
          title: "有效期",
          align: "center",
          width: 150,
          render: (h, { row, column, $index }) => {
            let now = new Date();
            let nowTime = now.getTime();
            let time = new Date(row.validTime).getTime();
            if (nowTime > time) {
              return <div class="expire">{row.validTime}</div>;
            } else {
              return <div class="unexpired">{row.validTime}</div>;
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
      tableData: [],
      userList: [],
    };
  },
  mounted() {
    this.getList();
    this.getUserList();
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
    //获取人员列表
    getUserList() {
      entPersonnelListAllAPI().then((res) => {
        this.userList = res.data;
      });
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
.term-of-validity {
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #ff4646;
}
/deep/.expire,
/deep/.unexpired {
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #ff4646;
  color: #ff4646;
}
/deep/.unexpired {
  border: 1px solid #52c41a;
  color: #52c41a;
}
</style>
