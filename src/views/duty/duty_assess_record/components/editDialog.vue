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
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="年度" prop="year">
                <el-select
                  placeholder="年度"
                  clearable
                  v-model="form.year"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationYear"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="岗位名称" prop="job">
                <el-select
                  placeholder="岗位名称"
                  clearable
                  v-model="form.job"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.deptId"
                    :value="item.deptId"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="安全职责" prop="safetyDuty">
                <el-input
                  placeholder="安全职责"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="安全职责考核奖励情况" prop="award">
                <el-input
                  placeholder="安全职责考核奖励情况"
                  clearable
                  v-model="form.award"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="安全职责考核惩罚情况" prop="punishment">
                <el-input
                  placeholder="安全职责考核惩罚情况"
                  clearable
                  v-model="form.punishment"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="安全职责年度考核结果" prop="result">
                <el-input
                  placeholder="安全职责年度考核结果"
                  clearable
                  v-model="form.result"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="考核人" prop="checker">
                <el-input
                  placeholder="考核人"
                  clearable
                  v-model="form.checker"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="考核日期" prop="assessDate">
                <el-date-picker
                  v-model="form.assessDate"
                  type="date"
                  placeholder="选择考核日期"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button
            type="primary"
            @click="submitForm('form')"
            v-if="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled"
            >重置
          </el-button>
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
  jobInfoListAPI,
} from "@/api/duty/duty_assess_record/index";
import dictMixin from "@/mixins/dict";
export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
      },
      rules: {
        assessDate: [
          { required: true, message: "请选择考核日期", trigger: "blur" },
        ],
        award: [
          { required: true, message: "请输入奖励情况", trigger: "blur" },
        ],
        job: [
          { required: true, message: "请选择岗位", trigger: "blur" },
        ],
        punishment: [
          { required: true, message: "请输入惩罚情况", trigger: "blur" },
        ],
        result: [
          { required: true, message: "请输入考核结果", trigger: "blur" },
        ],
        safetyDuty: [
          { required: true, message: "请输入安全职责", trigger: "blur" },
        ],
        year: [
          { required: true, message: "请选择年度", trigger: "blur" },
        ]
      },
      rowData: {},
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      jobList: [],
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
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.getJob(); //岗位
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
          this.$message.success("保存成功");
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
          this.$message.success("编辑成功");
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
          this.form = {
            ...res.data,
            year: res.data.year ? res.data.year.key : "",
            targetType: res.data.targetType ? res.data.targetType.key : "",
            checkRate: res.data.checkRate ? res.data.checkRate.key : "",
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async getJob() {
      try {
        let params = {
          "queryParams[pageNum]": this.page.currentPage,
          "queryParams[pageSize]": this.page.pageSize,
        };
        const res = await jobInfoListAPI(params);
        if (res.code === 200) {
          this.jobList = res.data;
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
