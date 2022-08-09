<template>
  <div>
    <header-container v-if="type !== 'chakan'">
      <header-button
        @headerButtonClick="headerButtonMethods"
        :headerButtonList="headerButtonList"
      />
    </header-container>
    <el-checkbox-group
      v-model="checkList"
      @change="onChange"
      style="display: flex"
      :disabled="type === 'chakan'"
    >
      <div
        v-for="listItem in dcsPictureList"
        :key="listItem.id"
        class="dcs-box"
      >
        <el-image
          v-for="item in listItem.enclosurePhoto"
          :key="item.url"
          style="width: 342px; height: 192px"
          :src="imgUrl + item.url"
          :preview-src-list="[imgUrl + item.url]"
        ></el-image>
        <div style="text-align: center">
          <el-checkbox :label="listItem.id">
            {{ listItem.dcsname }}</el-checkbox
          >
        </div>
      </div>
    </el-checkbox-group>
    <bind-dcs-dialog
      ref="bindDcsDialogRef"
      :baseInfo="baseInfo"
      @refreshDcs="getDcsList()"
    ></bind-dcs-dialog>
  </div>
</template>

<script>
import { updateDcsAPI } from "@/api/hazard/hazardBase/index";
import bindDcsDialog from "./bindDcsDialog.vue";
import { imgUrl } from "@/router/axios";

export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },

  components: {
    bindDcsDialog,
  },

  data() {
    return {
      headerButtonList: ["xinzeng", "piliangshanchu"],
      imgUrl,
      dcsPictureList: [],
      checkList: [],
      dcsIds: "",
    };
  },

  methods: {
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.bindDcsDialogRef.open();
      } else if (type === "piliangshanchu") {
        this.deleteBindDcs();
      }
    },

    onChange(val) {
      console.log(val, "val");
      this.dcsIds = val.join(",");
    },

    getDcsList() {
      this.$emit("refreshDcs");
    },

    async deleteBindDcs() {
      if (this.baseInfo && this.baseInfo.id) {
        const res = await updateDcsAPI({
          id: this.baseInfo.id,
          dcsIds: this.dcsIds,
        });
        if (res && res.code === 200 && res.data !== -1) {
          this.getDcsList();
          return this.$message.success("删除成功");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.div-headerbutton {
  text-align: left;
}

.dcslist {
  display: flex;
}

.dcs-box {
  width: 342px;
  height: 218px;
  margin: 20px;
}
</style>