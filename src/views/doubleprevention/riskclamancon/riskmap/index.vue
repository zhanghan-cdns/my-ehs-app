<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input v-model="query.mapName" clearable placeholder="请输入风险图名称"
                      style="width:200px;margin-right: 10px"></el-input>
            <el-select v-model="query.riskLevel" :size="size" :style="`width:${width}`" clearable
                       placeholder="请选择风险级别">
              <el-option v-for="item in doublePreventionRiskLevel" :key="item.id" :label="item.dictValueName"
                         :value="item.dictValue"></el-option>
            </el-select>
          </div>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </header-container>
        <dom-size-listen v-model="sizeCon" style="flex:1">
          <render-table
            :cell-class-name="cellClassName"
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef" :dictConfig="{doublePreventionRiskLevel}"
                 @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef" :dictConfig="{doublePreventionRiskLevel}"></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "./components/editDialog";
import {mapInfoDeleteAPI, mapInfoListAPI} from '@/api/doubleprevention/riskmap/index.js';
import dictMixin from '@/mixins/dict'
import viewDialog from './components/viewDialog';
import riskLevel from "@views/doubleprevention/riskclamancon/riskmap/components/riskLevel.vue";
import {imgUrl} from "@/router/axios";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    riskLevel
  },
  data() {
    return {
      imgUrl,
      width: "260px",
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "mapName",
          title: "风险四色图名称",
          align: "center"
        },
        {
          field: "riskLevel.value",
          title: "风险级别",
          align: "center",
        },
        {
          title: "风险四色图",
          align: "center",
          render: (h, {row}) => {
            return row.mapUrl.map(item => {
              return <el-image src={this.imgUrl + item.url} preview-src-list={this.imgUrl + item.url}
                               style="width:200px;height:100px;">
              </el-image>
            })
          }
        },
        {
          field: "remark",
          title: "备注",
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
              >
              </operate-button>
            );
          }
        }
      ],
      query: {
        mapName: "",
        riskLevel:""
      }
    }
  },
  created() {
    this.getTableData({});
  },
  methods: {
    //单元格样式
    cellClassName({column, row}) {
      if (column.property === 'affiliatedFunctionId') {
        return 'col-blue'
      }
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          mapName: "",
          riskLevel:""
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
      const res = await mapInfoListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
      }
    },
    operateButtonClick(type, row) {
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
          const res = await mapInfoDeleteAPI({
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

<style lang="scss" scoped>
/deep/ .vxe-body--column.col-blue {
  background-color: #3399FF;
  color: #fff;
}
</style>
