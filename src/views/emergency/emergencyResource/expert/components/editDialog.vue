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
                <el-form-item label="姓名" prop="fullName">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.fullName"
                    :disabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生年月" prop="birthday">
                  <el-date-picker
                    :style="`width:${width}`"
                    :size="size"
                    type="date"
                    v-model="form.birthday"
                    :formatter="dateFormat"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="政治面貌" prop="politicalOutlook">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.politicalOutlook"
                  >
                    <el-option
                      v-for="item in politicalOutlookList"
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
                <el-form-item label="身份证号码" prop="idCode">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.idCode"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
                <el-form-item label="工作单位" prop="placeWork">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.placeWork"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高学历" prop="highestEducation">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.highestEducation"
                  >
                    <el-option
                      v-for="item in highestEducationList"
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
                <el-form-item label="毕业院校" prop="graduatedFrom">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.graduatedFrom"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="contactNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.contactNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工作年限" prop="workingYears">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.workingYears"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职务" prop="duties">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.duties"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机" prop="telephoneNumber">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.telephoneNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业" prop="major">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.major"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职称" prop="technicalTitle">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.technicalTitle"
                  >
                    <el-option
                      v-for="item in technicalTitleList"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专家类别" prop="expertCategory">
                  <el-select
                    clearable
                    :style="`width:${width}`"
                    :size="size"
                    v-model="form.expertCategory"
                  >
                    <el-option
                      v-for="item in expertCategoryList"
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
                <el-form-item label="应急专长" prop="expertise">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.expertise"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="电子邮件" prop="email">
                  <el-input
                    :style="`width:${width}`"
                    :size="size"
                    clearable
                    v-model="form.email"
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
  expertCreateAPI,
  expertViewAPI,
  expertUpdateAPI,
} from "@/api/emergency/expert";

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
      politicalOutlookList: [], // 政治面貌
      highestEducationList: [], // 最高学历
      technicalTitleList: [], // 职称
      expertCategoryList: [], // 专家类别
      form: {
        answerAccidentType: [], //应对事故类型
        sex: "男", // 性别
      },
      formRules: {
        fullName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        idCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        expertCategory: [
          { required: true, message: "请选择专家类别", trigger: "change" },
        ],
        expertise: [
          { required: true, message: "请输入应急专长", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getDicMap("politicalOutlook", "politicalOutlookList"); // 获取政治面貌列表
    this.getDicMap("highestEducation", "highestEducationList"); // 获取最高学历列表
    this.getDicMap("technicalTitle", "technicalTitleList"); // 获取职称列表
    this.getDicMap("expertCategory", "expertCategoryList"); // 获取专家类别列表
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
      this.title = "新增应急专家信息";
      this.icon = "icon-xinzeng";
      if (row) {
        if (type === "chakan") {
          this.title = "查看应急专家信息";
          this.icon = "icon-chakan2";
        } else {
          this.title = "编辑应急专家信息";
          this.icon = "icon-bianji1";
        }
        this.rowData = row.id || "";
        const res = await expertViewAPI({ id: this.rowData });
        if (res.code !== 200) {
          return this.$message.error("获取数据失败");
        }
        this.form = res.data;
        // 下拉框回显
        this.form.politicalOutlook = res.data.politicalOutlook
          ? res.data.politicalOutlook.key
          : "";
        this.form.highestEducation = res.data.highestEducation
          ? res.data.highestEducation.key
          : "";
        this.form.technicalTitle = res.data.technicalTitle
          ? res.data.technicalTitle.key
          : "";
        this.form.expertCategory = res.data.expertCategory
          ? res.data.expertCategory.key
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
        this.form.answerAccidentType =
          this.form.answerAccidentType.length > 0
            ? this.form.answerAccidentType.join(",")
            : ""; // 传参格式化为字符串
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            if (this.rowData) {
              let params = { ...this.form };
              const res = await expertUpdateAPI(params);
              if (res.code !== 200) {
                return this.$message.error("编辑失败");
              }
              this.$message.success("编辑成功");
              this.$emit("refreshDataList");
              this.close();
            } else {
              let params = { ...this.form };
              const res = await expertCreateAPI(params);
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
