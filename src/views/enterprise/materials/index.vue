<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入物料名称" clearable v-model="query.restrictSpaceName" style="width:200px;margin-right: 10px"></el-input>
            <el-select placeholder="物料类型">
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
    <edit-dialog ref="editDialogRef" :dictConfig="{processInfo,entCategory,commonJudge,entMaterialForm,entMaterialType,entMeasureUnit,entStorageMode}" @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{processInfo,entCategory,commonJudge,entMaterialForm,entMaterialType,entMeasureUnit,entStorageMode}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/materials/components/editDialog";
import {materialsListAPI, materialsDeleteAPI, processInfoAPI} from '@/api/enterprise/materials/index';
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/materials/components/viewDialog';

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
          field: "materialName",
          title: "物料名称",
          align: "center"
        },
        {
          field: "materialType.value",
          title: "物料类型",
          align: "center"
        },
        {
          field: "danChemicals.value",
          title: "是否为危化品",
          align: "center"
        },
        {
          field: "category.value",
          title: "危化品类别",
          align: "center"
        },
        {
          field: "annualConsumption",
          title: "年消耗量（吨）",
          align: "center"
        },
        {
          field: "actualReserves",
          title: "实际储量（吨）",
          align: "center"
        },
        {
          field: "storageMode.value",
          title: "储存方式",
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
      },
      processInfo:[]
    }
  },
  created() {
    this.getTableData({});
    this.getProcessInfo()
  },
  methods: {
    // 获取所属工艺
    async getProcessInfo() {
      const res = await processInfoAPI()
      if (res && res.code === 200) {
        this.processInfo = res.data
      }
    },
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
      const res = await materialsListAPI(params)
      if (res&&res.code === 200) {
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
          const res = await materialsDeleteAPI({
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
