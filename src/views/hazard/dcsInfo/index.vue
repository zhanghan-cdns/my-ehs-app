<template>
  <div id="dcsInfo">
    <div class="dcs-content">
      <div
        class="box box-add"
        ref="addBoxRef"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="addDcsPicture"
      >
        <div>
          <i class="iconfont icon-jia" style="font-size: 25px"></i>
          <div style="margin-top: 10px">新增组态图</div>
        </div>
      </div>
      <div
        v-for="(listItem, index) in dcsPictureList"
        :key="listItem.id"
        class="box-add"
        ref="pictureBoxRef"
        @mouseover="mousePictureOver(index)"
        @mouseleave="mousePictureLeave(index)"
      >
        <div ref="pictureButtonRef" style="display: none">
          <div class="box-button-group">
            <div class="box-button" @click="editDcsPicture(listItem.id)">
              <i
                class="iconfont icon-bianji3 box-button-icon"
                style="color: #3384ff"
              ></i
              >修改
            </div>
            <div class="box-button" @click="deleteDcsPicture(listItem.id)">
              <i
                class="iconfont icon-jian box-button-icon"
                style="color: #ff6060"
              ></i
              >删除
            </div>
          </div>
        </div>
        <div class="box">
          <el-image
            v-for="item in listItem.enclosurePhoto"
            :key="item.url"
            style="width: 342px; height: 192px"
            :src="imgUrl + item.url"
            :preview-src-list="[imgUrl + item.url]"
          ></el-image>
        </div>
        <div class="dcs-name">{{ listItem.dcsname }}</div>
      </div>
    </div>
    <edit-dialog
      ref="editDialogRef"
      @refresh="getDcsPictureList()"
    ></edit-dialog>
  </div>
</template>

<script>
import editDialog from "./components/editDialog.vue";
import { dcsInfoListAPI, dcsInfoDeleteAPI } from "@/api/hazard/dcsInfo/index";
import { imgUrl } from "@/router/axios";

export default {
  components: {
    editDialog,
  },

  data() {
    return {
      imgUrl,
      hoverStyle: {},
      dcsPictureList: [],
    };
  },

  created() {
    this.getDcsPictureList();
  },

  methods: {
    mouseOver() {
      console.log("over");
      this.$refs.addBoxRef.style.transform = "scale(1.1)";
      this.$refs.addBoxRef.style.fontSize = "16px";
    },
    mouseLeave() {
      console.log("leave");
      this.$refs.addBoxRef.style.transform = "scale(1)";
    },

    mousePictureOver(index) {
      console.log(index, "index");
      this.$refs.pictureBoxRef[index].style.transform = "scale(1.1)";
      this.$refs.pictureBoxRef[index].style.fontSize = "16px";
      this.$refs.pictureButtonRef[index].style.display = "block";
    },
    mousePictureLeave(index) {
      this.$refs.pictureBoxRef[index].style.transform = "scale(1)";
      this.$refs.pictureButtonRef[index].style.display = "none";
    },

    addDcsPicture() {
      this.$refs.editDialogRef.open();
    },

    // 获取dcs组态图列表
    async getDcsPictureList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 9999,
      };
      try {
        const res = await dcsInfoListAPI(params);
        if (res.code === 200) {
          this.dcsPictureList = res.data.content;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    editDcsPicture(id) {
      this.$refs.editDialogRef.open(id);
    },

    async deleteDcsPicture(id) {
      this.$confirm("确定删除该条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await dcsInfoDeleteAPI({
            ids: id,
          });
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getDcsPictureList();
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#dcsInfo {
  background: #fff;
  padding: 80px 40px 0px 40px;
}

.dcs-content {
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 357px;
  height: 212px;
  background: #ffffff;
  border: 1px solid #cdcdcd;
  font-size: 14px;
  color: #0482e8;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
}

.box-add {
  margin: 17px 27px;
}

.box-button-group {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 5px;
}

.box-button {
  font-size: 16px;
  color: #6e6e6e;
  margin: 0px 10px;
  cursor: pointer;
}

.box-button-icon {
  font-size: 22px;
  margin-right: 5px;
  vertical-align: middle;
}

.dcs-name {
  margin: 10px 0px 0px 0px;
  text-align: center;
  font-size: 20px;
  color: #787878;
}

.active {
  transform: scale(1.1);
}
</style>