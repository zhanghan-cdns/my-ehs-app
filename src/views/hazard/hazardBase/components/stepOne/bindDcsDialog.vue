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
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存 </el-button>
          <el-button type="success" @click="reset">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import { dcsInfoListAPI } from "@/api/hazard/dcsInfo/index";
import { bindDcsAPI } from "@/api/hazard/hazardBase/index";
import { imgUrl } from "@/router/axios";

export default {
  name: "editDialog",
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imgUrl,
      icon: "icon-bianji",
      title: "新增绑定DCS图",
      openEdit: false,
      checkList: [],
      dcsPictureList: [],
      dcsIds: "",
    };
  },

  created() {},

  methods: {
    //   获取dcs图列表
    async getDcsList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 9999,
      };
      const res = await dcsInfoListAPI(params);
      if (res.code === 200) {
        this.dcsPictureList = res.data.content;
      }
    },
    open() {
      this.openEdit = true;
      this.getDcsList({});
    },
    close() {
      this.openEdit = false;
      this.reset();
    },

    onChange(val) {
      console.log(val, "val");
      this.dcsIds = val.join(",");
    },

    async submitForm() {
      if (this.baseInfo && this.baseInfo.id) {
        let params = { id: this.baseInfo.id, dcsIds: this.dcsIds };
        const res = await bindDcsAPI(params);
        if (res && res.code === 200) {
          this.$message.success("绑定DCS成功");
          this.$emit("refreshDcs");
          this.close();
        }
      } else {
        this.$message.warning("绑定基本信息不存在");
      }
    },

    reset() {
      this.checkList = [];
    },
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
  height: 218px;
  margin: 20px;
}
</style>
