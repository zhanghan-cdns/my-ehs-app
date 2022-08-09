<template>
  <div class="basic-form">
    <el-form
      :inline="true"
      ref="basicFormRef"
      :model="formData"
      label-width="auto"
    >
      <el-form-item
        v-for="item in formItem"
        :key="item.prop"
        :label="item.label"
        :label-width="item.labelWidth ? item.labelWidth : 'auto'"
        :prop="item.prop"
      >
        <!-- input 是否-->
        <el-input
          v-if="item.type === 'Input' && item.isBoolean"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :value="formData[item.prop] == 0 ? '否' : '是'"
          :style="{ width: item.width }"
          :title="formData[item.prop]"
        ></el-input>
        <!-- input -->
        <el-input
          v-if="item.type === 'Input' && !item.isBoolean"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          v-model="formData[item.prop]"
          :style="{ width: item.width }"
          :title="formData[item.prop]"
        ></el-input>
        <!-- textarea -->
        <el-input
          v-if="item.type === 'Textarea'"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          v-model="formData[item.prop]"
          :style="{ width: item.width }"
          type="textarea"
          :rows="item.rows ? item.rows : 2"
        ></el-input>
        <!-- select -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="formData[item.prop]"
          :placeholder="item.placeholder"
          :style="{ width: item.width }"
          :disabled="item.disabled"
        >
          <el-option
            v-for="option in item.children"
            :label="option.label"
            :key="option.value"
            :value="option.value"
          ></el-option>
        </el-select>
        <!-- date -->
        <el-date-picker
          :style="{ width: item.width }"
          v-if="item.type === 'Date'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          type="date"
          :placeholder="item.placeholder"
        >
        </el-date-picker>
        <!-- Cascader -->
        <el-cascader
          :style="{ width: item.width }"
          :disabled="item.disabled"
          v-if="item.type === 'Cascader'"
          v-model="formData[item.prop]"
          :options="item.children"
          @change="handleChange"
        ></el-cascader>
        <!-- Radio -->
        <el-radio-group
          v-if="item.type === 'Radio'"
          v-model="formData[item.prop]"
          :style="{ width: item.width }"
          :disabled="item.disabled"
        >
          <el-radio
            v-for="radio in item.children"
            :key="radio.value"
            :label="radio.value"
            >{{ radio.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "basicForm",
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.basic-form {
  width: 100%;
  height: 100%;
}
</style>
