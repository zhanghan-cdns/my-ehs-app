<template>
  <div class="view-dialog">
    <basic-dialog
      :icon="icon"
      :title="title"
      width="600px"
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
              <el-form-item label="辨识物质" prop="identifySubstance">
                <el-input
                  clearable
                  v-model="form.identifySubstance"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="校正系数" prop="correctionCoefficient">
                <el-input
                  clearable
                  v-model="form.correctionCoefficient"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="实际存在量(t)" prop="actualQuantity">
                <el-input
                  clearable
                  v-model="form.actualQuantity"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="临界储量(t)" prop="criticalReserves">
                <el-input
                  clearable
                  v-model="form.criticalReserves"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item
                label="危险性分类及说明"
                prop="hazardClassificationDescription"
              >
                <el-input
                  type="textarea"
                  :rows="4"
                  clearable
                  v-model="form.hazardClassificationDescription"
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
                  v-model="form.remark"
                  :style="`width:${width}`"
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
  majorHazardIdentificationCreateAPI,
  majorHazardIdentificationUpdateAPI,
  majorHazardIdentificationViewAPI,
} from "@/api/hazard/majorHazardIdentification/index";

export default {
  name: "editDialog",

  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      icon: "icon-bianji",
      title: "添加辨识物质",
      openEdit: false,
      width: "90%",
      size: "small",
      form: {},
      rowData: {},
      rules: {},
    };
  },

  methods: {
    open(row) {
      this.openEdit = true;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    close() {
      this.openEdit = false;
      this.reset();
    },
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
    /**
     * 提交表单
     */
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
      console.log(this.baseInfo, "baseInfo");
      if (this.baseInfo && this.baseInfo.id) {
        let params = { hazardBaseId: this.baseInfo.id, ...this.form };
        try {
          const res = await majorHazardIdentificationCreateAPI(params);
          if (res.code === 200) {
            this.$message.success("添加成功");
            this.close();
            this.$emit("refresh");
          }
        } catch (e) {
          this.$message.error(e);
        }
      }
    },
    // 修改
    async modify() {
      try {
        const res = await majorHazardIdentificationUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.$message.success("修改成功");
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
        const res = await majorHazardIdentificationViewAPI({ id });
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
