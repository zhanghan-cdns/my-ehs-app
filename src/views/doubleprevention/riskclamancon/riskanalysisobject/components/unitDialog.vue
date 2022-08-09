<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      title="查看单元"
      width="850px"
      height="60%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
          <render-table
            :height="sizeCon.height"
            :data="tableData"
            :columns="columns"
          />
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";
import {objectInfoViewAPI} from "@/api/doubleprevention/riskobject";

export default {
  name: "editDialog",

  data() {
    return {
      sizeCon: {
        height: "90%",
      },
      openEdit: false,
      isDisabled: "",
      size: "small",
      tableData: [],
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
          // {
          //   field: "name",
          //   title: "风险分析对象",
          //   align: "center",
          // },
        {
          field: "unitName",
          title: "风险分析单元名称",
          align: "center",
        },
        {
          field: "riskType.value",
          title: "风险类型",
          align: "center",
        },
        {
          field: "remark",
          title: "风险描述",
          align: "center",
        },
        {
          // field: "accidentType",
          title: "事故类型",
          align: "center",
          render:(h,{row})=>{
            return row.accidentType.map(item=>{
              return <div>{item.accidentType.value}</div>
            })
          }
        },
      ],
      rowData: {},
      form:{}
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
      default: "指标配备",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan";
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await sdpInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await sdpInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await objectInfoViewAPI({id});
        if (res.code === 200) {
            res.data.riskAnalysisUnits=res.data.riskAnalysisUnits.map(i=>{
              return {
                ...i,
                name:res.data.name
              }
            })
          this.tableData = res.data.riskAnalysisUnits;
        }
      } catch (e) {
        this.$message.error(e);
      }
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
