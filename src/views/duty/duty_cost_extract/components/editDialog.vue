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
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="年度" prop="year">
                <el-select
                  placeholder="年度"
                  clearable
                  v-model="form.year"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationYear"
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
              <el-form-item label="销售收入(万元)" prop="sales">
                <el-input
                  placeholder="请输入销售收入(万元)"
                  clearable
                  v-model="form.sales"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="行业类型" prop="industry">
                <el-select
                  placeholder="请选择行业类型"
                  clearable
                  v-model="form.industry"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                  @change="industryChange"
                  value-key="id"
                >
                  <el-option
                    v-for="item in dictConfig.dutyCostUseIndustryType"
                    :key="item.id"
                    :value="item"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="24">
              <el-form-item label="提取标准" prop="standard">
                <el-input
                  placeholder="提取标准"
                  clearable
                  v-model="form.standard"
                  style="width: 98.5%"
                  :size="size"
                  :disabled="isDisabled"
                  type="textarea"
                  :rows="5"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="提取数(万元)" prop="quantity">
                <el-input
                  placeholder="提取数(万元)"
                  clearable
                  v-model="form.quantity"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
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
                  :disabled="isDisabled"
                  type="textarea"
                  :rows="5"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')" v-if="!isDisabled">保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  dceInfoCreateAPI,
  dceInfoViewAPI,
  dceInfoUpdateAPI,
  dceInfoCountAPI,
} from "@/api/duty/duty_cost_extract/index";
import dictMixin from "@/mixins/dict";

export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
        standard: "",
        quantity: "",
        industry:"",
      },
      rules: {
        year: [{ required: true, message: "请选择年度", trigger: "blur" }],
        industry: [
          { required: true, message: "请选择行业类型", trigger: "blur" },
        ],
        sales: [
          { required: true, message: "请输入销售收入(万元)", trigger: "blur" },
        ],
      },
      rowData: {},
      industry:'',//赋值key
      dutyCostUseIndustryType: [],
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
      default: "费用提取",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
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
        const res = await dceInfoCreateAPI({
        ...this.form,
        industry:this.industry
        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          this.$message.success("保存成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await dceInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
          industry:this.industry

        });
        if (res.code === 200) {
          this.close();
          this.$emit("refresh");
          this.$message.success("编辑成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await dceInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
            year: res.data.year ? res.data.year.key : "",
            industry: res.data.industry ? res.data.industry.value : "",
          };
          this.industry = res.data.industry.key
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取行业类型的值
    industryChange(val) {
      this.industry = val.dictValue;
      this.getCount(this.form.sales, val.dictValueName); //行业类型
    },
    // 获取行业类型
    async getCount(sales, val) {
      try {
        let params = {
          sales: sales,
          industry: val,
        };
        const res = await dceInfoCountAPI(params);
        if (res.code === 200) {
          let numQuantity = Number(res.data.quantity);
          this.$set(this.form, "standard", res.data.standard); //标准
          this.$set(this.form, "quantity", numQuantity.toFixed(2)); //提取数
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
