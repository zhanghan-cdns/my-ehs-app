<template>
  <div class="view-dialog">
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1180px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-checkbox-group v-model="checkList" @change="onChange">
          <div
            v-for="(item, index) in videoList"
            :key="item.id"
            class="dcs-box"
          >
            <video-item
              style="height: 260px; width: 100%"
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
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import videoItem from "@/views/enterprise/cameraManagement/components/videoItem.vue";
import { cameraManagementListAPI } from "@/api/enterprise/cameraManagement/index";
import { bindVideoAPI } from "@/api/hazard/hazardBase/index";
import { imgUrl } from "@/router/axios";

export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    videoItem,
  },
  data() {
    return {
      imgUrl,
      icon: "icon-bianji",
      title: "新增绑定视频",
      openEdit: false,
      checkList: [],
      videoList: [],
      voidIds: "",
    };
  },

  created() {},

  methods: {
    //   获取视频列表
    async getVideoList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 9999,
      };
      const res = await cameraManagementListAPI(params);
      if (res.code === 200) {
        // 添加摄像头
        this.videoList = [];
        res.data.content.forEach((item) => {
          this.videoList.push({
            id: item.id,
            camName: item.camName,
            src: item.videoAddress,
          });
        });
        console.log(this.videoList, "videolist");
      }
    },
    open() {
      this.openEdit = true;
      this.getVideoList();
    },
    close() {
      this.openEdit = false;
      this.reset();
    },

    onChange(val) {
      console.log(val, "val");
      this.voidIds = val.join(",");
    },

    async submitForm() {
      if (this.baseInfo && this.baseInfo.id) {
        let params = { id: this.baseInfo.id, voidIds: this.voidIds };
        const res = await bindVideoAPI(params);
        if (res && res.code === 200) {
          this.$message.success("绑定视频成功");
          this.$emit("refreshCamera");
          this.close();
        }
      } else {
        this.$message.warning("绑定基本信息不存在");
      }
    },
    reset() {},
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

/deep/ .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

/deep/ .dcs-box {
  width: 342px;
  height: 260px;
  margin: 20px;
}
</style>
