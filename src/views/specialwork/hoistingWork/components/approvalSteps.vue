<template>
  <div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row v-for="(item, index) in form" :key="index">
        <el-col span="24">
          <el-form-item :label="item.label" :prop="item.value">
            <el-input
              clearable
              v-model="item.value"
              :style="`width:${width}`"
            ></el-input>
            <button-select @click="selectPerson">选择</button-select>
            <button-delete @click="deleteItem(index)"></button-delete>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="extra-form-title">
        <i class="iconfont icon-a-zu20172 form-title-icon"></i>
        <span class="form-title-name">完工验收</span>
      </div>
      <el-row>
        <el-col span="24">
          <el-form-item label="验收人员" prop="gasMonitoringAnalysts">
            <el-input
              clearable
              v-model="form.gasMonitoringAnalysts"
              :style="`width:${width2}`"
            ></el-input>
            <button-select @click="selectPerson">选择</button-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      form: [
        {
          label: "班组审批",
          name: "bzsp",
          value: "",
        },
        {
          label: "属地厂级审批",
          name: "sdcjsp",
          value: "",
        },
        {
          label: "本部厂级审批",
          name: "bbcjsp",
          value: "",
        },
        {
          label: "公司审批",
          name: "gssp",
          value: "",
        },
        {
          label: "审批",
          name: "sp",
          value: "",
        },
      ],
      rules: {},
      width: "82%",
      width2: "91%",
    };
  },

  methods: {
    deleteItem(index) {
      this.form.splice(index, 1);
    },
    selectPerson() {
      let newArr = [];
      this.form.forEach((item) => {
        let obj = {};
        obj[item.name] = item.value;
        newArr.push(obj);
      });
      console.log(newArr, "newArr");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
.extra-form-title {
  padding: 34px 0px 10px 0px;
  margin-bottom: 17px;
  border-bottom: 1px solid #f0f0f0;
  .form-title-icon {
    color: #4a80fc;
    margin-right: 6px;
  }
  .form-title-name {
    font-size: 16px;
  }
}
/deep/ .button-select {
  margin-left: 10px;
}
</style>