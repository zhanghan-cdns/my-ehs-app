<template>
  <!-- 生产设备附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="productionForm"
    :rules="productionFormRules"
    ref="productionFormRef"
    disabled
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="设备类别" prop="equipmentCategory">
          <el-select
            clearable
            v-model="productionForm.equipmentCategory"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in equipmentCategoryList"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="主要技术参数" prop="technicalParameters">
          <el-input
            clearable
            v-model="productionForm.technicalParameters"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="介质" prop="medium">
          <el-input
            clearable
            v-model="productionForm.medium"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="涉及工艺设施" prop="involveContent">
          <el-input
            clearable
            v-model="productionForm.involveContent"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="上传附件">
          <show-file :data="productionForm.theAttachment"></show-file>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="备注" prop="remark">
          <el-input
            clearable
            v-model="productionForm.remark"
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
      productionForm: {
        equipmentCategory: "",
        technicalParameters: "",
        medium: "",
        involveContent: "",
        theAttachment: [],
        remark: "",
      },
      equipmentCategoryList: [],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_PRODUCTION_CATEGORY", "equipmentCategoryList");
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
