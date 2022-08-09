<!--  -->
<template>
  <div>
    警示标志
    <basicDialog
      icon="icon-jinggao1"
      title="警示标志"
      :width="1014"
      :height="833"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content></template>
    </basicDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openEdit: false,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    close() {
      this.openEdit = false;
      this.resetActiveState();
    },
    async open() {
      this.openEdit = true;
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>