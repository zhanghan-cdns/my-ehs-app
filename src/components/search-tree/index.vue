<template>
  <div class="left_container">
    <!-- 树容器 -->
    <div
      class="tree_container"
      :style="isTree ? 'width:98%;' : 'width:98%'"
      :class="isActive ? '' : 'tree_show'"
    >
      <div
        v-show="isActive"
        style="height: 100%; width: 100%; display: flex; flex-direction: column"
      >
        <!-- 树类型选择 -->
        <div
          class="tree_type"
          :style="isActive ? `` : 'width:100%;margin-right:7px;'"
          v-if="!treeTab"
        >
          <div v-if="tabList.length > 1" style="width: 100%; display: flex">
            <div
              v-for="item in tabList.slice(0,2)"
              :key="item.id"
              class="tree_type_item"
              :class="active === item.type ? 'active' : ''"
              @click="handleClickTreeType(item.type)"
            >
              <div style="margin-right: 4px">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <div style="margin-top: 4px">{{ item.label }}</div>
            </div>
          </div>

          <el-dropdown v-if="tabList.length > 2" @command="handleCommand">
            <span class="el-dropdown-link tree_type_item" style="height: 20px">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="menuItem in tabList.slice(2)"
                :key="menuItem.id"
                :command="menuItem.type"
                >{{ menuItem.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-input
          clearable
          placeholder="输入关键字进行过滤"
          style="width: 100%"
          v-model="filterText"
        >
        </el-input>
        <div class="search_tree">
          <el-tree
            :data="treeData"
            :props="$attrs.treeProps"
            ref="tree"
            node-key="code"
            :lazy="$attrs.lazy"
            :default-expanded-keys="$attrs.defaultExpandedKeys"
            :indent="$attrs.indent"
            :filter-node-method="filterNode"
            highlight-current
            :show-checkbox="$attrs['show-checkbox']"
            :load="$attrs.load"
            check-on-click-node
            @check="$listeners['check']"
            :render-content="$attrs['render-content']"
            @node-click="$listeners['node-click']"
            :expand-on-click-node="false"
          >
          </el-tree>
        </div>
      </div>
    </div>

    <!-- 收缩 -->
    <div class="collapse_box">
      <!-- <div class="collapse" @click="handleCollapse"></div> -->
    </div>
  </div>
</template>
<script>
import collapse from "@/components/search-tree/collapse";
import { getTreeConfigInfo } from "@/util/auth";
// const organization = "zuzhi";
// const administrativeArea = "xinzheng";
// const operationPerson = "yunwei";
export default {
  name: "SearchTree",
  components: {
    collapse,
  },
  props: {
    // 是否为单纯的树组件（不含左侧类型选择）
    isTree: {
      type: Boolean,
      default: false,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    // isActive: {
    //   type: Object,
    //   default: () => ({}),
    // },
  },
  data() {
    const tabList = getTreeConfigInfo()
      .filter((item) => item.type === "side")
      .map((item) => ({
        id: item.id,
        label: item.treeName,
        icon: item.icon,
        type: item.treeNodeNames,
      }));
    return {
      // 显示类
      active: tabList[0] ? tabList[0].type : "",
      // // 组织机构
      // organization: "zuzhi",
      // // 行政区域
      // administrativeArea: "xinzheng",
      // // 运维管理
      // operationPerson: "yunwei",
      icons: {
        zongju: "icon-zongju",
      },
      filterText: "",
      isActive: true,
      // tab 切换
      tabList: tabList,
      // tabList: [
      //   {
      //     id: 0,
      //     label: "网格区域",
      //     icon: "icon-zuzhi",
      //     type: organization,
      //   },
      //   {
      //     id: 1,
      //     label: "组织条线",
      //     icon: "icon-hangzhengquyu",
      //     type: administrativeArea,
      //   },
      // {
      //   id: 2,
      //   label: "运维组织",
      //   icon: "icon-hangzhengquyu",
      //   type: operationPerson,
      // },
      // ],
      treeTab: this.$pageConfig(this.$route.path).hiddenTreeTab,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {},
  methods: {
    handleCommand(command) {
      let index2; //下拉菜单中选中的tab的索引
      const activeItem = this.tabList.filter((item, index) => {
        index2 = index;
        return item.type === command;
      });
      // 选中目标 交换两个tab的位置
      let index1 = 0; //第一个tab
      this.tabList[index1] = this.tabList.splice(
        index2,
        1,
        this.tabList[index1]
      )[0];
      this.active = activeItem[0].type;
      this.$emit("change", command);
    },
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 点击左侧树
    handleClickTreeType(type) {
      this.active = type;
      this.$emit("change", type);
    },
    // 收缩事件
    handleCollapse() {
      // setTimeout(() => {}, 100);
      this.$nextTick(() => {
        this.isActive = !this.isActive;
        this.$store.commit("SET_TREE_COLLAPSE", this.isActive);
      });
    },
  },
};
</script>

<style lang='scss'>
.left_container {
  height: calc(100% - 30px);
  flex: 1;
  display: flex;
  // flex-direction: column;
  width: 91%;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 15px 10px;
  // padding-right:10px;
  // box-sizing: border-box;
}
.tree_type {
  // width: 48px;
  width: 100%;
  // padding: 0 3.5px;
  background: #ffffff;
  // border: 1px solid #e8e8e8;
  margin-bottom: 10px;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 4px;
  .tree_type_item {
    // writing-mode: vertical-rl;
    width: 40%;
    // min-height: 95px;
    // text-align: center;
    border: 1px solid #e8e8e8;
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: 500;
    color: #7c7c7c;
    cursor: pointer;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
}
.tree_container {
  // width: 224.5px;
  height: 100%;
  // flex: 1;
  // background: #ffffff;
  // border: 1px solid #e8e8e8;
  // border-radius: 4px;
  // padding: 15px 10px;
  // transition: all 0.5s linear;
  // box-sizing: border-box;
}
.tree_show {
  width: 0 !important;
  padding: 0;
  margin: 0;
}
.active {
  color: #fff !important;
  background: #4ba8ff;
}
.collapse_box {
  width: 2%;
  height: 100%;
  .collapse {
    width: 10px;
    height: 15px;
    background: deeppink;
    // position: absolute;
    // top:300px;
    // left:300px;
    // z-index: 2000;
  }
}
</style>
<style lang='scss'>
.search_tree {
  // height: calc(100% - 60px);
  margin-top: 20px;
  width: 100%;
  // box-sizing: border-box;
  overflow: auto;
  // // height: 75vh;
  // box-sizing: border-box;
  // .el-tree {
  //   width: 100%;
  //   overflow: scroll;
  // }
  // .el-tree > .el-tree-node {
  //   display: inline-block;
  //   min-width: 100%;
  // }
  // .el-tree-node.is-expanded > .el-tree-node__children {
  //   // display: inline;
  // }
}
</style>