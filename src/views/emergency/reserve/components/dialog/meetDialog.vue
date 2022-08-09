<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <header-button
          @headerButtonClick="headerButtonMethods"
          :headerButtonList="['fasong']"
        />
        <dom-size-listen style="flex: 1; height: 87%" v-model="sizeCon">
          <render-table
            @checkbox-change="selectChangeEvent"
            @checkbox-all="selectChangeEvent"
            @cellClick="handleCellClick"
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
        </dom-size-listen>
        <basicPager :page="page" @pageChange="pageChange"></basicPager>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
export default {
  name: "editDialog",
  components: {},
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icon: "icon-bianji",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      sizeCon: {
        height: "500px",
      },
      form: {
        zdmc: "",
        dlb: "",
        xlb: "",
        fbjg: "",
        fgbh: "",
        fbrq: "",
        qyrq: "",
        fzrq: "",
        fcrq: "",
        qzcd: 0,
        file: [],
        zy: "",
        remark: "",
      },
      rules: {
        zdmc: [
          { required: true, message: "请输入制度名称", trigger: "change" },
        ],
        pszt: [{ required: true, message: "请输入评审主题", trigger: "blur" }],
      },
      row: {},
      tableData: [{ zdmc: "1" }],
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
          field: "zdmc",
          title: "企业名称",
          align: "center",
        },
        {
          field: "xlb",
          title: "发送类型",
          align: "center",
        },
        {
          field: "zdmc",
          title: "手机号码",
          align: "center",
        },
        {
          field: "xlb",
          title: "短信接收人姓名",
          align: "center",
        },
        {
          field: "xlb",
          title: "邮箱",
          align: "center",
        },
        {
          field: "xlb",
          title: "邮箱接收人姓名",
          align: "center",
        },
      ],
      ids: [],
    };
  },

  created() {},

  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      this.title = "启动应急预案";
      if (row) {
        this.title = "启动应急预案";
        this.row = row;
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
    //   表格复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
    headerButtonMethods(type, row) {
      switch (type) {
        case "fasong":
          this.deleteData(row);
          break;
      }
    },
    async deleteData(row) {
      if (this.ids.length > 0) {
        this.$confirm("确定删除该条数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then((res) => {});
      } else {
        this.$message.warning("请勾选数据");
      }
    },

    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.row.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
