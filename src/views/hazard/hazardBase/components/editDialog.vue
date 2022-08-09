<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1346px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content">
          <el-card class="content-step">
            <el-steps
              :active="active"
              direction="vertical"
              finish-status="success"
              :space="100"
            >
              <el-step title="重大危险源基本信息">
                <i class="icon-qiyejibenxinxi icon-step" slot="icon"></i>
              </el-step>
              <el-step title="辨识物质">
                <i class="icon-fujiaxinxi icon-step" slot="icon"></i>
              </el-step>
              <el-step title="计算R值">
                <i class="icon-jiance icon-step" slot="icon"></i>
              </el-step>
            </el-steps>
          </el-card>
          <el-card class="content-form">
            <div v-show="active === 0">
              <div>
                <base-info
                  ref="baseInfoRef"
                  :dictConfig="dictConfig"
                  :type="type"
                  @submitBaseInfo="submitBaseInfo"
                ></base-info>
              </div>
              <base-tab-info
                ref="baseTabInfoRef"
                :baseInfo="baseInfo"
                :type="type"
              ></base-tab-info>
            </div>
            <step-two
              v-show="active === 1"
              ref="stepTwoRef"
              :baseInfo="baseInfo"
              :type="type"
            ></step-two>
            <step-three
              v-show="active === 2"
              ref="stepThreeRef"
              :baseInfo="baseInfo"
              :type="type"
            ></step-three>
            <div class="bottom">
              <el-button
                type="primary"
                :size="size"
                @click="next"
                v-if="active === 0 || active === 1"
                >下一步</el-button
              >
              <el-button
                type="primary"
                :size="size"
                @click="finish"
                v-if="active === 2 && type !== 'chakan'"
                >完成</el-button
              >
            </div>
          </el-card>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import baseInfo from "./stepOne/baseInfo.vue";
import baseTabInfo from "./stepOne/baseTabInfo.vue";
import stepTwo from "./stepTwo/stepTwo.vue";
import stepThree from "./stepThree/stepThree.vue";
import {
  hazardBaseCreateAPI,
  hazardBaseViewAPI,
  hazardBaseUpdateAPI,
  setIdentificationAPI,
} from "@/api/hazard/hazardBase/index";

export default {
  components: {
    baseInfo,
    baseTabInfo,
    stepTwo,
    stepThree,
  },

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
      title: "重大危险源辨识与分级",
      openEdit: false,
      active: 0,
      size: "small",
      row: {},
      baseInfo: {},
      type: "",
    };
  },

  methods: {
    next() {
      if (this.active === 0) {
        if (this.baseInfo && this.baseInfo.id) {
          this.$refs.stepTwoRef.getTableData();
          console.log(111);
          this.active++;
        } else {
          this.$message.error("请先保存基本信息");
        }
      } else if (this.active === 1) {
        this.active++;
      } else if (this.active === 2) {
        return;
      }
    },
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.type = type;
      if (row && row.id) {
        this.getDetail(row.id);
        this.row = row;
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.active = 0;
      this.$refs.baseInfoRef.reset();
    },

    // 获取详情
    getDetail(id) {
      this.getBaseInfo(id);
    },

    // 获取基本信息
    async getBaseInfo(id) {
      const res = await hazardBaseViewAPI({ id });
      console.log(res, "res");
      if (res && res.code === 200) {
        // 回显基础信息
        this.$refs.baseInfoRef.form = res.data;
        this.echoSelectValue(this.$refs.baseInfoRef.form, res.data);
        // 回显第三步信息
        this.$refs.stepThreeRef.form = res.data;
        this.baseInfo = res.data;
      }
    },

    // 下拉回显
    echoSelectValue(form, data) {
      form.hazardType = data.hazardType ? data.hazardType.key : "";
      form.mainDanger = data.mainDanger.map((item) => item.key);
      form.possibleAccident = data.possibleAccident.map((item) => item.key);
      form.hiddenDangerType = data.hiddenDangerType.map((item) => item.key);
      form.environmentalLocation = data.environmentalLocation
        ? data.environmentalLocation.key
        : "";
      form.productionTypes = data.productionTypes
        ? data.productionTypes.key
        : "";
      form.productionProperty = data.productionProperty
        ? data.productionProperty.key
        : "";
      form.hazardousProcess = data.hazardousProcess
        ? data.hazardousProcess.key
        : "";
      form.filingPeriodArr = data.filingPeriod
        ? data.filingPeriod.split(",")
        : "";
    },

    // 获取辨识信息

    // 提交基本信息
    async submitBaseInfo(baseForm) {
      console.log(baseForm, "baseForm");
      if (this.row && this.row.id) {
        let params = { ...baseForm };
        const res = await hazardBaseUpdateAPI(params);
        if (res && res.code !== 200) return this.$message.error("保存失败");
        this.baseInfo = res.data;
        this.$message.success("保存成功");
        this.$emit("refresh");
      } else {
        let params = { ...baseForm };
        const res = await hazardBaseCreateAPI(params);
        if (res && res.code !== 200) return this.$message.error("保存失败");
        this.baseInfo = res.data;
        this.$message.success("保存成功");
        this.$emit("refresh");
      }
    },

    // 完成提交
    async finish() {
      let params = { ...this.$refs.stepThreeRef.form, id: this.baseInfo.id };
      console.log(params, "params");
      const res = await setIdentificationAPI(params);
      if (res && res.code !== 200) return this.$message.error("保存失败");
      this.$message.success("保存成功");
      this.close();
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.content-step {
  width: 260px;
  height: 100%;
  margin-right: 6px;
}

.content-form {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.icon-step {
  margin-top: 3px;
  color: #4685f9;
  font-size: 14px !important;
}

.bottom {
  padding: 16px 0px;
  text-align: center;
}

/deep/ .el-steps {
  width: 160px;
  margin: 0 auto;
}

/deep/ .el-step__icon.is-text {
  border-color: #4685f9;
}

/deep/ .el-step__title {
  font-size: 14px;
}

/deep/ .el-step__line {
  background-color: #4685f9;
}
</style>