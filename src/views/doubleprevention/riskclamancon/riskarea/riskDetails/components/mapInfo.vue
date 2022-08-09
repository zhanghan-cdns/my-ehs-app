<!--  -->
<template>
  <div>
    <el-form
      label-width="100px"
      label-position="right"
      :model="form"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="绑定区域">
        <el-select
          v-model="formInline.projectClassify"
          placeholder="绑定区域"
          :style="`width:${width}`"
          clearable
        >
          <el-option
            v-for="item in projectDate"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="imgPositioning">
      <map-picker
        ref="mapPicker"
        style="width: 100%; height: 100%"
      ></map-picker>
    </div>
  </div>
</template>

<script>
import mapPicker from "@/components/mars3d-earth/editor/picker.vue";
export default {
  components: {
    mapPicker,
  },
  data() {
    return {
      formInline: {
        projectClassify: "",
      },
      width: "350px",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.imgPositioning {
  width: 100%;
  height: 460px;
}
</style>
