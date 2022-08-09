export default {
  // 变更验收
  "/securityChanges/acceptance": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chongzhi", "xinzeng", "chaxun"],
    operationButtons: ["chakan", "yanshoushenqing", "shanchu", "yanshou2"],
    dictionary: [],
  },
  // 评估表库设置
  "/securityChanges/sheetLibrary": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun",],
    operationButtons: ["chakan", "bianji","shanchu"],
    dictionary: [],
  },
  // 变更申请
  "/securityChanges/application": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun","chongzhi"],
    operationButtons: ["bianji", "shanchu", "chakan","pinggu","shenpi"],
    dictionary: ["CHANGE_LEVEL"],
  },
};
