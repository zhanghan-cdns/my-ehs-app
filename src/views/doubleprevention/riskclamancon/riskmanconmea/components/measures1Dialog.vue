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
      title="管控措施"
      width="1050px"
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
            <el-col span="24">
              <el-form-item label="管控方式" prop="riskManConType">
                <el-select
                  placeholder="请选择管控方式"
                  clearable
                  v-model="form.riskManConType"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.doublePreventionRiskManConType"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="管控措施分类1" prop="riskManConMeaCla1">
                <el-select
                  placeholder="请选择管控措施分类1"
                  clearable
                  v-model="form.riskManConMeaCla1"
                  :style="`width:${width}`"
                  :size="size"
                  @change="handleChangeRiskManageMeasure"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.doublePreventionRiskManConMeaCla1"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="管控措施分类2" prop="riskManConMeaCla2">
                <el-select
                  placeholder="请选择管控措施分类2"
                  clearable
                  v-model="form.riskManConMeaCla2"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in doublePreventionRiskManConMeaCla2"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="管控措施分类3" prop="riskManConMeaCla3">
                <el-input
                  placeholder="管控措施分类3"
                  clearable
                  v-model="form.riskManConMeaCla3"
                  :style="`width:${width}`"
                  :size="size"
                  :isDisabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="管控措施描述" prop="description">
                <el-input
                  placeholder="管控措施描述"
                  clearable
                  v-model="form.description"
                  style="width: 99%"
                  :size="size"
                  :isDisabled="isDisabled"
                  :autosize="{ minRows: 2, maxRows: 16}"
                  type="textarea"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="隐患排查内容" prop="hazInvContent">
                <el-input
                  placeholder="隐患排查内容"
                  clearable
                  v-model="form.hazInvContent"
                  style="width: 99%"
                  :size="size"
                  :autosize="{ minRows: 2, maxRows: 16}"
                  resize="none"
                  :isDisabled="isDisabled"
                  type="textarea"
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
          <el-button type="success" @click="reset('form')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>

  </div>
</template>
<script>
import {sdpInfoCreateAPI, sdpInfoUpdateAPI,} from "@/api/duty/duty_standard_allocation";
import shiftDialog from "./shiftDialog.vue";
import measuresDialog from "./measuresDialog.vue";
import measures1Dialog from "./measures1Dialog.vue";
import {fastGetDictAPI} from "@/api/system/dictionary";
import {riskmanconmeaViewAPI} from "@/api/doubleprevention/riskmanconmea";

export default {
  name: "editDialog",
  components: {
    shiftDialog,
    measuresDialog,
    measures1Dialog,
  },
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "350px",
      size: "small",
      form: {},
      sizeCon: {
        height: "320px",
      },
      rules: {
        checkMeasure: [
          {required: true, message: "请输入考核办法", trigger: "blur"},
        ],
      },

      doublePreventionRiskManConMeaCla2: [],

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
      default: "指标配备",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    // 获取风险管控措施子字典
    async handleChangeRiskManageMeasure(val) {
      const res = await fastGetDictAPI(val)
      if (res.code === 200) {
        this.doublePreventionRiskManConMeaCla2 = res.data.children
      }
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan";
      if (row && row.mea_id) {
        this.rowData = row;
        this.getDetail(row.mea_id);
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
        const res = await sdpInfoCreateAPI(this.form);
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
        const res = await sdpInfoUpdateAPI({
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
        const res = await riskmanconmeaViewAPI({id});
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
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
