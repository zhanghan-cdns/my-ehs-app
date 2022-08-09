<template>
  <div style="height: 100%;">
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt="">
      <span>附加信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业简称">
              <el-input clearable placeholder="企业简称" v-model="form.enterpriseAbbreviation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="一企一档编号">
              <el-input clearable placeholder="一企一档编号" v-model="form.enterpriseFileNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业编码">
              <el-input clearable placeholder="企业编码" v-model="form.entCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级企业编码">
              <el-input clearable placeholder="父级企业编码" v-model="form.parentEnterpriseCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网关编码">
              <el-input clearable placeholder="网关编码" v-model="form.gatewayCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="化学品登记系统编码">
              <el-input clearable placeholder="化学品登记系统编码" v-model="form.chemicalRegistrationSystemCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="化工行业编码">
              <el-input clearable placeholder="化工行业编码" v-model="form.chemicalIndustryCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全负责人固定电话">
              <el-input clearable placeholder="安全负责人固定电话" v-model="form.securityManNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职工人数">
              <el-input-number style="width: 100%" clearable placeholder="职工人数"
                               v-model="form.employeeNum"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="危险化学品作业人员人数">
              <el-input-number style="width: 100%" clearable placeholder="危险化学品作业人员人数"
                               v-model="form.hazardousChemicalNum"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="剧毒化学品作业人员人数">
              <el-input-number style="width: 100%" clearable placeholder="剧毒化学品作业人员人数"
                               v-model="form.highlyToxicChemicalNum"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属地安监机构">
              <el-input clearable placeholder="属地安监机构" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全监管等级">
              <el-select style="width:100%" clearable v-model="form.safetySupervisionLevel" placeholder="请选择安全监管等级">
                <el-option v-for="item in dictConfig.entSafetySupervisionLevel" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监管分类">
              <el-select style="width:100%" clearable v-model="form.regulatoryClassification" placeholder="请选择监管分类">
                <el-option v-for="item in dictConfig.entRegulatoryClassification" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否涉及高危工艺">
              <el-radio-group v-model="form.isHighRiskProcesses">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否涉及重点监管危化品">
              <el-radio-group v-model="form.isKeySupervision">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业执照类别">
              <el-select style="width:100%" v-model="form.businessLicenseCategory" placeholder="请选择营业执照类别">
                <el-option v-for="item in dictConfig.entBusinessLicenseCategory" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否涉及剧毒品生产或使用">
              <el-radio-group v-model="form.isUseDramaDrug">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系微信">
              <el-input clearable placeholder="联系微信" v-model="form.contactWechatAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年利润（万元）">
              <el-input-number style="width:100%" v-model="form.annualProfit"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全负责人电子邮箱">
              <el-input clearable placeholder="安全负责人电子邮箱" v-model="form.emailAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业资产总额（万元）">
              <el-input-number style="width:100%" clearable placeholder="企业资产总额" v-model="form.name"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专职应急管理人员数">
              <el-input-number style="width:100%" clearable placeholder="专职应急管理人员数"
                               v-model="form.name"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兼职安全生产管理人员数">
              <el-input-number style="width:100%" clearable placeholder="兼职安全生产管理人员数"
                               v-model="form.name"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="企业官网网站地址">
          <el-input clearable placeholder="企业官网网站地址" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="营业执照经营范围">
          <el-input clearable placeholder="营业执照经营范围" v-model="form.businessScope"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业邮箱">
              <el-input clearable placeholder="企业邮箱" v-model="form.enterpriseMailbox"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业邮箱授权码">
              <el-input clearable placeholder="企业邮箱授权码" v-model="form.enterpriseMailboxAuthorizationCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业固定电话">
              <el-input clearable placeholder="企业固定电话" v-model="form.enterpriseLandlineTele"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上传 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业照片">
              <basic-upload
                key="file1"
                @onSuccess="(fileList)=>onSuccess(fileList,'corporatePhoto')"
                @onRemove="(fileList)=>onRemove(fileList,'corporatePhoto')"
                :photos="form.corporatePhoto"
              ></basic-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业风险四色图">
              <basic-upload
                key="file2"
                @onSuccess="(fileList)=>onSuccess(fileList,'enterpriseRiskColorDiagram')"
                @onRemove="(fileList)=>onRemove(fileList,'enterpriseRiskColorDiagram')"
                :photos="form.enterpriseRiskColorDiagram"
              ></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="隐患排查治理计划（单文件）">
              <basic-upload
                key="file3"
                :model="true"
                @onSuccess="(fileList)=>onSuccess(fileList,'hiddenTroubleInvestigationPlan')"
                @onRemove="(fileList)=>onRemove(fileList,'hiddenTroubleInvestigationPlan')"
                :photos="form.hiddenTroubleInvestigationPlan"
              ></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="隐患排查治理制度（单文件）">
              <basic-upload
                key="file4"
                :model="true"
                @onSuccess="(fileList)=>onSuccess(fileList,'hiddenTroubleInvestigationSystem')"
                @onRemove="(fileList)=>onRemove(fileList,'hiddenTroubleInvestigationSystem')"
                :photos="form.hiddenTroubleInvestigationSystem"
              ></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司介绍">
          <el-input class="contentInput" v-model="form.companyIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="contentInput" v-model="form.remark"></el-input>
        </el-form-item>

        <!-- 下一步按钮 -->
        <el-form-item class="middle">
          <el-button type="primary" @click="$parent.previous()">上一步</el-button>
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
          <el-button type="primary" @click="nextTo">提交</el-button>
        </el-form-item>

      </el-form>
    </div>


  </div>
</template>

<script>
import {enterpriseNewListAPI} from "@/api/personnel/organization";
import {saveExtraAPI} from "@/api/editorPage";

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
          ...res.data.extra,
          safetySupervisionLevel: res.data.extra.safetySupervisionLevel ? res.data.extra.safetySupervisionLevel.key : "",
          regulatoryClassification: res.data.extra.regulatoryClassification ? res.data.extra.regulatoryClassification.key : "",
          isHighRiskProcesses: res.data.extra.isHighRiskProcesses ? res.data.extra.isHighRiskProcesses.key : "",
          isKeySupervision: res.data.extra.isKeySupervision ? res.data.extra.isKeySupervision.key : "",
          businessLicenseCategory: res.data.extra.businessLicenseCategory ? res.data.extra.businessLicenseCategory.key : "",
          isUseDramaDrug: res.data.extra.isUseDramaDrug ? res.data.extra.isUseDramaDrug.key : "",
        }
        this.form.hiddenTroubleInvestigationPlan = res.data.extra.hiddenTroubleInvestigationPlan.map(item => {
          return {
            ...item,
            name: item.originalFilename
          }
        })
        this.form.hiddenTroubleInvestigationSystem = res.data.extra.hiddenTroubleInvestigationSystem.map(item => {
          return {
            ...item,
            name: item.originalFilename
          }
        })
      }
    },
    nextTo() {
      this.$parent.next();
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await saveExtraAPI({
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
  padding: 20px;
  height: 88%;
  overflow: auto;
}


/deep/ .contentInput {
  .el-input__inner {
    height: 85px;
  }
}

.middle {
  display: flex;
  justify-content: center;
}

</style>
