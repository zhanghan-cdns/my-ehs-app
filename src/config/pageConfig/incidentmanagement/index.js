export default {
  // 事故快报
  "/incidentmanagement/accidentexpress": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['ACCIDENT_REPORT_REASON', 'ACCIDENT_REPORT_ACCIDENT_LEVEL', 'ACCIDENT_REPORT_ACCIDENT_TYPE', 'ACCIDENT_REPORT_DAMAGE_LEVEL', 'ACCIDENT_REPORT_HIDDEN_FACTOR', 'ACCIDENT_REPORT_SURVEY_STATUS', 'ACCIDENT_REPORT_DAMAGE_LEVEL', 'ACCIDENT_REPORT_HIDDEN_FACTOR', 'ACCIDENT_DECLARATION_DAMAGE_LEVEL', 'ACCIDENT_REPORT_ACCIDENT_CATEGORY', 'ACCIDENT_REPORT_ACCIDENT_NATURE	']
  },
  // 事故档案
  "/incidentmanagement/accidentfile": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: []
  },
  // 事故整改
  "/incidentmanagement/accidentrectification": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["yiguanlianyinhuan", "yinhuanzhenggai"],
    dictionary: []
  },
  // 工伤申报
  "/incidentmanagement/workinjurydeclaration": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['COMMON_GENDER', 'ACCIDENT_DECLARATION_DAMAGE_LEVEL']

  },




};
