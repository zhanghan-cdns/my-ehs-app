<template>
  <div id="">
    <basicDialog
      icon="icon-zidian"
      title="字典值"
      width="900"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div
          style="display:flex;flex-direction:row;align-items:center;justify-content: space-between;margin-bottom:10px">
          <div style="display:flex">
            <!-- <el-input v-model="query.dictValueName" placeholder="请输入字典值名称" style="width:150px"></el-input> -->
            <!-- <el-input v-model="query.dictValue" placeholder="请输入字典值" style="margin-left:10px;width:150px"></el-input> -->
          </div>
          <el-button @click="headerButtonMethods('xinzeng')" type="primary" size="small" icon="el-icon-plus">新增
          </el-button>
        </div>
        <dom-size-listen style="flex:1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
<!--        <basicPager :page="page" @pageChange="pageChange"></basicPager>-->
      </template>
    </basicDialog>
    <dict-value-edit-dialog :dict-key="rowData.dictKey||rowData.dictValue" ref="dictValueEditDialogRef" @refreshDataList="getTableData"></dict-value-edit-dialog>
    <dict-value-dialog v-if="openEdit" ref="dictValueDialogRef"></dict-value-dialog>
  </div>
</template>
<script>
import {dictValueListAPI, deleteDictValueDataAPI,dictKeyListAPI,returnDictKeyDataAPI} from "@/api/system/dictionary";
import dictValueEditDialog from './dictValueEditDialog'
import tableMixins from "@/mixins/table";
import dictValueDialog from './dictValueDialog'

export default {
  name: 'dictValueDialog',
  mixins: [tableMixins],
  components: {dictValueEditDialog, dictValueDialog},
  data() {
    return {
      openEdit: false,
      query: {
        dictKeyId: '',
        dictValueName: '',
        dictValue: '',
        dictKey:''
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center",
        },
        {
          field: "dictValueName",
          title: "字典值名称",
          align: "center",
        }, {
          field: "dictValue",
          title: "字典值",
          align: "center",
        }, {
          field: "orderNum",
          title: "排序",
          align: "center",
        }, {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                operateButtonList={this.operateButtonList(row)}
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ],
      rowData: {}
    };
  },
  created() {

  },
  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
      this.query.dictKey = row.dictKey||row.dictValue;
      this.rowData=row
      this.getTableData()
      console.log(this.rowData,'rowData')
    },
    operateButtonList(row) {
      if(row.isCategory&&row.isCategory.key==="COMMON_JUDGE:TRUE"){
        return ['bianji', 'shanchu', 'dictionary']
      }else{
        return ['bianji', 'shanchu', ]
      }
    },
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.dictValueEditDialogRef.open(this.query.dictKeyId)
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "bianji":
          this.$refs.dictValueEditDialogRef.open(this.query.dictKeyId, row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;
        case "dictionary":
          this.$refs.dictValueDialogRef.open(row);
          break;
      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteDictValueDataAPI({ids: id}).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取表格数据
    async getTableData() {
      let params = {
        ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize
      };
      const res = await returnDictKeyDataAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.sysDictValue;
        // this.page.totalResult = res.data.totalElements;
      }
    }
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  display: flex;
  flex-direction: column;
}
</style>
