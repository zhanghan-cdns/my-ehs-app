<template>
  <table border="1" class="common-table-wrapper">
    <tbody>
    <tr v-for="(item,index) in gridData" :key="index" style="height: 25px">
      <td v-for="(row,rowIndex) in item" :key="rowIndex"
          :style="`width:${row.width};background:${row.background};color:${row.color}`">
        <div class="cell-style">
          {{ row.text }}
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "evaluationForm",
  props:['gridData']
}
</script>

<style scoped lang="scss">
td{
  border-color: #DCDFE6;
}
.common-table-wrapper {
  border-right: 1px solid #eeee;
  border-bottom: 1px solid #eeee;
  height: 25px;
  text-align: center;
  color: #161616;

  td {
    border-left: 1px solid #eeee;
    border-top: 1px solid #eeee;
    height: 25px;
    text-align: center;
    color: #161616;
  }

  .cell-style {
    width: 125px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: normal;
    box-sizing: border-box;
  }
}


</style>
