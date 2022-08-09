<!--  -->
<template>
  <div>
    <basic-dialog
      :height="'85%'"
      :openFlag="openEdit"
      :width="1014"
      icon="icon-bianji"
      showFooter
      title="选择人员"
      v-bind="$attrs"
      @close="close"
    >
      <template #content>
        <div class="container">
          <div></div>
          <div></div>
        </div>
        <el-row style="height: 100%">
          <el-col :span="6" style="height: 100%">
            <department-tree @node-click="nodeClick"></department-tree>
          </el-col>
          <el-col :span="18" style="height: 100%">
            <div style="width: 100%; background: #fff; height: 100%">
              <div class="role_operation_box">
                <div style="padding: 15px">
                  <el-input
                    v-model="query.entPersonName"
                    :size="size"
                    clearable
                    placeholder="请输入人员姓名"
                    style="width: 200px; margin-right: 5px"
                  ></el-input>
                  <el-select
                    v-model="query.jobName"
                    :size="size"
                    clearable
                    placeholder="请输入岗位名称"
                    style="width: 200px; margin-right: 5px"
                  >
                    <el-option></el-option>
                  </el-select>
                  <el-button :size="size" type="primary" @click="handleSearch"
                    >查询
                  </el-button>
                </div>
              </div>
              <div style="padding: 0px 15px">
                <render-table
                  ref="renderTableRef"
                  :columns="columns"
                  :data="tableData"
                  height="92%"
                />
                <basicPager :page="page" @pageChange="pageChange"></basicPager>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import departmentTree from "@views/components/departmentTree";
import { entPersonnelListAPI } from "@/api/enterprise/entPersonnel";
import { jobListAPI } from "@/api/enterprise/job";

export default {
  components: {
    departmentTree,
  },
  mixins: [tableMixins],
  data() {
    return {
      dealerTreeData: [],
      dataTree: [],
      defaultProps: {
        children: "children",
        label: "text",
      },
      query: {},
      size: "small",
      openEdit: false,
      tableData: [],
      defaultTree: ["0", "01", "02"],
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
          align: "center",
        },
        {
          field: "entPersonName",
          title: "姓名",
          align: "center",
        },
        {
          field: "entPersonGender.value",
          title: "性别",
          align: "center",
        },
        {
          field: "job.department.deptName",
          title: "部门",
          align: "center",
        },

        {
          field: "job.jobName",
          title: "岗位",
          align: "center",
        },
        {
          field: "entPersonTel",
          title: "联系电话",
          align: "center",
        },
      ],
      org_code: "",
      disabled: false,
      choosePerson: [],
    };
  },
  methods: {
    submit() {
      this.choosePerson =
        this.$refs.renderTableRef.$refs.xTable.getCheckboxRecords();
      this.openEdit = false;
    },
    reset() {},
    open() {
      this.openEdit = true;
      this.getTableData({ query: this.query });
      this.getJobData();
    },
    handleSearch() {
      this.getTableData({ query: this.query });
    },
    async getJobData() {
      const res = await jobListAPI();
      console.log(res);
    },
    nodeClick(value) {
      const { data } = value;
      this.query.deptId = data.id;
      this.getTableData({ query: this.query });
    },
    async getTableData({ query, domain }) {
      let params = {
        "queryParams[pageSize]": this.page.pageSize,
        "queryParams[pageNum]": this.page.currentPage,
        ...domain,
      };
      // eslint-disable-next-line no-unused-expressions
      query ? (query = { ...params, ...query }) : params;
      const res = await entPersonnelListAPI(query);
      if (res.code === 200) {
        this.tableData = res.data.content;
        this.page.totalResult = res.data.totalElements;
      }
    },
    close() {
      this.openEdit = false;
    },
    operateButtonClick(type) {
      if (type === "bianji") {
        //
      } else if (type === "chakan") {
        //
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  //   padding: 10px;
  padding-bottom: 5px;
}

/* @import url(); 引入css类 */
</style>
