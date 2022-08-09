<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1076"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <rules-info
          ref="rulesInfoRef"
          :isTitle="isTitle"
        ></rules-info>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import rulesInfo from "./rulesInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";

export default {
  components: {
    rulesInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看安全操作规程信息",
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
    async getrulesInfo() {
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