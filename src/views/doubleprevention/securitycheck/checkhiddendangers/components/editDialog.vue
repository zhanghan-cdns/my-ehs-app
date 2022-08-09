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
      width="950px"
      height="75%"
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
            <el-col>
              <el-form-item label="检查单编号" prop="safetyTarget">
                <el-input
                  placeholder="检查单编号"
                  clearable
                  v-model="form.safetyTarget"
                  style="width: 92.5%"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="任务名称" prop="targetCode">
                <el-input
                  placeholder="任务名称"
                  clearable
                  v-model="form.targetCode"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="任务类型" prop="targetType">
                <el-radio-group v-model="form.resource">
                  <el-radio label="临时任务"></el-radio>
                  <el-radio label="定时任务"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="检查项目" prop="checkRate">
                <el-input
                  placeholder="检查项目"
                  clearable
                  v-model="form.checkMeasure"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="部门" prop="checkRate">
                <el-select
                  placeholder="部门"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="检查人" prop="checkRate">
                <el-select
                  placeholder="检查人"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="检查组成员" prop="checkRate">
                <el-select
                  placeholder="检查组成员"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="受检对象" prop="checkMeasure">
                <el-select
                  placeholder="受检对象"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="类别" prop="checkRate">
                <el-select
                  placeholder="类别"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="计划检查时间" prop="checkMeasure">
                <el-date-picker
                  v-model="form.finishTime"
                  type="date"
                  placeholder="选择计划检查时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="计划检查结束时间" prop="checkMeasure">
                <el-date-picker
                  v-model="form.finishTime"
                  type="date"
                  placeholder="选择计划检查结束时间"
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
              <el-form-item label="检查内容">
                <el-input
                  placeholder="检查内容"
                  clearable
                  v-model="form.remark"
                  style="width: 92.5%"
                  :disabled="isDisabled"
                  :autosize="{ minRows: 3 }"
                  resize="none"
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
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      imgUrl,
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
      },
      rules: {
        safetyTarget: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        targetCode: [
          { required: true, message: "请输入检查项目", trigger: "blur" },
        ],
        checkRate: [{ required: true, message: "请输入部门", trigger: "blur" }],
        safetyTarget: [
          { required: true, message: "请输入检查人", trigger: "blur" },
        ],
        safetyTarget: [
          { required: true, message: "请输入检查组成员", trigger: "blur" },
        ],
        safetyTarget: [
          { required: true, message: "请输入受检对象", trigger: "blur" },
        ],
        safetyTarget: [
          { required: true, message: "请输入类别", trigger: "blur" },
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
      default: "隐患排查计划 ",
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
          };
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
.table-box {
  width: 97%;
  margin: 0 auto;
}
/deep/ .notStarand {
  color: #ff4646;
}

/deep/ .self {
  color: #4a80fc;
}
</style>
