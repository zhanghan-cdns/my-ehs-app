<template>
  <div>
    <basic-dialog
      icon=" icon-xinzengfabu"
      :title="'新增'+ title"
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
        >
          <el-row>
            <el-form-item label="会议主题" prop="targetTitle">
              <el-input
                placeholder="安全生产调度例会"
                v-model="form.targetTitle"
                :size="size"
                :isDisabled="isDisabled"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="会议开始时间">
                  <div class="block">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.value1"
                      type="datetime"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会议结束时间">
                  <div class="block">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.value2"
                      type="datetime"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="召集部门" prop="targetPlace">
                  <el-input
                    :size="size"
                    placeholder="公司（顶级）"
                    v-model="form.targetPlace"
                    :isDisabled="isDisabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主持人">
                  <el-select
                    clearable
                    filterable
                    placeholder="可输可选"
                    v-model="form.theme"
                    style="width: 100%"
                    :size="size"
                    :isDisabled="isDisabled"
                    @blur="selectBlur"
                    @change="selectChange"
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
              <el-col :span="12">
                <el-form-item label="参加部门" prop="targetSynergy">
                  <el-input
                    :size="size"
                    :isDisabled="isDisabled"
                    v-model="form.targetSynergy"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会议类型">
                  <el-select
                    clearable
                    placeholder="公司级"
                    v-model="form.year"
                    style="width: 100%"
                    :size="size"
                    :isDisabled="isDisabled"
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

            <el-form-item label="地点" prop="place">
              <el-input
                :size="size"
                :isDisabled="isDisabled"
                v-model="form.place"
              ></el-input>
            </el-form-item>
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
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        targetTitle: "",
        place: "",
          value1: "",
      value2: "",
      },
      rules: {
        targetTitle: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        place: [{ required: true, message: "此项为必填项", trigger: "blur" }],
      },
      rowData: {},
   
      theme: "",
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
      default: "安全活动会议信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    selectBlur(e) {
      // 意见类型
      if (e.target.form.theme !== "") {
        this.theme = e.target.form.theme + "(其他)";
        this.$forceUpdate(); // 强制更新
      }
    },
    selectChange(val) {
      this.form.theme = val;
      this.$forceUpdate();
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
      this.reset();
    },
    // 重置
    reset() {
       this.$nextTick(() => {
        this.$refs.formRef.resetFields();
        this.form = {};
      });
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
            // if (this.rowData.id) this.modify();
            // else this.add();
            console.log(this.form);
          console.log("success")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
// /deep/ .el-form-item {
//   margin-bottom: 20px !important;
// }
/deep/ .el-input--small .el-input__inner{
  height: 40px;
  line-height: 40px;
}
/deep/ .el-col{
  margin-bottom: 0;
}
/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
