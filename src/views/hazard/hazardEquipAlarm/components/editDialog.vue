<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="600px"
      height="45%"
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
            <el-col span="24">
              <el-form-item label="处置人员" prop="dealPerson">
                <el-select
                  placeholder="处置人员"
                  clearable
                  filterable
                  v-model="form.dealPerson"
                  :style="`width:${width}`"
                  :size="size"
                  @change="dealPersonSelect"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.entpersonid"
                    :value="
                      item.entpersonid +
                      ',' +
                      item.entpersonname +
                      ',' +
                      item.entpersontel
                    "
                    :label="item.entpersonname"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="处置时间" prop="dealTime">
                <el-date-picker
                  v-model="form.dealTime"
                  type="datetime"
                  placeholder="请选择时间"
                  :style="`width:${width}`"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="处置措施" prop="dealMeasures">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="处置措施"
                  clearable
                  v-model="form.dealMeasures"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="处置结果" prop="dealResult">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="处置结果"
                  clearable
                  v-model="form.dealResult"
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
  hazardEquipAlarmCreateAPI,
  hazardEquipAlarmViewAPI,
  hazardEquipAlarmUpdateAPI,
} from "@/api/hazard/hazardEquipAlarm/index";
import { personListAPI } from "@/api/enterprise/safetyManagement/public/person";

export default {
  name: "editDialog",
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
      title: "新增处置信息",
      openEdit: false,
      width: "280px",
      width2: "95.5%",
      size: "small",
      personList: [],
      form: {
        dealPerson: "",
        dealPersonId: "",
        dealTime: "",
        dealMeasures: "",
        dealResult: "",
      },
      rules: {},
      row: {},
    };
  },

  created() {},

  methods: {
    // 获取人员列表
    async getPersonList() {
      const res = await personListAPI();
      if (res.code !== 200) return this.$message.error("获取人员列表失败");
      this.personList = res.data;
    },
    dealPersonSelect(val) {
      let valArr = val.split(",");
      this.form.dealPerson = valArr[1];
      this.form.dealPersonId = valArr[0];
    },
    // 打开
    open(row) {
      this.openEdit = true;
      this.getPersonList();
      if (row && row.id) {
        this.row = row;
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    // async add() {
    //   try {
    //     const res = await hazardEquipAlarmCreateAPI(this.form);
    //     if (res.code === 200) {
    //       this.$message.success("新增成功");
    //       this.close();
    //       this.$emit("refresh");
    //     }
    //   } catch (e) {
    //     this.$message.error(e);
    //   }
    // },
    // 修改
    async modify() {
      if(this.row.id && this.row.hazardEquipAlarm) {
        this.row.hazardEquipAlarm.dealPerson = this.form.dealPerson
        this.row.hazardEquipAlarm.dealPersonId = this.form.dealPersonId
        this.row.hazardEquipAlarm.dealTime = this.form.dealTime
        this.row.hazardEquipAlarm.dealMeasures = this.form.dealMeasures
        this.row.hazardEquipAlarm.dealResult = this.form.dealResult
      }
      try {
        const res = await hazardEquipAlarmUpdateAPI({
          ...this.row
        });
        if (res && res.code === 200) {
          this.$message.success("处理成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    // async getDetail(id) {
    //   try {
    //     const res = await hazardEquipAlarmViewAPI({ id });
    //     if (res.code === 200) {
    //       this.form = {
    //         ...res.data,
    //       };
    //     }
    //   } catch (e) {
    //     this.$message.error(e);
    //   }
    // },
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
