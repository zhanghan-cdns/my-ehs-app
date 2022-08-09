<template>
  <!-- 公共表格 -->
  <vxe-table
    ref="xTable"
    :align="allAlign"
    :header-cell-style="headerCellStyle"
    :header-row-style="headerRowStyle"
    border
    highlight-current-column
    highlight-current-row
    auto-resize
    resizable
    round
    sortable
    v-bind="$attrs"
    v-on="$listeners"
    @current-change="currentChange"
    :span-method="$attrs.mergeRowMethod"
    @cell-click="cellClick"
    :merge-cells="mergeCells"
  >
    <template v-for="(column,index) in $attrs.columns">
      <!-- 多级表头渲染 -->
      <vxe-table-colgroup v-if="column.children && column.children.length > 0" v-bind="column">
        <childrenTableColumn :columns="column.children"></childrenTableColumn>
      </vxe-table-colgroup>
      <!-- slot-scope渲染 -->
      <vxe-table-column v-else-if="column.slotName" v-bind="column">
        <template v-slot:[column.slotName]="scope">
          <renderTableColumn :render="column.render" :scope="scope"></renderTableColumn>
        </template>
      </vxe-table-column>
      <!-- render渲染函数渲染 -->
      <vxe-table-column v-else-if="column.render" v-bind="column">
        <template slot-scope="scope">
          <renderTableColumn :render="column.render" :scope="scope"></renderTableColumn>
        </template>
      </vxe-table-column>
      <!-- 普通遍历 -->
      <vxe-table-column v-else v-bind="column"></vxe-table-column>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>

  </vxe-table>
  </div>
</template>
<script>
import childrenTableColumn from "./children-table-column.js";
import renderTableColumn from "./render-table-column.js";
import slotTableColumn from "./slot-table-column.js";

export default {
  name: "render-table",
  components: {
    renderTableColumn,
    slotTableColumn,
    childrenTableColumn,
  },
  provide() {
    return {
      tableRoot: this,
    };
  },
  props: {
    mergeCells: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 渲染表格样式
    headerCellStyle() {
      return {
        // background: "#ECF3FF",
        color: "#333",
        fontWeight: "bold",
      };
    },
    headerRowStyle() {
      return {
        background: "#ECF3FF",
      };
    },
    currentChange(row) {
      this.$emit("currentChange", row);
    },
    cellClick(row) {
      this.$emit("cellClick", row);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
