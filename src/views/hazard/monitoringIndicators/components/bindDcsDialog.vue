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
        <el-radio-group
          v-model="checkList"
          @change="onChange"
          style="display: flex; flex-wrap: wrap"
        >
          <div
            v-for="listItem in dcsPictureList"
            :key="listItem.id"
            class="dcs-box"
          >
            <el-image
              v-for="item in listItem.enclosurePhoto"
              :key="item.url"
              style="width: 342px; height: 192px; margin-bottom: 10px"
              :src="imgUrl + item.url"
              :preview-src-list="[imgUrl + item.url]"
            ></el-image>
            <div style="text-align: center">
              <el-radio :label="listItem.id"> {{ listItem.dcsname }}</el-radio>
            </div>
          </div>
        </el-radio-group>
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
import { choiceDcsAPI } from "@/api/hazard/monitoringIndicators/index";
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
      title: "更换组态图",
      openEdit: false,
      checkList: [],
      dcsPictureList: [],
      dcsIds: "",
      row: {},
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
    open(row) {
      this.openEdit = true;
      this.row = row;
      this.getDcsList({});
    },
    close() {
      this.openEdit = false;
      this.reset();
    },

    onChange(val) {
      console.log(val, "val");
      this.dcsIds = val;
    },

    async submitForm() {
      let params = { id: this.row.id, dcsIds: this.dcsIds };
      const res = await choiceDcsAPI(params);
      if (res && res.code === 200) {
        this.$message.success("绑定DCS成功");
        this.$emit("refreshDcs", res.data);
        this.close();
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
