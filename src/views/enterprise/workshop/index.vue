<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入车间名称" clearable v-model="query.workshopName" style="width:200px;margin-right: 10px"></el-input>
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
    <edit-dialog ref="editDialogRef" :dictConfig="{entFireHazardLevel,entBuildingStructure,entFireResistanceRating}" @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{entFireHazardLevel,entBuildingStructure,entFireResistanceRating}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/workshop/components/editDialog";
import {workshopListAPI,workshopDeleteAPI} from '@/api/enterprise/workshop/index.js';
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/workshop/components/viewDialog';
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
          field: "workshopName",
          title: "车间名称",
          align: "center"
        },
        {
          field: "affiliatedFunction",
          title: "所属部门",
          align: "center"
        },
        {
          field: "coverArea",
          title: "占地面积（㎡）",
          align: "center"
        },
        {
          field: "buildingArea",
          title: "建筑面积（㎡）",
          align: "center"
        },
        {
          field: "pliesNum",
          title: "层数",
          align: "center"
        },
        {
          field: "buildingStructure.value",
          title: "建筑结构",
          align: "center"
        },
        {
          field: "facilitiesSatety",
          title: "绑定视频",
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
        workshopName:""
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
          workshopName:""
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
      const res = await workshopListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type,row){
      console.log(type)
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
          const res = await workshopDeleteAPI({
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
