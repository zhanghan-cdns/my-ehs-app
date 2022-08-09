<template>
  <!-- 基础信息表单 -->
  <div>
    <el-form
      label-width="140px"
      label-position="right"
      :model="baseForm"
      :rules="rules"
      ref="baseFormRef"
    >
      <div class="form-title">
        <i class="iconfont icon-jichuxinxi1 form-title-icon"></i
        ><span class="form-title-name">安全设备设施基本信息</span>
      </div>
      <el-row>
        <el-col span="12">
          <el-form-item label="装置设施名称" prop="facilityName">
            <el-input
              placeholder="装置设施名称"
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
              placeholder="装置设施类型"
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
              placeholder="装置设施位号"
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
              placeholder="装置设施型号"
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
              placeholder="装置设施用途"
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
              placeholder="所属区域"
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
              placeholder="使用部门"
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
              placeholder="设置部位"
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
              placeholder="选择生产日期"
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
              placeholder="生产厂家"
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
              placeholder="使用期限（年）"
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
              placeholder="生命周期"
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
              placeholder="选择投用日期"
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
              placeholder="数量"
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
              placeholder="维修状态"
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
              placeholder="停用状态"
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
              placeholder="保养周期"
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
              placeholder="检查周期"
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
              placeholder="检查提前提醒"
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
              placeholder="检测周期"
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
              placeholder="检测提前提醒"
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
              placeholder="上次检查日期"
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
              placeholder="上次检测日期"
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
              placeholder="上次保养日期"
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
              placeholder="下次检查日期"
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
              placeholder="下次检测日期"
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
              placeholder="下次保养日期"
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
              placeholder="负责人"
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
              placeholder="负责人部门"
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
              placeholder="供应商"
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
              placeholder="使用说明"
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
              placeholder="经度"
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
              placeholder="纬度"
              clearable
              v-model="baseForm.latitude"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="">
            <el-button type="success" size="mini" @click="pickerMap"
              >定位</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="现场照片" prop="scenePhotos">
            <basic-upload
              key="picture"
              @onSuccess="(fileList) => onSuccess(fileList, 'scenePhotos')"
              @onRemove="(fileList) => onRemove(fileList, 'scenePhotos')"
              :photos="baseForm.scenePhotos"
            ></basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="22">
          <el-form-item label="绑定二维码" prop="qrCode">
            <el-input
              placeholder="绑定二维码"
              clearable
              v-model="baseForm.qrCode"
              style="width: 98.5%"
              :size="size"
              disabled
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
              placeholder="备注"
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
    <dialog-picker ref="pickerDialogRef" @getPoint="getPoint"></dialog-picker>
  </div>
</template>
<script>
import dictMixin from "@/mixins/dict";
import dialogPicker from "@/components/mars3d-earth/editor/dialog-picker.vue";
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

  components: {
    dialogPicker,
  },

  data() {
    return {
      width: "260px",
      size: "small",
      baseForm: {
        facilityName: "",
        scenePhotos: [],
        menuDifferent: "",
        facilityPurpose: "",
        facilityModel: "",
        typeForeignKey: "",
        facilityPosition: "",
        productDate: "",
        useLife: "",
        manufacturer: "",
        lifeCycle: "",
        commissionDate: "",
        repairDate: "",
        number: "",
        maintenanceStatus: "",
        deactivateStatus: "",
        lastCheckDate: "",
        lastTestDate: "",
        lastMaintenanceDate: "",
        nextCheckDate: "",
        nextTestDate: "",
        nextMaintenanceDate: "",
        chargePerson: "",
        chargeDept: "",
        supplier: "",
        instructions: "",
        latitude: "",
        longitude: "",
        maintenanceCycle: "",
        checkCycle: "",
        checkEarlyRemind: "",
        testCycle: "",
        testEarlyRemind: "",
        qrCode: [],
        remark: "",
      },
      rules: {
        facilityName: [
          { required: true, message: "请输入装置设施名称", trigger: "blur" },
        ],
        menuDifferent: [
          { required: true, message: "请选择装置设施类型", trigger: "change" },
        ],
        facilityPurpose: [
          { required: true, message: "请输入装置设施位号", trigger: "blur" },
        ],
        facilityModel: [
          { required: true, message: "请输入装置设施用途", trigger: "blur" },
        ],
        typeForeignKey: [
          { required: true, message: "请输入装置设施型号", trigger: "blur" },
        ],
        facilityPosition: [
          { required: true, message: "请选择使用部门", trigger: "change" },
        ],
        productDate: [
          { required: true, message: "请输入设置部位", trigger: "blur" },
        ],
        useLife: [
          { required: true, message: "请选择生产日期", trigger: "change" },
        ],
        manufacturer: [
          { required: true, message: "请输入生产厂家", trigger: "blur" },
        ],
        lifeCycle: [
          { required: true, message: "请输入使用期限(年)", trigger: "blur" },
        ],
        commissionDate: [
          { required: true, message: "请选择生命周期", trigger: "change" },
        ],
        repairDate: [
          { required: true, message: "请选择投用日期", trigger: "change" },
        ],
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        maintenanceStatus: [
          { required: true, message: "请选择维修状态", trigger: "change" },
        ],
        deactivateStatus: [
          { required: true, message: "请选择停用状态", trigger: "change" },
        ],
        lastCheckDate: [
          { required: true, message: "请选择上次检查日期", trigger: "change" },
        ],
        lastTestDate: [
          { required: true, message: "请选择上次检测日期", trigger: "change" },
        ],
        lastMaintenanceDate: [
          { required: true, message: "请选择上次保养日期", trigger: "change" },
        ],
        nextCheckDate: [
          { required: true, message: "请选择下次检查日期", trigger: "change" },
        ],
        nextTestDate: [
          { required: true, message: "请选择下次检测日期", trigger: "change" },
        ],
        nextMaintenanceDate: [
          { required: true, message: "请选择下次保养日期", trigger: "change" },
        ],
        chargePerson: [
          { required: true, message: "请输入负责人", trigger: "blur" },
        ],
        chargeDept: [
          { required: true, message: "请选择复制人部门", trigger: "change" },
        ],
        supplier: [
          { required: true, message: "请输入供应商", trigger: "blur" },
        ],
        instructions: [
          { required: true, message: "请输入使用说明", trigger: "blur" },
        ],
        scenePhotos: [
          { required: true, message: "请上传现场照片", trigger: "change" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
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
      position: {},
    };
  },

  created() {
    this.getDicMap("ENT_BASE_MENU_DIFFERENT", "menuDifferentList");
  },

  watch: {
    "baseForm.latitude": {
      handler(newVal) {
        this.baseForm.latitude = newVal;
      },
      deep: true,
    },
  },

  methods: {
    // 上传图片成功
    onSuccess(fileList, params) {
      this.baseForm[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.baseForm[params] = fileList;
    },
    pickerMap() {
      this.$refs.pickerDialogRef.open();
    },
    getPoint(position) {
      this.position = position;
      console.log(position, "position");
      if (position._lat && position._lng) {
        this.baseForm.latitude = position._lat;
        this.baseForm.longitude = position._lng;
        console.log(this.baseForm, "baseform");
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
