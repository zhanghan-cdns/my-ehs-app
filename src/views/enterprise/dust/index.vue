<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <el-select placeholder="请选择粉尘种类" v-model="query.dustType" clearable>
            <el-option v-for="item in entDustType" :key="item.id" :value="item.dictValue"
                       :label="item.dictValueName"></el-option>
          </el-select>
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
    <edit-dialog @refresh="getTableData({})" ref="editDialogRef" :dictConfig="{entDustType,commonJudge,entIndustry,entDustProductionTech}"></edit-dialog>
    <view-dialog ref="viewDialogRef"  :dictConfig="{entDustType,commonJudge,entIndustry,entDustProductionTech}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/dust/components/editDialog";
import {dustListAPI,dustDeleteAPI} from '@/api/enterprise/dust/index.js'
import dictMixin from '@/mixins/dict'
import viewDialog from "@views/enterprise/dust/components/viewDialog";
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
          field: "dustType.value",
          title: "粉尘种类",
          align: "center"
        },
        {
          field: "dustProductionTech.value",
          title: "涉及粉尘生产工艺",
          align: "center"
        },
        {
          field: "workermillNum",
          title: "涉粉作业人数",
          align: "center"
        },
        {
          field: "workerSingleClassNum",
          title: "涉粉单班作业人数",
          align: "center"
        },
        {
          field: "isDustCleanSystem.value",
          title: "是否建立粉尘清扫制度",
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
                  this.operateButtonClick(type, row)
                }}
              ></operate-button>
            );
          }
        }
      ],
      query: {
        dustType: ""
      },
    }
  },
  created() {
    this.getTableData({});
  },
  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          dustType: ""
        }
        this.getTableData({});
      }
    },
    /**
     *  获取表格数据
     * @param params 查询参数
     * @param domain 域
     */
    async getTableData({query, domain}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = {...params, ...query}) : params;
      const res = await dustListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type, row){
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
          const res = await dustDeleteAPI({
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

<style scoped lang="scss">

</style>
