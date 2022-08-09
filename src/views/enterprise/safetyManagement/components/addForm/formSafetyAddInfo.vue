<template>
  <!-- 安全设施附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="safetyForm"
    :rules="safetyFormRules"
    ref="safetyFormRef"
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="安全设施大类" prop="categories">
          <el-select
            placeholder="安全设施大类"
            clearable
            v-model="safetyForm.categories"
            :style="`width:${width}`"
            :size="size"
            @change="onSelectChange"
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
            placeholder="安全设施小类"
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
          <basic-upload
            key="file"
            :model="true"
            @onSuccess="(fileList) => onSuccess(fileList, 'theAttachment')"
            @onRemove="(fileList) => onRemove(fileList, 'theAttachment')"
            :photos="safetyForm.theAttachment"
          ></basic-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="备注" prop="remark">
          <el-input
            placeholder="备注"
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

export default {
  mixins: [dictMixin],

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
      safetyFormRules: {
        categories: [
          { required: true, trigger: "change", message: "请选择安全设施大类" },
        ],
        smallClass: [
          { required: true, trigger: "change", message: "请选择安全设施小类" },
        ],
      },
      categoriesList: [],
      smallClassList: [],
      smallClassListKey: [],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_SAFETY_CATEGORIES", "categoriesList");
  },

  watch: {
    smallClassListKey: function (newVal) {
      console.log(newVal, "val");
      this.getDicMap(newVal, "smallClassList");
    },
  },

  methods: {
    onSelectChange(value) {
      this.safetyForm.smallClass = "";
      this.smallClassListKey = value;
      this.getDicMap(this.smallClassListKey, "smallClassList");
    },

    // 上传附件成功
    onSuccess(fileList, params) {
      this.safetyForm[params] = fileList;
    },
    // 上传附件失败
    onRemove(fileList, params) {
      this.safetyForm[params] = fileList;
    },
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
