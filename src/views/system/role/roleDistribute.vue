<template>
  <div class="main-wrapper">
    <el-row style="height: 100%;">
      <el-col :span="4">
        <role-change-list
          ref="roleChangeListRef"
          @handleRoleClick="handleRoleClick"
        ></role-change-list>
      </el-col>
      <el-col :span="20">
        <div class="right-role-button">
          <div class="content-wrapper top-buttons">
            <el-input
              v-model="queryMenuName"
              clearable
              placeholder="菜单名称"
              style="width: 300px;margin-right: 10px"
              @blur="handleSearch"
              @clear="getTreeData($route.query.id)"
            ></el-input>
            <el-button type="primary" @click="handleSearch">查询信息</el-button>
            <el-button type="info" @click="getTreeData($route.query.id)">重置信息</el-button>
            <el-button type="success" @click="$refs.renderTable.$refs.xTable.setAllTreeExpand(true)">全部展开</el-button>
            <el-button type="warning" @click="$refs.renderTable.$refs.xTable.clearTreeExpand()">全部收缩</el-button>
            <el-button type="success" @click="checkAllButtonMethods">全选菜单</el-button>
            <el-button type="primary" @click="savePermission">保存授权</el-button>
          </div>
        </div>
        <div class="right-role-list">
          <div class="content-wrapper role-table">
            <render-table
              ref="renderTable"
              :checkbox-config="{labelField: 'name',checkStrictly: false}"
              :columns="columns"
              :data="tableData"
              :height="tableHeight"
              :row-config="{isHover: true}"
              :scroll-y="{enabled: false}"
              :show-overflow="false"
              :tree-config="{ children:'children',reserve:true}"
              row-id="id"
              tree-node
              @checkbox-change="checkMenuChange"
            >
            </render-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {permissionsTreeDataAPI, savePermissionsTreeDataAPI} from "@/api/system/role";
import {treeDataForEach, treeFilter} from "@/util";
import roleChangeList from "@views/system/role/roleChangeList";

