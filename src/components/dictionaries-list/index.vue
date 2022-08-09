<template>
  <div class="container">
    <div class="list_box">
      <el-input @blur="inputBlur" @clear="clear" clearable placeholder="请输入搜索条件" v-model="searchWord"></el-input>
      <div
        v-if="dictionaryData.length && dictionaryData.length === 0"
        class="list_empty"
      >
        暂无数据
      </div>
      <!-- 字典模式 -->
      <div class="letter_list" v-if="mode">
        <div
          class="list_content"
          v-for="(item, index) in dictionaryData"
          :key="index"
        >
          <div class="list_item_letter">{{ item.letter }}</div>
          <div
            class="list_item"
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            @click="handleDictionaryClick(child)"
          >
            <div class="list_item_img">图片</div>
            <el-tooltip
              placement="top"
              :content="child.text"
              :disabled="child.text.length <= fontLength ? true : false"
            >
              <div class="list_item_text">{{ child.text }}</div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- 普通模式 -->
      <div class="letter_list" v-else style="margin-top: 20px">
        <div
          class="list_content"
          v-for="(item, index) in commonData"
          :key="item.id"
        >
          <div
            class="common_list_item"
            :class="item.active ? 'isActive' : ''"
            @click="handleCommonClick(item)"
          >
            <!-- <i class="iconfont common_list_item_icon" :class="item.icon"></i> -->
            <span class="common_list_item_text">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// {
//   letter: "A",
//   children: [
//     {
//       imgSrc: "",
//       text: "安徽腾龙泵阀",
//     },
//     {
//       imgSrc: "",
//       text: "安徽卧龙泵阀",
//     },
//     {
//       imgSrc: "",
//       text: "奥斯顿制冷设备",
//     },
//   ],
// }
export default {
  name: "dictionariesList",
  props: {
    dictionaryData: {
      type: Array,
      default: () => [],
    },
    commonData: {
      type: Array,
      default: () => [],
    },
    fontLength: {
      type: Number,
      default: 6,
    },
    // 显示模式，默认字典
    mode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    inputBlur(){
      this.$emit('inputBlur',this.searchWord)
    },
    handleDictionaryClick(child) {
      this.$emit("handleDictionaryListClick", child);
    },
    handleCommonClick(item) {
      this.$emit("handleCommonListClick", item);
    },
    clear(){
      this.$emit("clear");
    }
  },
};
</script>

<style scoped lang='scss'>
.isActive {
  background: #f1f6fd;
}
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  padding-right: 7px;
  box-sizing: border-box;
  .list_empty {
    text-align: center;
    font-size: 14px;
    color: #909399;
    padding: 100px 0;
  }
  .list_box {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px 14px;
    box-sizing: border-box;
    .letter_list {
      width: 100%;
      height: 500px;
      // padding: 0 14px;
      box-sizing: border-box;
      .list_content {
        .list_item_letter {
          padding: 32px 24px;
          color: #3c3c3c;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 600;
        }
        .common_list_item {
          padding: 5px 20px;
          padding-right: 0;
          display: flex;
          height: 38px;
          width: 100%;
          box-sizing: border-box;
          .common_list_item_text {
            line-height: 32px;
            padding-left: 10px;
            color: #515151;
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 12px;
          }
          .common_list_item_icon {
            line-height: 34px;
            color: #56c1ff;
            font-weight: 600;
          }
          &:hover {
            background: #f1f6fd;
          }
        }
        .list_item {
          padding: 5px 32px;
          padding-right: 0;
          display: flex;
          height: 38px;
          width: 100%;
          box-sizing: border-box;
          &:hover {
            background: #f1f6fd;
          }
          .list_item_img {
            width: 43px;
            height: 27px;
            margin-right: 19px;
            background: skyblue;
          }
          .list_item_text {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100px;
          }
        }
      }
    }
    // padding-bottom: 10px;
  }
}
</style>