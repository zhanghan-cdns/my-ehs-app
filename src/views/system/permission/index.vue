<template>
  <div id="">
    <list-container>
      <template #left></template>
      <template #right>
        <div class="user_operation_box">
          <el-input
            style="width: 250px"
            placeholder="请输入菜单名称"
            v-model="query.permissionName"
            clearable
          ></el-input>
          <header-button @headerButtonClick="headerButtonMethods"/>
        </div>

        <dom-size-listen style="flex: 1; margin-bottom: 10px" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
            row-id="id"
            resizable
            :tree-config="{
              children: 'children',
              reserve: true,
            }"
          />
        </dom-size-listen>
        <!-- <basicPager :page="page" @pageChange="pageChange"></basicPager> -->
      </template>
    </list-container>
    <editDialog @update="update" ref="editDialogRef"></editDialog>
  </div>
</template>
<script>
import {
  permissionListAPI,
  permissionDeleteAPI,
} from "@/api/system/permission";
import editDialog from "@/views/system/permission/editDialog.vue";
import tableMixins from "@/mixins/table";
import dictMixins from "@/mixins/dict";

export default {
  mixins: [tableMixins, dictMixins],
  components: {editDialog},
  provide() {
    return {
      index: this,
    };
  },
  data() {
    return {
      query: {},
      columns: [
        {type: "checkbox", width: 50, align: "center", fixed: "left"},
        {
          type: "seq",
          title: "序号",
          width: 80,
          align: "center",
        },
        {
          field: "permissionName",
          title: "菜单名称",
          // align: "center",
          treeNode: "true",
          width: 300,
          render: (h, {row}) => {
            if (row.permissionType && row.permissionType.key === 'SYSTEM_PERMISSION_TYPE:FOLDER') {
              return (
                <div style="color:#3f51b5;font-weight:bold;font-size:18px">
                  {row.permissionName}
                </div>
              );
            } else if (row.permissionType && row.permissionType.key === 'SYSTEM_PERMISSION_TYPE:MENU') {
              return (
                <div style="color:skyblue;font-weight:bold;font-size:17px">
                  {row.permissionName}
                </div>
              );
            } else {
              return (
                <div style="color:#ff9800;font-weight:bold;font-size:16px">
                  {row.permissionName}
                </div>
              );
            }
          },
        },
        {
          field: "permissionType.value",
          title: "类型",
          width: 120,
          align: "center",
        },
        {
          field: "isEnable.value",
          title: "启用状态",
          width: 150,
          align: "center",
        },
        {
          field: "isVisible.value",
          title: "显示状态",
          width: 150,
          align: "center",
        },
        {
          field: "permissionCode",
          title: "权限编码",
          width: 200,
          render: (h, {row}) => {
            if (row.permissionType && row.permissionType.key === 'SYSTEM_PERMISSION_TYPE:BUTTON') {
              return (
                <div style="color:#ff9800;font-weight:bold;font-size:16px">
                  {
                    row.permissionCode.split(":")[
                    row.permissionCode.split(":").length - 1
                      ]
                  }
                </div>
              );
            } else {
              return "";
            }
          },
        },
        {
          field: "url",
          title: "路由地址",
          width: 250,
        },
        {
          field: "icon",
          title: "图标",
          width: 150,
          align: "center",
          render: (h, {row}) => {
            if (row.icon) {
              return (
                <div>
                  <i class={`iconfont ${row.icon}`}></i>
                </div>
              );
            } else {
              return (
                <div>
                  <i class="iconfont icon-caidan"></i>
                </div>
              );
            }
          },
        },
        {
          field: "remark",
          title: "备注",
          width: 250,
        },

        // {
        //   field: "orderNum",
        //   title: "排序",
        //   width: 150,
        //   align: "center",
        // },
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
              ></operate-button>
            );
          },
        },
      ],
    };
  },
  created() {
    this.getTableData();
    // this.$store.dispatch("GetMenu");
  },
  methods: {
    selectChangeEvent() {
    },
    // 表格数据获取
    async getTableData(query) {
      let params = {
        // "queryParams[pageSize]": this.page.pageSize,
        // "queryParams[pageNum]": this.page.currentPage,
        // orgCode: orgCode,
        // parentId: id,
        ...query,
      };
      const res = await permissionListAPI(params);
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },
    // 删除 菜单
    removeMenuInfo(id) {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await permissionDeleteAPI({ids: id});
          if (res.code === 200) {
            this.getTableData();
            this.$message.success("删除成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    headerButtonMethods(type) {
      if (type === "xinzeng") {
        this.$refs.editDialogRef.open();
      }
      if (type === "chaxun") {
        this.getTableData(this.query);
      }
      if (type === "chongzhi") {
        this.getTableData();
      }
    },
    operateButtonClick(type, row) {
      if (type === "bianji") {
        this.$refs.editDialogRef.open(row);
      }
      if (type === "shanchu") {
        this.removeMenuInfo(row.id);
      }
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
