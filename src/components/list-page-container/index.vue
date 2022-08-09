<template>
  <el-row justify="space-between" style="height: 100%">
    <el-col
      style="height: 100%"
      :span="authInfo.some((item) => item === 'tree') ? leftWidth : 0"

    >
      <slot name="left"></slot>
    </el-col>
    <el-col
      :span="authInfo.some((item) => item === 'tree') ? rightWidth : 24"
      class="contain-right"
    >
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>
<script>
import {getAuthInfo} from "@/util/auth";
export default {
  name: "listContainer",
  data() {
    return {
      authInfo:  getAuthInfo(),
      leftWidth: this.$pageConfig(this.$route.path).$leftWidth,
      rightWidth: this.$pageConfig(this.$route.path).$rightWidth,
    };
  },
  watch: {
    //监听搜索树收缩
    treeCollapse(val) {
      if (val) {
        this.leftWidth = this.$pageConfig(this.$route.path).$leftWidth;
        this.rightWidth = this.$pageConfig(this.$route.path).$rightWidth;
      } else {
        if (this.$pageConfig(this.$route.path).isTree) {
          this.leftWidth = 0;
          this.rightWidth = 24;
        } else {
          this.leftWidth = 1;
          this.rightWidth = 23;
        }
      }
    },
  },
  created() {
    // 还原收缩状态
    this.$store.commit("SET_TREE_COLLAPSE", true);
  },
  computed: {
    treeCollapse() {
      return this.$store.state.common.treeCollapse;
    },
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
// .table_container {
//   width: 78%;
//   // height:100%;
//   background: #ffffff;
//   border: 1px solid #e8e8e8;
//   border-radius: 2px;
//   margin-left:5px;
//   padding:20px;
// }
/deep/ .el-col-4 {
  width: 20%;
}

/deep/ .el-col-20 {
  width: 80%;
}

/deep/ .el-col-3 {
  width: 15.723%;
}

/deep/ .el-col-21 {
  width: 84.277%;
}
.contain-right{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffff;
  position: relative;
  padding: 0 23px;
  border-radius: 4px;
}
</style>
