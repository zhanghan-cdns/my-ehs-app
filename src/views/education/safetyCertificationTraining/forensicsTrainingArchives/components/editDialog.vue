<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="85%"
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
          <el-form-item label="培训人员" prop="courseInfo.personId">
            <el-select
              v-model="form.courseInfo.personId"
              placeholder="请选择培训人员"
              style="width: 320px"
              :disabled="disabled"
              @change="selectChange($event, 'person')"
            >
              <el-option
                v-for="item in userList"
                :label="item.nickName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
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

          <el-form-item label="证书编号" prop="certificateNo">
            <el-input
              v-model="form.certificateNo"
              placeholder="请输入证书编号"
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
          <el-form-item label="最近培训时间" prop="latelyTime">
            <el-date-picker
              v-model="form.latelyTime"
              type="date"
              placeholder="请选择最近培训时间"
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
          <el-form-item label="作业类型" prop="taskType">
            <el-select
              v-model="form.taskType"
              placeholder="请选择作业类型"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSafetrainWorkType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下次培训时间" prop="nextTime">
            <el-date-picker
              v-model="form.nextTime"
              type="date"
              placeholder="请选择下次培训时间"
              style="width: 320px"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="证书描述">
            <el-input
              v-model="form.describe"
              placeholder="请输入证书描述"
              :disabled="disabled"
              style="width: 820px"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传课件" style="width: 800px">
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
  getDetailAPI,
  updateAPI,
} from "@/api/education/safetyCertificationTraining/forensicsTrainingArchives";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  data() {
    return {
      courseList: [],
      title: "",
      icon: "",
      openFlag: false,
      disabled: false,
      editId: "",
      form: {
        courseInfo: {
          personName: "",
          personId: "",
          jobId: "",
          jobName: "",
        },
        certificateType: "",
        certificateName: "",
        certificateNo: "",
        validTime: "",
        latelyTime: "",
        official: "",
        taskType: "",
        nextTime: "",
        describe: "",
        trainCertificate: [],
      },
      rules: {
        "courseInfo.personId": [
          { required: true, message: "请选择培训人员", trigger: "change" },
        ],
        latelyTime: [
          { required: true, message: "请选择最近培训时间", trigger: "change" },
        ],
        official: [
          { required: true, message: "请选择发证机关", trigger: "change" },
        ],
      },
    };
  },
  props: {
    dict: Object,
    userList: Array,
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增取证培训档案";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑取证培训档案";
        this.disabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看取证培训档案";
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
        courseInfo: {
          personName: "",
          personId: "",
          jobId: "",
          jobName: "",
        },
        certificateType: "",
        certificateName: "",
        certificateNo: "",
        validTime: "",
        latelyTime: "",
        official: "",
        taskType: "",
        nextTime: "",
        describe: "",
        trainCertificate: [],
      };
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
        this.form.certificateType = res.data.certificateType.key;
        this.form.official = res.data.official.key;
        this.form.taskType = res.data.taskType.key;
      }
    },
    // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    // 删除课件
    onRemove(index) {
      this.form[params].splice(index, 1);
    },
    selectChange(data, type) {
      if (type === "person") {
        // 培训人员
        this.userList.map((item) => {
          console.log(item, data);
          if (item.id === data) {
            this.form.courseInfo.personName = item.nickName;
            this.form.courseInfo.personId = item.id;
            this.form.courseInfo.jobId = item.job.id;
            this.form.courseInfo.jobName = item.job.jobName;
          }
        });
      }
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
