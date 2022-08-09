<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      :title="title"
      height="70%"
      icon="icon-bianji"
      v-bind="$attrs"
      width="1000px"
      @close="close"
    >
      <template #content>
        <header-search
          :searchData="search_data"
          :searchItem="search_item"
          style="margin-bottom: 10px"
        ></header-search>
        <dom-size-listen v-model="sizeCon" style="flex: 1">
          <render-table
            :columns="columns"
            :data="tableData"
            :height="sizeCon.height"
          >
          </render-table>
        </dom-size-listen>
        <basic-pager :page="page" @pageChange="pageChange"></basic-pager>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";

export default {
  mixins: [tableMixins, commonMixin],
  name: "viewScheduleDetails",
  components: {},

  data() {
    return {
      sizeCon: {
        height: 400
      },
      openEdit: false,
      title: '查看巡检班次详情',
      search_data: {},
      search_item: [
        {
          prop: "courseName",
          type: "Input",
          placeholder: "检查点名称",
          disabled: false,
          width: "150px",
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "所属区域",
          disabled: false,
          width: "150px",
          children: [],
        },
        {
          prop: "courseName",
          type: "Date",
          disabled: false,
          width: "350px",
          dateType: 'datetimerange'
        },
        {
          prop: "courseName",
          type: "Select",
          placeholder: "检查结果",
          disabled: false,
          width: "150px",
          children: [],
        },
      ],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查点",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "所处班次",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查时间",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查人",
          align: "center",
        },
        {
          field: "dictKeyName",
          title: "检查结果",
          align: "center",
          render: (h, {row}) => {
            return <div style="color:#4A80FC">有隐患</div>
            // return <div style="color:#FF4646">无隐患</div>
          }
        },
        {
          field: "dictKeyName",
          title: "现场照片",
          align: "center",
        },
      ]
    }
  },
  methods: {
    submitForm() {

    },
    resetForm() {

    },
    close() {
      this.openEdit = false
    },
    open(row) {
      this.openEdit = true
    },
  }
}
</script>

<style scoped>

</style>
