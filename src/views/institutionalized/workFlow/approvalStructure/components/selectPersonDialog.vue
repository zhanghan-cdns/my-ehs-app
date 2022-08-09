<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="80%"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-row gutter="10">
          <el-col :span="4" style="margin-top: 8px">
            <el-tree
              :data="deptList"
              :props="deptProps"
              :highlight-current="true"
              @node-click="handleDeptNodeClick"
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <i v-if="!node.isLeaf" class="iconfont icon-a-zu19815"></i>
                <i v-if="node.isLeaf" class="iconfont icon-yonghu"></i
                >{{ node.label }}
              </span>
            </el-tree>
          </el-col>
          <el-col :span="20">
            <header-container>
              <div>
                <el-input
                  v-model="query.name"
                  placeholder="请输入人员名称"
                  style="width: 200px; margin-right: 10px"
                  clearable
                ></el-input>
                <el-select
                  placeholder="岗位名称"
                  clearable
                  v-model="query.post"
                >
                  <el-option
                    v-for="item in postList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </div>
              <header-button
                :headerButtonList="headerButtonList"
                @headerButtonClick="headerButtonMethods"
              />
            </header-container>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                @checkbox-change="selectChangeEvent"
                @checkbox-all="selectChangeEvent"
                border
                resizable
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
              />
            </dom-size-listen>
            <basicPager :page="page" @pageChange="pageChange"></basicPager>
          </el-col>
        </el-row>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],

  components: {
    HeaderContainer,
  },

  data() {
    return {
      openEdit: false,
      icon: "icon-bianji1",
      title: "选择人员",
      headerButtonList: ["chaxun", "chongzhi"],
      query: {
        name: "",
        post: "",
      },
      postList: [],
      deptList: [],
      deptProps: {
        children: "children",
        label: "deptname",
      },
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
          field: "name",
          title: "名称",
          align: "center",
        },
        {
          field: "sex",
          title: "性别",
          align: "center",
        },
        {
          field: "step_name",
          title: "部门",
          align: "center",
        },
        {
          field: "phone",
          title: "电话",
          align: "center",
        },
        {
          field: "post",
          title: "岗位",
          align: "center",
        },
      ],
      selectPersonList: [],
    };
  },

  methods: {
    open() {
      this.openEdit = true;
      this.getDeptList();
      this.getPersonList();
    },

    getDeptList() {
      this.deptList = [
        {
          deptid: "1000",
          deptname: "中安",
          children: [
            {
              deptid: "1100",
              deptname: "研发部",
            },
            {
              deptid: "1200",
              deptname: "项目部",
            },
          ],
        },
      ];
    },

    getPersonList() {
      this.tableData = [
        { id: "37633", name: "袁中军" },
        { id: "10299", name: "中安安全主管" },
        { id: "00111", name: "张三" },
        { id: "00222", name: "李四" },
      ];
    },

    handleDeptNodeClick(data) {
      console.log(data, "clicknode");
    },

    selectChangeEvent({ records }) {
      console.log(records, "records");
      this.selectPersonList = records;
    },

    confirm() {
      this.$emit("confirmSelect", this.selectPersonList);
      this.close();
    },

    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>