<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="75%"
      v-bind="$attrs"
      @close="openFlag=false"
      :openFlag="openFlag"
    >
      <template #content>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            @checkbox-change="checkboxChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="sure">确定 </el-button>
          <el-button type="warning" @click="openFlag=false">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import { getListAPI } from "@/api/education/trainingSettings/coursewareManagement";
export default {
  name: "publicCourseware",
  mixins: [tableMixins],
  data() {
    return {
      openFlag:false,
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      title: "选择公有课件库",
      icon: "icon-xinzeng",
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
          field: "coursewareName",
          title: "课件名称",
          align: "center",
        },
        {
          field: "courseWare",
          title: "附件",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div
                on-click={() => {
                  this.download(row);
                }}
                style="color:#4A80FC;cursor:pointer;"
              >
                {row.courseWare[0].originalFilename}
              </div>
            );
          },
        },
      ],
      tableData: [],
      choseTable:"",
    };
  },
  mounted(){
    // this.getList();
  },
  methods: {
    async getList() {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await getListAPI(params);
      this.tableData = res.data.content;
      this.page.totalResult = res.data.totalElements;
      this.page.currentPage = res.data.totalPages ? res.data.totalPages : 1;
    },
    // 打开
    open() {
      this.openFlag=true;
       this.getList();
      console.log(this.openFlag)
    },
    //页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getList();
    },
    checkboxChange(data){
      console.log(data.records)
      this.choseTable= JSON.parse(JSON.stringify(data.records));
    },
    sure(){
       this.openFlag=false;
      this.$emit("updatePub",this.choseTable)
    },
  },
};
</script>
<style scoped lang="scss">
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
  padding: 20px 30px;
}
/deep/ .el-form-item__label {
  line-height: 24px;
}
</style>
