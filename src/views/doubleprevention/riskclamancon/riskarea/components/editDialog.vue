<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      width="850px"
      height="55%"
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
              <el-form-item label="风险分区名称" prop="areaName">
                <el-input
                  placeholder="风险分区名称"
                  clearable
                  v-model="form.areaName"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="风险分区编号" prop="areaNumber">
                <el-input
                  placeholder="风险分区编号"
                  clearable
                  v-model="form.areaNumber"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="负责人" prop="personInChargeId">
                <el-select
                  placeholder="负责人"
                  clearable
                  v-model="form.personInChargeId"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.entPersonName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="负责人部门" prop="department">
                <el-select
                  placeholder="负责人部门"
                  clearable
                  v-model="form.department"
                  :style="`width:${width}`"
                  :size="size"
                  disabled
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :value="item.department"
                    :label="item.department"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="12">
              <el-form-item label="负责人工号" prop="jobNumber">
                <el-input
                  placeholder="负责人工号"
                  clearable
                  v-model="form.jobNumber"
                  :style="`width:${width}`"
                  :size="size"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="负责人电话" prop="tel">
                <el-input
                  placeholder="负责人电话"
                  clearable
                  v-model="form.tel"
                  :style="`width:${width}`"
                  :size="size"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="绑定区域" prop="buildId">
                <el-select
                  placeholder="绑定区域"
                  clearable
                  v-model="form.buildId"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
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
              <el-form-item label="高度（米）" prop="height">
                <el-input
                  placeholder="高度（米）"
                  clearable
                  v-model="form.height"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="备注"
                  clearable
                  v-model="form.remark"
                  style="width: 98.5%"
                  :size="size"
                  :isDisabled="isDisabled"
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
  araeInfoCreateAPI,
  araeInfoViewAPI,
  araeInfoUpdateAPI,
  personAPI,
} from "@/api/doubleprevention/riskarea/index.js";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
      },
      departmentList: [],
      rules: {
        areaName: [
          { required: true, message: "请输入风险分区名称", trigger: "blur" },
        ],
        areaNumber: [
          { required: true, message: "请输入风险分区编号", trigger: "blur" },
        ],
        personInChargeId: [
          { required: true, message: "请输入负责人", trigger: "blur" },
        ],
        buildId: [{ required: false, message: "请输入区域", trigger: "blur" }],
        height: [{ required: false, message: "请输入高度", trigger: "blur" }],
      },
      rowData: {},
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "风险分区",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {},
  methods: {
    async personList() {
      //获取部门
      const res = await personAPI();
      if (res.code === 200) {
        this.departmentList = res.data;
      }
    },
    handleChange(val) {
      console.log(val, "jk");
      //改变对应的部门值
      let result = this.departmentList.filter((item) => val === item.id);
      this.$set(this.form, "jobNumber", result[0].jobNumber);
      this.$set(this.form, "tel", result[0].tel);
      this.$set(this.form, "department", result[0].department);
    },

    // 打开
    open(row, type) {
      this.openEdit = true;
      this.personList();
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
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
      this.form = {};
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
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
        // this.form
        const res = await araeInfoCreateAPI({
          areaName: this.form.areaName,
          areaNumber: this.form.areaNumber,
          personInChargeId: this.form.personInChargeId,
          buildId: "1",
          height: this.form.height,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await araeInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await araeInfoViewAPI({ id });
        if (res.code === 200) {
          console.log(res.data.personInCharge, "res.data");
          // this.form.department = res.data.personInCharge.department
          // this.form.jobNumber = res.data.personInCharge.entPersonTel
          // this.form.tel = res.data.personInCharge.jobNumber

          // this.form.personInChargeId = Number(res.data.personInChargeId)
          this.form = {
            ...res.data,
            department: res.data.personInCharge.department,
            jobNumber: res.data.personInCharge.entPersonTel,
            tel: res.data.personInCharge.jobNumber,
          };

          // 为图片添加名字
          // this.form.file = res.data.file.map(item => {
          //   return {
          //     ...item,
          //     name: item.originalFilename
          //   };
          // });
          // console.log(this.form);
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
