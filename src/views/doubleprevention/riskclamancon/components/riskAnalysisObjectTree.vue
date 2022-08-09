<template>
  <div class="main-tree">
    <div class="object-tree">风险分析对象</div>
    <div class="search-tree">
      <el-tree
        ref="tree"
        :check-strictly="true"
        :data="dealerTreeData"
        :expand-on-click-node="true"
        :highlight-current="true"
        :props="defaultProps"
        class="filter-tree"
        default-expand-all
        node-key="id"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>
    </div>
  </div>
</template>

<script>
import {objectInfoAllListAPI} from "@/api/doubleprevention/riskobject/index.js";
export default {
  name: "riskAnalysisObjectTree",
  data() {
    return {
      dealerTreeData: [],
      defaultProps: {
        children: "riskAnalysisUnits",
        label: "name",
      },
    }
  },
  props:{

  },
  created() {
    this.getTreeData()
  },
  methods: {
    // 获取数据
    async getTreeData() {
      const res = await objectInfoAllListAPI();
      if (res.code === 200) {
        this.dealerTreeData = res.data;
        this.$emit("afterTreeData",res.data)
      }
    },
    // 点击树节点
    handleNodeClick(data, node) {
      this.$emit('node-click', {data, node})
    },
    // 自定义树节点样式
    renderContent(h, { node, data, store }){
      if(data.riskAnalysisUnits){
        return(
          <div className="custom-tree-node">
            <div>
              <svg-icon icon-class="riskObject" style="width: 20px; height: 16px;margin-right:5px">
              </svg-icon>
              <span>{data.name}</span>
            </div>
          </div>
        )
      }else{
        return (
          <div>
            <svg-icon icon-class="geoInfo" style="width: 20px; height: 16px;margin-right:5px">
            </svg-icon>
            <span>
              {data.unitName}
            </span>
          </div>
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.main-tree {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px 0 0;
  display: flex;
  flex-direction: column;

  .search-tree {
    display: flex;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    background: #fff;

    /deep/ .el-tree {
      width: 100%;
    }
  }

  .object-tree {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #F5F7FA;
    text-align: center;
  }
}

</style>
