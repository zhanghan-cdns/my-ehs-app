<template>
  <!-- 基础信息表单 -->
  <div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="baseForm"
      :rules="rules"
      ref="baseInfoRef"
      disabled
    >
      <div class="form-title">
        <i class="iconfont icon-jichuxinxi1 form-title-icon"></i
        ><span class="form-title-name">安全设备设施基本信息</span>
      </div>
      <el-row>
        <el-col span="12">
          <el-form-item label="装置设施名称" prop="facilityName">
            <el-input
              clearable
              v-model="baseForm.facilityName"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="装置设施类型" prop="menuDifferent">
            <el-select
              clearable
              v-model="baseForm.menuDifferent"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in menuDifferentList"
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
          <el-form-item label="装置设施位号" prop="facilityPurpose">
            <el-input
              clearable
              v-model="baseForm.facilityPurpose"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="装置设施型号" prop="typeForeignKey">
            <el-input
              clearable
              v-model="baseForm.typeForeignKey"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="装置设施用途" prop="facilityModel">
            <el-input
              clearable
              v-model="baseForm.facilityModel"
              type="textarea"
              :rows="4"
              style="width: 98.5%"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="所属区域" prop="region">
            <el-select
              clearable
              v-model="baseForm.region"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in dictConfig.entAccidentType"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="使用部门" prop="facilityPosition">
            <el-select
              clearable
              v-model="baseForm.facilityPosition"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in facilityPositionList"
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
          <el-form-item label="设置部位" prop="productDate">
            <el-input
              clearable
              v-model="baseForm.productDate"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="生产日期" prop="useLife">
            <el-date-picker
              v-model="baseForm.useLife"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="生产厂家" prop="manufacturer">
            <el-input
              clearable
              v-model="baseForm.manufacturer"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="使用期限（年）" prop="lifeCycle">
            <el-input-number
              clearable
              v-model="baseForm.lifeCycle"
              :style="`width:${width}`"
              :size="size"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="生命周期" prop="commissionDate">
            <el-select
              clearable
              v-model="baseForm.commissionDate"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in commissionDateList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="投用日期" prop="repairDate">
            <el-date-picker
              v-model="baseForm.repairDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="数量" prop="number">
            <el-input-number
              clearable
              v-model="baseForm.number"
              :style="`width:${width}`"
              :size="size"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="维修状态" prop="maintenanceStatus">
            <el-select
              clearable
              v-model="baseForm.maintenanceStatus"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in maintenanceStatusList"
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
          <el-form-item label="停用状态" prop="deactivateStatus">
            <el-select
              clearable
              v-model="baseForm.deactivateStatus"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in deactivateStatusList"
                :key="item.id"
                :value="item.dictValue"
                :label="item.dictValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="保养周期" prop="maintenanceCycle">
            <el-input
              clearable
              v-model="baseForm.maintenanceCycle"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="检查周期" prop="checkCycle">
            <el-input
              clearable
              v-model="baseForm.checkCycle"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="检查提前提醒" prop="checkEarlyRemind">
            <el-input
              clearable
              v-model="baseForm.checkEarlyRemind"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="检测周期" prop="testCycle">
            <el-input
              clearable
              v-model="baseForm.testCycle"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="检测提前提醒" prop="testEarlyRemind">
            <el-input
              clearable
              v-model="baseForm.testEarlyRemind"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="上次检查日期" prop="lastCheckDate">
            <el-date-picker
              v-model="baseForm.lastCheckDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="上次检测日期" prop="lastTestDate">
            <el-date-picker
              v-model="baseForm.lastTestDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="上次保养日期" prop="lastMaintenanceDate">
            <el-date-picker
              v-model="baseForm.lastMaintenanceDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="下次检查日期" prop="nextCheckDate">
            <el-date-picker
              v-model="baseForm.nextCheckDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="下次检测日期" prop="nextTestDate">
            <el-date-picker
              v-model="baseForm.nextTestDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="下次保养日期" prop="nextMaintenanceDate">
            <el-date-picker
              v-model="baseForm.nextMaintenanceDate"
              type="date"
              :style="`width:${width}`"
              :size="size"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="负责人" prop="chargePerson">
            <el-input
              clearable
              v-model="baseForm.chargePerson"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="负责人部门" prop="chargeDept">
            <el-select
              clearable
              v-model="baseForm.chargeDept"
              :style="`width:${width}`"
              :size="size"
            >
              <el-option
                v-for="item in chargeDeptList"
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
          <el-form-item label="供应商" prop="supplier">
            <el-input
              clearable
              v-model="baseForm.supplier"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="使用说明" prop="instructions">
            <el-input
              clearable
              v-model="baseForm.instructions"
              type="textarea"
              :rows="4"
              style="width: 98.5%"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="经度" prop="longitude">
            <el-input
              clearable
              v-model="baseForm.longitude"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="纬度" prop="latitude">
            <el-input
              clearable
              v-model="baseForm.latitude"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="现场照片">
            <el-image
              v-for="item in baseForm.scenePhotos"
              :key="item.url"
              style="width: 100px; height: 100px"
              :src="imgUrl + item.url"
              :preview-src-list="[imgUrl + item.url]"
            ></el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="22">
          <el-form-item label="绑定二维码" prop="qrCode">
            <el-input
              clearable
              v-model="baseForm.qrCode"
              style="width: 98.5%"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" size="mini" style="margin-top: 6px"
          >绑定</el-button
        >
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注" prop="remark">
            <el-input
              clearable
              v-model="baseForm.remark"
              type="textarea"
              :rows="4"
              style="width: 98.5%"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";

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
      imgUrl,
      width: "260px",
      size: "small",
      baseForm: {
        scenePhotos: [],
      },
      rowData: {},
      commissionDateList: [
        {
          id: 1,
          dictValue: 1,
          dictValueName: "已投用",
        },
        {
          id: 1,
          dictValue: 2,
          dictValueName: "报废",
        },
      ],
      maintenanceStatusList: [
        {
          id: 1,
          dictValue: 1,
          dictValueName: "完好",
        },
        {
          id: 2,
          dictValue: 2,
          dictValueName: "维修中",
        },
      ],
      deactivateStatusList: [
        {
          id: 1,
          dictValue: 0,
          dictValueName: "停用",
        },
        {
          id: 2,
          dictValue: 1,
          dictValueName: "在用",
        },
      ],
      menuDifferentList: [],
      facilityPositionList: [
        {
          id: 1,
          dictValue: "测试部门",
          dictValueName: "测试部门",
        },
      ],
      chargeDeptList: [
        {
          id: 1,
          dictValue: "测试负责人部门",
          dictValueName: "测试负责人部门",
        },
      ],
    };
  },

  created() {
    this.getDicMap("ENT_BASE_MENU_DIFFERENT", "menuDifferentList");
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
    font-size: 22px;
    vertical-align: sub;
  }
  .form-title-name {
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
