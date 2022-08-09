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
                <el-form-item label="物资类别" prop="materialCategory">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.materialCategory"
                  >
                    <el-option
                      v-for="item in materialCategoryList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="物资名称" prop="materialName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.materialName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="物资编号" prop="materialNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.materialNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="物资分类" prop="materialType">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.materialType"
                  >
                    <el-option
                      v-for="item in materialTypeList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="生产日期" prop="productionTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.productionTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投用日期" prop="putUseTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.putUseTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="使用期限(月)" prop="usefulLife">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.usefulLife"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生命周期" prop="lifeCycle">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.lifeCycle"
                  >
                    <el-option
                      v-for="item in lifeCycleList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="型号" prop="model">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.model"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量" prop="quantity">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.quantity"
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
                <el-form-item label="自储数量" prop="selfStorageQuantity">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.selfStorageQuantity"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上次检查时间" prop="lastInspectTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.lastInspectTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下次检查时间" prop="nextInspectTime">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.nextInspectTime"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="代储数量" prop="actingStorageQuantity">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.actingStorageQuantity"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="储存单位" prop="storageCompany">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.storageCompany"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="物质状态" prop="materialState">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.materialState"
                  >
                    <el-option
                      v-for="item in materialStateList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="储存地址" prop="storageAddress">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.storageAddress"
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
                <el-form-item label="应急电话" prop="telephoneNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.telephoneNumber"
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
  materialCreateAPI,
  materialViewAPI,
  materialUpdateAPI,
} from "@/api/emergency/material";

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
      materialCategoryList: [], // 物资类别
      materialTypeList: [], // 物资分类
      lifeCycleList: [], // 生命周期
      materialStateList: [], // 物资状态
      form: {
        answerAccidentType: [], //应对事故类型
      },
      formRules: {
        materialCategory: [
          { required: true, message: "请选择装备分类", trigger: "change" },
        ],
        quantity: [
          { required: true, message: "请输入装备名称", trigger: "blur" },
        ],
        storageCompany: [
          { required: true, message: "请输入储存单位", trigger: "blur" },
        ],
        liaisonPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        telephoneNumber: [
          { required: true, message: "请输入应急电话", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getDicMap("materialCategory", "materialCategoryList"); // 获取物资类别列表
    this.getDicMap("materialType", "materialTypeList"); // 获取物资分类列表
    this.getDicMap("lifeCycle", "lifeCycleList"); // 获取生命周期列表
    this.getDicMap("materialState", "materialStateList"); // 获取物资状态列表
  },
  methods: {
    // 格式化日期
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    close() {
      this.form = {
        answerAccidentType: [], //应对事故类型
      };
      this.rowData = "";
      this.$refs.ruleForm.resetFields();
      this.openEdit = false;
    },
    async open(row, type) {
      this.openEdit = true;
      this.isDisabled = type === "chakan" ? true : false;
      this.title = "新增应急物资信息";
      this.icon = "icon-xinzeng";
      if (row) {
        if (type === "chakan") {
          this.title = "查看应急物资信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑应急物资信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await materialViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        // 物资类别回显
        this.form.materialCategory = res.data.materialCategory
          ? res.data.materialCategory.key
          : "";
        // 物资分类回显
        this.form.materialType = res.data.materialType
          ? res.data.materialType.key
          : "";
        // 生命周期回显
        this.form.lifeCycle = res.data.lifeCycle ? res.data.lifeCycle.key : "";
        // 物资状态回显
        this.form.materialState = res.data.materialState
          ? res.data.materialState.key
          : "";
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
        this.form.answerAccidentType = this.form.answerAccidentType
          ? this.form.answerAccidentType.join(",")
          : ""; // 传参格式化为字符串
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData) {
              let params = { ...this.form };
              const res = await materialUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await materialCreateAPI(params);
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
