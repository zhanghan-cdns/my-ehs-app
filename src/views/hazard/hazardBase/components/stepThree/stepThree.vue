<template>
  <div>
    <el-form
      label-width="200px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="R值" prop="rvalue">
            <el-input
              placeholder="R值"
              clearable
              v-model="form.rvalue"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="重大危险源等级" prop="hazardLevel">
            <el-input
              placeholder="重大危险源等级"
              clearable
              v-model="form.hazardLevel"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="辨识人员" prop="idePerName">
            <el-input
              placeholder="辨识人员"
              clearable
              v-model="form.idePerName"
              :style="`width:${width}`"
              :size="size"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="辨识时间" prop="ideTime">
            <el-date-picker
              v-model="form.ideTime"
              type="datetime"
              placeholder="辨识时间"
              :style="`width:${width}`"
              value-format="yyyy-MM-dd HH:mm:ss"
              :size="size"
              disabled
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="type !== 'chakan'">
        <el-col span="12">
          <el-form-item label="" prop="rValue">
            <el-button type="success" size="small" @click="calcRValue"
              >计算</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { setRValueAPI } from "@/api/hazard/majorHazardIdentification/index";
import { dateFormat } from "@/util/date";

export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      width: "300px",
      width2: "93.5%",
      size: "small",
      form: {},
      rules: {
        rValue: "",
        hazardLevel: "",
        idePerName: "",
        ideTime: "",
      },
    };
  },
  methods: {
    async calcRValue() {
      if (
        this.baseInfo &&
        this.baseInfo.id &&
        this.baseInfo.populationEstimation
      ) {
        let params = {
          hazardBaseId: this.baseInfo.id,
          populationEstimation: this.baseInfo.populationEstimation,
        };
        const res = await setRValueAPI(params);
        console.log(res, "resRvale");
        if (res && res.code === 200) {
          let idePerName = JSON.parse(
            localStorage.getItem("saber-currentUserInfo")
          );
          let ideTime = dateFormat(new Date());
          this.$set(this.form, "rValue", res.data.rValue);
          this.$set(this.form, "hazardLevel", res.data.hazardLevel);
          this.$set(this.form, "ideTime", ideTime);
          this.$set(this.form, "idePerName", idePerName.content.userName);
        }
      } else {
        this.$message.error("计算所需参数不完整");
      }
    },
  },
};
</script>

<style scoped>
</style>