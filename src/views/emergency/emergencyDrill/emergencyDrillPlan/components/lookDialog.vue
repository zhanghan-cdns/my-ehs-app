<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="900px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <header-button @headerButtonClick="headerButtonMethods" />
      <template #content>
        <div class="recordsForm">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-row>
              <!-- 年度 -->
              <el-col :span="12">
                <el-form-item label="年度" prop="year">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.year"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 月份 -->
              <el-col :span="12">
                <el-form-item label="月份" prop="month ">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.month"
                    placeholder="请选择月份"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练计划 -->
              <el-col :span="12">
                <el-form-item label="演练计划" prop="plan">
                  <el-input v-model="ruleForm.plan" disabled></el-input>
                </el-form-item>
              </el-col>
              <!-- 应急演练计划编号 -->
              <el-col :span="12">
                <el-form-item label="应急演练计划编号" prop="plannum">
                  <el-input v-model="ruleForm.plannum" disabled></el-input>
                </el-form-item>
              </el-col>
              <!-- 演练地点 -->
              <el-col :span="12">
                <el-form-item label="演练地点" prop="place">
                  <el-input v-model="ruleForm.place" disabled></el-input>
                </el-form-item>
              </el-col>
              <!-- 主办单位 -->
              <el-col :span="12">
                <el-form-item label="主办单位" prop="organizer">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.organizer"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练方式 -->
              <el-col :span="12">
                <el-form-item label="演练方式" prop="ermDrillMode">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.ermDrillMode"
                    disabled
                  >
                    <el-option label="综合" value="zonghe"></el-option>
                    <el-option label="桌面" value="zuomian"></el-option>
                    <el-option label="专项" value="zhuanxiang"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 应急预案 -->
              <el-col :span="12">
                <el-form-item label="应急预案" prop="emergency">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.emergency"
                    disabled
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练级别 -->
              <el-col :span="12">
                <el-form-item label="演练级别" prop="ermDrillLevel">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.ermDrillLevel"
                    disabled
                  >
                    <el-option label="公司级" value="gongsiji"></el-option>
                    <el-option label="分厂级" value="fencangji"></el-option>
                    <el-option label="车间级" value="cejianji"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 计划定制日期 -->
              <el-col :span="12">
                <el-form-item label="计划定制日期" prop="level">
                  <el-date-picker
                    disabled
                    style="width: 100%"
                    v-model="ruleForm.level"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 计划演练日期 -->
              <el-col :span="12">
                <el-form-item label="计划演练日期" prop="reheardate">
                  <el-date-picker
                    disabled
                    style="width: 100%"
                    v-model="ruleForm.reheardate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 计划定制人 -->
              <el-col :span="12">
                <el-form-item label="计划定制人" prop="Planner">
                  <el-input
                    disabled
                    v-model="ruleForm.Planner"
                    placeholder="只填写一个"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <el-form-item label="附件">
              <div class="hetong">
                <i class="iconfont icon-word"></i>FT2022-演练计划1
              </div>
            </el-form-item>
            <!-- 备注 -->
            <el-form-item label="备注" prop="note">
              <el-input
                disabled
                v-model="ruleForm.note"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import commonMixin from "@/mixins/common";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [tableMixins, commonMixin, dictMixin],
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      ruleForm: {},
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
      default: "查看演练计划信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(type, row) {
      this.isDisabled = false;
      this.openEdit = true;
    },
    close() {
      this.openEdit = false;
    },
  },

  resetForm() {
    this.$refs.ruleForm.resetFields();
  },
  close() {
    this.openEdit = false;
    this.resetForm();
  },
};
</script>

<style scoped lang="scss">
.hetong {
  cursor: pointer;
  color: #4a80fc;
  border: 1px dashed #4a80fc;
  border-radius: 4px;
  width: 25%;
  text-align: center;
}

/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
</style>
