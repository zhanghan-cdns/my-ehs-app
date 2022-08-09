<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="108px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="人员姓名" prop="personName">
            <el-input
              v-model="form.personName"
              placeholder="请输入人员姓名"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="人员证件号码" prop="idCard">
            <el-input
              v-model="form.idCard"
              placeholder="请输入人员证件号码"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="证书类型" prop="certificateType">
            <el-select
              v-model="form.certificateType"
              placeholder="请选择证书类型"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSafetrainCerType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书名称" prop="certificateName">
            <el-input
              v-model="form.certificateName"
              placeholder="请输入证书名称"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期" prop="validTime">
            <el-date-picker
              v-model="form.validTime"
              type="date"
              placeholder="请选择有效期"
              style="width: 320px"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发证机关" prop="official">
            <el-select
              v-model="form.official"
              placeholder="请选择发证机关"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSafetrainOfficialType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效" prop="available">
            <el-select
              v-model="form.available"
              placeholder="请选择是否有效"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书描述" prop="describe">
            <el-input
              v-model="form.describe"
              placeholder="请输入证书描述"
              :disabled="disabled"
              style="width: 824px"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传附件" style="width: 800px">
            <render-upload
              :fileList="form.trainCertificate"
              @uploadSuccess="
                (fileList) => onSuccess(fileList, 'trainCertificate')
              "
              @handleRemove="(index) => onRemove(index, 'trainCertificate')"
              :openOff="disabled"
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
} from "@/api/education/safetyCertificationTraining/foreignPartyCertificate";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: false,
      editId: "",
      form: {
        personName: "",
        idCard: "",
        certificateType: "",
        certificateName: "",
        validTime: "",
        official: "",
        available: "",
        describe: "",
        trainCertificate: [],
      },
      rules: {
        personName: [
          { required: true, message: "请输入人员姓名", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
        ],
        certificateType: [
          { required: true, message: "请选择证书类型", trigger: "change" },
        ],
        certificateName: [
          { required: true, message: "请输入证书名称", trigger: "blur" },
        ],
        validTime: [
          { required: true, message: "请选择有效期", trigger: "change" },
        ],
        official: [
          { required: true, message: "请选择发证机构", trigger: "change" },
        ],
        available: [
          { required: true, message: "请选择是否有效", trigger: "change" },
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
        this.title = "新增奖惩记录";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑奖惩记录";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看奖惩记录";
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
      this.form = {
        personName: "",
        idCard: "",
        certificateType: "",
        certificateName: "",
        validTime: "",
        official: "",
        available: "",
        describe: "",
        trainCertificate: [],
      };
      this.multipleAnswer = [];
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
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.form = res.data;
        this.form.certificateType=res.data.certificateType.key;
        this.form.official=res.data.official.key;
      }
    },
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    onRemove(index, params) {
      this.form[params].splice(index, 1);
    },
    selectChange(data) {
      console.log(data);
      this.courseList.map((item) => {
        if (item.id === data) {
          this.form.courseName = item.courseName;
        }
      });
    },
    //题目切换
    topicTypeChange() {
      this.form.answer = "";
    },
    //获取岗位列表
    getJobOption() {
      getJobOptionAPI().then((res) => {
        console.log(res.data);
      });
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
/deep/.el-checkbox {
  padding-top: 10px;
}
</style>
