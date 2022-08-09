<template>
  <div style="width: 100%;height:100%;color: #fff">
    {{ riskLevels[riskLevel].level}}
  </div>
</template>

<script>
export default {
  name: "riskLevel",
  props: {
    riskLevel: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      riskLevels: [
        {
          level: "低风险",
          bgc:"#3399FF"
        },
        {
          level: "中风险",
          bgc:"#3399FF"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
