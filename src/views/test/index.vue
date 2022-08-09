<template>
  <div id="">
    <div >测试菜单</div>
    <div>测试菜单元素</div>
  </div>
</template>
<script>
import { getAuthInfo } from "@/util/auth";
export default {
  data() {
    return {};
  },
  created() {
    getAuthInfo()
  },
  methods: {},
};
</script>

<style scoped lang=''>
</style>