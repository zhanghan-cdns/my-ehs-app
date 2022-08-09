<template>
  <!-- 储罐附加信息表单 -->
  <el-form
    label-width="140px"
    label-position="right"
    :model="storageForm"
    :rules="storageFormRules"
    ref="storageFormRef"
    disabled
  >
    <div class="form-title">
      <i class="iconfont icon-gongcheng form-title-icon"></i
      ><span class="form-title-name">安全设备设施附加信息</span>
    </div>
    <el-row>
      <el-col span="12">
        <el-form-item label="所属罐区或装置" prop="tankFarmDevice">
          <el-select
            placeholder="所属罐区或装置"
            clearable
            v-model="tankFarmDevice"
            :style="`width:${width}`"
            :size="size"
            @change="onSelectChange1"
          >
            <el-option
              v-for="item in tankFarmDeviceList"
              :key="item.id"
              :value="item.id"
              :label="item.storageName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="所属危险化学品重大危险源单元" prop="majHazUnit">
          <el-input
            clearable
            v-model="storageForm.majHazUnit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="储罐容积" prop="storageVolume">
          <el-input
            clearable
            v-model="storageForm.storageVolume"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="储罐形式" prop="storageForm">
          <el-select
            clearable
            v-model="storageForm.storageForm"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in storageFormList"
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
        <el-form-item label="储罐结构" prop="storageStructure">
          <el-select
            clearable
            v-model="storageForm.storageStructure"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in storageStructureList"
              :key="item.id"
              :value="item.dictValue"
              :label="item.dictValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="储罐位置分类" prop="locationCla">
          <el-select
            clearable
            v-model="storageForm.locationCla"
            :style="`width:${width}`"
            :size="size"
          >
            <el-option
              v-for="item in locationClaList"
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
        <el-form-item label="存储物料名称" prop="storageMedium">
          <el-select
            placeholder="存储物料名称"
            clearable
            v-model="storageMedium"
            :style="`width:${width}`"
            :size="size"
            @change="onSelectChange2"
          >
            <el-option
              v-for="item in storageMediumList"
              :key="item.id"
              :value="item.id"
              :label="item.materialName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="CAS" prop="casNumber">
          <el-input
            placeholder="危险货物编号"
            clearable
            v-model="casNumber"
            :style="`width:${width}`"
            :size="size"
            disabled
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="危险货物编号" prop="danGooNumber">
          <el-input
            placeholder="危险货物编号"
            clearable
            v-model="storageForm.danGooNumber"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="物质状态" prop="materialState">
          <el-select
            placeholder="物质状态"
            clearable
            v-model="materialState"
            :style="`width:${width}`"
            :size="size"
            disabled
          >
            <el-option
              v-for="item in materialStateList"
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
        <el-form-item label="危化品类别" prop="subCategory">
          <el-select
            placeholder="危化品类别"
            clearable
            v-model="subCategory"
            :style="`width:${width}`"
            :size="size"
            disabled
          >
            <el-option
              v-for="item in subCategoryList"
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
        <el-form-item label="设计储量" prop="designReserves">
          <el-input
            clearable
            v-model="storageForm.designReserves"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设计压力" prop="designPressure">
          <el-input
            clearable
            v-model="storageForm.designPressure"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="操作压力上限" prop="opePreLimit">
          <el-input
            clearable
            v-model="storageForm.opePreLimit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="操作温度上限" prop="opeTemLimit">
          <el-input
            clearable
            v-model="storageForm.opeTemLimit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="实际操作压力" prop="actOpePressure">
          <el-input
            clearable
            v-model="storageForm.actOpePressure"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="实际操作温度" prop="actOpeTem">
          <el-input
            clearable
            v-model="storageForm.actOpeTem"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="工作温度区间" prop="worTemRange">
          <el-input
            clearable
            v-model="storageForm.worTemRange"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="设计液位高度" prop="desLiqLevHei">
          <el-input
            clearable
            v-model="storageForm.desLiqLevHei"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="投产日期" prop="proDate">
          <el-input
            clearable
            v-model="storageForm.proDate"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="进出料方式" prop="matInOutWay">
          <el-input
            clearable
            v-model="storageForm.matInOutWay"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <el-form-item label="有无围堰" prop="cofferdam">
          <el-radio-group v-model="storageForm.cofferdam">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item prop="cofMeasure" v-if="storageForm.cofferdam === 1">
          <el-input
            clearable
            v-model="storageForm.cofMeasure"
            :style="`width:${width}`"
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
            v-model="storageForm.remark"
            type="textarea"
            :rows="1"
            style="width: 98.5%"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import dictMixin from "@/mixins/dict";
import { tankFarmListAllAPI } from "@/api/enterprise/tankFarm/index";
import {
  materialsListAllAPI,
  materialsViewAPI,
} from "@/api/enterprise/materials/index";

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
      // 这几个变量不传
      tankFarmDevice: "",
      storageMedium: "",
      casNumber: "",
      materialState: "",
      subCategory: "",
      storageForm: {
        majHazUnit: "",
        storageVolume: "",
        storageForm: "",
        storageStructure: "",
        locationCla: "",
        danGooNumber: "",
        designReserves: "",
        designPressure: "",
        opePreLimit: "",
        opeTemLimit: "",
        actOpePressure: "",
        actOpeTem: "",
        worTemRange: "",
        desLiqLevHei: "",
        proDate: "",
        matInOutWay: "",
        cofMeasure: "",
        cofferdam: 1,
        remark: "",
        tankFarmId: "", // 储罐id
        materialId: "", // 物料id
      },
      tankFarmDeviceList: [],
      storageMediumList: [],
      storageFormList: [],
      storageStructureList: [],
      locationClaList: [],
      materialStateList: [],
      subCategoryList: [],
    };
  },

  created() {
    this.getTankFarmDeviceList();
    this.getStorageMediumList();
    this.getDicMap("ENT_CLASSIFY_STORAGE_FORM", "storageFormList");
    this.getDicMap("ENT_CLASSIFY_STORAGE_STRUCTURE", "storageStructureList");
    this.getDicMap("ENT_CLASSIFY_STORAGE_LOCATIONCLA", "locationClaList");
    this.getDicMap("ENT_MATERIAL_FORM", "materialStateList");
    this.getDicMap("ENT_CATEGORY", "subCategoryList");
  },

  methods: {
    // 获取储罐列表
    async getTankFarmDeviceList() {
      const res = await tankFarmListAllAPI();
      if (res && res.code === 200) {
        this.tankFarmDeviceList = res.data;
      }
    },

    // 获取物料列表
    async getStorageMediumList() {
      const res = await materialsListAllAPI();
      if (res && res.code === 200) {
        this.storageMediumList = res.data;
      }
    },

    onSelectChange(value) {
      console.log(value, "value");
      this.getStorageMediumInfo(value);
    },

    // 获取选择物料信息
    async getStorageMediumInfo(id) {
      const res = await materialsViewAPI({ id });
      if (res && res.code === 200) {
        this.storageForm.casNumber = res.data.casNumber;
        this.storageForm.materialState = res.data.materialForm
          ? res.data.materialForm.key
          : "";
        this.storageForm.subCategory = res.data.category
          ? res.data.category.key
          : "";
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
