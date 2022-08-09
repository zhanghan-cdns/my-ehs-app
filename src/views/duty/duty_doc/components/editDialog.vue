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
              <el-form-item label="岗位名称" prop="job">
                <el-input
                  placeholder="岗位名称"
                  clearable
                  v-model="form.job"
                  :style="`width:${width}`"
                  :size="size"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属部门" prop="department">
                <el-select
                  placeholder="所属部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  disabled
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
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
              <el-form-item label="更新时间" prop="updateTime">
                <el-date-picker
                  v-model="form.updateTime"
                  type="date"
                  placeholder="选择更新时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="安全职责内容" prop="dutyContent">
                <basic-editor
                  ref="tinymceEditorRef"
                  :value="form.dutyContent"
                  @getEditorValue="getEditorValue"
                  style="width: 98.5%"
                ></basic-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="上级领导签字" prop="leaderSign">
                <el-select
                  placeholder="上级领导签字"
                  clearable
                  v-model="form.leaderSign"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.userName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="批准人" prop="approver">
                <el-select
                  placeholder="批准人"
                  clearable
                  v-model="form.approver"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.userName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="编制人" prop="editor">
                <el-select
                  placeholder="编制人"
                  clearable
                  v-model="form.editor"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.userName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="审核人" prop="checker">
                <el-select
                  placeholder="审核人"
                  clearable
                  v-model="form.checker"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.userName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input
                  placeholder="备注"
                  clearable
                  :autosize="{ minRows: 3, maxRows: 12 }"
                  v-model="form.remark"
                  style="width: 98.5%"
                  resize="none"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  safeInfoCreateAPI,
  safeInfoUpdateAPI,
  safeInfoViewAPI,
} from "@/api/duty/duty_doc/index";
import { entPersonnelListAPI } from "@/api/enterprise/entPersonnel/index"; //人员信息表

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
        department: "",
        job: "",
        dutyContent: "",
        status: "0",
      },
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      personList: [],
      rules: {
        // 有限空间名称
        restrictSpaceName: [
          { required: true, message: "请输入有限空间", trigger: "blur" },
        ],
        // 易导致事故类型
        accidentType: [
          {
            required: true,
            message: "请选择易导致事故类型",
            trigger: "change",
          },
        ],
      },
      rowData: {},
      version: "",
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
      default: "安全责任书下发",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      console.log(row,'row')
      this.isDisabled = type === "chakan" ? true : false;
      this.form.department = row.deptName;
      this.form.job = row.jobName;
      this.version = row.version;
      this.getPersonList();
      console.log(row, "row");
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
      // this.$refs.tinymceEditorRef.setContent("");
      // this.$refs.tinymceEditorRef.beforeDestroy();
    },
    // 提交接口
    submitForm() {
      const text = this.$refs.tinymceEditorRef.getTextContent();
      this.form.dutyContent = text;
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
        const res = await safeInfoCreateAPI(this.form);
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
        const res = await safeInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
          version: this.version,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 获取人员信息
    async getPersonList() {
      try {
        let params = {
          "queryParams[pageNum]": this.page.currentPage,
          "queryParams[pageSize]": this.page.pageSize,
        };
        const res = await entPersonnelListAPI(params);
        if (res.code === 200) {
          this.personList = res.data.content;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await safeInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = res.data;
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
