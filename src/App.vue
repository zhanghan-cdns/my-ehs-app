<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {},
  computed: {},
};
</script>
<style lang="scss">
@import "./styles/livepopper.scss";
body{
  margin: 0 !important;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main_box {
  padding: 0 10px;
}
</style>
