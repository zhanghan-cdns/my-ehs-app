<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="900px"
      height="88%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="dcs">
          <div class="dcs-title">
            <img
              class="img-icon"
              style="width: 20px; height: 22px"
              src="@/assets/images/dcspoint.png"
            />DCS标点
          </div>
          <div class="dcs-button-group">
            <el-button type="success" :size="size" @click="selectDcs"
              ><img
                class="img-icon"
                style="width: 16px; height: 13px"
                src="@/assets/images/selectdcs.png"
              />选择组态图</el-button
            >
            <el-button type="primary" :size="size" @click="bindPoint"
              ><img
                class="img-icon"
                style="width: 13px; height: 16px"
                src="@/assets/images/bindpoint.png"
              />绑定标点</el-button
            >
          </div>
        </div>
        <div>
          <el-radio-group
            v-model="checkList"
            @change="onChange"
            style="display: flex; padding: 0px 60px; flex-wrap: wrap"
          >
            <div
              v-for="listItem in dcsPictureList"
              :key="listItem.id"
              class="dcs-box"
            >
              <el-image
                v-for="item in listItem.enclosurePhoto"
                :key="item.url"
                style="width: 750px; height: 392px; margin-bottom: 10px"
                :src="imgUrl + item.url"
                :preview-src-list="[imgUrl + item.url]"
              ></el-image>
              <div style="text-align: center">
                <el-radio :label="listItem.id">
                  {{ listItem.dcsname }}</el-radio
                >
              </div>
            </div>
          </el-radio-group>
        </div>
      </template>

      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <bind-dcs-point ref="bindDcsPointRef"></bind-dcs-point>
    <bind-dcs-dialog
      ref="bindDcsDialogRef"
      @refreshDcs="getDcsList"
    ></bind-dcs-dialog>
  </div>
</template>
<script>
import {
  monitoringIndicatorsCreateAPI,
  monitoringIndicatorsViewAPI,
  monitoringIndicatorsUpdateAPI,
} from "@/api/hazard/monitoringIndicators/index";
import { dcsInfoByIndexIdsAPI } from "@/api/hazard/dcsInfo/index";
import bindDcsPoint from "./bindDcsPoint.vue";
import bindDcsDialog from "./bindDcsDialog.vue";
import { imgUrl } from "@/router/axios";

export default {
  name: "editDialog",
  components: {
    bindDcsPoint,
    bindDcsDialog,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icon: "icon-bianji",
      title: "绑定标点",
      openEdit: false,
      size: "small",
      row: {},
      imgUrl,
      dcsPictureList: [],
      checkList: [],
      dcsIds: "",
    };
  },

  created() {},

  methods: {
    // 选择组态图
    selectDcs() {
      this.$refs.bindDcsDialogRef.open(this.row);
    },
    // 标点
    bindPoint() {
      if (this.dcsIds && this.row) {
        this.$refs.bindDcsPointRef.open(this.row, this.dcsIds);
      } else {
        this.$message.warning("请选择组态图");
      }
    },

    onChange(val) {
      console.log(val, "val");
      this.dcsIds = val;
    },

    // 打开
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.row = row;
        this.getDcsList();
      }
    },

    async getDcsList(val) {
      console.log(val, "val");
      let ids;
      ids = val ? val.bindConfiguration : this.row.bindConfiguration;
      let params = { ids };
      const res = await dcsInfoByIndexIdsAPI(params);
      if (res && res.code === 200) {
        this.dcsPictureList = res.data;
      }
    },

    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.dcs {
  padding: 10px 60px;
}

.dcs-title {
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #1c84ec;
}

.dcs-box {
  margin-bottom: 10px;
}

.img-icon {
  vertical-align: middle;
  margin-right: 5px;
}
</style>
