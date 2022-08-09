<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <header-container>
          <div>
            <el-input
              clearable
              placeholder="请输入库房名称" style="width:200px;margin-right: 10px"
              v-model="query.warHouName"></el-input>
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
      :dictConfig="{commonJudge,materialNames,entFireRiskCla,hazardbaseList}"
      @refresh="getTableData({})"
    ></edit-dialog>
    <view-dialog
      ref="viewDialogRef"
      :dictConfig="{commonJudge,materialNames,entFireRiskCla,hazardbaseList}"
    ></view-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/room/components/editDialog";
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/room/components/viewDialog';
import {roomListAPI, roomDeleteAPI, hazardBaseListAllAPI} from "@/api/enterprise/room";
import {chemicalsMaterialAPI} from '@/api/enterprise/chemicals'

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
          field: "code",
          title: "库房编码",
          align: "center"
        },
        {
          field: "warHouName",
          title: "库房名称",
          align: "center"
        },
        {
          field: "resAreaNumber",
          title: "库区编号",
          align: "center"
        },
        {
          field: "resAreaName",
          title: "库区名称",
          align: "center"
        },
        {
          field: "location",
          title: "所在位置",
          align: "center"
        },
        {
          field: "storageArea",
          title: "贮存面积",
          align: "center"
        },
        {
          field: "firewall.value",
          title: "有无防火墙",
          align: "center"
        },
        {
          field: "stoSto",
          title: "贮存物质名称",
          align: "center",
          render: (h, {row}) => {
            if (Array.isArray(row.stoSto) && row.stoSto.length > 0) {
              let materialName = row.stoSto.map(item => item.materialName).join(',')
              return <div>{materialName}</div>
            } else {
              return <div></div>
            }
          }
        },
        {
          field: "comDate",
          title: "投产日期",
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
      query: {
        warHouName: ""
      },
      hazardbaseList: []
    }
  },
  created() {
    this.getTableData({});
    this.getChemicalsMaterial()
    this.getHazardBaseList()
  },
  methods: {
    // 获取重大危险源列表
    async getHazardBaseList() {
      const res = await hazardBaseListAllAPI();
      if (res && res.code === 200) {
        this.hazardbaseList = res.data
      }
    },
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
          warHouName: ""
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
      const res = await roomListAPI(params)
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
          const res = await roomDeleteAPI({
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
