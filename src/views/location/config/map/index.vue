<template>
  <div class="role">
    <list-container>
      <template #left></template>
      <template #right>
        <div class="role_operation_box">
          <div style="display:flex">
            <el-input v-model="query.name" placeholder="请输入地图名称"></el-input>
          </div>
          <header-button @headerButtonClick="headerButtonMethods" />
          <el-button @click="openMapPickerDialog">我是测试按钮</el-button>
        </div>
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
    <edit-dialog ref="editDialogRef" @refreshDataList="getTableData"></edit-dialog>
    <map-picker-dialog ref="mapPickerDialogRef" @getPoint="getMapPoint"></map-picker-dialog>

  </div>
</template>
<script>
import editDialog from "./editDialog";
import {mapConfigBatchRemoveAPI, mapConfigListAPI} from "@/api/location/config/map/map";
import tableMixins from "@/mixins/table";
import mapPickerDialog from '@/components/mars3d-earth/editor/dialog-picker.vue'

export default {
  mixins: [tableMixins],
  components: { editDialog,mapPickerDialog },
  data() {
    return {
      query: {
        name: '',
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },
        {
          field: "name",
          title: "地图名称",
          align: "center"
        },
        {
          field: "initView",
          title: "初始视角",
          align: "center",
          render: (h, { row, column, $index}) => {
            return <div>{JSON.stringify(row.initView)}</div>
          }
        },
        {
          field: "url",
          title: "模型地址",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={type => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          }
        }
      ]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //打开地图定位
    openMapPickerDialog(){
        this.$refs.mapPickerDialogRef.open();
    },
    // 获取定位点的经纬度
    getMapPoint(e){
      console.log('postionOptions',e);
    },
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chongzhi":
          this.query.name = ''
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
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
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
        mapConfigBatchRemoveAPI({ ids: id }).then(res => {
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
        "queryParams[pageSize]": this.page.pageSize
      };
      const res = await mapConfigListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
