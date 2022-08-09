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
      <div class="form-title" v-if="isTitle">
        <i class="iconfont icon-qiyejibenxinxi form-title-icon"></i
        ><span class="form-title-name">规程信息</span>
      </div>
      <el-row>
        <el-col span="24">
          <el-form-item label="规程名称" prop="zdmc">
            <el-input
              placeholder="规程名称"
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
          <el-form-item label="规程编号" prop="zdbh">
            <el-input
              placeholder="规程编号"
              clearable
              v-model="form.zdbh"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="编制人" prop="dlb">
            <el-select
              clearable
              placeholder="编制人"
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
          <el-form-item label="下次评审日期" prop="psrq">
            <el-date-picker
              v-model="form.psrq"
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
          <el-form-item label="版本号" prop="fbjg">
            <el-input
              placeholder="版本号"
              clearable
              v-model="form.fbjg"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="规程摘要" prop="zy">
            <el-input
              type="textarea"
              :rows="12"
              clearable
              v-model="form.zy"
              :style="`width:${width2}`"
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
        <el-col span="12">
          <el-form-item label="编辑部门" prop="dlb">
            <el-select
              clearable
              placeholder="编辑部门"
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
          <el-form-item label="适用部门" prop="dlb">
            <el-select
              clearable
              placeholder="适用部门"
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
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              placeholder="/"
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

    isTitle: {
      type: Boolean,
      default() {
        return true;
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
      form: {},
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
