export default {
    //高处作业
    "/specialwork/highWork": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["zuoyepiao","daochu","chongzhi","chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu","gengduo"],
        dictionary: ['WORK_CERT_TYPE', 'WORK_CERT_STATUS', 'JOB_TYPE']
    },
  // 作业设置-措施设置
  "/specialwork/workSet/measureSet": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daoru", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  // 作业设置-审批设置
  "/specialwork/workSet/approvalSet": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: [],
    operationButtons: ["shangyi", "xiayi", "shangchu"],
    dictionary: [],
  },
  // 作业设置-作业安全分析库
  "/specialwork/workSet/workSafety": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daoru", "xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["WORK_STEPS", "JOB_TYPE"],
  },
  // 作业设置-危害预防措施
  "/specialwork/workSet/hazardPrevention": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daoru", "xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["HAZARD_CATEGORY"],
  },
  // 作业设置-监护人职责设置
  "/specialwork/workSet/guardianDuty": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["daoru", "xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["JOB_TYPE"],
  },
  // 动火作业
  "/specialwork/fireWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["WORK_CERT_TYPE", "WORK_CERT_STATUS", "JOB_TYPE"],
  },
  // 代办审批
  "/specialwork/agencyApproval": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan", "fenxi", "cuoshiqueren"],
    dictionary: ["WORK_CERT_TYPE", "WORK_CERT_STATUS"],
  },
  // 动土作业
  "/specialwork/landWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["WORK_CERT_TYPE", "WORK_CERT_STATUS", "JOB_TYPE"],
  },

  // 吊装作业
  "/specialwork/hoistingWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['WORK_CERT_TYPE', 'WORK_CERT_STATUS', 'JOB_TYPE']
  },

  // 盲板作业
  "/specialwork/blindWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['WORK_CERT_TYPE', 'WORK_CERT_STATUS', 'JOB_TYPE']
  },

  // 受限空间作业
  "/specialwork/spaceWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['WORK_CERT_TYPE', 'WORK_CERT_STATUS', 'JOB_TYPE']
  },


  // 临时用电
  "/specialwork/temporaryWork": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["zuoyepiao", "chaxun", "chongzhi", "daochu"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['WORK_CERT_TYPE', 'WORK_CERT_STATUS', 'JOB_TYPE']
  },
};
