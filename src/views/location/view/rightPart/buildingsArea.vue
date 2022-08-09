<template>
  <div>
    <div class="text item" style="overflow-y: scroll">
      <el-tree
        class="filter-tree"
        show-checkbox
        :data="buildingData"
        :props="{ children: 'children', label: 'name' }"
        default-expand-all
        @check-change="showBuilding"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="custom-tree-text">{{ node.label }}</span
          >&nbsp;
          <span style="float: right; color: #1e90ff">
            <i
              class="el-icon-crop"
              v-if="data.area && data.area.length > 0"
              title="已勾画区域"
            ></i>
            <i
              class="el-icon-office-building"
              v-if="data.modelConfig && data.modelConfig != '{}'"
              title="已配置建筑"
            ></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "buildingsArea",
  data() {
    return {
      buildingData: [], //建筑参数信息
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-text{
  font-size: 12px;
}
</style>
