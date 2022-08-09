<template>
  <div class="role">
    <list-container>
      <template #left>

      </template>
      <template #right>
        <div class="role_operation_box">
          <dict-select
            v-model="query.isEnable"
            :dictKey="'COMMON_USE'"
            clearable
            style="width: 200px">
          </dict-select>
          <header-button @headerButtonClick="headerButtonMethods">
          </header-button>
        </div>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
    </list-container>
    <edit-dialog
      ref="editDialogRef"
      @refreshDataList="getTableData"
    ></edit-dialog>
    <permission-dialog ref="permissionDialogRef"></permission-dialog>
  </div>
</template>
<script>
import editDialog from "./editDialog";
import permissionDialog from "./permissionDialog";
import {deleteListDataAPI, returnFormDataAPI, roleListAPI, updateFormDataAPI} from "@/api/system/role";
import tableMixins from "@/mixins/table";
// import { getAuthInfo } from "@/util/auth";

export default {
  mixins: [tableMixins],
  components: {editDialog, permissionDialog},
  data() {
    return {
      query: {
        isEnable: "COMMON_USE:ENABLE",
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "roleName",
          title: "角色名称",
          align: "center",
        },
        {
          field: "roleCode",
          title: "角色编码",
          align: "center",
        },
        {
          field: "orderNum",
          title: "排序",
          align: "center",
        },
        {
          field: "isEnable.value",
          title: "启用状态",
          align: "center",
          render: (h, {row, column, $index}) => {
            return (
              <el-switch
                value={row.isEnable.key}
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="COMMON_USE:ENABLE"
                inactive-value="COMMON_USE:DISABLE"
                on-change={(value) => this.rowStateChange(value, row)}
              >
              </el-switch>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, {row, column, $index}) => {
            return (
              <operate-button
                on-operateButtonClick={(type) => {
                  this.operateButtonClick(type, row);
                }}
              >
              </operate-button>
            );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
    // getAuthInfo()
  },
  methods: {
    headerButtonMethods(type) {
      switch (type) {
        case "xinzeng":
          this.$refs.editDialogRef.open();
          break;
        case "chaxun":
          this.getTableData()
          break;
      }
    },
    // 表格操作按钮
    operateButtonClick(type, row) {
      switch (type) {
        case "fenpeiquanxian":
          this.$router.push({path:'/roleDistribute',query:{id:row.id}})
          // this.$refs.permissionDialogRef.open(row);
          break;
        case "bianji":
          this.$refs.editDialogRef.open(row);
          break;
        case "shanchu":
          this.deleteTable(row.id);
          break;

      }
    },
    // 删除列表数据
    deleteTable(id) {
      this.$confirm("你确定要删除此条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteListDataAPI({ids: id}).then((res) => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    // 获取列表数据
    async getTableData() {
      let params = {
        isEnable: this.query.isEnable,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await roleListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    async rowStateChange(value, row) {
      const res = await returnFormDataAPI({id:row.id});
      if (res.code === 200) {
        let params= {
          ...res.data,
          isEnable:value
        }
        this.form = res.data
        updateFormDataAPI(params).then((res) => {
          this.$message.success('编辑成功!')
          this.getTableData();
        })
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.role_operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
