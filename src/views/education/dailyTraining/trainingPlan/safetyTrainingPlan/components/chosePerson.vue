<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <div class="role-operation-box">
          <header-search :searchItem="searchItem" :searchData="searchData" />
          <header-button
            @headerButtonClick="headerButtonMethods"
            :headerButtonList="['chaxun', 'chongzhi']"
          ></header-button>
        </div>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            :height="sizeCon.height"
            :data="userList"
            :columns="columns"
            @checkbox-change="checkboxChange"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import { userListAPI } from "@/api/system/user";
export default {
  mixins: [tableMixins],

  data() {
    return {
      title: "人员选择",
      icon: "icon-fujiaxinxi",
      openFlag: false,
      userList: [],
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
      ],
      page: {
        currentPage: 1,
        pageSize: 15,
      },
      searchData: {},
      searchItem: [
        {
          prop: "userName",
          type: "Input",
          placeholder: "人员姓名",
          disabled: false,
          width: "200px",
        },
      ],
      choseArr: [],
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 获取人员列表
    getUserList() {
      let params = {
        ...this.searchData,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      userListAPI(params).then((res) => {
        this.userList = res.data.content;
        this.page.totalResult = res.data.totalElements;
      });
    },
    // 打开
    open(type, row) {
      this.getUserList();
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.choseArr = [];
    },
    submitForm() {
      this.$parent.choseBack(this.choseArr);
      this.close();
    },
    // 页码切换
    pageChange(data) {
      this.page.pageSize = data.pageSize;
      this.page.currentPage = data.currentPage;
      this.getUserList();
    },
    headerButtonMethods(type) {
      if (type == "chaxun") {
        this.getUserList();
      } else if (type == "chongzhi") {
        this.searchData = {};
        this.getUserList();
      }
    },
    checkboxChange(data) {
      this.choseArr = data.records;
    },
  },
};
</script>
<style lang="scss" scoped>
.role-operation-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /deep/.el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
