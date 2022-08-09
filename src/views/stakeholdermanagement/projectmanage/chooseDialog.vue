<template >
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="'选择' + title"
      width="800px"
      height="60%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <list-container>
          <template #left></template>
          <template #right>
            <dom-size-listen style="flex: 1" v-model="sizeCon">
              <render-table
                :height="sizeCon.height"
                :data="tableData"
                :columns="columns"
                @checkbox-change="checkboxChange"
                @checkbox-all="checkboxChange"
              />
            </dom-size-listen>
          </template>
        </list-container>
      </template>
      <template #bottom>
        <div class="Btn">
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";
import { contractorUrlListAPI } from "@/api/stakeholdermanagement/index";
export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "recordDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {},
      rules: {},
      query: {
        safetyTarget: "",
        checkRate: "",
      },
      tableData: [{ safetyTarget: "1" }],
      columns: [
        {
          type: "checkbox",
          align: "center",
          fixed: "left",
          width: 50,
        },
        {
          type: "seq",
          title: "序号",
          fixed: "left",
          width: 50,
          align: "center",
        },
        {
          field: "category",
          title: "类别",
          align: "center",
        },
        {
          field: "unitName",
          title: "单位名称",
          align: "center",
        },
        {
          field: "industryType",
          title: "行业类型",
          align: "center",
        },
        {
          field: "contactPerson",
          title: "联系人",
          align: "center",
        },
        {
          field: "contactPhone",
          title: "联系电话",
          align: "center",
        },
      ],
      choseTable: "",
    };
  },

  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "承包商",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let params = {
        // ...this.query,
        "queryParams[pageNum]": this.page.currentPage,
        "queryParams[pageSize]": this.page.pageSize,
      };
      const res = await contractorUrlListAPI(params);
      console.log(res.data);
      this.tableData = res.data;
    },
    checkboxChange(data) {
      console.log(data)
      this.choseTable = JSON.parse(JSON.stringify(data.data));
    },
    submitForm() {
      this.openFlag = false;
      this.$emit("updatePub", this.choseTable);
      console.log(this.choseTable);
      this.close();
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 20px;
}
/deep/.projectFund .el-form-item__label {
  line-height: 20px;
}
/deep/ .el-form-item__error {
  padding-top: 0;
}
</style>
