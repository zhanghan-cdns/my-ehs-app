<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      :title="title"
      height="70%"
      icon="icon-bianji"
      v-bind="$attrs"
      width="1000px"
      @close="close"
    >
      <template #content></template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
export default {
  name: "viewInspectionTrack",
  data() {
    return {
      openEdit: false,
      title: '查看巡检轨迹',
    }
  },
  methods: {
    open(row) {
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
