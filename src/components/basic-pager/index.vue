<template>
  <vxe-pager
    perfect
    align="right"
    :current-page.sync="page.currentPage"
    :page-size.sync="page.pageSize"
    :total="page.totalResult"
    :layouts="layouts"
    @page-change="pageChange"
  >
  </vxe-pager>
</template>
<script>
export default {
  name: "basicPager",
  props: {
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 20,
        totalResult: 24,
      }),
    },
    layouts: {
      type: Array,
      default: () => [
        "Total",
        "Sizes",
        "PrevPage",
        "Number",
        "NextPage",
        "FullJump"
      ],
    },
  },
  data() {
    return {};
  },
  methods: {
    pageChange({ type, currentPage, pageSize, $event }) {
      this.$emit("pageChange", { type, currentPage, pageSize, $event });
    },
  },
};
</script>

<style  lang='scss'>
.vxe-pager.is--perfect {
  border: none !important;
}
</style>