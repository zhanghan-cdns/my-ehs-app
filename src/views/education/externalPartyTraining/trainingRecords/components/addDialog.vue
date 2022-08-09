<template>
  <basic-dialog
    title="新增外来方培训记录"
    icon="icon-xinzeng"
    :width="1013"
    :height="'80%'"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    :showFooter="false"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="auto">
          <el-form-item
            label="培训类别"
            prop="trainCategory"
            label-width="120px"
          >
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训类别"
              style="width: 824px"
              :disabled="disabled"
            >
              <!-- <el-option
                v-for="item in dict.educationSetTrainingcategory"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="外来方单位名称"
            prop="trainCategory"
            label-width="120px"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入外来方单位名称"
              style="width: 824px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="120px" prop="trainCategory">
            <el-input
              v-model="form.courseName"
              placeholder="请输入姓名"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入身份证号"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="工作岗位"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入工作岗位"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训时间"
            label-width="120px"
            prop="trainCategory"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="培训人员"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入培训人员"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="教育人" label-width="120px" prop="trainCategory">
            <el-input
              v-model="form.courseName"
              placeholder="请输入教育人"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="考试成绩"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.courseName"
              placeholder="请输入考试成绩"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训结果"
            label-width="120px"
            prop="trainCategory"
          >
            <el-radio-group
              v-model="form.isPicture"
              style="width: 350px"
              :disabled="disabled"
            >
              <el-option label="合格" value="shanghai">合格</el-option>
              <el-option label="不合格" value="beijing">不合格</el-option>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="培训内容"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.name"
              style="width: 824px"
              type="textarea"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            label-width="120px"
            prop="trainCategory"
          >
            <el-input
              v-model="form.name"
              style="width: 824px"
              type="textarea"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
export default {
  data() {
    return {
      openFlag: true,
      form: {
        type: [],
      },
    };
  },
  methods: {
    open() {
      this.openFlag = true;
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
/deep/ .vxe-modal--content {
  background: #eeeeee;
}
.wrap {
  padding: 20px;
  background: white;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.title {
  width: 100%;
  border-bottom: 1px solid #4a80fc;
  height: 30px;
  margin: 0px auto;
  line-height: 30px;
  white-space: normal;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 22px;
}
</style>
