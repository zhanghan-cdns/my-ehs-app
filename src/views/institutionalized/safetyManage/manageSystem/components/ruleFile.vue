<template>
  <div>
    <iframe
      id="iframe"
      :src="pdfUrl"
      style="height: 76vh"
      width="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      default: () => {
        return "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf";
      },
    },
  },

  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style>
</style>