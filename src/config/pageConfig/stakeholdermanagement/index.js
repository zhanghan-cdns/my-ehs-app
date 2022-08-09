export default {
  //相关方管理
  "/stakeholdermanagement/stakeholderinfo": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: [
      "chakan",
      "bianji",
      "shanchu",
      "shenpi",
      "guanlianxinxi",
    ],
    dictionary: ["RELATED_INFO_RELATED_PARTY_CATEGORY","RELATED_INFO_INDUSTRY_TYPE"],
  },
  //施工方管理
  "/stakeholdermanagement/constructionmanage": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu", "shenpi"],
    dictionary: ["COMMON_JUDGE", "COMMON_GENDER"],
  },
  // 评定管理
  "/stakeholdermanagement/assessmentmanage": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["pingdingneirongshezhi", "pingding", "chaxun"],
    operationButtons: ["chakan", "bianji"],
  },
  // 违章记录

  "/stakeholdermanagement/violationrecord": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  // 项目管理
  "/stakeholdermanagement/projectmanage": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
};
