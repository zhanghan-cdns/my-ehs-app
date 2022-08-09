<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="460px"
      height="450px"
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
          <el-form-item label="岗位" prop="post.id">
            <el-select
              v-model="form.post.id"
              placeholder="请选择岗位"
              style="width: 280px"
              :disabled="disabled"
              @change="selectChange"
            >
              <el-option
                v-for="item in jobList"
                :label="item.job_name"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书类型" prop="credentialsType">
            <el-select
              v-model="form.credentialsType"
              placeholder="请选择证书类型"
              style="width: 280px"
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
          <el-form-item label="数量" prop="number">
            <el-input
              v-model="form.number"
              placeholder="请输入证书数量"
              style="width: 280px"
              :disabled="disabled"
              type="number"
            ></el-input>
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
  getJobOptionAPI,
} from "@/api/education/safetyCertificationTraining/certificateQuantityComparison";
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
        post: {},
        credentialsType: "",
        number: "",
      },
      rules: {
        "post.id": [{ required: true, message: "请选择岗位", trigger: "change" }],
        credentialsType: [
          { required: true, message: "请选择证书类型", trigger: "change" },
        ],
        number: [
          { required: true, message: "请输入证书数量", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dict: Object,
  },
  mounted() {
    this.getJobOption();
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
      this.form={
        post: {},
        credentialsType: "",
        number: "",
      },
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
        this.form=res.data;
        this.form = res.data;
        this.form.credentialsType = res.data.credentialsType.key;
        this.form.post.id=Number(this.form.post.id);
      }
    },
    // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除课件
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    selectChange(data) {
      console.log(data)
      this.jobList.map((item) => {
        console.log(item)
        if (item.id === data) {
          this.form.post.jobName = item.job_name;
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
        this.jobList = res.data;
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
