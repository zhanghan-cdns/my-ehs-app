<template>
  <!-- 安全设施附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="safetyForm"
    :rules="safetyFormRules"
    ref="safetyFormRef"
    disabled
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="安全设施大类" prop="categories">
          <el-select
            clearable
            v-model="safetyForm.categories"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in categoriesList"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="安全设施小类" prop="smallClass">
          <el-select
            clearable
            v-model="safetyForm.smallClass"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in smallClassList.children"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="上传附件">
          <show-file :data="safetyForm.theAttachment"></show-file>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="备注" prop="remark">
          <el-input
            clearable
            v-model="safetyForm.remark"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import dictMixin from "@/mixins/dict";
import showFile from "@/components/show-file/index";

export default {
  mixins: [dictMixin],
  components: {
    showFile,
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      width: "260px",
      size: "small",
      safetyForm: {
        categories: "",
        smallClass: "",
        theAttachment: [],
        remark: "",
      },
      categoriesList: [],
      smallClassList: [],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_SAFETY_CATEGORIES", "categoriesList");
  },

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
  margin: 10px 0px;
  .form-title-icon {
    font-size: 26px;
    vertical-align: sub;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
