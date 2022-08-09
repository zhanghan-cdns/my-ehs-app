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
          label-width="108px"
          :rules="rules"
          :disabled="disabled"
        >
          <el-form-item label="证书名称" prop="certificateName">
            <el-input
              v-model="form.certificateName"
              placeholder="请输入证书名称"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="证书类型" prop="certificateType">
            <el-select
              v-model="form.certificateType"
              placeholder="请选择证书类型"
              :style="width"
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
          <el-form-item label="有效期" prop="validTime">
            <el-date-picker
              v-model="form.validTime"
              type="date"
              placeholder="请选择有效期"
              :style="width"
              :disabled="disabled"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发证机关" label-width="auto" prop="official">
            <el-select
              v-model="form.official"
              placeholder="请选择发证机关"
              :style="width"
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
          <el-form-item label="证书描述" prop="describe">
            <el-input
              v-model="form.describe"
              placeholder="请输入证书描述"
              :disabled="disabled"
              :style="width2"
              type="textarea"
              rows="3"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传附件" :style="width2">
             <render-upload
             :fileList="form.trainCertificate"
              @uploadSuccess="(fileList) => onSuccess(fileList, 'trainCertificate')"
              @handleRemove="(index) => onRemove(index, 'trainCertificate')"
              :openOff="disabled"
            ></render-upload>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!disabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!disabled"
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
  updateAPI,
  getDetailAPI,
} from "@/api/education/safetyCertificationTraining/enterpriseCertificateInformation";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      width: "width:320px",
      width2: "width:824px",
      title: "",
      icon: "",
      openFlag: false,
      disabled: false,
      editId: "",
      form: {
        certificateType: "", //证书类型
        certificateName: "", //证书类型
        validTime: "", //有效期
        official: "", //发证机关
        describe: "", //描述
        trainCertificate: [], //附件
      },
      rules: {
        certificateName: [
          { required: true, message: "请输入证书名称", trigger: "change" },
        ],
        certificateType: [
          { required: true, message: "请选择证书类型", trigger: "change" },
        ],
        validTime: [
          { required: true, message: "请选择有效期", trigger: "change" },
        ],
        official: [
          { required: true, message: "请选择发证机关", trigger: "change" },
        ],
      },
    };
  },
  props: {
    dict: Object,
    default: {},
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增奖惩记录";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑奖惩记录";
        this.disabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看奖惩记录";
        this.disabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.disabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.form = {
        certificateType: "", //证书类型
        certificateName: "", //证书类型
        validTime: "", //有效期
        official: "", //发证机关
        describe: "", //描述
        trainCertificate: [], //附件
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
        // this.form = {
        //   certificateType: res.data.certificateType.key,
        //   certificateName: res.data.certificateName,
        //   validTime: res.data.validTime,
        //   official: res.data.official.key,
        //   describe: res.data.describe,
        //   trainCertificate: res.data.trainCertificate,
        // };
        this.form = res.data;
        this.form.official = res.data.official.key;
        this.form.certificateType = res.data.certificateType.key;
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
