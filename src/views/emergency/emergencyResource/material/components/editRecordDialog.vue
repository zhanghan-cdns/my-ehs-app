<template>
  <div class="gridcheckresult-view">
    <basicDialog
      :icon="icon"
      :title="title"
      width="900"
      height="450"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          :model="form"
          label-width="140px"
          :disabled="isDisabled"
          :rules="formRules"
          ref="ruleForm"
        >
          <div class="content_box">
            <el-row>
              <el-col :span="24">
                <el-form-item label="保养人" prop="maintainPerson">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.maintainPerson"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="最近保养时间" prop="latelyMaintainTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    placeholder="选择日期"
                    v-model="form.latelyMaintainTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="下次保养时间" prop="nextMaintainTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.nextMaintainTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="保养内容" prop="maintainContent">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.maintainContent"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </template>
      <template #bottom>
        <el-button
          v-if="!isDisabled"
          type="primary"
          size="medium"
          @click="handleBottomClick('save')"
          >保存</el-button
        >
        <el-button
          v-if="!isDisabled"
          type="success"
          size="medium"
          @click="handleBottomClick('reset')"
          >重置</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="handleBottomClick('cancel')"
          >取消</el-button
        >
      </template>
    </basicDialog>
  </div>
</template>

<script>
import {
  maintainCreateAPI,
  maintainViewAPI,
  maintainUpdateAPI,
} from "@/api/emergency/maintain";

export default {
  data() {
    return {
      icon: "",
      title: "",
      width: "330px",
      width2: "93.8%",
      size: "small",
      openEdit: false,
      isDisabled: false, // 是否禁用表单
      rowData: "",
      operationType: "", // 操作类型
      maintainType: "material", // 维保类型
      form: {},
      formRules: {
        maintainPerson: [
          { required: true, message: "请输入保养人", trigger: "blur" },
        ],
        latelyMaintainTime: [
          { required: true, message: "请选择最近保养时间", trigger: "change" },
        ],
        nextMaintainTime: [
          { required: true, message: "请选择下次保养时间", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  methods: {
    // 格式化日期
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },
    async open(row, type) {
      if (type === "chakan") {
        this.title = "查看维保记录";
        this.icon = "icon-chakan2";
      } else if (type === "weibao") {
        this.title = "新增维保记录";
        this.icon = "icon-xinzeng";
      } else {
        this.title = "编辑维保记录";
        this.icon = "icon-bianji1";
      }
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      this.operationType = type;
      if (row) {
        this.rowData = row.id || "";
        if (type !== "weibao") {
          const res = await maintainViewAPI({ id: this.rowData });
          if (res.code !== 200) {
            return this.$message.error("获取数据失败");
          }
          this.form = res.data;
        }
      }
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData && this.operationType !== "weibao") {
              let params = { ...this.form };
              const res = await maintainUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = {
                ...this.form,
                equipmentId: this.rowData,
                maintainType: this.maintainType,
              };
              const res = await maintainCreateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("新增失败");
              }
              this.$message.success("新增成功");
              this.$emit("refreshDataList");
              this.close();
            }
          }
        });
      }
      if (type === "reset") {
        this.resetForm();
      }
      if (type === "cancel") {
        this.close();
      }
    },

    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
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
