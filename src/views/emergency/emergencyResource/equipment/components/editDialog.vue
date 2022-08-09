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
                <el-form-item label="装备分类" prop="equipmentCategory">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.equipmentCategory"
                  >
                    <el-option
                      v-for="item in equipmentCategoryList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="装备名称" prop="equipmentName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.equipmentName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="规格型号" prop="specificationModel">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.specificationModel"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量" prop="number">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.number"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="功能用途" prop="functionalUse">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.functionalUse"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="自储数量" prop="selfStorageNum">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.selfStorageNum"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="代储数量" prop="actingStorageNum">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.actingStorageNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="储存单位" prop="storageUnit">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.storageUnit"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址" prop="address">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.address"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="liaisonPerson">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.liaisonPerson"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="应急电话" prop="answerNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.answerNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="应对事故类型" prop="answerAccidentType">
                  <el-checkbox-group v-model="form.answerAccidentType">
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
  equipmentCreateAPI,
  equipmentViewAPI,
  equipmentUpdateAPI,
} from "@/api/emergency/equipment";

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
      equipmentCategoryList: [], // 装备类型
      form: {
        answerAccidentType: [], //应对事故类型
      },
      formRules: {
        equipmentCategory: [
          { required: true, message: "请选择装备分类", trigger: "change" },
        ],
        equipmentName: [
          { required: true, message: "请输入装备名称", trigger: "blur" },
        ],
        storageUnit: [
          { required: true, message: "请输入储存单位", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getDicMap("equipmentCategory", "equipmentCategoryList"); // 获取队伍类型列表
  },
  methods: {
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      this.title = "新增应急装备信息";
      this.icon = "icon-xinzeng";
      if (row) {
        if (type === "chakan") {
          this.title = "查看应急装备信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑应急装备信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await equipmentViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        // 队伍类型回显
        this.form.equipmentCategory = res.data.equipmentCategory
          ? res.data.equipmentCategory.key
          : "";
        // 应对事故类型回显
        if (res.data.answerAccidentType !== "") {
          this.form.answerAccidentType = res.data.answerAccidentType.split(",");
        } else {
          this.form.answerAccidentType = [];
        }
      }
    },

    close() {
      this.form = {
        answerAccidentType: [], //应对事故类型
      };
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },

    // 底部按钮点击事件
    handleBottomClick(type) {
      if (type === "save") {
        if (this.form.answerAccidentType.length > 0) {
          this.form.answerAccidentType = this.form.answerAccidentType.join(","); // 传参格式化为字符串
        } else {
          this.form.answerAccidentType = "";
        }
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData) {
              let params = { ...this.form };
              const res = await equipmentUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await equipmentCreateAPI(params);
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
