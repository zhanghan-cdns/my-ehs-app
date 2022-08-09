<template>
  <div id>
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            clearable
            style="margin-bottom: 10px"
          ></el-input>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            :filter-node-method="filterNode"
            :default-checked-keys="defaultCheckedKeys"
            @check-change="checkChange"
            ref="tree"
          ></el-tree>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {
  permissionsTreeDataAPI,
  savePermissionsTreeDataAPI,
} from "@/api/system/role";
import { treeDataForEach } from "@/util/index";

export default {
  data() {
    return {
      openEdit: false,
      filterText: "",
      rowId: "",
      treeData: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      addList: [],
      removeList: [],
    };
  },
  props: {
    title: {
      type: String,
      default: "分配权限面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {},
  methods: {
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.rowId = row.id;
        this.getTreeData(row.id);
      }
    },
    close() {
      this.openEdit = false;
      this.addList=[]
      this.removeList=[]
    },
    getTreeData(id) {
      this.defaultCheckedKeys = [];
      permissionsTreeDataAPI({ id }).then((res) => {
        this.treeData = res.data;
        treeDataForEach(
          this.treeData,
          (item, parent, index) => {
            if (item.id && item.checked) {
              this.defaultCheckedKeys.push(item.id);
            }
          },
          "children"
        );
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    checkChange(value, check) {
      /**
       * 1、
       * 判断选中状态
       * 如果选中 在removeList中查找当前选中项是否存在 如果存在将项从选中项中删除
       * 判断 当前选中项目的初始选中状态 如果初始选中状态 和 当前选中动作一致就不push进数组（还原数组）
       * 反之如此
       */
      if (check) {
        // 如果勾选
        let curIndex;
        let flag = this.removeList.some((item, index) => {
          if (value.id === item.id) {
            curIndex = index;
            return value.id === item.id;
          }
        });
        if (flag) {
          this.removeList.splice(curIndex, 1);
        }
        if (!value.checked) {
          this.addList.push(value);
        }
      } else {
        // 如果不勾选
        let curIndex;
        let flag = this.addList.some((item, index) => {
          if (value.id === item.id) {
            curIndex = index;
            return value.id === item.id;
          }
        });
        if (flag) {
          this.addList.splice(curIndex, 1);
        }
        if (value.checked) {
          this.removeList.push(value);
        }
      }
    },
    // 保存
    submitForm(formName) {
      // let chooseIds = [];
      // let unChooseIds = [];
      // treeDataForEach(
      //   this.treeData,
      //   (item, parent, index) => {
      //     if (item.id && item.checked) {
      //       chooseIds.push(item.id);
      //     }
      //     if (item.id && !item.checked) {
      //       unChooseIds.push(item.id);
      //     }
      //   },
      //   "children"
      // );
      let params = {
        addPermissionIds: this.addList.map(item=>item.id),
        removePermissionIds: this.removeList.map(item=>item.id),
        roleId: this.rowId,
      };
      savePermissionsTreeDataAPI(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("角色权限设置成功!");
          this.$emit("refreshDataList");
          this.$store.dispatch("GetMenu", "");
          this.close();
        }
      });
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style scoped lang='scss'>
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
  padding: 10px 15px;
  padding-top: 20px;
}
/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>