<template>
  <div class="user">
    <list-container>
      <template #left>
        <search-tree
          :treeData="treeData"
          :treeProps="treeProps"
          ref="searchTreeRef"
          :lazy="true"
          :indent="8"
          :isTree="false"
          :render-content="renderContent"
          :show-checkbox="true"
          @check="checkNode"
          @change="treeChange"
          :load="treeLayzLoad"
          :defaultExpandedKeys="defaultExpandedKeys"
        >
        </search-tree>
      </template>
      <template #right>
        <div class="user_operation_box">
          <el-input
            v-model="query.userName"
            placeholder="请输入用户名"
            style="width: 200px"
          ></el-input>
          <header-button @headerButtonClick="headerButtonMethods" />
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      @refreshDataList="getTableData"
      :deptList="deptList"
    ></edit-dialog>
    <update-password
      ref="updatePasswordRef"
      @refreshDataList="getTableData"
    ></update-password>
    <reset-password
      ref="newUpdatePasswordRef"
      @refreshDataList="getTableData"
    >
    </reset-password>
  </div>
</template>
<script>
import editDialog from "./editDialog";
import updatePassword from "./updatePassword";
import resetPassword from './resetPassword.vue'
import { userListAPI, deleteUserListDataAPI } from "@/api/system/user";
import { getDeptListAPI } from "@/api/system/common";
import tableMixins from "@/mixins/table";

export default {
  mixins:[tableMixins],
  components: { editDialog, updatePassword, resetPassword },
  data() {
    return {
      ids: [],
      query: {
        userName: "",
      },
      deptList: [],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "username",
          title: "用户名",
          align: "center",
        },
        {
          field: "nickName",
          title: "昵称",
          align: "center",
        },
        {
          title: "部门",
          align: "center",
          render: (h, { row }) => {
            return <div>{row.department && row.department.deptName}</div>;
          },
        },
        {
          field: "orderNum",
          title: "角色",
          align: "center",
          render: (h, { row, column, $index }) => {
            let text = "";
            row.sysRoles.map((element) => {
              text += element.roleName + "、";
            });
            text = text.substring(0, text.length - 1);
            return <div>{text}</div>;
          },
        },
        // {
        //   field: "enabledState",
        //   title: "启用状态",
        //   align: "center",
        //   render: (h, { row, column, $index }) => {
        //     if (row.enabledState === 0) {
        //       return <div style="color:#67c23a;font-weight:bold;">启用</div>;
        //     } else {
        //       return <div style="color:red;font-weight:bold;">停用</div>;
        //     }
        //   }
        // },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { row, column, $index }) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              ></operate-button>
            );
          },
        },
      ],
      currentUserId: '',
    };
  },
  created() {
    this.getDeptList();
    this.getTableData();
  },
  methods: {
    // 获取部门
    async getDeptList() {
      const res = await getDeptListAPI();
      if (res.code === 200) {
        this.deptList = res.data;
      }
    },
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData(this.query);
          break;
        case "chongzhi":
          this.query.userName = "";
          this.getTableData();
          break;
        case "piliangshanchu":
          this.deleteSomeTable();
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "chongzhimima":
          this.$refs.newUpdatePasswordRef.open(row);
          break;
        case "xiugaimima":
          this.$refs.updatePasswordRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.ids = [row.id];
          this.deleteTable();
          break;
      }
    },
    // 批量删除
    deleteSomeTable() {
      if (this.ids.length == 0) {
        return this.$message.warning("请勾选需要删除的数据");
      }
      this.deleteTable();
    },
    // 删除列表数据
    deleteTable() {
      // 获取当前用户id
      const currentUser = JSON.parse(localStorage.getItem('saber-currentUserInfo'))
      if(currentUser) {
        this.currentUserId = currentUser.content.id
      }

      // 判断是否选择当前用户
      if(this.ids.includes(this.currentUserId)) {
        return this.$message.error('不能删除自身账号')
      } else {
        this.$confirm("你确定要删除此条记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          deleteUserListDataAPI({ ids: this.ids.join(",") }).then((res) => {
            if (res.code === 200) {
              this.ids = [];
              this.$message.success("删除成功");
              this.getTableData(this.query);
            }
          });
        });
      }


    },
    // 获取列表数据
    async getTableData(query, domain = {}) {
      let params = {
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
        ...domain,
      };
      query ? (params = { ...params, ...query }) : params;
      const res = await userListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
  },
};
</script>

<style scoped lang='scss'>
.user_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
