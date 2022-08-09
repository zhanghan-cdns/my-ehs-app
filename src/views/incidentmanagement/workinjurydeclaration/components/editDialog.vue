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
              <el-form-item label="申报人姓名" prop="declarantName">
                <el-input
                  placeholder="申报人姓名"
                  clearable
                  v-model="form.declarantName"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="申报人性别" prop="declarantGender">
                <el-radio-group v-model="form.declarantGender" :size="size">
                  <el-radio label="COMMON_GENDER:FMALE">女</el-radio>
                  <el-radio label="COMMON_GENDER:MALE">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="申报人身份证号码" prop="declarantNo">
                <el-input
                  placeholder="申报人身份证号码"
                  clearable
                  v-model="form.declarantNo"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="申报人部门" prop="declarantDep">
                <el-select
                  placeholder="申报人部门"
                  clearable
                  v-model="form.declarantDep"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="事故名称" prop="accidentName">
                <el-select
                  placeholder="事故名称"
                  clearable
                  v-model="form.accidentName"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故发生时间" prop="accidentTime">
                <el-date-picker
                  v-model="form.accidentTime"
                  type="date"
                  placeholder="选择事故发生时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="工伤类型" prop="workInjuryLevel">
                <el-select
                  placeholder="工伤类型"
                  clearable
                  v-model="form.workInjuryLevel"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.jobName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="申报日期" prop="declarantTime">
                <el-date-picker
                  v-model="form.declarantTime"
                  type="date"
                  placeholder="选择申报日期"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="损失工时（小时）" prop="lostWorkHours">
                <el-input
                  placeholder="损失工时（小时）"
                  clearable
                  v-model="form.lostWorkHours"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="就诊医院" prop="hospital">
                <el-input
                  placeholder="就诊医院"
                  clearable
                  v-model="form.hospital"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="就诊结果" prop="consultationResults">
                <el-input
                  placeholder="就诊结果"
                  clearable
                  v-model="form.consultationResults"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="注意事项" prop="cautions">
                <el-input
                  placeholder="注意事项"
                  clearable
                  v-model="form.cautions"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="相关附件" prop="annex">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'annex')"
                  @onRemove="(fileList) => onRemove(fileList, 'annex')"
                  :photos="form.annex"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="相关附件">
                <show-file :data="form.annex"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="材料是否齐全" prop="materialComplete">
                <el-radio-group v-model="form.materialComplete" :size="size">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
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
                  :row="3"
                  resize="none"
                  type="textarea"
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
} from "@/api/incidentmanagement/workinjurydeclaration/index";
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
      },
      rules: {
        job: [{ required: true, message: "请输入申报人姓名", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入申报人性别", trigger: "blur" },
        ],
        editor: [
          {
            required: true,
            message: "请输入申报人身份证号码",
            trigger: "blur",
          },
        ],
        job: [{ required: true, message: "请输入申报人部门", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入事故名称", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入事故发生时间", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入工伤类型", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入申报日期", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入损失工时", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入材料是否齐全", trigger: "blur" },
        ],
      },
      rowData: {},
      departmentList: [], //部门
      listSelect: [], //指标名称列表
      pdfName: "",
      pdfUrl: "",
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      jobList: [],
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
      default: "工伤申报",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
    source: {
      type: String,
      default: "",
    },
  },
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
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
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
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
