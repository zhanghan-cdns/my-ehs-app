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
      height="55%"
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
            <el-col span="24">
              <el-form-item label="年度" prop="year">
                <el-select
                  placeholder="年度"
                  clearable
                  v-model="form.year"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dutyAllocationYear"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="24">
              <el-form-item label="支出项目类别" prop="type">
                <el-select
                  placeholder="请选择支出项目类别"
                  clearable
                  v-model="form.type"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyCostBugetType"
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
              <el-form-item label="预算费用（万元）" prop="budget">
                <el-input
                  placeholder="预算费用（万元）"
                  clearable
                  v-model="form.budget"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="预算识别人" prop="checker">
                <el-input
                  placeholder="预算识别人"
                  clearable
                  v-model="form.checker"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="上传附件" v-if="!isDisabled">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <div>
                <span style="margin: 0px 15px 0px 43px">上传附件</span>
                <span
                  style="cursor: pointer; color: #409eff"
                  @click="downloadPdf"
                  >{{ pdfName }}</span
                >
              </div>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')" v-if="!isDisabled">保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  dcbInfoCreateAPI,
  dcbInfoViewAPI,
  dcbInfoUpdateAPI,
} from "@/api/duty/duty_cost_budget/index";
import dictMixin from "@/mixins/dict";
import { IMG_URL } from "@/router/axios";

export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        restrictSpaceName: "",
        id: "",
      },
      IMG_URL:IMG_URL,
      rules: {
        year: [{ required: true, message: "请选择年度", trigger: "blur" }],
        type: [{ required: true, message: "请选择行业类型", trigger: "blur" }],
        budget: [
          { required: true, message: "请输入预算费用（万元）", trigger: "blur" },
        ],
      },
      rowData: {},
      dutyAllocationYear: [], //年度
      dutyAllocationType: [], //行业类型
      pdfName: "",
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
      default: "费用提取",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {
  },
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
        const res = await dcbInfoCreateAPI(this.form);
        if (res.code === 200) {
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
        const res = await dcbInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
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
        const res = await dcbInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            year: res.data.year ? res.data.year.key : "",
            type: res.data.type ? res.data.type.key : "",
          };
          this.pdfName = res.data.dutyDoc[0].originalFilename;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    downloadPdf() {
      //下载
      let str = this.IMG_URL + this.pdfName;
      let a = document.createElement("a");
      a.href = str;
      a.click();
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
