export default {
  // 指标配置表
  "/duty/duty_standard_provide": {
    $leftWidth: 0,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_ALLOCATION_TYPE','DUTY_ALLOCATION_CHECK_FREQUENCY']
  },
  // 指标分配
  "/duty/duty_standard_allocation": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_ALLOCATION_CHECK_FREQUENCY','DUTY_ALLOCATION_TYPE']
  },
  // 安全管理网络
  "/duty/duty_safety_manage": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["jiagoutu", "xinzeng", "chaxun", "chongzhi", ],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: []
  },
  // 考核分析
  "/duty/duty_indicator": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daochu", "chaxun"],
    operationButtons: ["chakan", "bianji", "shanchu", "kaohe", "ziping"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_TARGET_ASSESS_MONTH']
  },
 
  // 费用提取
  "/duty/duty_cost_extract": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_COST_USE_INDUSTRY_TYPE']
  },
  // 费用预算
  "/duty/duty_cost_budget": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_COST_BUGET_TYPE']
  },
   // 费用使用
   "/duty/duty_cost_use": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi", "daoru", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year','DUTY_COST_USE_INDUSTRY_TYPE','DUTY_COST_BUGET_TYPE']
  },
  // 安全责任书-下发
  "/duty/duty_doc": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi", "piliangxiafa"],
    operationButtons: ["chakan", "bianji", "shanchu", "xiafa"],
    dictionary: []
  },
  "/duty/receipt": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu", "kaohe"],
    dictionary: []
  },
  "/duty/sign": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
  },
  "/duty/signBoodk": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi", "qianding"],
    operationButtons: ["chakan", "bianji", "shanchu", "xiafa",],
    dictionary: []
  },
  "/duty/commitment": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: []
  },
  "/duty/letter": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi",],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: []
  },
  "/duty/book": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
  },
  "/duty/offlineStatement": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu", "qianding",],
    dictionary: []
  },
  "/duty/duty_responsibility": {
    $leftWidth: 0,
    $rightWidth: 24,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    isTree: true,
    dictionary: []
  },
  "/duty/duty_assess_record": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['DUTY_ALLOCATION_Year',]
  }
  
  
};
