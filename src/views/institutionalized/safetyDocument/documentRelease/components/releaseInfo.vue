<template>
  <div>
    <div class="form-title">
      <i class="iconfont icon-bianji form-title-icon"></i
      ><span class="form-title-name">文件发布信息</span>
    </div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
      disabled
    >
      <el-row>
        <el-col span="24">
          <el-form-item label="文件编号" prop="wjbh">
            <el-select
              clearable
              placeholder="文件编号"
              v-model="form.wjbh"
              :style="`width:${width2}`"
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
          <el-form-item label="文件名称" prop="wjmc">
            <el-input
              placeholder="文件名称"
              clearable
              v-model="form.wjmc"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="类别" prop="dlb">
            <el-select
              clearable
              placeholder="类别"
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
          <el-form-item label="性质" prop="dlb">
            <el-select
              clearable
              placeholder="性质"
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
          <el-form-item label="发送部门" prop="fsbm">
            <el-select
              clearable
              placeholder="发送部门"
              v-model="form.fsbm"
              :style="`width:${width2}`"
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
          <el-form-item label="文件内容" prop="zy">
            <el-input
              type="textarea"
              :rows="10"
              clearable
              v-model="form.zy"
              :style="`width:${width2}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="附件">
            <show-file :data="form.file"></show-file>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="发布人" prop="remark">
            <el-input
              clearable
              v-model="form.remark"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="发布时间" prop="psrq">
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
