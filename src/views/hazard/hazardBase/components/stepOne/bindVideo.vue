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
      :disabled="type === 'chakan'"
    >
      <div v-for="(item, index) in videoList" :key="item.id" class="dcs-box">
        <video-item
          style="height: 235px; width: 100%"
          :key="index"
          :videoTitle="item.camName"
          :src="item.src"
          :style="videoList.length === 1 ? 'width: 100%' : ''"
        ></video-item>
        <div style="text-align: center">
          <el-checkbox :label="item.id">{{ item.camName }}</el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <bind-video-dialog
      ref="bindVideoDialogRef"
      :baseInfo="baseInfo"
      @refreshCamera="getCameraList"
    ></bind-video-dialog>
  </div>
</template>

<script>
import bindVideoDialog from "./bindVideoDialog.vue";
import videoItem from "@/views/enterprise/cameraManagement/components/videoItem.vue";
import { imgUrl } from "@/router/axios";
import { updateVoidAPI } from "@/api/hazard/hazardBase/index";

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
    bindVideoDialog,
    videoItem,
  },

  data() {
    return {
      imgUrl,
      headerButtonList: ["xinzeng", "piliangshanchu"],
      checkList: [],
      videoList: [],
      voidIds: "",
    };
  },
  methods: {
    onChange(val) {
      console.log(val, "val");
      this.voidIds = val.join(",");
    },

    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.bindVideoDialogRef.open();
      } else if (type === "piliangshanchu") {
        this.deleteBindCamera();
      }
    },

    getCameraList() {
      this.$emit("refreshCamera");
    },

    async deleteBindCamera() {
      if (this.baseInfo && this.baseInfo.id) {
        const res = await updateVoidAPI({
          id: this.baseInfo.id,
          voidIds: this.voidIds,
        });
        if (res && res.code === 200 && res.data !== -1) {
          this.getCameraList();
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

/deep/ .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.dcs-box {
  width: 308px;
  height: 260px;
  margin: 20px;
}
</style>