<template>
  <vxe-grid
    :header-cell-style="headerCellStyle"
    :header-row-style="headerRowStyle"
    auto-resize
    border
    highlight-current-column
    highlight-current-row
    resizable
    round
    sortable
    v-bind="$attrs"
    v-on="$listeners"
  ></vxe-grid>
</template>

<script>
export default {
  name: "renderTableGrid",
  props: {},
  setup() {
    const headerCellStyle = () => {
      return {
        // background: "#ECF3FF",
        color: "#333",
        fontWeight: "bold",
      };
    }
    const headerRowStyle = () => {
      return {
        background: "#ECF3FF",
      };
    }
    return {
      headerCellStyle,
      headerRowStyle
    }
  }
}
</script>

<style scoped>

</style>
