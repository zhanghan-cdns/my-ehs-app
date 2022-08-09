<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HeaderContainer"
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
