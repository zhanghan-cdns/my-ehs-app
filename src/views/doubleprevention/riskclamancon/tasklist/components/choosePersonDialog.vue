<template>
  <div class="choosePersonDialog">
    <basicDialog
      icon="icon-bianji"
      :title="title"
      width="80%"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content" :key="currentKey">
          <div class="left">
            <el-tree
              ref="treeRef"
              accordion
              node-key="id"
              :data="treeData"
              :props="defaultProps"
              :default-expanded-keys="defaultExpandedKeys"
              :current-node-key="currentNodeKey"
              @node-click="handleNodeClick"
              :render-content="renderContent"
            >
            </el-tree>
          </div>
          <div class="right">
            <!-- <div class="header">
                            <el-input v-model="query.fullName" placeholder="请输入姓名" style="width:200px"></el-input>
                            <div style="display:flex">
                                <el-button @click="()=>{query.fullName='';getTableData()}" type="primary" size="small" icon="el-icon-refresh-left">重置</el-button>
                                <el-button @click="getTableData" type="primary" size="small" icon="el-icon-search">查询</el-button>
                            </div>
                        </div>
                        <dom-size-listen style="flex:1" v-model="sizeCon">
                            <render-table
                                @checkbox-change="selectChangeEvent"
                                @checkbox-all="selectChangeEvent"
                                :height="sizeCon.height"
                                :data="tableData"
                                :columns="columns"
                            />
                        </dom-size-listen>
                        <basicPager :page="page" @pageChange="pageChange"></basicPager> -->
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      records: [],
      currentKey: "1",
      query: {
        fullName: "",
        deptId: ""
      },
      openEdit: false,
      form: {},
      defaultExpandedKeys: [], //默认展开的节点的key的数组
      currentNodeKey: "", //当前选中的节点
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left"
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          align: "center"
        },
        {
          field: "fullName",
          title: "姓名",
          align: "center"
        },
        {
          title: "性别",
          align: "center",
          render: (h, { row, column, $index }) => {
            return <div>{row.gender && row.gender.value}</div>;
          }
        },
        {
          title: "部门",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <div>
                {row.job && row.job.department && row.job.department.deptName}
              </div>
            );
          }
        },
        {
          field: "phoneNumber",
          title: "电话",
          align: "center"
        }
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    chooseType: {
      // 选择类型
      type: String,
      default: "single"
    }
  },
  created() {
    // this.getTreeData();
  },
  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      // this.currentKey++
      this.openEdit = true;
      // this.$nextTick(()=>{
      //     if(row && row.id){
      //         this.currentNodeKey = row.id
      //         this.defaultExpandedKeys = [row.id]
      //         this.query.deptId = row.id
      //         this.getTableData();
      //     }else{
      //         this.currentNodeKey = this.$refs.treeRef.setCurrentKey(this.treeData[0].id)
      //         this.defaultExpandedKeys = [this.treeData[0].id]
      //         this.query.deptId = this.treeData[0].id
      //         this.getTableData();
      //     }
      // })
    }
    // async getTreeData(){
    //     const res = await deptListTreeAPI();
    //     if(res.code == 200){
    //         this.treeData = res.data
    //     }
    // },
    // selectChangeEvent({ records }) {
    //     this.records = records
    // },
    // // 确定
    // submit(){
    //     if(this.records.length == 0){
    //         return this.$message.warning('请勾选数据')
    //     }
    //     if(this.records.length >1 && this.chooseType == 'single'){
    //         return this.$message.warning('只能勾选一条数据哦！')
    //     }
    //     // let ids = this.records.map((item) => item.id);
    //     if(this.chooseType == 'single'){
    //         this.$emit('submit',{
    //             deptId: this.records[0].deptId,
    //             staffId: this.records[0].id,
    //             staffName: this.records[0].fullName,
    //         })
    //     }else if(this.chooseType == 'multiple'){
    //         this.$emit('submit',{
    //             deptId: this.records.map((item) => item.deptId),
    //             staffId: this.records.map((item) => item.id),
    //             staffName: this.records.map((item) => item.fullName),
    //         })
    //     }
    //     this.close()
    // },
    // 获取列表数据
    // async getTableData() {
    //     let params = {
    //         ...this.query,
    //         "queryParams[pageNum]": this.page.currentPage,
    //         "queryParams[pageSize]": this.page.pageSize
    //     };
    //     const res = await staffListAPI(params);
    //     if (res.code === 200) {
    //         this.tableData = res.data.content;
    //         this.page.totalResult = res.data.totalElements;
    //     }
    // },
    // 点击树节点
    // handleNodeClick(value){
    //     this.query.deptId = value.id
    //     this.getTableData();
    // },
    // // 渲染树节点
    // renderContent(h, { node, data, store }) {
    //     // 第一级
    //     if (!data.parentId) {
    //         return <div class="custom-tree-node">
    //             <div>
    //                 <svg-icon icon-class="bumen" style="width: 20px; height: 16px"></svg-icon>
    //                 <span>{node.label}</span>
    //             </div>
    //         </div>
    //         // 最后一级
    //     } else if (!data.children) {
    //         return <div class="custom-tree-node">
    //             <div>
    //                 <svg-icon icon-class="shijian"style="width: 20px; height: 16px"></svg-icon>
    //                 <span>{node.label}</span>
    //             </div>
    //         </div>
    //         // 中间级
    //     }  else {
    //         return <div class="custom-tree-node">
    //             <div>
    //                 <svg-icon icon-class="duixiangshuxingObjectAttributes14"style="width: 20px; height: 16px"></svg-icon>
    //                 <span>{node.label}</span>
    //             </div>
    //         </div>
    //     }
    // },
  }
};
</script>

<style scoped lang="scss">
.choosePersonDialog {
  .title {
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin: 10px 0 !important;
    img {
      margin-right: 5px;
    }
  }
  /deep/ .vxe-modal--content {
    background: #eeeeee;
    padding: 10px;
    padding-bottom: 5px;
  }
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    .left {
      width: 30%;
      padding: 10px;
      background: #fff;
      overflow: auto;
    }
    .right {
      margin-left: 5px;
      width: 70%;
      padding: 10px;
      background: #fff;
      display: flex;
      flex-direction: column;
    }
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
