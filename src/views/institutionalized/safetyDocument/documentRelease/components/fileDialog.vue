<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <iframe
          id="iframe"
          :src="pdfUrl"
          width="100%"
          height="99%"
          frameborder="0"
        ></iframe>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openEdit: false,
      icon: "icon-chakan2",
      title: "查看文件",
      pdfUrl: "",
    };
  },

  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      this.pdfUrl =
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf";
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>