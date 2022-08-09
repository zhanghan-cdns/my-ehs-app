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
        ><span class="form-title-name">法律法规信息</span>
      </div>
      <el-row>
        <el-col span="24">
          <el-form-item label="法律法规名称" prop="flfgmc">
            <el-input
              placeholder="法律法规名称"
              clearable
              v-model="form.flfgmc"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="大类别" prop="dlb">
            <el-select
              placeholder="大类别"
              clearable
              v-model="form.dlb"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in dictConfig.dlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="小类别" prop="xlb">
            <el-select
              placeholder="小类别"
              clearable
              v-model="form.xlb"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in dictConfig.xlbList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="发布机构" prop="fbjg">
            <el-input
              placeholder="发布机构"
              clearable
              v-model="form.fbjg"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="法规编号" prop="fgbh">
            <el-input
              placeholder="法规编号"
              clearable
              v-model="form.fgbh"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="发布日期" prop="fbrq">
            <el-date-picker
              v-model="form.fbrq"
              type="date"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="启用日期" prop="qyrq">
            <el-date-picker
              v-model="form.qyrq"
              type="date"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="废止日期" prop="fzrq">
            <el-date-picker
              v-model="form.fzrq"
              type="date"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="复查日期" prop="fcrq">
            <el-date-picker
              v-model="form.fcrq"
              type="date"
              value-format="yyyy-MM-dd"
              :style="`width:${width}`"
              :size="size"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="强制程度" prop="qzcd">
            <el-input
              clearable
              v-model="form.qzcd"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="先行法规" prop="xxfg">
            <el-input
              clearable
              v-model="form.xxfg"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="附件">
            <show-file :data="form.file"></show-file>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="摘要" prop="zy">
            <el-input
              type="textarea"
              :rows="2"
              clearable
              v-model="form.zy"
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
import showFile from "@/components/show-file/index";
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  components: {
    showFile,
  },

  data() {
    return {
      icon: "icon-bianji",
      openEdit: false,
      width: "79%",
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
