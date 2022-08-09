<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入有限空间名称" clearable v-model="query.restrictSpaceName" style="width:200px;margin-right: 10px"></el-input>
            <el-select placeholder="请输入部门名称">
              <el-option></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header-container>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" :dictConfig="{entAccidentType}" @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{entAccidentType}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/finite-space/components/editDialog";
import {finiteSpaceListAPI,finiteSpaceDeleteAPI} from '@/api/enterprise/finite-space/index.js';
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/finite-space/components/viewDialog';

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog
  },
  data() {
    return {
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "restrictSpaceName",
          title: "有限空间名称",
          align: "center"
        },
        {
          field: "affiliatedFunctionId",
          title: "所属部门",
          align: "center"
        },
        {
          field: "mainSubstance",
          title: "主要危险有害物质",
          align: "center"
        },
        {
          field: "num",
          title: "数量",
          align: "center"
        },
        {
          field: "injectionPosition",
          title: "易导致事故类型",
          align: "center"
        },
        {
          field: "locate",
          title: "位置",
          align: "center"
        },
        {
          field: "facilitiesSatety",
          title: "安全设施（预防/应急）",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ],
      query:{
        restrictSpaceName:""
      }
    }
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      }else if(type==="chaxun"){
        this.getTableData({query:this.query});
      }else if(type ==="chongzhi"){
        this.query={
          restrictSpaceName:""
        }
        this.getTableData({});
      }
    },
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await finiteSpaceListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type,row){
      switch (type){
        case "chakan":
          this.$refs.viewDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteData(row);
          break;
      }
    },
    async deleteData(row){
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await finiteSpaceDeleteAPI({
            ids: row.id
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getTableData({});
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  }
}
</script>

<style scoped>

</style>
