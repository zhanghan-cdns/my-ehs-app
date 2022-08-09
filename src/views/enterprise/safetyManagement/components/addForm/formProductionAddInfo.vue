<template>
  <!-- 生产设备附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="productionForm"
    :rules="productionFormRules"
    ref="productionFormRef"
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="设备类别" prop="equipmentCategory">
          <el-select
            placeholder="设备类别"
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
            placeholder="主要技术参数"
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
            placeholder="介质"
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
            placeholder="涉及工艺设施"
            clearable
            v-model="productionForm.involveContent"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="所属工艺" prop="processName">
          <el-select
            placeholder="所属工艺"
            clearable
            v-model="productionForm.processInfo.processName"
            :style="`width:${width}`"
            :size="size"
            @change="processSelectChange"
          >
            <el-option
              v-for="item in processInfoList"
              :key="item.id"
              :value="
                item.id +
                ',' +
                item.processCode +
                ',' +
                item.productionProcessName.value
              "
              :label="item.productionProcessName.value"
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
            :photos="productionForm.theAttachment"
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
import { processInfoListAPI } from "@/api/enterprise/safetyManagement/productionEquipment";

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
      productionForm: {
        equipmentCategory: "",
        technicalParameters: "",
        medium: "",
        involveContent: "",
        theAttachment: [],
        remark: "",
        processId: "",
        processInfo: {
          processId: "",
          processCode: "",
          processName: "",
        },
      },
      productionFormRules: {
        equipmentCategory: [
          { required: true, trigger: "change", message: "请选择设备类别" },
        ],
      },
      equipmentCategoryList: [],
      processInfoList: [],
    };
  },

  created() {
    this.getDicMap("ENT_CLASSIFY_PRODUCTION_CATEGORY", "equipmentCategoryList");
    this.getProcessInfoList();
  },

  methods: {
    // 上传附件成功
    onSuccess(fileList, params) {
      this.productionForm[params] = fileList;
    },
    // 上传附件失败
    onRemove(fileList, params) {
      this.productionForm[params] = fileList;
    },

    // 工艺选择
    processSelectChange(val) {
      console.log(val);
      const valArr = val.split(",");
      console.log(valArr, "valarr");
      this.productionForm.processId = valArr[0];
      this.productionForm.processInfo.processId = valArr[0];
      this.productionForm.processInfo.processCode = valArr[1];
      this.productionForm.processInfo.processName = valArr[2];
    },

    // 获取所属工艺列表
    async getProcessInfoList() {
      const res = await processInfoListAPI();
      if (res && res.code === 200) {
        this.processInfoList = res.data;
      }
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
