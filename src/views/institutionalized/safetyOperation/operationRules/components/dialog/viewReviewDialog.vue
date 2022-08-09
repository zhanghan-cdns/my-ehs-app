<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <review-info
          ref="reviewInfoRef"
          :isTitle="isTitle"
        ></review-info>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import reviewInfo from "./reviewInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";

export default {
  components: {
    reviewInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看安全操作规程评审信息",
      openEdit: false,
      row: {},
      isTitle: false,
    };
  },

  created() {},

  methods: {
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.row = row;
      }
    },

    created() {},

    close() {
      this.openEdit = false;
    },

    // 获取法律法规信息
    async getInstitutionalInfo() {
      const res = await informationViewAPI();
      if (res && res.code === 200) {
        this.$refs.viewLawsInfoRef.form = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>