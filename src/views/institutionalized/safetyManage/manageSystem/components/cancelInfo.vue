<template>
  <div style="margin-top: 15px">
    <el-form
      label-width="100px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
      disabled
    >
      <el-row>
        <el-col span="24">
          <el-form-item label="制度名称" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="制度编号" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="版本号" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作废人" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="作废日期" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="作废原因" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="备注" prop="zdmc">
            <el-input
              clearable
              v-model="form.zdmc"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    selectRowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      icon: "icon-bianji",
      openEdit: false,
      width: "88%",
      width2: "95%",
      size: "small",
      form: {},
      rules: {},
    };
  },

  watch: {
    selectRowData: function (val) {
      console.log(val, "cancel");
      this.getFormData(val);
    },
  },

  created() {
    this.getFormData(this.selectRowData);
  },

  methods: {
    getFormData(data) {},
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
