<template>
  <div class="gridcheckresult-view">
    <basicDialog
      :icon="icon"
      :title="title"
      width="1084"
      height="828"
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
              <el-col :span="12">
                <el-form-item label="储备库名称" prop="reserveBankName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.reserveBankName"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属单位" prop="placeWork">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.placeWork"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="储备库地址" prop="reserveBankAddress">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.reserveBankAddress"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="负责人" prop="responsiblePerson">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.responsiblePerson"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人电话" prop="responsiblePersonNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.responsiblePersonNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="库容" prop="storageCapacity">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.storageCapacity"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="存放物品" prop="storeItems">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.storeItems"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="应对事故类型" prop="answerAccidentType">
                  <el-checkbox-group
                    v-model="form.answerAccidentType"
                    :disabled="isDisabled"
                  >
                    <el-checkbox label="物体打击"></el-checkbox>
                    <el-checkbox label="车辆伤害"></el-checkbox>
                    <el-checkbox label="机械伤害"></el-checkbox>
                    <el-checkbox label="起重伤害"></el-checkbox>
                    <el-checkbox label="触电"></el-checkbox>
                    <el-checkbox label="淹溺"></el-checkbox>
                    <el-checkbox label="灼烫"></el-checkbox>
                    <el-checkbox label="火灾"></el-checkbox>
                    <el-checkbox label="高处坠落"></el-checkbox>
                    <el-checkbox label="坍塌"></el-checkbox>
                    <el-checkbox label="冒顶片帮"></el-checkbox>
                    <el-checkbox label="透水"></el-checkbox>
                    <el-checkbox label="放炮"></el-checkbox>
                    <el-checkbox label="火药爆炸"></el-checkbox>
                    <el-checkbox label="瓦斯爆炸"></el-checkbox>
                    <el-checkbox label="锅炉爆炸"></el-checkbox>
                    <el-checkbox label="容器爆炸"></el-checkbox>
                    <el-checkbox label="其他爆炸"></el-checkbox>
                    <el-checkbox label="中毒和窒息"></el-checkbox>
                    <el-checkbox label="其它伤害"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="功能描述" prop="functionDescription">
                  <el-input
                    type="textarea"
                    :style="`width:${width2}`"
                    :size="size"
                    clearable
                    v-model="form.functionDescription"
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
  reserveBankCreateAPI,
  reserveBankViewAPI,
  reserveBankUpdateAPI,
} from "@/api/emergency/reservebank";

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
      form: {
        answerAccidentType: [], //应对事故类型
      },
      formRules: {
        reserveBankName: [
          { required: true, message: "请输入储备库名称", trigger: "blur" },
        ],
        placeWork: [
          { required: true, message: "请输入所属单位", trigger: "blur" },
        ],
        responsiblePerson: [
          { required: true, message: "请输入负责人", trigger: "blur" },
        ],
        responsiblePersonNumber: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
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
      this.openEdit = false;
      this.form = {
        answerAccidentType: [], //应对事故类型
      };
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
    },
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      this.title = "新增应急储备库信息";
      this.icon = "icon-xinzeng";
      if (row) {
        if (type === "chakan") {
          this.title = "查看应急储备库信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑应急储备库信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await reserveBankViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        // 应对事故类型回显
        if (res.data.answerAccidentType !== "") {
          this.form.answerAccidentType = res.data.answerAccidentType.split(",");
        } else {
          this.form.answerAccidentType = [];
        }
      }
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        this.form.answerAccidentType = this.form.answerAccidentType.join(","); // 传参格式化为字符串
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData) {
              let params = { ...this.form };
              const res = await reserveBankUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await reserveBankCreateAPI(params);
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
