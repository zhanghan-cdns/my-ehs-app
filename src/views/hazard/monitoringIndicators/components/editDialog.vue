<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="900px"
      height="88%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-col span="12">
              <el-form-item
                label="设备位号/编码"
                prop="equipCode.facilitypurpose"
              >
                <el-select
                  ref="selectEquipCodeRef"
                  placeholder="设备位号/编码"
                  clearable
                  v-model="form.equipCode.facilitypurpose"
                  :style="`width:${width}`"
                  :size="size"
                  @change="handleEquipCodeSelect"
                >
                  <el-option
                    v-for="item in equipCodeList"
                    :key="item.id"
                    :value="item.id + ',' + item.facilitypurpose"
                    :label="item.facilitypurpose"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="指标编码" prop="indexCode">
                <el-input
                  placeholder="指标编码"
                  clearable
                  v-model="form.indexCode"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="指标名称" prop="indexName">
                <el-input
                  placeholder="指标名称"
                  clearable
                  v-model="form.indexName"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="指标类型" prop="indexType">
                <el-select
                  placeholder="指标类型"
                  clearable
                  v-model="form.indexType"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.entHazardMonitoringAlarmtype"
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
              <el-form-item label="计量单位" prop="unit">
                <el-select
                  placeholder="指标类型"
                  clearable
                  v-model="form.unit"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.entHazardMonitoringUnitmeasure"
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
              <el-form-item label="阈值上限" prop="threUpVal">
                <el-input
                  placeholder="阈值上限"
                  clearable
                  v-model="form.threUpVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="阈值上上限" prop="threUpUpVal">
                <el-input
                  placeholder="阈值上上限"
                  clearable
                  v-model="form.threUpUpVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="阈值下限" prop="threDownVal">
                <el-input
                  placeholder="阈值下限"
                  clearable
                  v-model="form.threDownVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="阈值下下限" prop="threDownDownVal">
                <el-input
                  placeholder="阈值下下限"
                  clearable
                  v-model="form.threDownDownVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="量程上限" prop="rangeUpVal">
                <el-input
                  placeholder="量程上限"
                  clearable
                  v-model="form.rangeUpVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="量程下限" prop="rangeDownVal">
                <el-input
                  placeholder="量程下限"
                  clearable
                  v-model="form.rangeDownVal"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否报警">
                <el-radio-group v-model="form.isAlarm">
                  <el-radio :label="0">正常</el-radio>
                  <el-radio :label="1">报警</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item
                label="报警类型"
                prop="alarmType"
                v-if="form.isAlarm === 1"
              >
                <el-select
                  placeholder="报警类型"
                  clearable
                  v-model="form.alarmType"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.entHazardMonitoringIndextype"
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
              <el-form-item label="DCS点位号" prop="tagNo">
                <el-input
                  placeholder="DCS点位号"
                  clearable
                  v-model="form.tagNo"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="描述" prop="describe">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="描述"
                  clearable
                  v-model="form.describe"
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
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  monitoringIndicatorsCreateAPI,
  monitoringIndicatorsViewAPI,
  monitoringIndicatorsUpdateAPI,
} from "@/api/hazard/monitoringIndicators/index";
import { productionFacilitiesListAPI } from "@/api/enterprise/safetyManagement/information/index";

export default {
  name: "editDialog",
  components: {},
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
      icon: "icon-bianji",
      title: "新增指标绑定设备信息",
      openEdit: false,
      width: "260px",
      width2: "95.5%",
      size: "small",
      equipCodeList: [],
      form: {
        isAlarm: 0,
        equipCode: {
          id: "",
          facilitypurpose: "",
        },
      },
      rules: {
        "equipCode.facilitypurpose": [
          { required: true, message: "请输入设备位号/编码", trigger: "blur" },
        ],
        indexCode: [
          { required: true, message: "请输入指标编码", trigger: "blur" },
        ],
        indexName: [
          { required: true, message: "请输入指标名称", trigger: "blur" },
        ],
        indexType: [
          { required: true, message: "请输入指标类型", trigger: "change" },
        ],
      },
      row: {},
    };
  },

  created() {
    this.getEquipCodeList();
  },

  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.row = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
    },

    // 获取设备位号列表
    async getEquipCodeList() {
      const res = await productionFacilitiesListAPI();
      if (res && res.code !== 200)
        return this.$message.error("获取设备位号列表失败");
      this.equipCodeList = res.data;
    },

    handleEquipCodeSelect(val) {
      let valArr = val.split(",");
      this.form.equipCode.id = valArr[0];
      this.form.equipCode.facilitypurpose = valArr[1];
    },

    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.row.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await monitoringIndicatorsCreateAPI(this.form);
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("新增成功");
          this.close();
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await monitoringIndicatorsUpdateAPI({
          ...this.form,
          id: this.row.id,
        });
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("修改成功");
          this.close();
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await monitoringIndicatorsViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
          this.form.indexType = res.data.indexType
            ? res.data.indexType.key
            : "";
          this.form.alarmType = res.data.alarmType
            ? res.data.alarmType.key
            : "";
        }
      } catch (e) {
        this.$message.error(e);
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
</style>
