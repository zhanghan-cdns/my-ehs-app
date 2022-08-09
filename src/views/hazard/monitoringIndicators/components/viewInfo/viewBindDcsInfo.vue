<template>
  <el-form
    label-width="140px"
    label-position="right"
    :model="form"
    :rules="rules"
    ref="formRef"
    disabled
  >
    <el-row>
      <el-col span="12">
        <el-form-item label="DCS名称" prop="unit">
          <el-input
            clearable
            v-model="form.unit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="指标名称" prop="unit">
          <el-input
            clearable
            v-model="form.unit"
            :style="`width:${width}`"
            :size="size"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <el-form-item label="DCS图">
          <el-image
            v-for="item in form.dcs"
            :key="item.url"
            style="width: 100px; height: 100px"
            :src="imgUrl + item.url"
            :preview-src-list="[imgUrl + item.url]"
          ></el-image>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { imgUrl } from "@/router/axios";

export default {
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
      width2: "94%",
      size: "small",
      form: {
        dcs: [],
      },
    };
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
