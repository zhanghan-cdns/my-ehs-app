<template>
  <div>
    <el-form
      label-position="top"
      :model="formInline"
      :rules="rules"
      ref="formRef"
      :disabled="type === 'chakan'"
      style="padding-left: 60px;margin-top:10px;"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="风险分区名称">
            <el-input
              v-model="formInline.projectCode"
              placeholder="风险分区名称"
              :style="`width:${width}`"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风险分区编号">
            <el-input
              v-model="formInline.projectName"
              placeholder="风险分区编号"
              :style="`width:${width}`"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-select
              v-model="formInline.projectClassify"
              placeholder="负责人"
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人部门">
            <el-input
              v-model="formInline.projectCode"
              placeholder="负责人部门"
              :style="`width:${width}`"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人工号">
            <el-input
              v-model="formInline.projectCode"
              placeholder="负责人工号"
              :style="`width:${width}`"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人电话">
            <el-input
              v-model="formInline.projectName"
              placeholder="负责人电话"
              :style="`width:${width}`"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度（米）">
            <el-input
              v-model="formInline.projectCode"
              placeholder="高度（米）"
              :style="`width:${width}`"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注">
            <el-input
              placeholder="备注"
              clearable
              v-model="formInline.remark"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加工程</el-button>
      </el-form-item> -->
    </el-form>
    <!-- <el-button type="primary" @click="finish">保存</el-button> -->
    <!-- <el-button>保存</el-button> -->
  </div>
</template>

<script>
export default {
  props: {
    // dictConfig: {
    //   type: Object,
    //   default() {
    //     return {};
    //   },
    // },
    type: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      formInline: {
        projectClassify: "",
        projectCode: "",
        projectName: "",
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
<style scoped>
/* @import url(); 引入css类 */
</style>
