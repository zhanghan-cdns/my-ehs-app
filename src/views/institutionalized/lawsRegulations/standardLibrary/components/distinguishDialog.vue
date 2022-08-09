<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="73%"
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
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="法律法规名称" prop="lawsName">
                <el-input
                  placeholder="法律法规名称"
                  clearable
                  v-model="form.lawsName"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="大类别" prop="largeCategory">
                <el-select
                  placeholder="大类别"
                  clearable
                  v-model="form.largeCategory"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.largeCategoryList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="小类别" prop="subCategory">
                <el-select
                  placeholder="小类别"
                  clearable
                  v-model="form.subCategory"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.subCategoryList"
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
              <el-form-item label="文件编号" prop="fileNumber">
                <el-input
                  placeholder="文件编号"
                  clearable
                  v-model="form.fileNumber"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="颁布单位" prop="issuingDepartment">
                <el-input
                  placeholder="颁布单位"
                  clearable
                  v-model="form.issuingDepartment"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="适用部门" prop="applicableDeptIds">
                <el-select
                  placeholder="适用部门"
                  clearable
                  v-model="form.applicableDeptIds"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.subCategoryList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="发布日期" prop="releaseDate">
                <el-date-picker
                  v-model="form.releaseDate"
                  type="date"
                  placeholder="请选择发布日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="实施日期" prop="implementationDate">
                <el-date-picker
                  v-model="form.implementationDate"
                  type="date"
                  placeholder="请选择实施日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="合规性评估" prop="isCompliance">
                <el-radio-group v-model="form.isCompliance">
                  <el-radio :label="0">符合</el-radio>
                  <el-radio :label="1">不符合</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="适用条款" prop="applicableProvisions">
                <el-input
                  clearable
                  v-model="form.applicableProvisions"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="条款内容" prop="clauseContent">
                <el-input
                  type="textarea"
                  :rows="2"
                  clearable
                  v-model="form.clauseContent"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="差异性" prop="difference">
                <el-input
                  type="textarea"
                  :rows="2"
                  clearable
                  v-model="form.difference"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  lawIdentifyCreateAPI,
  lawIdentifyViewAPI,
  lawIdentifyUpdateAPI,
} from "@/api/institutionalized/lawsRegulations/lawIdentify";

export default {
  name: "editDialog",
  components: {},
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icon: "icon-xinzeng",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      form: {
        lawsName: "",
        largeCategory: "",
        subCategory: "",
        fileNumber: "",
        issuingDepartment: "",
        applicableDeptIds: "",
        releaseDate: "",
        implementationDate: "",
        applicableProvisions: "",
        isCompliance: 0,
        clauseContent: "",
        difference: "",
        remark: "",
      },
      rules: {
        lawsName: [
          { required: true, message: "请输入法律法规名称", trigger: "blur" },
        ],
        // largeCategory: [
        //   { required: true, message: "请选择大类别", trigger: "change" },
        // ],
        // subCategory: [
        //   { required: true, message: "请选择小类别", trigger: "change" },
        // ],
        fileNumber: [
          { required: true, message: "请输入文件编号", trigger: "blur" },
        ],
        issuingDepartment: [
          { required: true, message: "请选择颁布单位", trigger: "change" },
        ],
        releaseDate: [
          { required: true, message: "请选择发布日期", trigger: "change" },
        ],
        applicableProvisions: [
          { required: true, message: "请输入适用条款", trigger: "blur" },
        ],
        clauseContent: [
          { required: true, message: "请输入条款内容", trigger: "blur" },
        ],
        difference: [
          { required: true, message: "请输入差异性", trigger: "blur" },
        ],
      },
      row: {},
    };
  },

  created() {},

  methods: {
    // 打开
    open(row) {
      this.title = "新增法律识别信息";
      this.openEdit = true;
      if (row && row.id) {
        this.row = row;
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
          if (this.row.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取详情
    async getDetail(id) {
      try {
        const res = await lawIdentifyViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 新增
    async add() {
      try {
        const res = await lawIdentifyCreateAPI(this.form);
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("新增成功");
          this.close();
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 修改
    async modify() {
      try {
        const res = await lawIdentifyUpdateAPI({
          ...this.form,
          id: this.row.id,
        });
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("修改成功");
          this.close();
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
</style>
