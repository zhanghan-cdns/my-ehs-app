<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1005"
      height="73%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <header-container>
          <div>
            <el-select
              placeholder="请选择作业类型"
              clearable
              v-model="query.jobType"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in jobTypeList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
            <el-input
              placeholder="请输入姓名"
              clearable
              v-model="query.name"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </div>
          <header-button
            @headerButtonClick="headerButtonMethods"
            :headerButtonList="headerButtonList"
          />
        </header-container>
        <dom-size-listen style="flex: 1" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import HeaderContainer from "@/views/enterprise/dust/components/HeaderContainer.vue";

export default {
  mixins: [tableMixins],

  components: {
    HeaderContainer,
  },

  data() {
    return {
      icon: "icon-fujiaxinxi",
      title: "添加作业人员",
      openEdit: false,
      headerButtonList: ["chaxun"],
      tableData: [
        {
          id: "001",
        },
        {
          id: "002",
        },
      ],
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
          field: "workCertName",
          title: "单位",
          align: "center",
        },
        {
          field: "applicant",
          title: "姓名",
          align: "center",
        },
        {
          field: "applicantUnit",
          title: "作业类型",
          align: "center",
        },
        {
          field: "workCertType",
          title: "特殊工种证号",
          align: "center",
        },
        {
          field: "fromTime",
          title: "有效期",
          align: "center",
        },
      ],
      query: {
        jobType: "",
        name: "",
      },
      ids: [],
    };
  },

  methods: {
    open() {
      this.openEdit = true;
    },

    close() {
      this.openEdit = false;
    },

    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids.join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>