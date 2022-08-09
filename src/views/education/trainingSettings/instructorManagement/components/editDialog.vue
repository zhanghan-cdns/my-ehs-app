<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="128px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="姓名" prop="lecturerName">
            <el-input
              v-model="form.lecturerName"
              placeholder="请输入讲师姓名"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="form.gender"
              placeholder="请选择讲师性别"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.commonGender"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="请选择出生日期"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学历">
            <el-select
              v-model="form.education"
              placeholder="请选择讲师学历"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSetEducation"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-input
              v-model="form.major"
              placeholder="请输入专业"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训擅长方向">
            <el-input
              v-model="form.trainDirection"
              placeholder="请输入培训擅长方向"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训资格证书" style="width: 800px">
            <render-upload
              :fileList="form.trainCertificate"
              @uploadSuccess="
                (fileList) => onSuccess(fileList, 'trainCertificate')
              "
              @handleRemove="(index) => onRemove(index, 'trainCertificate')"
              :openOff="isDisabled"
            ></render-upload>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/trainingSettings/instructorManagement";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: "",
      editId: "",
      form: {
        lecturerName: "",
        gender: "",
        birth: "",
        education: "",
        major: "",
        trainDirection: "",
        trainCertificate: "",
      },
      rules: {
        lecturerName: [
          { required: true, message: "请输入讲师姓名", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dict: Object,
    default: {},
  },
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增课程信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑课程信息";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看课程信息";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {};
      this.$refs.basicFormRef.resetFields();
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
            });
          }
        }
      });
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await getDetailAPI({ id });
        if (res.code === 200) {
          this.form = res.data;
          this.form.education = res.data.education.key;
          this.form.gender = res.data.gender.key;
          console.log(this.form);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    onRemove(index, params) {
      this.form[params].splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
</style>
