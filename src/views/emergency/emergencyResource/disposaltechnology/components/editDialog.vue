<template>
  <div class="gridcheckresult-view">
    <basicDialog
      :icon="icon"
      :title="title"
      width="900"
      height="600"
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
                <el-form-item label="化学品名称" prop="chemicalName">
                  <el-input
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.chemicalName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="主要危险性" prop="mainHazard">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.mainHazard"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="事故应急处置技术"
                  prop="accidentDisposalTechnology"
                >
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.accidentDisposalTechnology"
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
  disposalTechnologyCreateAPI,
  disposalTechnologyViewAPI,
  disposalTechnologyUpdateAPI,
} from "@/api/emergency/disposaltechnology";

export default {
  data() {
    return {
      icon: "",
      title: "",
      width: "250px",
      width2: "93.8%",
      size: "small",
      openEdit: false,
      isDisabled: false, // 是否禁用表单
      rowData: "",
      form: {},
      formRules: {
        chemicalName: [
          { required: true, message: "请输入化学品名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    close() {
      this.form = {};
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },

    async open(row, type) {
      this.title = "新增应急处置技术信息";
      this.icon = "icon-xinzeng";
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      if (row) {
        if (type === "chakan") {
          this.title = "查看应急处置技术信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑应急处置技术信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await disposalTechnologyViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
      }
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData) {
              let params = { ...this.form };
              const res = await disposalTechnologyUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await disposalTechnologyCreateAPI(params);
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
