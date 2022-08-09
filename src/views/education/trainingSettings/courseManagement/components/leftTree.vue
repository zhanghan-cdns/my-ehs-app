<template>
  <div class="left_list">
    <div class="title">{{ title }}</div>
    <div class="list_wrap">
      <div
        :class="active_id == item.trainCategory ? 'item item_active' : 'item'"
        v-for="item in treeData"
        :key="item.trainCategory"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tree",
  props: {
    title: {
      type: String,
      default: "类别",
    },
    dict: {
      type: Object,
    },
  },
  data() {
    return {
      active_id: "",
      treeData:[],
    };
  },
  watch: {
    dict: function (v) {
      if (v.educationSetTrainingcategory && this.treeData.length == 0) {
        this.treeData = [];
        v.educationSetTrainingcategory.map((item) => {
          let obj = {
            label: item.dictValueName,
            trainCategory: item.dictValue,
          };
          this.treeData.push(obj);
        });
      }
    },
  },
  methods: {
    handleClick(item) {
      console.log( item.trainCategory)
      if (this.active_id == item.trainCategory) {
        return;
      } else {
        this.active_id = item.trainCategory;
        this.$emit("choseCourse", item.trainCategory);
      }
    },
    refresh() {
      this.active_id = "";
    },
  },
};
</script>
<style scoped lang="scss">
.left_list {
  height: 100%;
  overflow-y: auto;
  background: white;
  margin-right: 10px;
}
.title {
  width: 100%;
  height: 42px;
  background: #f5f7fa;
  font-size: 16px;
  font-weight: 500;
  color: #161616;
  line-height: 42px;
  text-align: center;
  margin-bottom: 10px;
}
.list_wrap {
  height: calc(100% - 52px);
  .item {
    height: 38px;
    background: white;
    border-radius: 0px 0px 0px 0px;
    border-left: 1px solid transparent;
    padding-left: 30px;
    line-height: 38px;
    cursor: pointer;
    font-size: 14px;
  }
  .item_active {
    border-left: 1px solid #597ef7;
    background: #f0f5ff;
  }
}
</style>
