<!--  -->
<template>
  <div>
    <basicDialog
      icon="icon-jinggao1"
      title="警示标志"
      :width="1014"
      :height="833"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <div class="search_header">
            <el-radio-group v-model="signType" @change="handleSignType">
              <el-radio-button
                class="radio_btn_item"
                label="禁止标志"
              ></el-radio-button>
              <el-radio-button
                class="radio_btn_item"
                label="警告标志"
              ></el-radio-button>
              <el-radio-button
                class="radio_btn_item"
                label="指令标志"
              ></el-radio-button>
              <!-- <el-radio-button
                class="radio_btn_item"
                label="自定义"
              ></el-radio-button> -->
            </el-radio-group>
            <el-input
              v-model="filterText"
              style="width: 330px; margin-right: 20px;margin-left:30px;"
              prefix-icon="el-icon-search"
              placeholder="请输入关键字进行筛选"
              @blur="filterSign"
              clearable
            >
            </el-input>
          </div>
          <!-- 警示 -->
          <div class="img_list" v-show="signType === '警告标志'">
            <div
              class="img_item"
              v-for="(item, index) in warning"
              :key="index"
              @click="handleSignClick('warning', index)"
            >
              <img
                :src="baseUrl+'/doubleprevention' + item.path"
                :alt="item.name"
                :class="item.active ? 'img_active' : ''"
              />
              <!-- <svg-icon
                class="active_icon"
                icon-class="xuanzhong2"
                v-if="item.active"
              ></svg-icon> -->
              <img src="../../../../../../src/assets/images/gou.png" v-if="item.active" alt="" class="active_icon">

            </div>
          </div>
          <!-- 禁止 -->
          <div class="img_list" v-show="signType === '禁止标志'">
            <div
              v-for="(item, index) in prohibit"
              :key="index"
              class="img_item"
              @click="handleSignClick('prohibit', index)"
            >
              <img
                :src="baseUrl +'/doubleprevention'+ item.path"
                :alt="item.name"
                :class="item.active ? 'img_active' : ''"
              />
              <!-- <svg-icon
                class="active_icon"
                icon-class="xuanzhong2"
                v-if="item.active"
              ></svg-icon> -->
              <img src="../../../../../../src/assets/images/gou.png" v-if="item.active" alt="" class="active_icon">
            </div>
          </div>
          <!-- 指令 -->
          <div class="img_list" v-show="signType === '指令标志'">
            <div
              v-for="(item, index) in instructions"
              :key="index"
              class="img_item"
              @click="handleSignClick('instructions', index)"
            >
              <img
                :src="baseUrl +'/doubleprevention'+ item.path"
                :alt="item.name"
                :class="item.active ? 'img_active' : ''"
              />
              <!-- <svg-icon
                class="active_icon"
                icon-class="xuanzhong2"
                v-if="item.active"
              ></svg-icon> -->
              <!-- <img src="../../../../../../src/assets/images/gou.png" v-if="item.active" alt=""> -->
              <img src="../../../../../../src/assets/images/gou.png" v-if="item.active" alt="" class="active_icon">
            </div>
          </div>
          <!-- <div class="img_list" v-show="signType === '自定义'">
            <el-upload
              name="files"
              list-type="picture-card"
              :file-list="fileList"
              :http-request="
                (params) => {
                  handleUploadPreview(params, 'fileList');
                }
              "
              multiple
              show-file-list
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="imgUrl + file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div> -->
        </div>
      </template>
      <template #bottom>
        <el-button
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >保存</el-button
        >
        <el-button
          type="success"
          size="medium"
          @click="handleBottomClick('reset')"
          >重置</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="handleBottomClick('cancel')"
          >取消</el-button
        >
      </template>
    </basicDialog>
  </div>
</template>

