// 应急演练
export default {
  // 应急演练计划
  "/emergency/emergencyDrill/emergencyDrillPlan": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daochu","xinzeng", "chaxun"],
    operationButtons: ["fabu2","chakan", "bianji", "shanchu","xinzengpingjia",'chakanpingjia'],
    dictionary: [""],
  },
  // 应急演练评价
  "/emergency/emergencyDrill/drillEvaluation": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun"],
    operationButtons: ["xinzengyanlianzhenggai","chakan", "bianji", "shanchu"],
    dictionary: [""],
  },
};
