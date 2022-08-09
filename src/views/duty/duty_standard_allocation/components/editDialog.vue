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
      width="850px"
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
            <el-col span="12">
              <el-form-item label="年度" prop="year">
                <el-select
                  placeholder="年度"
                  clearable
                  v-model="form.year"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationYear"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="责任部门" prop="department">
                <!-- 没人对接先输入框 -->
                <!-- <el-select
                  placeholder="责任部门"
                  clearable
                  v-model="form.entAccidentType"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select> -->
                <el-input
                  placeholder="责任部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="目标指标名称" prop="targetCode">
                <!-- 目标指标值 == 安全指标名称 -->
                <el-select
                  placeholder="目标指标名称"
                  clearable
                  v-model="form.targetCode"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="targetChange"
                >
                  <el-option
                    v-for="item in listSelect"
                    :key="item.id"
                    :value="item.id"
                    :label="item.safetyTarget"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="考核频次" prop="rate">
                <el-select
                  placeholder="考核频次"
                  clearable
                  v-model="form.rate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
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
              <el-form-item label="考核办法" prop="checkMeasure">
                <el-input
                  placeholder="考核办法"
                  clearable
                  v-model="form.checkMeasure"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="目标值" prop="targetValue">
                <el-input
                  placeholder="目标值"
                  clearable
                  v-model="form.targetValue"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="考核指标" prop="checkValue">
                <el-input
                  placeholder="考核指标"
                  clearable
                  v-model="form.checkValue"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <!-- 默自动带入 -->
              <el-form-item label="制定人" prop="designer">
                <el-input
                  placeholder="制定人"
                  clearable
                  v-model="form.designer"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="制定日期" prop="makeDate">
                <el-date-picker
                  v-model="form.makeDate"
                  type="date"
                  placeholder="选择制定日期"
                  :style="`width:${width}`"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :size="size"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="指标类别" prop="targetType">
                <el-select
                  placeholder="指标类别"
                  clearable
                  v-model="form.targetType"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="安全目标责任书" prop="dutyDoc">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'dutyDoc')"
                  @onRemove="(fileList) => onRemove(fileList, 'dutyDoc')"
                  :photos="form.dutyDoc"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="安全目标责任书">
                <show-file :data="form.dutyDoc"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
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
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
  sdDepartmentAPI,
  sdListSelectAPI,
} from "@/api/duty/duty_standard_allocation";
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
import showFile from "@/components/show-file/index";

export default {
  mixins: [dictMixin],
  name: "editDialog",
  components: {
    showFile,
  },
  data() {
    return {
      openEdit: false,
      IMG_URL: imgUrl,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        targetName: "", //指标名称
      },
      rules: {
        checkMeasure: [
          { required: true, message: "请输入考核办法", trigger: "blur" },
        ],
        checkValue: [
          { required: true, message: "请输入考核指标", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请输入责任部门", trigger: "blur" },
        ],
        designer: [
          { required: true, message: "请输入制定人", trigger: "blur" },
        ],
        makeDate: [
          { required: true, message: "请输入制定日期", trigger: "blur" },
        ],
        dutyDoc: [
          { required: true, message: "请输入安全目标责任书", trigger: "blur" },
        ],
        rate: [{ required: true, message: "请输入频次", trigger: "blur" }],
        targetCode: [
          { required: true, message: "请输入目标指标名称", trigger: "blur" },
        ],
        targetValue: [
          { required: true, message: "请输入目标值", trigger: "blur" },
        ],
        year: [{ required: true, message: "请输入年度", trigger: "blur" }],
      },
      rowData: {},
      departmentList: [], //部门
      listSelect: [], //指标名称列表
      pdfName: "",
      pdfUrl: "",
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
      default: "指标配备",
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
      // 责任部门方法
      // this.getDepartment();
      // 获取用户名称
      const currentUser = JSON.parse(
        localStorage.getItem("saber-currentUserInfo")
      );
      if (currentUser) {
        // this.currentUserId = currentUser.content.id
        // 获取当前用户
        this.form.designer = currentUser.content.nickName;
      }
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
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
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
            year: res.data.year ? res.data.year.key : "",
            rate: res.data.rate ? res.data.rate.key : "",
            targetType: res.data.targetType ? res.data.targetType.key : "",
            targetCode: res.data.targetName,
            dutyDoc:res.data.dutyDoc
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 获取责任部门
    async getDepartment() {
      try {
        const res = await sdDepartmentAPI();
        if (res.code === 200) {
          this.departmentList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 年度筛选指标
    yearChange(val) {
      this.getListSelect(val);
    },
    // 获取指标指配
    async getListSelect(val) {
      try {
        const res = await sdListSelectAPI({ year: val });
        if (res.code === 200) {
          this.listSelect = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    //获取指标名称对应的内容
    targetChange(val) {
      let result = this.listSelect.filter((item) => val === item.id);
      this.$set(this.form, "targetValue", result[0].checkValue); //目标值
      this.$set(this.form, "rate", result[0].checkRate.key); //频次
      this.$set(this.form, "checkMeasure", result[0].checkMeasure); //考核办法
      this.$set(this.form, "targetName", result[0].safetyTarget); //考核办法
      this.$set(this.form, "targetType", result[0].targetType.key); //指标类别
    }
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
/deep/.safeBook {
  margin: 0px 15px 0px 40px;
}
/deep/.downloadPdf {
  cursor: pointer;
  color: #409eff;
  width: 160px;
  height: 39px;
  background: #f0f5ff;
  border-radius: 2px 2px 2px 2px;
  border: 1px dashed #4a80fc;
  padding: 3px 5px;
}
</style>
