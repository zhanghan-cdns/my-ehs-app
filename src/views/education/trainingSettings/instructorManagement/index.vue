<template>
  <div>
    <list-container>
      <template #left>
      </template>
      <template #right>
        <div class="role_operation_box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table :height="sizeCon.height" :data="tableData" :columns="columns" />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" @refresh="getList()" :dict="{commonGender, educationSetEducation}"></edit-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import editDialog from "./components/editDialog.vue";
import dict from "@/mixins/dict";
import {
  getListAPI,
  deleteAPI,
} from "@/api/education/trainingSettings/instructorManagement";
import { imgUrl } from "@/router/axios";
export default {
  components: {editDialog },
  mixins: [tableMixins,dict],
  data() {
    return {
       downLoadUrl: imgUrl,
       page: {
        currentPage: 1,
        pageSize: 15,
      },
      title:"讲师详情",
      searchData: {},
      searchItem: [
        {
          prop: "lecturerName",
          type: "Input",
          placeholder: "请输入讲师姓名",
          disabled: false,
          width: "200px",
        },
        {
          prop: "major",
          type: "Input",
          placeholder: "请输入专业名称",
          disabled: false,
          width: "200px",
        },
      ], //查询列表
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "lecturerName",
          title: "姓名",
          align: "center",
        },
        {
          field: "sex",
          title: "性别",
          align: "center",
          render: (h, { row, column, $index }) => {
            if (row.gender.key=="COMMON_GENDER:FMALE") {
              return <i class="iconfont icon-nv" style="color:#F759AB"></i>;
            } else if (row.gender.key== "COMMON_GENDER:MALE") {
              return <i class="iconfont icon-nan" style="color:#4A80FC"></i>;
            }
          },
        },
        {
          field: "birth",
          title: "出生日期",
          align: "center",
        },
        {
          field: "education.value",
          title: "学历",
          align: "center",
        },
        {
          field: "major",
          title: "专业",
          align: "center",
        },
        {
          field: "trainDirection",
          title: "培训擅长方向",
          align: "center",
        },
        {
          field: "trainCertificate",
          title: "培训资格证书",
          align: "center",
           render: (h, { row, column, $index }) => {
            return (
              <div
                on-click={() => {
                  this.download(row);
                }}
                style="color:#4A80FC;cursor:pointer;"
              >
                {row.trainCertificate[0]?row.trainCertificate[0].originalFilename:''}
              </div>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 120,
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
  mounted(){
    this.getList()
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
      this.page.currentPage = res.data.totalPages?res.data.totalPages:1;
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getList();
      } else if (type == "xinzeng") {
        this.$refs.editDialogRef.open(type);
      }else if (type == "chongzhi") {
        this.searchData={};
        this.getList()
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
        //下载证书
    download(data) {
      this.$message.info("正在下载中....");
      let files = this.downLoadUrl + data.trainCertificate[0].url;
      window.location.href = files;
    },
  },
};
</script>
<style scoped lang='scss'>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>