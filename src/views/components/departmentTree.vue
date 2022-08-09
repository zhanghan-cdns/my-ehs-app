<template>
  <div class="main-tree">
    <div class="object-tree">部门名称</div>
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
import { getDeptListAPI } from "@/api/system/common";
export default {
  name: "riskAnalysisObjectTree",
  props: {},
  data() {
    return {
      dealerTreeData: [],
      defaultProps: {
        children: "children",
        label: "deptName",
      },
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    // 获取数据
    async getTreeData() {
      const res = await getDeptListAPI();
      if (res.code === 200) {
        this.dealerTreeData = res.data;
        console.log(res, "部门树");
      }
    },
    // 点击树节点
    handleNodeClick(data, node) {
      this.$emit("node-click", { data, node });
    },
    // 自定义树节点样式
    renderContent(h, { node, data, store }) {
      if (data.children) {
        return (
          <div className="custom-tree-node">
            <div>
              <svg-icon
                icon-class="riskObject"
                style="width: 20px; height: 16px;margin-right:5px"
              ></svg-icon>
              <span>{data.deptName}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <svg-icon
              icon-class="geoInfo"
              style="width: 20px; height: 16px;margin-right:5px"
            ></svg-icon>
            <span>{data.deptName}</span>
          </div>
        );
      }
    },
  },
};
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
    background: #f5f7fa;
    text-align: center;
  }
}
</style>
