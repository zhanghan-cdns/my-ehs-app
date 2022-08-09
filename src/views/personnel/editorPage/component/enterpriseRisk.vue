<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>企业风险及重大危险源信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业风险等级">
              <el-select clearable v-model="form.entRiskLevel" placeholder="请选择">
                <el-option v-for="item in dictConfig.entRiskLevel" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业最高重大危险源等级">
              <el-select clearable v-model="form.entHighestDangerLevel" placeholder="请选择">
                <el-option v-for="item in dictConfig.entHighestDangerLevel" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否构成重大危险源">
              <el-radio-group v-model="form.whetherConstituteDangerLevel">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重大危险源等级">
              <el-select clearable v-model="form.entDangerLevel" placeholder="请选择">
                <el-option v-for="item in dictConfig.entDangerLevel" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
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
import {saveDangerAPI} from "@/api/editorPage";
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
    async getDetail() {
      const res = await enterpriseNewListAPI();
      if (res.code === 200) {
        // 回填表单
        this.form = {
          ...res.data,
          entRiskLevel:res.data.entRiskLevel?res.data.entRiskLevel.key:"",
          entHighestDangerLevel:res.data.entHighestDangerLevel?res.data.entHighestDangerLevel.key:"",
          whetherConstituteDangerLevel:res.data.whetherConstituteDangerLevel?res.data.whetherConstituteDangerLevel.key:"",
          entDangerLevel:res.data.entDangerLevel?res.data.entDangerLevel.key:"",
        }
      }
    },
    nextTo() {
      this.$parent.next();
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await saveDangerAPI({
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
