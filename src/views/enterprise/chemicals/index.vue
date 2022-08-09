<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-select placeholder="请输入物料名称" clearable v-model="query.materialsId"
                       style="width:200px;margin-right: 10px">
              <el-option
                v-for="item in materialNames"
                :key="item.materialid"
                :label="item.productname"
                :value="item.materialid">
              </el-option>
            </el-select>
            <el-select placeholder="请选择类型" clearable v-model="query.type" style="width:200px;margin-right: 10px">
              <el-option v-for="item in entAccessType" :key="item.id" :value="item.dictValue"
                         :label="item.dictValueName"></el-option>
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
    <edit-dialog ref="editDialogRef" :dictConfig="{entAccessType,materialNames}"
                 @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{entAccessType,materialNames}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/chemicals/components/editDialog";
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/chemicals/components/viewDialog';
import {chemicalsListAPI, chemicalsDeleteAPI, chemicalsMaterialAPI} from "@/api/enterprise/chemicals";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog
  },
  data() {
    return {
      //物料信息
      materialNames: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "materialsId.materialName",
          title: "物料名称",
          align: "center"
        },
        {
          field: "value",
          title: "重量（吨）",
          align: "center"
        },
        {
          field: "type.value",
          title: "类型",
          align: "center"
        },
        {
          field: "time",
          title: "记录时间",
          align: "center"
        },
        {
          field: "useDesc",
          title: "用途描述",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row}) => {
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
      query: {
        materialsId: "",
        type:''
      }
    }
  },
  created() {
    this.getTableData({});
    this.getChemicalsMaterial()
  },
  methods: {
    // 获取物料信息
    async getChemicalsMaterial() {
      const res = await chemicalsMaterialAPI();
      if (res.code === 200) {
        this.materialNames = res.data
      }
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          materialsId: "",
          type:''
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
      const res = await chemicalsListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type, row) {
      console.log(type)
      switch (type) {
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
    async deleteData(row) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await chemicalsDeleteAPI({
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
