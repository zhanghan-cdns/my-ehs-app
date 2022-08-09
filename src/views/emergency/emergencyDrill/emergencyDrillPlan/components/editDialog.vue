<template>
  <div>
    <basic-dialog
      icon="icon-xinzengfabu"
      :title="title"
      width="900px"
      height="70%"
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
                  <el-select style="width: 100%" v-model="ruleForm.year">
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
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练计划 -->
              <el-col :span="12">
                <el-form-item label="演练计划" prop="plan">
                  <el-input v-model="ruleForm.plan"></el-input>
                </el-form-item>
              </el-col>
              <!-- 应急演练计划编号 -->
              <el-col :span="12">
                <el-form-item label="应急演练计划编号" prop="plannum">
                  <el-input v-model="ruleForm.plannum"></el-input>
                </el-form-item>
              </el-col>
              <!-- 演练地点 -->
              <el-col :span="12">
                <el-form-item label="演练地点" prop="place">
                  <el-input v-model="ruleForm.place"></el-input>
                </el-form-item>
              </el-col>
              <!-- 主办单位 -->
              <el-col :span="12">
                <el-form-item label="主办单位" prop="organizer">
                  <el-select style="width: 100%" v-model="ruleForm.organizer">
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练方式 -->
              <el-col :span="12">
                <el-form-item label="演练方式" prop="ermDrillMode">
                  <el-select style="width: 100%" v-model="ruleForm.ermDrillMode">
                    <el-option label="综合" value="zonghe"></el-option>
                    <el-option label="桌面" value="zuomian"></el-option>
                    <el-option label="专项" value="zhuanxiang"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 应急预案 -->
              <el-col :span="12">
                <el-form-item label="应急预案" prop="emergency">
                  <el-select style="width: 100%" v-model="ruleForm.emergency">
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 演练级别 -->
              <el-col :span="12">
                <el-form-item label="演练级别" prop="ermDrillLevel">
                  <el-select style="width: 100%" v-model="ruleForm.ermDrillLevel">
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
                  <el-input v-model="ruleForm.Planner" placeholder="只填写一个"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <el-form-item label="附件">
             <render-upload></render-upload>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="ruleForm.note"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 3 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="resetForm">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
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
      ruleForm: {
        year: "",
        month: "",
        plan: "",
        plannum: "",
        place: "",
        organizer: "",
        ermDrillMode: "",
        emergency: "",
        ermDrillLevel: "",
        customdate: "",
        reheardate: "",
        Planner: "",
        note: "",
      },
      rules: {
        year: [{ required: true, message: "此项为必选项", trigger: "blur" }],
        plan: [{ required: true, message: "此项为必选项", trigger: "blur" }],
        organizer: [
          { required: true, message: "此项为必选项", trigger: "blur" },
        ],
        ermDrillMode: [{ required: true, message: "此项为必选项", trigger: "blur" }],
        emergency: [
          { required: true, message: "此项为必选项", trigger: "blur" },
        ],
        ermDrillLevel: [{ required: true, message: "此项为必选项", trigger: "blur" }],
        customdate: [
          { required: true, message: "此项为必选项", trigger: "blur" },
        ],
        reheardate: [
          { required: true, message: "此项为必选项", trigger: "blur" },
        ],
        Planner: [
          { required: true, message: "此项为必选项", trigger: "blur" },
          { max: 4, message: "只填写一个", trigger: "blur" },
        ],
      },
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
      default: "新增隐患排查检查表库",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增演练计划信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑演练计划信息";
        this.isDisabled = false;
      }
      this.openEdit = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          console.log("success");
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
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
.el-upload__text {
  margin-top: -40px;
}
/deep/ .el-form {
  padding: 20px 40px 0 10px;
}
</style>