<script>
import { baseUrl } from "@/router/axios";
import { eventSignInfoDeleteAPI } from "@/api/doubleprevention/riskevent/index.js";
export default {
  data() {
    return {
      baseUrl:baseUrl,
      openEdit: false,
      signType: "禁止标志",
      // 禁止图标列表
      prohibit: [],
      // 指令图标
      instructions: [],
      // 警告图标
      warning: [],
      // 当前选中的图标 外部显示
      activeList: [],
      filterText: "",
      fileList: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    close() {
      this.openEdit = false;
      this.resetActiveState();
    },
    async open() {
      this.openEdit = true;
       await  this.eventSign();
      // 当选中图片时候 再打开标志选择弹窗 回显当前选中的图片的状态
      if (this.activeList.length > 0) {
        let obj = {};
        // 对有选中项的进行一个筛选 选出有选中项的数组
        this.activeList = this.activeList.map((item) => {
          obj[item.type] = item.type;
          return {
            ...item,
            active: true,
          };
        });
        // 在选中项中进行一个遍历，把已经选中的图片重新赋值到相对应的list的item中
        for (let key in obj) {
          // 首先在选中图片中，对各个选中图片进行分类
          let activeImgs = this.activeList.filter((item) => item.type === key);
          // 再把分类的图片赋值到各个图片list的对应的位置 完成回显
          this[key] = this[key].map((item) => {
            // 筛选出当前选中的图片项
            let cur = activeImgs.filter((imgs) => item.path === imgs.path);
            // 判断当前项是否被选中 如果被选中就进行一个回显
            if (cur.length > 0) {
              return cur[0];
            } else {
              return item;
            }
          });
        }
      }
    },
    // 获取事件标志
    async eventSign() {
      try {
        const res = await eventSignInfoDeleteAPI();
        if (res.code === 200) {
          const arr = ["prohibit", "instructions", "warning"];
          arr.map((item) => {
            return (this[item] = res.data.filter((imgs) => imgs.type === item));
          });
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleSignType(type) {
      this.signType = type;
    },
    // 过滤标志
    filterSign(e) {
      let str = e.target.value;
      let reg = new RegExp([str]);
      if (!str) {
        this.getWarningLabels();
        this.activeList = [];
        return;
      }
      if (this.signType === "指令标志") {
        this.instructions = this.instructions.filter((item) => {
          if (item.name.match(reg)) {
            return item;
          }
        });
      }
    },
    // 移出图片
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    // 重置选中状态
    resetActiveState() {
      const arr = ["prohibit", "instructions", "warning"];
      arr.forEach((list) => {
        this[list] = this[list].map((item) => {
          return {
            ...item,
            active: false,
          };
        });
      });
    },
    // 标志点击
    handleSignClick(type, key) {
      this[type] = this[type].map((item, index) => {
        if (key === index) {
          return {
            ...item,
            active: item.active === true ? false : true,
          };
        } else {
          return item;
        }
      });
    },
    // 底部按钮点击
    handleBottomClick(type) {
      if (type === "cancel") {
        this.openEdit = false;
        this.resetActiveState();
      }
      if (type === "reset") {
        this.resetActiveState();
        this.getWarningLabels();
        // 重置的时候 外部显示图片一样需要进行 清空
        this.activeList = [];
      }
      if (type === "save") {
        let signList = [
          ...this.prohibit,
          ...this.instructions,
          ...this.warning,
        ];
        this.activeList = signList.filter((item) => item.active === true);
        this.openEdit = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}
.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 25px;
}
.search_header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  .radio_btn_item {
    border-radius: 4px !important;
    margin-right: 10px;
    /deep/ .el-radio-button__inner {
      border-left: 1px solid #dcdfe6;
    }
  }
}
.img_list {
  width: 100%;
  display: flex;
  height: 620px;
  overflow: auto;
  flex-wrap: wrap;
  align-content: flex-start;
  .img_item {
    width: 160px;
    height: 160px;
    cursor: pointer;
    padding: 4px;
    box-sizing: border-box;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
    }
    .active_icon {
      position: absolute;
      top: 4px;
      right: -2px;
      width: 2.25rem;
      height: 2.24rem;
    }
  }
}
.img_active {
  border: 3px solid #4a80fc !important;
  border-radius: 4px;
}
</style>