export default {
  name: "roleDistribute",
  components: {roleChangeList},
  data() {
    return {
      tableData: [],
      queryMenuName: "",
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 150,
          fixed: "left",
          align: "center",
          treeNode: true,
        },
        {
          type: 'checkbox',
          width: 200,
          title: '操作菜单',
          fixed: "left",
        },
        {
          field: "permissionList",
          title: '操作权限',
          render: (h, {row}) => {
            if (row.permissionList) {
              let pers = row.permissionList.filter(item => item._checked === true).map(item => item.id)
              return <div>
                <vxe-checkbox
                  content="全选"
                  ref={`checkAllRef${row.id}`}
                  value={pers.length === row.permissionList.length}
                  on-change={(checked) => this.selectAllMethods(checked, row)}>
                </vxe-checkbox>
                <vxe-checkbox-group
                  on-change={(checked) => this.checkPerChange(checked, row)}
                  value={pers}
                  ref={`checkRef${row.id}`}
                >
                  {
                    row.permissionList.map(item => {
                      return (
                        <div style="padding:5px;">
                          <vxe-checkbox label={item.id} content={item.name}>
                          </vxe-checkbox>
                        </div>
                      )
                    })
                  }
                </vxe-checkbox-group>
              </div>
            } else {
              return <div>

              </div>
            }

          }
        }
      ],
      tableHeight: '95%',
      defaultCheckedKeys: [],
      addPermissionIds: [],
      removePermissionIds: [],
      currentCheckIdList: [],
      checkState: true,
    }
  },
  created() {
    this.getTreeData(this.$route.query.id)
  },
  methods: {
    // 全选
    checkAllButtonMethods() {
      this.checkState = !this.checkState
      this.$refs.renderTable.$refs.xTable.setAllCheckboxRow(this.checkState)
    },
    //搜索
    handleSearch() {
      this.tableData = treeFilter(this.tableData, (item) => {
        return item.name === this.queryMenuName
      }, 'permissionList')
      if (this.tableData.toString() !== '[]') {
        this.$refs.renderTable.$refs.xTable.setTreeExpand(this.tableData[0], true)
      }
    },
    // 获取树数据
    async getTreeData(id) {
      this.defaultCheckedKeys = [];
      const res = await permissionsTreeDataAPI({id})
      this.tableData = res.data;
      treeDataForEach(
        this.tableData,
        (item) => {
          // if (item.id && item.checked) {
          //设置权限选中状态
          this.$refs.renderTable.$refs.xTable.setCheckboxRow(item, item.checked)
          // }
          if (item.permissionType === 'SYSTEM_PERMISSION_TYPE:MENU' && item.children) {
            item.permissionList = item.children
            item.permissionList = item.permissionList.map(item => ({...item, _checked: item.checked}))
            delete item.children
          }
        },
        "children"
      );
    },
    // 获取 角色点击
    handleRoleClick(params) {
      this.$refs.roleChangeListRef.active = params.id
      // 切换角色进行置空操作
      this.addPermissionIds = []
      this.removePermissionIds = []
      this.getTreeData(params.id)
    },
    /**
     * 权限操作执行逻辑
     * @param perId
     * @param list
     */
    handlePermissionOperate(perId, list) {
      let curIndex;
      let flag = this[list].some((item, index) => {
        if (perId === item) {
          curIndex = index;
          return perId === item;
        }
      });
      if (flag) {
        this[list].splice(curIndex, 1);
      }
    },
    // 每行权限的选中状态
    /**
     *
     * @param state 权限当前的状态
     * @param row   当前行的数据
     * 我的代码你看不懂
     */
    checkPerChange(state, row) {
      // 获取当前选中状态
      let value = row.permissionList.filter(item => item.id === state.label)
      // 每行权限选中需要变更原始数据
      // 如果有一个权限不存在 全选需要变为false
      row.permissionList.forEach(item => {
        if (item.id === state.label) item._checked = state.checked
      })
      if (!state.checked) {
        //菜单勾选操作触发会重新render，所以需要 修改原始数据
        this.$nextTick(() => {
          this.$refs.renderTable.$refs[`checkAllRef${row.id}`].value = false
        })
      } else {
        // 如果权限勾选操作满足全选 需要将全选勾上
        let pers = row.permissionList.filter(item => item._checked === true).map(item => item.id)
        if (row.permissionList.length === pers.length) {
          this.$nextTick(() => {
            this.$refs.renderTable.$refs[`checkAllRef${row.id}`].value = true
          })
        }
      }
      this.handleIsCheck(state.checked, state.label, row, value[0].checked)
    },
    // 每行菜单选择方法
    checkMenuChange({checked, row}) {
      this.handleIsCheck(checked, row.id, row, row.checked)
    },
    /**
     *
     * @param checked 当前选中状态
     * @param checkId 当前选中id
     * @param row 行数据
     * @param curChecked 原始数据当前选中状态
     */
    // 权限选中后操作接口参数addPermissionIds、removePermissionIds方法
    handleIsCheck(checked, checkId, row, curChecked) {
      if (checked) {
        this.handlePermissionOperate(checkId, 'removePermissionIds')
        if (!curChecked) {
          this.addPermissionIds.push(checkId)
          //  可能存在全选操作需要先进行去重
          this.addPermissionIds = [...new Set(this.addPermissionIds)]
        }
      } else {
        this.handlePermissionOperate(checkId, 'addPermissionIds')
        if (curChecked) this.removePermissionIds.push(checkId)
      }
    },
    // 全选事件
    /**
     *
     * @param state 当前选中状态
     * @param row  行数据
     */
    selectAllMethods(state, row) {
      // // 当前权限id组
      let curIds = row.permissionList.map(item => item.id)
      this.currentCheckIdList = curIds
      //  全不选
      if (!state.checked) {
        //全选需要将row中原始数据修改为false
        row.permissionList.forEach(item => {
          item._checked = false
        })
        this.$refs.renderTable.$refs[`checkRef${row.id}`].value = []
      }
      //  全选
      if (state.checked) {
        //全选需要将row中原始数据修改为true
        row.permissionList.forEach(item => {
          item._checked = true
        })
        this.$refs.renderTable.$refs[`checkRef${row.id}`].value = curIds
      }

      row.permissionList.forEach(item => {
        this.handleIsCheck(state.checked, item.id, row, item.checked)
      })
    },
    // 保存
    savePermission() {
      this.$confirm("确认保存角色权限信息?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let params = {
          addPermissionIds: this.addPermissionIds,
          removePermissionIds: this.removePermissionIds,
          roleId: this.$refs.roleChangeListRef.active,
        };
        const res = await savePermissionsTreeDataAPI(params)
        if (res.code === 200) {
          this.$message.success("角色权限设置成功!");
          // 重新获取菜单
          this.$store.dispatch("GetMenu").then(() => {
            // 调用事件总线
            this.$EventBus.$emit("initMenu");
            // 初始化状态
            this.addPermissionIds = []
            this.removePermissionIds = []
            this.getTreeData(this.$refs.roleChangeListRef.active)
          });
        }
      }).catch(err => {
        console.log(err, 'err')
      });

    },

  }

}
</script>

<style lang="scss" scoped>
/deep/ .el-col {
  height: 100%;
}


.main-wrapper {
  width: 100%;

  .content-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;

  }

  .right-role-button {
    width: 100%;
    height: 10%;
    //background: skyblue;
    box-sizing: border-box;
    padding-left: 5px;
    padding-bottom: 5px;
  }

  .right-role-list {
    width: 100%;
    height: 90%;
    //background: yellow;
    box-sizing: border-box;
    padding-left: 5px;
    padding-top: 5px;
  }

  .top-buttons {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .role-table {
    padding: 10px;
  }

}
</style>
