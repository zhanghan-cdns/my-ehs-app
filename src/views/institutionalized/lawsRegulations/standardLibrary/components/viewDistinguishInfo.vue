<template>
  <div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
      disabled
    >
      <div class="form-title">
        <i class="iconfont icon-jichuxinxi1 form-title-icon"></i
        ><span class="form-title-name">识别信息</span>
      </div>
      <el-row>
        <el-col span="12">
          <el-form-item label="合规性评估" prop="hgxpg">
            <el-input
              clearable
              v-model="form.remark"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="识别人员" prop="sytk">
            <el-input
              clearable
              v-model="form.remark"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="识别日期" prop="ssrq">
            <el-date-picker
              v-model="form.ssrq"
              type="date"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="识别部门" prop="sytk">
            <el-input
              clearable
              v-model="form.remark"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="适用条款" prop="sytk">
            <el-input
              placeholder="/"
              clearable
              v-model="form.sytk"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="条款内容" prop="tknr">
            <el-input
              placeholder="/"
              type="textarea"
              :rows="2"
              clearable
              v-model="form.tknr"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="差异性" prop="cyx">
            <el-input
              placeholder="/"
              type="textarea"
              :rows="2"
              clearable
              v-model="form.cyx"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              placeholder="备注"
              clearable
              v-model="form.remark"
              :style="`width:${width2}`"
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
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  components: {},

  data() {
    return {
      icon: "icon-bianji",
      openEdit: false,
      width: "302px",
      width2: "91%",
      size: "small",
      form: {
        flfgmc: "",
        dlb: "",
        xlb: "",
        fbjg: "",
        fgbh: "",
        fbrq: "",
        qyrq: "",
        fzrq: "",
        fcrq: "",
        file: [],
        zy: "",
        remark: "",
      },
      rules: {},
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}

.form-title {
  margin: 30px 72px;
  .form-title-icon {
    font-size: 20px;
    color: #0a8def;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 11px;
  }
}
</style>
