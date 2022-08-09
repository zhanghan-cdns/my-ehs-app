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
              <el-form-item label="整改标题" prop="editor">
                <el-input
                  placeholder="整改标题"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="整改单编号" prop="editor">
                <el-input
                  placeholder="整改单编号"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="整改来源" prop="editor">
                <el-select
                  placeholder="整改来源"
                  clearable
                  v-model="form.editor"
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
              <el-form-item label="隐患发生时间" prop="assessDate">
                <el-date-picker
                  v-model="form.assessDate"
                  type="date"
                  placeholder="选择隐患发生时间"
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
              <div style="display: flex">
                <el-form-item
                  label="检查人员"
                  prop="staffName"
                  class="is-required"
                >
                  <el-input
                    style="width: 165px"
                    clearable
                    v-model="form.staffName"
                    disabled
                    :size="size"
                    placeholder="请输入检查人员"
                  ></el-input>
                </el-form-item>
                <el-button
                  class="choose-btn"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="
                    () => {
                      $refs.choosePersonDialogRef.open();
                    }
                  "
                  >请选择
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="检查单位" prop="job">
                <el-select
                  placeholder="检查单位"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="外来检查人员" prop="editor">
                <el-input
                  placeholder="外来检查人员"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="隐患级别" prop="job">
                <el-select
                  placeholder="隐患级别"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="隐患因素" prop="job">
                <el-select
                  placeholder="隐患因素"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="隐患描述" prop="job">
                <el-input
                  placeholder="隐患描述"
                  clearable
                  v-model="form.safetyDuty"
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
            <el-col span="12">
              <div style="display: flex">
                <el-form-item label="整改责任人" prop="staffName">
                  <el-input
                    style="width: 165px"
                    clearable
                    v-model="form.staffName"
                    disabled
                    :size="size"
                    placeholder="请输入整改责任人"
                  ></el-input>
                </el-form-item>
                <el-button
                  class="choose-btn"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="
                    () => {
                      $refs.choosePersonDialogRef.open();
                    }
                  "
                  >请选择
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="整改责任单位" prop="job">
                <el-select
                  placeholder="整改责任单位"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="责任单位负责人" prop="editor">
                <el-input
                  placeholder="整改责任单位负责人"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="计划整改完成时间" prop="assessDate">
                <el-date-picker
                  v-model="form.assessDate"
                  type="date"
                  placeholder="选择计划整改完成时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="闭环人" prop="editor">
                <el-select
                  placeholder="闭环人"
                  clearable
                  v-model="form.editor"
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
              <el-form-item label="隐患类型" prop="editor">
                <el-select
                  placeholder="隐患类型"
                  clearable
                  v-model="form.editor"
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
              <el-form-item label="整改方式" prop="assessDate">
                <el-select
                  placeholder="整改方式"
                  clearable
                  v-model="form.assessDate"
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
              <el-form-item label="违章人数" prop="editor">
                <el-input
                  placeholder="违章人数"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="检查来源分类" prop="assessDate">
                <el-select
                  placeholder="检查来源分类"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="发生环节" prop="assessDate">
                <el-select
                  placeholder="发生环节"
                  clearable
                  v-model="form.job"
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
              <el-form-item label="是否重复整改" prop="job">
                <el-radio-group v-model="form.job" :size="size">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="24">
              <el-form-item label="隐患位置" prop="safetyDuty">
                <el-input
                  placeholder="隐患位置"
                  clearable
                  v-model="form.safetyDuty"
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
              <el-form-item label="整改意见" prop="editor">
                <el-input
                  placeholder="整改意见"
                  clearable
                  v-model="form.safetyDuty"
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
              <el-form-item label="原因分析" prop="editor">
                <el-input
                  placeholder="原因分析"
                  clearable
                  v-model="form.safetyDuty"
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
              <el-form-item label="整改填写说明" prop="editor">
                <el-input
                  placeholder="整改填写说明"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8 }"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="隐患照片" prop="attachment">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="隐患照片">
                <el-image
                  v-for="item in form.attachment"
                  :key="item.url"
                  style="width: 100px; height: 100px"
                  :src="imgUrl + item.url"
                  :preview-src-list="[imgUrl + item.url]"
                ></el-image>
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
    <choose-person-dialog
      ref="choosePersonDialogRef"
      title="选择员工"
      @submit="choosePerson"
    ></choose-person-dialog>
  </div>
</template>
<script>
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/incidentmanagement/accidentrectification/index";
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
import choosePersonDialog from "./choosePersonDialog.vue";

export default {
  mixins: [dictMixin],
  name: "editDialog",
  components: {
    choosePersonDialog,
  },
  data() {
    return {
      openEdit: false,
      imgUrl: imgUrl,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        staffName:'',//检查人员
      },
      rules: {
        job: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        safetyDuty: [
          { required: true, message: "请输入安全职责", trigger: "blur" },
        ],
        editor: [{ required: true, message: "请输入编制人", trigger: "blur" }],
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
    // 获取人员
    choosePerson(data){
      this.form.staffName = data.staffName.join(',');
      console.log(this.form.staffName,'data')

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
/deep/ .choose-btn {
  margin-left: 10px;
  height: 30px;
  margin-top: 5px;
}
</style>
