<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>安全管理信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="安全标准化等级" prop="entSafeStandLevel">
          <el-select v-model="form.entSafeStandLevel" placeholder="请选择安全标准化等级" clearable>
            <el-option v-for="item in dictConfig.entSafeStandLevel" :key="item.id" :value="item.dictValue"
                       :label="item.dictValueName"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全生产许可证有效期起始日期" prop="entSafetyProductionLicenseStart">
              <el-date-picker
                clearable
                v-model="form.entSafetyProductionLicenseStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全生产许可证有效期终止日期" prop="entSafetyProductionLicenseEnd">
              <el-date-picker
                clearable
                v-model="form.entSafetyProductionLicenseEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标准化证书有效期起始日期" prop="entSafeStandCertVldStart">
              <el-date-picker
                clearable
                v-model="form.entSafeStandCertVldStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准化证书有效期终止日期" prop="entSafeStandCertVldEnd">
              <el-date-picker
                clearable
                v-model="form.entSafeStandCertVldEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 下一步按钮 -->
        <el-form-item class="middle">
          <el-button type="primary" @click="$parent.previous()">上一步</el-button>
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
          <el-button type="primary" @click="nextTo">下一步</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
import {saveNormalizationAPI} from "@/api/editorPage";
import {enterpriseNewListAPI} from "@/api/personnel/organization";

export default {
  data() {
    return {
      form: {},
    }
  },
  props: ["dictConfig"],
  created() {
    this.getDetail()
  },
  methods: {
    nextTo() {
      this.$parent.next();
    },
    async getDetail() {
      const res = await enterpriseNewListAPI();
      if (res.code === 200) {
        // 回填表单
        this.form = {
          ...res.data,
          entSafeStandLevel:res.data.entSafeStandLevel?res.data.entSafeStandLevel.key:"",
        }
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await saveNormalizationAPI({
            ...this.form
          });
          if (res.code === 200) {
            this.$message.success("保存成功");
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #D3D3D3;

  span {
    margin-left: 10px;
  }
}

.dataList {
  padding: 20px;
}

.middle {
  display: flex;
  justify-content: center;
}

</style>
