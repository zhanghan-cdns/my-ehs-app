<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>企业机构信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否有专门安全机构" prop="entHasSafeOrg">
              <el-radio-group v-model="form.entHasSafeOrg">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全管理机构成立文号" prop="entSafeOrgNameNum">
              <el-input clearable placeholder="安全管理机构成立文号" v-model="form.entSafeOrgNameNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全管理机构名称" prop="entSafeOrgName">
              <el-input clearable placeholder="安全管理机构名称" v-model="form.entSafeOrgName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全管理机构成员数量" prop="entSafeOrgEmpNum">
              <el-input-number style="width: 100%" clearable placeholder="安全管理机构成员数量" v-model="form.entSafeOrgEmpNum"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="安全管理机构职责" prop="entSafeOrgDuty">
          <el-input clearable placeholder="安全管理机构职责" v-model="form.entSafeOrgDuty"></el-input>
        </el-form-item>

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
import { saveOrgAPI} from "@/api/editorPage";
import rules from './rules';
import {enterpriseNewListAPI} from "@/api/personnel/organization";
export default {
  data() {
    return {
      form: {},
      rules:rules.enterpriseInstitution
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
          entHasSafeOrg:res.data.entHasSafeOrg?res.data.entHasSafeOrg.key:"",
        }
      }
    },
    nextTo() {
      this.$parent.next();
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await saveOrgAPI({
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
