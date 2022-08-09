<template>
  <basic-dialog
    :icon="icon"
    :openFlag="openEdit"
    :title="title"
    height="80%"
    showFooter
    v-bind="$attrs"
    width="1000px"
    @close="close"
  >
    <template #content>

    </template>
  </basic-dialog>
</template>

<script>
export default {
  name: "checkProcessPicture",
  data() {
    return {
      openEdit: false,
      icon: "",
      title: "查看审批流程"
    }
  },
  methods: {
    open() {
      this.openEdit = true
    },
    close() {
      this.openEdit = false
    }
  }
}
</script>

<style scoped>

</style>
