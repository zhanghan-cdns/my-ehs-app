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
              <el-form-item label="事故名称" prop="accidentName">
                <el-input
                  placeholder="事故名称"
                  clearable
                  v-model="form.accidentName"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="事故部门" prop="accidentDep">
                <el-select
                  placeholder="事故部门"
                  clearable
                  v-model="form.accidentDep"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="yearChange"
                >
                  <el-option
                    v-for="item in departmentList"
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
              <el-form-item label="发生地点" prop="occurPlace">
                <el-input
                  placeholder="发生地点"
                  clearable
                  v-model="form.occurPlace"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="发生时间" prop="occurTime">
                <el-date-picker
                  v-model="form.occurTime"
                  type="date"
                  placeholder="选择发生时间"
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
              <el-form-item label="伤害等级" prop="damageLevel">
                <el-select
                  placeholder="伤害等级"
                  clearable
                  v-model="form.damageLevel"
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
              <el-form-item label="事故等级" prop="accidentLevel">
                <el-select
                  placeholder="事故等级"
                  clearable
                  v-model="form.accidentLevel"
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
              <el-form-item label="事故类型" prop="accidentType">
                <el-select
                  placeholder="事故类型"
                  clearable
                  v-model="form.accidentType"
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
              <el-form-item label="隐患因素" prop="hiddenFactor">
                <el-select
                  placeholder="隐患因素"
                  clearable
                  v-model="form.hiddenFactor"
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
              <el-form-item label="事故原因" prop="accidentCause">
                <el-select
                  placeholder="事故原因"
                  clearable
                  v-model="form.accidentCause"
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
            <el-col span="24">
              <el-form-item label="事故原因分析" prop="accidentCauseAnalysis">
                <el-input
                  placeholder="事故原因分析"
                  clearable
                  v-model="form.accidentCauseAnalysis"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="事故描述" prop="accidentDescription">
                <el-input
                  placeholder="事故描述"
                  clearable
                  v-model="form.accidentDescription"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="上报人" prop="reporter">
                <el-select
                  v-model="form.reporter"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="上报人"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.entPersonName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="附件" prop="annex">
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
              <el-form-item label="附件">
                <show-file :data="form.annex"></show-file>
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
  dcInfoCreateAPI,dcInfoViewAPI,dcInfoUpdateAPI
} from "@/api/incidentmanagement/accidentexpress/index";
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
import showFile from "@/components/show-file/index";
import { deptAPI, userAPI } from "@/api/doubleprevention/riskobject/index.js";

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
        surveyStatus:"0"
      },
      departmentList: [],
      userList: [],
      rules: {
        job: [{ required: true, message: "请输入事故名称", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请选择事故部门", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请选择发生地点", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入发生时间", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入发生地点", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入伤害等级", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入事故等级", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入事故类型", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入隐患因素", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入事故原因", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入事故原因分析", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入上报人", trigger: "blur" }],
        //
        job: [{ required: true, message: "请输入事故编号", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入申请人", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请选择所属部门", trigger: "blur" },
        ],
        job: [
          { required: true, message: "请输入事故发生时间", trigger: "blur" },
        ],
        safetyDuty: [
          { required: true, message: "请输入发生地点", trigger: "blur" },
        ],
        editor: [
          {
            required: true,
            message: "请输入经济损失（万元）",
            trigger: "blur",
          },
        ],
        job: [{ required: true, message: "请输入事故发现项", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入救援情况", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入事故教训", trigger: "blur" },
        ],
        job: [
          { required: true, message: "请输入事故责任人处理", trigger: "blur" },
        ],
        safetyDuty: [
          {
            required: true,
            message: "请输入相关人员教育情况",
            trigger: "blur",
          },
        ],
        editor: [
          {
            required: true,
            message: "请输入事故现场照片/视频",
            trigger: "blur",
          },
        ],
        editor: [
          { required: true, message: "请输入事故树分析表", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入事故证据链", trigger: "blur" },
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
      default: "事故快报",
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
      this.getJob(); //岗位
      this.deptList()
      this.personList()
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
        console.log(this.form,'this.form')
        const res = await dcInfoCreateAPI(this.form);
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
        const res = await dcInfoUpdateAPI({
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
        const res = await dcInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
          this.pdfName = res.data.attachment[0].originalFilename;
          this.pdfUrl = res.data.attachment[0].url;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    downloadPdf() {
      //查看是显示文件
      let url = this.IMG_URL + this.pdfUrl;
      let a = document.createElement("a");
      a.href = url;
      a.click();
    },
    async getJob() {
      try {
        let params = {
          "queryParams[pageNum]": this.page.currentPage,
          "queryParams[pageSize]": this.page.pageSize,
        };
        const res = await jobInfoListAPI(params);
        if (res.code === 200) {
          this.jobList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    async deptList() {
      //责任部门
      const res = await deptAPI();
      if (res.code === 200) {
        this.departmentList = res.data;
      }
    },
    // 责任人
    async personList() {
      //责任部门
      const res = await userAPI();
      if (res.code === 200) {
        this.userList = res.data;
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
