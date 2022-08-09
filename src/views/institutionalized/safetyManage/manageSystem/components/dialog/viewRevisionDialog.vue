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
        <institutional-info
          ref="institutionalInfoRef"
          :isTitle="isTitle"
        ></institutional-info>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import institutionalInfo from "./institutionalInfo.vue";

import { informationViewAPI } from "@/api/enterprise/safetyManagement/information/index";

export default {
  components: {
    institutionalInfo,
  },

  data() {
    return {
      icon: "icon-chakan2",
      title: "查看修订制度信息",
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