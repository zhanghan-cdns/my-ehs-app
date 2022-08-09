<template>
  <div style="height: 100%;">
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>人员统计基本信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="法定代表人" prop="entLegalRepresentor">
              <el-input clearable placeholder="法定代表人" v-model="form.entLegalRepresentor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人电话" prop="legalRepresentativeNum">
              <el-input clearable placeholder="法定代表人电话" v-model="form.legalRepresentativeNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际控制人是否担任法人代表" prop="isLegalRepresent">
              <el-radio-group class="radioLocation" v-model="form.isLegalRepresent">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业负责人固定电话" prop="enterpriseManNum">
              <el-input clearable placeholder="企业负责人固定电话" v-model="form.enterpriseManNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全值班电话" prop="safetyCall">
              <el-input  clearable placeholder="安全值班电话" v-model="form.safetyCall"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="entEmail">
              <el-input clearable placeholder="电子邮箱" v-model="form.entEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="单位传真" prop="fax">
          <el-input clearable placeholder="单位传真" v-model="form.fax"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="母公司负责人" prop="parentCompanyMan">
              <el-input clearable placeholder="母公司负责人" v-model="form.parentCompanyMan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="母公司负责人联系方式" prop="parentCompanyManNum">
              <el-input  clearable placeholder="母公司负责人联系方式"  v-model="form.parentCompanyManNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="董事长" prop="chairman">
              <el-input clearable placeholder="董事长" v-model="form.chairman"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="董事长联系方式" prop="chairmanNum">
              <el-input clearable placeholder="董事长联系方式" v-model="form.chairmanNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总经理" prop="manager">
              <el-input clearable placeholder="总经理" v-model="form.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总经理联系方式" prop="managerNum">
              <el-input clearable placeholder="总经理联系方式" v-model="form.managerNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="第一大股东" prop="largestShareholder">
              <el-input clearable placeholder="第一大股东" v-model="form.largestShareholder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第一大股东联系方式" prop="largestShareholderNum">
              <el-input clearable placeholder="第一大股东联系方式" v-model="form.largestShareholderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="技术负责人" prop="technicalDirector">
              <el-input clearable placeholder="技术负责人" v-model="form.technicalDirector"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技术负责人联系方式" prop="technicalDirectorNum">
              <el-input clearable placeholder="技术负责人联系方式" v-model="form.technicalDirectorNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全总监" prop="securityDirector">
              <el-input clearable placeholder="安全总监" v-model="form.securityDirector"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全总监联系方式" prop="securityDirectorNum">
              <el-input clearable placeholder="安全总监联系方式" v-model="form.securityDirectorNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全负责人" prop="headOfSafety">
              <el-input clearable placeholder="安全负责人" v-model="form.headOfSafety"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全负责人联系方式" prop="headOfSafetyNum">
              <el-input clearable placeholder="安全负责人联系方式" v-model="form.headOfSafetyNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="从业人员数量" prop="employeesNum">
              <el-input-number style="width: 100%" clearable placeholder="从业人员数量" v-model="form.employeesNum"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特种作业人员数量" prop="entSpecialWorkNum">
              <el-input-number style="width: 100%" clearable placeholder="特种作业人员数量" v-model="form.entSpecialWorkNum"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="当年新招人员数量">
              <el-input-number style="width: 100%" clearable placeholder="当年新招人员数量" v-model="form.name"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册安全工程师人员数量" prop="entRegSafeEngineerNum">
              <el-input-number style="width: 100%" clearable placeholder="注册安全工程师人员数量" v-model="form.entRegSafeEngineerNum"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 下一步按钮 -->
        <el-form-item class="middle">
          <el-button type="primary" @click="previousTo">上一步</el-button>
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
          <el-button type="primary" @click="nextTo">下一步</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import rules from './rules.js'
import { savePersonAPI} from "@/api/editorPage";
import {enterpriseNewListAPI} from "@/api/personnel/organization";
export default {
  data() {
    return {
      form: {},
      rules:rules.statisticaBasic
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
          isLegalRepresent:res.data.isLegalRepresent?res.data.isLegalRepresent.key:"",
        }
      }
    },
    nextTo() {
      this.$parent.next();
    },
    previousTo() {
      this.$parent.previous();
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await savePersonAPI({
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
  height: 88%;
  overflow: auto;
}

.middle {
  display: flex;
  justify-content: center;
}

</style>
