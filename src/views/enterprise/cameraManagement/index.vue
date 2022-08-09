<template>
  <div>
    <list-container>
      <template #left></template>
      <template #right>
        <div class="main-container">
          <div class="container-left">
            <header-container>
              <div>
                <el-input placeholder="请输入摄像头编码" clearable v-model="query.camCode"
                          style="width:200px;margin-right: 10px"></el-input>
              </div>
              <header-button @headerButtonClick="headerButtonMethods">
                <el-button type="primary" size="small" icon="el-icon-s-grid" @click="getTableData({})">九宫格</el-button>
              </header-button>
            </header-container>
            <dom-size-listen style="flex:1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </div>
          <div class="container-right">
            <div class="video-list">
              <video-item
                style="height: 240px;"
                v-for="(item,index) in videoList"
                :key="index"
                :videoTitle="item.videoTitle"
                :src="item.src"
                :style="videoList.length===1?'width: 100%':''"
              ></video-item>
            </div>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </div>
        </div>
      </template>
    </list-container>
    <edit-dialog ref="editDialogRef"
                 :dictConfig="{commonJudge,hazardBaseList,buildingAreaList,entPersonnelList}"
                 @refresh="getTableData({})"></edit-dialog>
    <view-dialog ref="viewDialogRef"
                 :dictConfig="{commonJudge,hazardBaseList,buildingAreaList,entPersonnelList}"></view-dialog>

  </div>
</template>
<script>
import tableMixins from '@/mixins/table';
import commonMixin from '@/mixins/common'
import HeaderContainer from "@views/enterprise/dust/components/HeaderContainer";
import editDialog from "@views/enterprise/cameraManagement/components/editDialog";
import {
  cameraManagementListAPI,
  cameraManagementDeleteAPI,
  buildingareaListAPI
} from '@/api/enterprise/cameraManagement/index.js';
import dictMixin from '@/mixins/dict'
import viewDialog from '@/views/enterprise/cameraManagement/components/viewDialog';
import {hazardBaseListAllAPI} from '@/api/enterprise/room'
import {entPersonnelListAllAPI} from '@/api/enterprise/entPersonnel'
import videoItem from "./components/videoItem";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  components: {
    HeaderContainer,
    editDialog,
    viewDialog,
    videoItem
  },
  data() {
    return {
      //响应式
      sizeCon: {
        height: 680
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
          field: "camName",
          title: "摄像头名称",
          align: "center",
          minWidth: 150
        },
        {
          field: "camCode",
          title: "摄像头编码",
          align: "center",
          minWidth: 200
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
              >
              </operate-button>
            );
          }
        }
      ],
      query: {
        camCode: ""
      },
      hazardBaseList: [],
      entPersonnelList: [],
      buildingAreaList: [],
      videoList: [],
    }
  },
  created() {
    this.getTableData({});
    this.getBuildingAreaList()
    this.getHazardBaseList()
    this.getEntPersonnelList()

  },
  methods: {
    //获取企业负责人
    async getEntPersonnelList() {
      const res = await entPersonnelListAllAPI()
      if (res.code === 200) {
        this.entPersonnelList = res.data
      }
    },
    //获取重大危险源
    async getHazardBaseList() {
      const res = await hazardBaseListAllAPI();
      if (res.code === 200) {
        this.hazardBaseList = res.data
      }
    },
    //获取绑定区域
    async getBuildingAreaList() {
      const res = await buildingareaListAPI()
      if (res.code === 200) {
        console.log(res, '获取绑定区域')
        this.buildingAreaList = res.data
      }
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      } else if (type === "chaxun") {
        this.getTableData({query: this.query});
      } else if (type === "chongzhi") {
        this.query = {
          camCode: ""
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
      const res = await cameraManagementListAPI(params)
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
        this.page.currentPage = res.data.totalPages
        // 添加摄像头
        this.videoList=[]
        res.data.content.forEach(item => {
          this.videoList.push({src: item.videoAddress, videoTitle: item.camName})
        })
      }
    },
    operateButtonClick(type, row) {
      console.log(type)
      switch (type) {
        case "chakan":
          // this.$refs.viewDialogRef.open(row);
          this.videoList = []
          this.videoList.push({src: row.videoAddress, videoTitle: row.camName})
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
          const res = await cameraManagementDeleteAPI({
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
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .container-left {
    padding: 10px;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
  }

  .container-right {
    width: 50%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .video-list {
      width: 100%;
      height: 95%;
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
    }
  }
}

/deep/ .contain-right {
  padding: 0;
}
</style>
