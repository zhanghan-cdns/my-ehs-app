export default {
  "/enterprise/entPersonnel": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "chakan", "shanchu"],
    dictionary: [],
  },
  "/enterprise/entPersonCert": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "chakan", "shanchu"],
    dictionary: [],
  },
  "/enterprise/assessReport": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "chakan", "shanchu"],
    dictionary: [],
  },
  "/enterprise/publicWorks": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "chakan", "shanchu"],
    dictionary: [],
  },
  "/enterprise/projectThreeSim": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "chakan", "shanchu"],
    dictionary: [],
  },
  // 粉尘信息
  "/enterprise/dust": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [
      "ENT_DUST_TYPE",
      "ENT_DUST_REMOVER_TYPE",
      "COMMON_JUDGE",
      "ENT_DUST_PRODUCTION_TECH",
      "ENT_INDUSTRY",
    ],
  },
  // 有限空间
  "/enterprise/finite-space": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["ENT_ACCIDENT_TYPE"],
  },
  // 车间信息
  "/enterprise/workshop": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [
      "ENT_FIRE_RESISTANCE_RATING",
      "ENT_FIRE_HAZARD_LEVEL",
      "ENT_BUILDING_STRUCTURE",
    ],
  },
  // 储罐区
  "/enterprise/reserve": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [],
  },
  "/enterprise/tankFarm": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["COMMON_JUDGE"],
  },
  // 仓库区
  "/enterprise/warehouseArea": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [],
  },
  //生产装置
  "/enterprise/prod-unit": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["COMMON_JUDGE", "ENT_IS_DEVICE_OR_PART"],
  },
  //物料信息
  "/enterprise/materials": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [
      "COMMON_JUDGE",
      "ENT_STORAGE_MODE",
      "ENT_MATERIAL_FORM",
      "COMMON_UNIT",
      "ENT_MATERIAL_TYPE",
      "ENT_CATEGORY",
    ],
  },
  //工艺信息
  "/enterprise/process": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [
      "COMMON_JUDGE",
      "ENT_TECH_SOURCE",
      "ENT_PRODUCTION_PROCESS_NAME",
      "ENT_TECH_SOURCE",
      "ENT_INTERMEDIATE_PRODUCTS_FORM",
    ],
  },
  // 生产设备设施管理-设备设施信息管理
  "/enterprise/safetyManagement/information": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "bianji",
      "shanchu",
      "chakan",
      "baoyang",
      "jiance1",
      "jiancha",
      "jiance2",
      "weixiu",
      "tingyong",
      "huifu",
      "baofei",
    ],
    dictionary: [],
  },
  // 生产设备设施管理-特种设备
  "/enterprise/safetyManagement/specialEquipment": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "bianji",
      "shanchu",
      "chakan",
      "baoyang",
      "jiance1",
      "jiancha",
      "jiance2",
      "weixiu",
      "tingyong",
      "huifu",
      "baofei",
    ],
    dictionary: [],
  },
  // 生产设备设施管理-生产设备
  "/enterprise/safetyManagement/productionEquipment": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "bianji",
      "shanchu",
      "chakan",
      "baoyang",
      "jiance1",
      "jiancha",
      "jiance2",
      "weixiu",
      "tingyong",
      "huifu",
      "baofei",
    ],
    dictionary: [],
  },
  // 生产设备设施管理-安全设施
  "/enterprise/safetyManagement/safetyFacilities": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "bianji",
      "shanchu",
      "chakan",
      "baoyang",
      "jiance1",
      "jiancha",
      "jiance2",
      "weixiu",
      "tingyong",
      "huifu",
      "baofei",
    ],
    dictionary: [],
  },
  // 生产设备设施管理-储罐
  "/enterprise/safetyManagement/storageTank": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "bianji",
      "shanchu",
      "chakan",
      "baoyang",
      "jiance1",
      "jiancha",
      "jiance2",
      "weixiu",
      "tingyong",
      "huifu",
      "baofei",
    ],
    dictionary: [],
  },
  //危化品出入库
  "/enterprise/chemicals": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["ENT_ACCESS_TYPE"],
  },
  //仓库
  "/enterprise/room": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["COMMON_JUDGE", "ENT_FIRE_RISK_CLA"],
  },
  //证照信息
  "/enterprise/certificate": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["ENT_CERTIFICATE_TYPE"],
  },
  //  摄像头管理
  "/enterprise/cameraManagement": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: ["COMMON_JUDGE"],
  },
  // 企业信息
  "/editorPage": {
    $leftWidth: 4,
    $rightWidth: 20,
    dictionary: [
      "COMMON_JUDGE",
      "ENT_BUSINESS_STATUS",
      "ENT_SUBORDINATION",
      "ENT_BUSINESS_TYPE",
      "ENT_SCALE",
      "ENT_ECONOMY_TYPE_B",
      "ENT_INDUSTRY_REGULA_B",
      "ENT_INDUSTRY_CATEGORY",
      "ENT_SAFE_STAND_LEVEL",
      "ENT_RISK_LEVEL",
      "ENT_HIGHEST_DANGER_LEVEL",
      "ENT_DANGER_LEVEL",
      "ENT_SAFETY_SUPERVISION_LEVEL", //安全监管等级
      "ENT_REGULATORY_CLASSIFICATION", //监管分类
      "ENT_BUSINESS_LICENSE_CATEGORY", //营业执照类别
    ],
  },
  // 安全动态
  "/enterprise/securityDynamics": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun"],
    operationButtons: [],
    dictionary: [],
  },
  // 合理化建议
  "/enterprise/rationalisationAdvice": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "daochu"],
    operationButtons: ["shenpi", "bianji", "shanchu", "chakan"],
    dictionary: [],
  },
  // 安全活动
  "/enterprise/safetyActivities": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun"],
    operationButtons: ["bianji", "shanchu", "chakan"],
    dictionary: [],
  },
  // 安全会议
  "/enterprise/safetyMeeting": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun"],
    operationButtons: ["huiyijiyao", "tuichi", "bianji", "shanchu", "chakan"],
    dictionary: [],
  },
};