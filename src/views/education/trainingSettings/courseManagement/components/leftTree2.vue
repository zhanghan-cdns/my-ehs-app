<template>
  <div class="tree">
    <div class="title">{{ title }}</div>
    <el-tree
      :data="treeData"
      :props="dataProps"
      @node-click="treeClick"
    ></el-tree>
  </div>
</template>
<script>
export default {
  name: "Tree",
  props: {
    dataProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "label",
      }),
    },
    title: {
      type: String,
      default: "类别",
    },
    dict: Object,
  },
  data() {
    return {
      treeData: [],
    };
  },
  watch: {
    dict: function (v) {
      if (v.educationSetTrainingcategory && this.treeData.length == 0) {
        this.treeData = [];
        v.educationSetTrainingcategory.map((item) => {
          let obj = {
            label: item.dictValueName,
            trainCategory: item.dictValue,
          };
          this.treeData.push(obj);
        });
        console.log(this.treeData);
      }
    },
  },
  mounted() {},
  methods: {
    treeClick(data) {
      console.log(data);
      this.$emit("treeClick", data);
    },
  },
};
</script>
<style scoped lang="scss">
.tree {
  background: white;
  height: 100%;
  margin-right: 10px;
}
.title {
  width: 100%;
  height: 42px;
  background: #f5f7fa;
  font-size: 16px;
  font-weight: 500;
  color: #161616;
  line-height: 42px;
  text-align: center;
  margin-bottom: 10px;
}
/deep/ .el-tree-node__content {
  height: 38px;
  font-size: 14px;
  color: #595959;
  line-height: 17px;
}
/deep/ .el-icon-caret-right:before {
  font-size: 18px;
  color: #000;
}
/deep/ .is-leaf:before {
  color: transparent;
  cursor: default;
}
/deep/ .el-tree-node.is-current > .el-tree-node__content {
  color: #000;
  background-color: #f0f5ff;
}
</style>
