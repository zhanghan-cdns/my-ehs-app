export default {
  // 双预防
  "/doubleprevention/riskclamancon/riskmap": {
    $leftWidth: 0,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["DOUBLE_PREVENTION_RISK_LEVEL"],
  },
  "/doubleprevention/riskclamancon/riskarea": {
    $leftWidth: 0,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu", "pinggu"],
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/riskanalysisunit": {
    $leftWidth: 0,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["DOUBLE_PREVENTION_RISK_TYPE"],
  },
  // 风险对象
  "/doubleprevention/riskclamancon/riskanalysisobject": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "chakan",
      "bianji",
      "shanchu",
      "xiugaizhuangtai",
      "chakandanyuan",
    ],
    dictionary: [
      "DOUBLE_PREVENTION_RISK_ANALYSIS_OBJECT_TYPE",
      "RISK_TYPE",
      "DOUBLE_PREVENTION_RISK_ANALYSIS_OBJECT_STATUS",
      "ACCIDENT_TYPE",
    ],
  },
  // 风险等级
  "/doubleprevention/riskclamancon/riskanalysisevents": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi", "riskCard"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["MANAGEMENT_LEVEL", "DOUBLE_PREVENTION_RISK_LEVEL"],
  },
  // 风险管控措施
  "/doubleprevention/riskclamancon/riskmanconmea": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [
      "DOUBLE_PREVENTION_RISK_INSPECTION_CYCLE_UNIT",
      "MANAGEMENT_LEVEL",
      "DOUBLE_PREVENTION_RISK_MAN_CON_TYPE",
      "DOUBLE_PREVENTION_RISK_MAN_CON_MEA_CLA1",
    ],
  },
  "/doubleprevention/riskclamancon/inventory": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/tasklist": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["zhixing", "jianchajilu"],
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/hiddentromanage": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: [
      "yanqijilu",
      "chakanshenpi",
      "chakan",
      "bianji",
      "shanchu",
    ],
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/delayrecord": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },

  "/doubleprevention/riskclamancon/effect_evaluation": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },

  "/doubleprevention/riskclamancon/rewpunrec": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/pointsdisplay": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  "/doubleprevention/riskclamancon/hidstalib": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  // 风险详情
  "/riskDetails": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: [],
    operationButtons: [],
    dictionary: [],
  },
  "/doubleprevention/securitycheck/checklistlibrary": {
    $leftWidth: 0,
    $rightWidth: 24,
    headerButtons: ["xinzeng", "chaxun", "chongzhi", "daoru"],
    operationButtons: [],
    dictionary: ["COMMON_JUDGE"],
  },
  // 专家检查
  "/doubleprevention/securitycheck/expertinspection": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: ["COMMON_JUDGE"],
  },

  // -------------随手拍
  // 随手拍记录
  "/doubleprevention/takePhotosCasually/record": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: ["COMMON_JUDGE"],
  },
  // 随手拍审核
  "/doubleprevention/takePhotosCasually/examination": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan", "shenpi"],
    dictionary: ["COMMON_JUDGE"],
  },
  //  巡检记录
  "/doubleprevention/riskclamancon/inspectionecord": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ["chakan", "xunjianguiji", "shanchu"],
    dictionary: ["COMMON_JUDGE"],
  },
  // 自定义巡检点设置
  "/doubleprevention/riskclamancon/inspectionpointsettings": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan", "shenpi"],
    dictionary: ["COMMON_JUDGE", 'DOUBLE_PREVENTION_RISK_INSPECTION_CYCLE_UNIT'],
  },
  // 巡检班次任务设置
  "/doubleprevention/riskclamancon/shifttasksettings": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: ["COMMON_JUDGE", 'DOUBLE_PREVENTION_RISK_INSPECTION_CYCLE_UNIT'],
  },
  //巡检内容库表
  "/doubleprevention/riskclamancon/inspcontenttablelibrary": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["daoru", "daochu", "chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: ['DOUBLE_PREVENTION_RISK_LEVEL'],
  },
  //巡检次数统计
  "/doubleprevention/riskclamancon/inspectiontimes": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: ['DOUBLE_PREVENTION_RISK_LEVEL'],
  }
};
