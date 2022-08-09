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
            <el-col span="24">
              <el-form-item label="岗位名称" prop="job">
                <el-select
                  placeholder="岗位名称"
                  clearable
                  v-model="form.job"
                  style="width:98.5%"
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
              <el-form-item label="安全职责" prop="safetyDuty">
                <el-input
                  placeholder="安全职责"
                  clearable
                  v-model="form.safetyDuty"
                  style="width: 98.5%"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  type="textarea"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="编制人" prop="editor">
                <el-input
                  placeholder="编制人"
                  clearable
                  v-model="form.editor"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="安全目标责任书" prop="attachment">
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
              <el-form-item label="安全目标责任书">
                <show-file :data="form.attachment"></show-file>
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
} from "@/api/duty/duty_responsibility/index";
import {
jobInfoListAPI
} from "@/api/duty/duty_assess_record/index";
import dictMixin from "@/mixins/dict";
import {imgUrl} from "@/router/axios";
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
      IMG_URL:imgUrl,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        targetName: "", //指标名称
      },
      rules: {
        job: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
        ],
        safetyDuty: [
          { required: true, message: "请输入安全职责", trigger: "blur" },
        ],
        editor: [
          { required: true, message: "请输入编制人", trigger: "blur" },
        ]
      },
      rowData: {},
      departmentList: [], //部门
      listSelect: [], //指标名称列表
      pdfName: "",
      pdfUrl:'',
      page:{
        currentPage:1,
        pageSize:10,
      },
      jobList:[],
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
  created() {
    
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      // 责任部门方法
      // this.getDepartment();
      // 获取用户名称
      this.getJob();//岗位
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
            attachment:res.data.attachment
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
     async getJob(){
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
