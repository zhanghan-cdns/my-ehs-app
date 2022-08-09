<template>
  <div class="avue-sidebar">
    <el-scrollbar style="flex:1;border-top: 1px solid #1e55a7;">
      <div v-if="validatenull(menu)" class="avue-sidebar--tip">
        {{ $t("menuTip") }}
      </div>
      <el-menu
        unique-opened
        :default-active="nowTagValue"
        mode="vertical"
        :show-timeout="200"
        :collapse="keyCollapse"
      >
        <sidebar-item
          :menu="menuChildren"
          :screen="screen"
          first
          :props="website.menu.props"
          :collapse="keyCollapse"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <About></About>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";
import About from "@/page/index/About.vue";
export default {
  name: "sidebar",
  components: { sidebarItem, About },
  inject: ["index"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "website",
      "menu",
      "tag",
      "keyCollapse",
      "screen",
      'menuChildren',
      "menuId",
    ]),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route);
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
/deep/ .el-menu-item,
/deep/ .el-submenu__title {
  height: 40px;
  line-height: 40px;
}
/deep/ .el-scrollbar {
  border-bottom: 1px solid rgb(2, 38, 91);
}
</style>

