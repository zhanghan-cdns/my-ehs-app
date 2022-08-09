<template>
  <div style="height: 100%;">
    <!-- 标题 -->
    <div class="title">
      <img src="../../../../assets/images/tool.png" alt=""/>
      <span>企业基本信息</span>
    </div>

    <!-- 内容 -->
    <div class="dataList">
      <el-form ref="form" :model="form" label-width="auto" :rules="rules">
        <el-form-item label="企业名称" prop="entName">
          <el-input clearable placeholder="企业名称" v-model="form.entName"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="企业编码" prop="entCode">
              <el-input clearable placeholder="企业编码" v-model="form.entCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="entUscc">
              <el-input clearable placeholder="统一社会信用代码" v-model="form.entUscc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 城市选择 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="行政区域（省市区）">
              <el-cascader
                clearable
                style="width: 100%"
                placeholder="请选择行政区域"
                size="medium"
                :options="options"
                v-model="selectedOptions"
                ref="cascaderAddr"
                @change="handleAreaLinkageChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="镇或街道"
              prop="entTown"

            >
              <el-input clearable placeholder="镇或街道" v-model="form.entTown"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="村或社区"
              prop="entVillage"

            >
              <el-input clearable placeholder="村或社区" v-model="form.entVillage"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 行政 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="行政区划" prop="entDistrict">
              <el-input style="width: 100%" clearable placeholder="行政区划" v-model="form.entDistrict"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所在县（市、区）行政区域编码"
              prop="entCountryCode"
            >
              <el-input clearable placeholder="所在县（市、区）行政区域编码" style="width: 100%"
                        v-model="form.entCountryCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所在乡镇（街道）行政 区域编码" prop="entTownCode">
              <el-input clearable placeholder="所在乡镇（街道）行政 区域编码" style="width: 100%"
                        v-model="form.entTownCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在村（社区）行政区 域编码" prop="entVillageCode">
              <el-input clearable placeholder="所在村（社区）行政区 域编码" style="width: 100%"
                        v-model="form.entVillageCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工商注册地址" prop="entRegAddr">
              <el-input clearable placeholder="工商注册地址" v-model="form.entRegAddr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产经营地址" prop="entProdAddr">
              <el-input placeholder="生产经营地址" clearable
                        v-model="form.entProdAddr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码" prop="entPostalCode">
              <el-input clearable placeholder="邮政编码" v-model="form.entPostalCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立日期" prop="entFoundDate">
              <el-date-picker
                v-model="form.entFoundDate"
                type="date"
                placeholder="选择日期时间"
                clearable
                value-format="yyyy-MM-dd"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全值班电话" prop="entSafetyDutyTel">
              <el-input clearable placeholder="安全值班电话" v-model="form.entSafetyDutyTel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业联系电话" prop="entFixPhone">
              <el-input clearable placeholder="企业联系电话" v-model="form.entFixPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否为国有企业" prop="entIsStateEnt">
              <el-radio-group v-model="form.entIsStateEnt">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="entEmail">
              <el-input clearable placeholder="电子邮箱" v-model="form.entEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册资金（万元）" prop="entRegFund">
              <el-input-number clearable placeholder="注册资金（万元）" v-model="form.entRegFund"
                               style="width: 100%"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="经营状态"
              style="width: 100%"
              prop="entBusinessStatus"
            >
              <el-select placeholder="经营状态" clearable v-model="form.entBusinessStatus" style="width: 100%">
                <el-option v-for="item in dictConfig.entBusinessStatus" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否有母公司"
              prop="entHasParentCompany"
            >
              <el-radio-group
                v-model="form.entHasParentCompany">
                <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                  {{ item.dictValueName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集团公司名称" prop="entGroupName">
              <el-input clearable placeholder="集团公司名称" v-model="form.entGroupName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="企业隶属关系" prop="entSubordination"
          >
            <el-select placeholder="请选择企业隶属关系" clearable v-model="form.entSubordination" style="width: 100%">
              <el-option v-for="item in dictConfig.entSubordination" :key="item.id" :value="item.dictValue"
                         :label="item.dictValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业执照">
              <basic-upload
                key="picture"
                @onSuccess="(fileList)=>onSuccess(fileList,'entBusinessLicense')"
                @onRemove="(fileList)=>onRemove(fileList,'entBusinessLicense')"
                :photos="form.entBusinessLicense"
              ></basic-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业logo">
              <basic-upload
                key="picture"
                @onSuccess="(fileList)=>onSuccess(fileList,'entLogo')"
                @onRemove="(fileList)=>onRemove(fileList,'entLogo')"
                :photos="form.entLogo"
              ></basic-upload>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="经济类型大类" prop="entEconomyTypeB">
              <el-select
                v-model="form.entEconomyTypeB"
                placeholder="请选择经济类型大类"
                style="width: 100%"
                @change="(value)=>handleChangeMethods(value,'entEconomyTypeSList')"
                clearable
              >
                <el-option v-for="item in dictConfig.entEconomyTypeB" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经济类型小类" prop="entEconomyTypeS">
              <el-select
                v-model="form.entEconomyTypeS"
                placeholder="请选择经济类型小类"
                style="width: 100%"
                clearable
              >
                <el-option v-for="item in entEconomyTypeSList" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="行业监管大类" prop="entIndustryRegulaB"
            >
              <el-select
                v-model="form.entIndustryRegulaB"
                placeholder="请选择行业监管大类"
                clearable
                style="width: 100%"
                @change="(value)=>handleChangeMethods(value,'entIndustryRegulaSList')"
              >
                <el-option v-for="item in dictConfig.entIndustryRegulaB" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="行业监管小类"
              prop="entIndustryRegulaS"
            >
              <el-select
                v-model="form.entIndustryRegulaS"
                placeholder="请选择行业监管小类"
                style="width: 100%"
                clearable
              >
                <el-option v-for="item in entIndustryRegulaSList" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属行业门类" prop="industryCategory">
              <el-select
                v-model="form.industryCategory"
                placeholder="请选择所属行业门类"
                style="width: 100%"
                clearable
                @change="(value)=>handleChangeMethods(value,'IndustryTypeBList')"
              >
                <el-option v-for="item in dictConfig.entIndustryCategory" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业大类" prop="industryTypeB">
              <el-select
                v-model="form.industryTypeB"
                placeholder="请选择"
                style="width: 100%"
                @change="(value)=>handleChangeMethods(value,'IndustryTypeMList')"
              >
                <el-option v-for="item in IndustryTypeBList" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属行业中类" prop="industryTypeM">
              <el-select
                v-model="form.industryTypeM"
                placeholder="请选择所属行业中类"
                style="width: 100%"
                clearable
                @change="(value)=>handleChangeMethods(value,'IndustryTypeSList')"
              >
                <el-option v-for="item in IndustryTypeMList" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业小类" prop="industryTypeS">
              <el-select
                v-model="form.industryTypeS"
                placeholder="请选择所属行业小类"
                style="width: 100%"
                clearable
              >
                <el-option v-for="item in IndustryTypeSList" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="安全生产许可证编号"
              prop="safetyProductionLicense"
            >
              <el-input clearable placeholder="安全生产许可证编号" v-model="form.safetyProductionLicense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="年销售收入（万元）"
              prop="annualSalesRevenue"
            >
              <el-input clearable placeholder="年销售收入（万元）" v-model="form.annualSalesRevenue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="企业类型/领证类型"
              prop="businessType"
            >
              <el-select placeholder="企业类型/领证类型" clearable v-model="form.businessType" style="width: 100%">
                <el-option v-for="item in dictConfig.entBusinessType" :key="item.id" :value="item.dictValue"
                           :label="item.dictValueName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="安全管理机构成员数量"
              prop="entSafeOrgEmpNum"
            >
              <el-input placeholder="安全管理机构成员数量" clearable v-model="form.entSafeOrgEmpNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="企业规模" prop="entScale">
          <el-select placeholder="企业规模" clearable v-model="form.entScale" style="width: 100%">
            <el-option v-for="item in dictConfig.entScale" :key="item.id" :value="item.dictValue"
                       :label="item.dictValueName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="middle">
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
          <el-button type="primary" @click="nextTo">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {regionData, CodeToText, TextToCode} from "element-china-area-data";
import {imgUrl, baseUrl} from "@/router/axios";
import {fastGetDictAPI} from "@/api/system/dictionary";
import {enterpriseAPI} from "@/api/editorPage/index";
import {enterpriseNewListAPI} from "@/api/personnel/organization/index";
import rules from "./rules.js";

export default {
  data() {
    return {
      imgUrl,
      baseUrl,
      // 表单验证
      rules:rules.enterpriseBasic,
      options: regionData,
      selectedOptions: [],
      // 前面部分的地址
      frontAddress: "",
      // 后面的细节地址
      address: "",

      // 表单
      form: {
        entProvince: "", //省
        entCity: "", //市
        entCountry: "", //区
        entName: "", //企业名称
        entCode: "", //企业编码
        entUscc: "", //统一社会信用代码
        entDistrict: "", //行政区划
        entCountryCode: "", //所在县（市、区）行政区域编码
        entTownCode: "", //所在乡镇（街道）行政 区域编码
        entTown: "", //乡镇
        entVillageCode: "", //所在村（社区）行政区 域编码
        entVillage: "", //所在村（社区）
        entRegAddr: "", //工商注册地址
        entProdAddr: "", //生产经营地址
        entPostalCode: "", //邮政编码
        entFoundDate: "", //成立日期
        entSafetyDutyTel: "", //安全值班电话
        entFixPhone: "", //企业联系电话
        entIsStateEnt: "", //是否为国有企业
        entEmail: "", //电子邮箱
        entRegFund: 0, //注册资金（万元）
        entGroupName: "", //集团公司名称
        entSubordination: "", //企业隶属关系
        entEconomyTypeB: "", //经济类型大类
        entEconomyTypeS: "", //经济类型小类
        entIndustryRegulaB: "", //行业监管大类
        entIndustryRegulaS: "", //行业监管小类
        industryCategory: "", //所属行业门类
        industryTypeB: "", //所属行业大类
        industryTypeM: "", //所属行业中类
        industryTypeS: "", //所属行业小类
        safetyProductionLicense: "", //安全生产许可证编号
        annualSalesRevenue: "", //年销售收入（万元）
        businessType: "", //企业类型/领证类型
        entSafeOrgEmpNum: 0,//安全管理机构成员数量
        entScale: "", //企业规模
        entBusinessStatus: "", //经营状态
        entHasParentCompany: "", //是否有母公司
        entBusinessLicense: [],//营业执照
      },
      entEconomyTypeSList: [],//经济类型小类
      entIndustryRegulaSList: [],//行业监管小类
      IndustryTypeBList: [],//所属行业大类
      IndustryTypeMList: [],//所属行业中类
      IndustryTypeSList: [],//所属行业小类
    };
  },
  props: ["dictConfig"],
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await enterpriseNewListAPI();
      if (res.code === 200) {
        // 处理联动下拉
        if (res.data.entEconomyTypeB) {
          await this.handleChangeMethods(res.data.entEconomyTypeB.key, "entEconomyTypeSList")
        }
        if (res.data.entIndustryRegulaB) {
          await this.handleChangeMethods(res.data.entIndustryRegulaB.key, "entIndustryRegulaSList")
        }
        if (res.data.industryCategory) {
          await this.handleChangeMethods(res.data.industryCategory.key, "IndustryTypeBList")
        }
        if (res.data.industryTypeB) {
          await this.handleChangeMethods(res.data.industryTypeB.key, "IndustryTypeMList")
        }
        if (res.data.industryTypeM) {
          await this.handleChangeMethods(res.data.industryTypeM.key, "IndustryTypeSList")
        }
        // 回填表单
        this.form = {
          ...res.data,
          entIsStateEnt: res.data.entIsStateEnt ? res.data.entIsStateEnt.key : "",
          entHasParentCompany: res.data.entHasParentCompany ? res.data.entHasParentCompany.key : "",
          entBusinessStatus: res.data.entBusinessStatus ? res.data.entBusinessStatus.key : "",
          entSubordination: res.data.entSubordination ? res.data.entSubordination.key : "",
          entEconomyTypeB: res.data.entEconomyTypeB ? res.data.entEconomyTypeB.key : "",//经济大类
          entEconomyTypeS: res.data.entEconomyTypeS ? res.data.entEconomyTypeS.key : "",
          entIndustryRegulaB: res.data.entIndustryRegulaB ? res.data.entIndustryRegulaB.key : "",//行业监管大类
          entIndustryRegulaS: res.data.entIndustryRegulaS ? res.data.entIndustryRegulaS.key : "",//行业监管小类
          industryCategory: res.data.industryCategory ? res.data.industryCategory.key : "",//所属行业门类
          industryTypeB: res.data.industryTypeB ? res.data.industryTypeB.key : "",//所属行业大类
          industryTypeM: res.data.industryTypeM ? res.data.industryTypeM.key : "",//所属行业中类
          industryTypeS: res.data.industryTypeS ? res.data.industryTypeS.key : "",//所属行业小类
          businessType: res.data.businessType ? res.data.businessType.key : "",
          entScale: res.data.entScale ? res.data.entScale.key : ""
        }
        this.selectById()//加载回显三级级联
      }
    },
    //表单提交事件
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await enterpriseAPI(this.form);
          if (res.code === 200) {
            this.$message.success("保存成功");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    nextTo() {
      this.$parent.next();
    },
    //省市区三级联动事件
    handleAreaLinkageChange(value) {
      if (value.length > 0) {
        this.form.entProvince = CodeToText[this.selectedOptions[0]];
        this.form.entCity = CodeToText[this.selectedOptions[1]];
        this.form.entCountry = value[2] ? CodeToText[this.selectedOptions[2]] : "";
      }
    },
    //行政区域的回显
    selectById() {
      if (this.form.entCountry && this.form.entProvince && this.form.entCity) {
        this.selectedOptions = [
          TextToCode[this.form.entProvince].code,
          TextToCode[this.form.entProvince][this.form.entCity].code,
          TextToCode[this.form.entProvince][this.form.entCity][this.form.entCountry].code,
        ];
      } else if (this.form.entProvince && this.form.entCity) {
        this.selectedOptions = [
          TextToCode[this.form.entProvince].code,
          TextToCode[this.form.entProvince][this.form.entCity].code,
        ];
      }

    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    // 联动框选择
    async handleChangeMethods(value, list) {
      const res = await fastGetDictAPI(value)
      if (res.code === 200) {
        this[list] = res.data.children;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 14px;
  border-bottom: 1px solid #d3d3d3;

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
