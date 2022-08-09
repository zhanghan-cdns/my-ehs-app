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
      :openFlag="openEdit"
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      height="25%"
      v-bind="$attrs"
      width="450px"
      @close="close"
    >
      <template #content>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="right"
          label-width="140px"
          style="margin-top:30px;"
        >
          <el-form-item label="修改状态" prop="riskAnalysisObjectStatus">
            <el-radio-group v-model="form.riskAnalysisObjectStatus">
              <el-radio
                v-for="item in dictConfig.doublePreventionRiskAnalysisObjectStatus"
                :key="item.id"
                :label="item.dictValue"
              >{{ item.dictValueName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
          >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {objectInfoUpdateAPI, objectInfoViewAPI,} from "@/api/doubleprevention/riskobject/index.js";

export default {
  name: "editDialog",

  data() {
    return {
      sizeCon: {
        // height: "200",
      },
      openEdit: false,
      isDisabled: "",
      size: "small",
      form: {
        id: "",
        radio: "",
      },
      rules: {
        // 有限空间名称
        checkMeasure: [
          {required: true, message: "请输入考核办法", trigger: "blur"},
        ],
      },
      rowData: {},
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
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
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
        const res = await objectInfoUpdateAPI({
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
          console.log(res.data, 'jjjjjjjjddddd')
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
