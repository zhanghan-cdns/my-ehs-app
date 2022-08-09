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
      <el-row>
        <el-col span="12">
          <el-form-item label="安全交底人" prop="safetyHandoverPerson">
            <el-input
              placeholder="请选择安全交底人"
              clearable
              v-model="form.safetyHandoverPerson"
              :style="`width:${width3}`"
            ></el-input>
            <button-select @click="selectSafetyHandoverPerson">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="接受交底人" prop="recipientOfTheHandover">
            <el-input
              placeholder="请输入接受交底人"
              clearable
              v-model="form.recipientOfTheHandover"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="监护人" prop="guardians">
            <el-input
              placeholder="请选择监护人(可多选)"
              clearable
              v-model="form.guardians"
              :style="`width:${width3}`"
            ></el-input>
            <button-select @click="selectGuardians">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="监护人岗位" prop="guardianshipPositions">
            <el-input
              placeholder="请输入监护人岗位"
              clearable
              v-model="form.guardianshipPositions"
              :style="`width:${width}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item
            label="上传安全交底文件"
            prop="uploadSafetyHandoverDocuments"
          >
            <basic-upload
              key="file"
              :model="true"
              @onSuccess="
                (fileList) =>
                  onSuccess(fileList, 'uploadSafetyHandoverDocuments')
              "
              @onRemove="
                (fileList) =>
                  onRemove(fileList, 'uploadSafetyHandoverDocuments')
              "
              :photos="form.uploadSafetyHandoverDocuments"
            ></basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="经纬度(经度)" prop="longitude">
            <el-input
              placeholder="请定位经度"
              clearable
              v-model="form.longitude"
              :style="`width:${width3}`"
            ></el-input>
            <button-select @click="location">选择</button-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="经纬度(纬度)" prop="latitude">
            <el-input
              placeholder="请定位纬度"
              clearable
              v-model="form.latitude"
              :style="`width:${width3}`"
            ></el-input>
            <button-select @click="location">选择</button-select>
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
      form: {},
      rules: {},
      width: "100%",
      width2: "91%",
      width3: "76%",
    };
  },

  methods: {
    // 上传附件成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除附件
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
/deep/ .button-select {
  margin-left: 10px;
}
</style>