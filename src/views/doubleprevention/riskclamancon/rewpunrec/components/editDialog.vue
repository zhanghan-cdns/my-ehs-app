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
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      width="850px"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          :model="form"
          label-width="150px"
          class="demo-ruleForm"
          ref="ruleForm"
          :rules="formRules"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="奖惩类型" prop="correctTheTitle">
                <el-input
                  style="width: 240px"
                  clearable
                  v-model="form.correctTheTitle"
                  placeholder="请输入奖惩类型"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="被奖惩人" prop="correctionOrderNumber">
                <el-input
                  style="width: 240px"
                  clearable
                  disabled
                  v-model="form.correctionOrderNumber"
                  placeholder="请输入被奖惩人"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="奖惩金额" prop="correctionOrderNumber">
                <el-input
                  style="width: 240px"
                  clearable
                  disabled
                  v-model="form.correctionOrderNumber"
                  placeholder="请输入奖惩金额"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item
                label="奖惩日期"
                prop="hazardDiscoveryTime"
                class="is-required"
              >
                <el-date-picker
                  style="width: 240px"
                  v-model="form.hazardDiscoveryTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="请选择奖惩日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="奖惩内容" prop="rectificationOpinion">
                <el-input
                  style="width: 660px"
                  clearable
                  type="textarea"
                  :rows="3"
                  v-model="form.rectificationOpinion"
                  placeholder="请输入奖惩内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="奖惩依据" prop="causeAnalysis">
                <el-input
                  style="width: 660px"
                  clearable
                  type="textarea"
                  :rows="3"
                  v-model="form.causeAnalysis"
                  placeholder="请输入奖惩依据"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注" prop="controlMeasures">
                <el-input
                  style="width: 660px"
                  clearable
                  type="textarea"
                  :rows="3"
                  v-model="form.controlMeasures"
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
      },
      rules: {
        // 有限空间名称
        checkMeasure: [
          { required: true, message: "请输入考核办法", trigger: "blur" },
        ],
        checkRate: [
          { required: true, message: "请输入考核频次", trigger: "blur" },
        ],
        checkValue: [
          { required: true, message: "请输入考核值", trigger: "blur" },
        ],
        finishTime: [
          { required: true, message: "请输入完成期限", trigger: "blur" },
        ],
        safetyTarget: [
          { required: true, message: "请输入安全目标指标", trigger: "blur" },
        ],
        targetCode: [
          { required: true, message: "请输入目标指标编号", trigger: "blur" },
        ],
        targetName: [
          { required: true, message: "请输入指标名称", trigger: "blur" },
        ],
        targetType: [
          { required: true, message: "请输入指标类别", trigger: "blur" },
        ],
        year: [{ required: true, message: "请输入年度", trigger: "blur" }],
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
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
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
