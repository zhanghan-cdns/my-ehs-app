export default {
  enterpriseBasic: {
    entName: [
      {required: true, message: "请输入企业名称", trigger: "blur"},
    ],
    entCode: [
      {required: true, message: "请输入企业编码", trigger: "blur"},
    ],
    entUscc: [
      {
        required: true,
        message: "请输入统一社会信用代码",
        trigger: "blur",
      },
    ],
    entTown: [
      {
        required: true,
        message: "请输入乡镇",
        trigger: "blur",
      },
    ],
    entVillage: [
      {
        required: true,
        message: "请输入街道",
        trigger: "blur",
      },
    ],
    entDistrict: [
      {
        required: true,
        message: "请输入行政区划 ",
        trigger: "blur",
      },
    ],
    entCountryCode: [
      {
        required: true,
        message: "请输入行政区域编码",
        trigger: "blur",
      },
    ],
    entTownCode: [
      {
        required: true,
        message: "请输入行政区域编码",
        trigger: "blur",
      },
    ],
    entVillageCode: [
      {
        required: true,
        message: "请输入行政区域编码",
        trigger: "blur",
      },
    ],
    entRegAddr: [
      {
        required: true,
        message: "请输入工商注册地址",
        trigger: "blur",
      },
    ],
    entProdAddr: [
      {
        required: true,
        message: "请输入生产经营地址",
        trigger: "blur",
      },
    ],
    entPostalCode: [
      {
        required: true,
        message: "请输入邮政编码",
        trigger: "blur",
      },
    ],
    entFoundDate: [
      {
        required: true,
        message: "请输入成立日期",
        trigger: "blur",
      },
    ],
    entSafetyDutyTel: [
      {
        required: true,
        message: "请输入安全值班电话",
        trigger: "blur",
      },
    ],
    entFixPhone: [
      {
        required: true,
        message: "请输入企业联系电话",
        trigger: "blur",
      },
    ],
    entEmail: [
      {
        required: true,
        message: "请输入电子邮箱",
        trigger: "blur",
      },
    ],
    entRegFund: [
      {
        required: true,
        message: "请输入注册资金",
        trigger: "blur",
      },
    ],
    entBusinessStatus: [
      {
        required: true,
        message: "请选择经营状态",
        trigger: "change",
      },
    ],
    entHasParentCompany: [
      {
        required: true,
        message: "请选择是否有母公司",
        trigger: "change",
      },
    ],
    entGroupName: [
      {
        required: true,
        message: "请输入集团公司名称",
        trigger: "blur",
      },
    ],
    entIsStateEnt: [
      {
        required: true,
        message: "请选择是否有国有企业",
        trigger: "change",
      },
    ],
    entSubordination: [
      {
        required: true,
        message: "请选择企业隶属关系",
        trigger: "change",
      },
    ],
    entEconomyTypeB: [
      {
        required: true,
        message: "请选择经济类型大类",
        trigger: "change",
      },
    ],
    entEconomyTypeS: [
      {
        required: true,
        message: "请选择经济类型小类",
        trigger: "change",
      },
    ],
    entIndustryRegulaB: [
      {
        required: true,
        message: "请选择行业监管大类",
        trigger: "change",
      },
    ],
    entIndustryRegulaS: [
      {
        required: true,
        message: "请选择行业监管小类",
        trigger: "change",
      },
    ],
    industryCategory: [
      {
        required: true,
        message: "请选择所属行业门类",
        trigger: "change",
      },
    ],
    industryTypeB: [
      {
        required: true,
        message: "请选择所属行业大类",
        trigger: "change",
      },
    ],
    industryTypeM: [
      {
        required: true,
        message: "请选择所属行业中类",
        trigger: "change",
      },
    ],
    industryTypeS: [
      {
        required: true,
        message: "请选择所属行业小类",
        trigger: "change",
      },
    ],
    safetyProductionLicense: [
      {
        required: true,
        message: "请输入安全生产许可证编号",
        trigger: "blur",
      },
    ],
    annualSalesRevenue: [
      {
        required: true,
        message: "请输入年销售收入（万元）",
        trigger: "blur",
      },
    ],
    businessType: [
      {
        required: true,
        message: "请输入领证类型",
        trigger: "blur",
      },
    ],
    entSafeOrgEmpNum: [
      {
        required: true,
        message: "请输入安全管理机构成员数量",
        trigger: "blur",
      },
    ],
    entScale: [
      {
        required: true,
        message: "请选择企业规模",
        trigger: "change",
      },
    ]
  },
  locationPersonnel:{
    entLongitude: [
      {required: true, message: "请输入经度", trigger: "blur"},
    ],
    entLatitude: [
      {required: true, message: "请输入纬度", trigger: "blur"},
    ],
  },
  statisticaBasic:{
    entLegalRepresentor:[
      {required: true, message: "请输入法人代表", trigger: "blur"},
    ],
    legalRepresentativeNum:[
      {required: true, message: "请输入法定代表人电话", trigger: "blur"},
    ],
    isLegalRepresent:[
      {required: true, message: "请选择是否法定代表人", trigger: "change"},
    ],
    enterpriseManNum:[
      {required: true, message: "请输入企业负责人固定电话", trigger: "blur"},
    ],
    safetyCall:[
      {required: true, message: "请输入安全值班电话", trigger: "blur"},
    ],
    entEmail:[
      {required: true, message: "请输入企业邮箱", trigger: "blur"},
    ],
    fax:[
      {required: true, message: "请输入企业传真", trigger: "blur"},
    ],
    parentCompanyMan:[
      {required: true, message: "请输入母公司负责人", trigger: "blur"},
    ],
    parentCompanyManNum:[
      {required: true, message: "请输入母公司负责人电话", trigger: "blur"},
    ],
    chairman:[
      {required: true, message: "请输入董事长", trigger: "blur"},
    ],
    chairmanNum:[
      {required: true, message: "请输入董事长电话", trigger: "blur"},
    ],
    manager:[
      {required: true, message: "请输入总经理", trigger: "blur"},
    ],
    managerNum:[
      {required: true, message: "请输入总经理电话", trigger: "blur"},
    ],
    largestShareholder:[
      {required: true, message: "请输入第一大股东", trigger: "blur"},
    ],
    largestShareholderNum:[
      {required: true, message: "请输入第一大股东电话", trigger: "blur"},
    ],
    technicalDirector:[
      {required: true, message: "请输入技术负责人", trigger: "blur"},
    ],
    technicalDirectorNum:[
      {required: true, message: "请输入技术负责人电话", trigger: "blur"},
    ],
    securityDirector:[
      {required: true, message: "请输入安全总监", trigger: "blur"},
    ],
    securityDirectorNum:[
      {required: true, message: "请输入安全总监电话", trigger: "blur"},
    ],
    headOfSafety:[
      {required: true, message: "请输入安全负责人", trigger: "blur"},
    ],
    headOfSafetyNum:[
      {required: true, message: "请输入安全负责人电话", trigger: "blur"},
    ],
    employeesNum:[
      {required: true, message: "请输入从业人员数量", trigger: "blur"},
    ],
    entSpecialWorkNum:[
      {required: true, message: "请输入特种作业人员数量", trigger: "blur"},
    ],
    entRegSafeEngineerNum:[
      {required: true, message: "请输入注册安全工程师数量", trigger: "blur"},
    ]
  },
  enterpriseInstitution:{
    entHasSafeOrg:[
      {required: true, message: "请选择是否有安全管理机构", trigger: "change"},
    ],
    entSafeOrgNameNum:[
      {required: true, message: "请输入安全管理机构成立文号", trigger: "blur"},
    ],
    entSafeOrgName:[
      {required: true, message: "请输入安全管理机构名称", trigger: "blur"},
    ],
    entSafeOrgEmpNum:[
      {required: true, message: "请输入安全管理机构成员数量", trigger: "blur"},
    ],
    entSafeOrgDuty:[
      {required: true, message: "请输入安全管理机构职责", trigger: "blur"},
    ]
  }
}
