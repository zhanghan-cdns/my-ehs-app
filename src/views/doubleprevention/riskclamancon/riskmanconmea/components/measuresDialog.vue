<template>
  <div id="">
    <basicDialog
      :icon="icon - bianji"
      :openFlag="openEdit"
      height="50%"
      title="措施"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <div class="container">
          <el-form
            ref="ruleForm"
            :model="form"
            :rules="formRules"
            class="demo-ruleForm"
            label-width="120px"
          >
            <div
              style="
                border-bottom: 1px solid #4a80fc;
                height: 30px;
                margin: 0px 15px 15px 25px;
              "
            >
              <span
                style="
                  width: 2px;
                  height: 5px;
                  background: #4a80fc;
                  border-left: 2px solid #4a80fc;
                  margin-right: 7px;
                "
              ></span
              >添加排查周期
            </div>
            <el-row>
              <el-col span="24">
                <el-form-item label="责任人" prop="entPersonnels">
                  <el-select
                    v-model="form.entPersonnels"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    filterable
                    multiple
                    placeholder="请选择责任人"

                    style="width: 98%"
                  >
                    <el-option
                      v-for="item in entPersonList"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col span="4">-->
              <!--                <el-button :size="size" type="primary" @click="chooseBtn"-->
              <!--                >选择人员-->
              <!--                </el-button-->
              <!--                >-->
              <!--              </el-col>-->
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="巡检周期" prop="inspectionCycle">
                  <el-input-number
                    v-model="form.inspectionCycle"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    placeholder="请输入巡检周期"
                    style="width: 99%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="巡检周期单位" prop="inspectionCycleUnit">
                  <el-select
                    v-model="form.inspectionCycleUnit"
                    :isDisabled="isDisabled"
                    :size="size"
                    clearable
                    placeholder="请选择巡检周期单位"
                    style="width: 95%"

                  >
                    <el-option
                      v-for="item in dictConfig.doublePreventionRiskInspectionCycleUnit"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="任务开始时间" prop="finishTime">
                  <el-date-picker
                    v-model="form.finishTime"
                    :formatter="dateFormat"
                    :isDisabled="isDisabled"
                    :size="size"
                    placeholder="选择任务开始时间"
                    style="width: 99%"
                    type="date"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              style="
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
              "
            >
              <el-button :size="size" type="primary" @click="submitForm">添加</el-button>
              <el-button :size="size" type="danger">清除</el-button>
            </div>
          </el-form>
        </div>
      </template>
    </basicDialog>
    <choose-dialog
      ref="chooseDialogRef"
      :dictConfig="{}"
      @refresh="getTableData({})"
    ></choose-dialog>
  </div>
</template>
<script>
import chooseDialog from "../../../../components/chooseDialog.vue";
import {entPersonnelListAllAPI} from "@/api/enterprise/entPersonnel";
import {conmeacheckcycleCreateAPI} from "@/api/doubleprevention/conmeacheckcycle";

export default {
  components: {
    chooseDialog,
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
  data() {
    return {
      rowData: "",
      form: {},
      sizeCon: {
        height: "320px",
      },
      openEdit: false,
      size: 'small',
      rules: {
        entPersonnels: [
          {required: true, message: "请输入危化品名称", trigger: "change"},
        ],
      },
      entPersonList: []
    };
  },
  created() {
    this.getPersonData()
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.form.entPersonnels = this.form.entPersonnels.map(item => ({id: item}))
          const res = await conmeacheckcycleCreateAPI({...this.form})
          if (res.code === 200) {
            this.getTableData({id: this.rowData.id})
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getPersonData() {
      const res = await entPersonnelListAllAPI();
      if (res.code === 200) {
        this.entPersonList = res.data
      }
    },
    async open(row, type) {
      this.openEdit = true;
    },
    // 关闭
    close() {
      //   this.form.id = "";
      this.rowData = "";
      //   this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}

.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}

/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
