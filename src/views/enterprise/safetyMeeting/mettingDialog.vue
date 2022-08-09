<template>
  <div>
    <basic-dialog
      icon="
        icon-xinzengfabu
      "
      :title="'新增' + title"
      width="850px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          :model="form"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
          ref="formRef"
        >
          <el-form-item label="会议记录">
            <el-input v-model="form.minute" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="会议督办事项" prop="meetingSupervision">
            <el-input
              v-model="form.meetingSupervision"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="会议文件" prop="documentation">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <!-- <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="记录人" prop="Recorder">
            <el-input v-model="form.Recorder"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()">保存 </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
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
} from "@/api/duty/duty_standard_provide";

export default {
  name: "mettingDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      rowData: {},
      value1: "",
      value2: "",
      theme: "",
      form: [],
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
      default: "安全活动会议纪要",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    submitForm() {
      console.log(this.form);
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      // this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
  },
};
</script>

<style scoped lang="scss">
// /deep/ .el-form-item {
//   margin-bottom: 20px !important;
// }

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-upload-dragger .el-upload__text {
  margin-top: -40px;
}
/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 0.8em 4em;
}
</style>
