<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input placeholder="请输入证书持有者姓名" clearable style="width:220px;margin-right: 10px"></el-input>
            <el-select placeholder="请选择证书类型">
              <el-option v-for="item in certificateTypeData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>
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


  <edit-dialog
  ref="editDialogRef"
  @refreshDataList="getTableData"
  :restaurants="restaurants"
  ></edit-dialog>
  <edit-dialog-view ref="dealogViewRef"></edit-dialog-view>
</div>
</template>

<script>
import { entPersonListAPI,entPersonRemoveAPI } from '@/api/enterprise/entPersonCert/index'

import editDialog from './components/editDialog.vue';
import { entPersonQueryAPI } from '@/api/enterprise/entPersonCert/index'
import EditDialogView from './components/editDialogView.vue';
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import dictMixin from '@/mixins/dict'
export default {
  components: { editDialog, EditDialogView,HeaderContainer },
  mixins: [tableMixins, commonMixin, dictMixin],
    data(){
      return{
          page:{
            currentPage:1,
            pageSize:15
          },
          restaurants:[],
          tableData: [],
          certificateTypeData:[],//证书类型
          columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "certificateHolders",
          title: "证书持有者姓名",
          align: "center",
        },
        {
          field: "certificateName",
          title: "证书名称",
          align: "center",
        },
        {
          field: "certificateType.value",
          title: "证书类型",
          align: "center",
        },
        {
          field: "validTime",
          title: "有效日期",
          align: "center",
        },
        {
          field: "licenseIssuingAgency.value",
          title: "发证机构",
          align: "center",
        },
        {
          field: "relevantAttachment",
          title: "附件",
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
      }
    },
    created(){
      this.getTableData()
      this.certificateHoldersQuery()
      this.initLoadDict();
    },
    mounted(){

    },
    methods:{
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();


          break;
        case "chongzhi":
          this.query.dictKeyName = "";
          this.getTableData();
          break;
        case "chaxun":
          this.getTableData();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "dictionary":
          this.$refs.dictValueDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "chakan":
          this.$refs.dealogViewRef.open(row);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        entPersonRemoveAPI({ ids: id }).then((res) => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
      // 获取列表数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await entPersonListAPI(params);
      console.log('res.data11',res.data)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    //证书持有者查询
    async certificateHoldersQuery(){
      let resD = await entPersonQueryAPI()
      let arr = resD.data
      let arrD= arr.map(res=>{
        console.log(res)
        let item = {
          "value":res.entpersonname,
          "entPersonId":res.entpersonid
        }
        return item
      })

      this.restaurants = arrD
      console.log('this.restaurants',this.restaurants)
    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("CERTIFICATE_TYPE").then((res) => {//证书类型
         this.certificateTypeData = res.data
      });

    },

    }

}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 914px;
  background: white;
  .topLeft{
    position: relative;
    .contentLeft{
      display: flex;
      margin: 16px;
    }
    .rightButton{
      position: absolute;
      top: -6px;
      right: 20px;
    }
  }

}
.option{
    margin-left: 25px;
}
.tableD{
  padding: 10px;
}


</style>
