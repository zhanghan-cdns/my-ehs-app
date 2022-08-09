export default {
  // 路由名称
  "/education/threeLevel": {
    // 左布局宽度
    $leftWidth: 0,
    // 右布局宽度
    $rightWidth: 24,
    // 是否为树
    isTree: true,
    // 头部按钮
    headerButtons: [],
    // 表格操作按钮
    operationButtons: [],
  },
  // 在线学习
  "/education/threeLevel/curriculum": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
  },
  // 在线考试
  "/education/threeLevel/examination": {
    $leftWidth: 0,
    $rightWidth: 24,
  },
  // 培训记录
  "/education/threeLevel/trainingRecords": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: [
      // "daoru",
      // "daochu",
      "chaxun",
      "chongzhi",
      "xinzeng",
    ],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  // 试卷
  "/education/threeLevel/testPaper": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: [],
    operationButtons: ["chongzhimima", "xiugaimima", "bianji", "shanchu"],
  },

  //课程管理
  "/education/trainingSettings/courseManagement": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [
      "EDUCATION_SET_TRAININGCATEGORY",
      "COMMON_JUDGE",
      "EDUCATION_SET_COURSE_TRAINLEVEL",
    ],
  },
  //课件库管理
  "/education/trainingSettings/coursewareManagement": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chaxun", "xinzeng", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [
      "EDUCATION_SET_WARELIBRARY_FILETYPE",
      "EDUCATION_SET_WARELIBRARY_CATEGORY",
    ],
  },
  //试题库管理
  "/education/trainingSettings/questionBank": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [
      "EDUCATION_SET_EXAMSTATUS",
      "COMMON_JUDGE",
      "EDUCATION_SET_QUESTION_TYPE",
    ],
  },
  //出卷规则
  "/education/trainingSettings/testPaperRule": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["EDUCATION_SET_TRAININGCATEGORY"],
  },
  //讲师管理
  "/education/trainingSettings/instructorManagement": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["EDUCATION_SET_EDUCATION", "COMMON_GENDER"],
  },
  //线上培训记录
  "/education/threeLevel/onlineTrainingRecords": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  //奖惩记录
  "/education/rewardPunishmentRecords": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  /*          安全取证培训       */
  //取证培训档案
  "/education/safetyCertificationTraining/forensicsTrainingArchives": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['EDUCATION_SAFETRAIN_CER_TYPE','EDUCATION_SAFETRAIN_WORK_TYPE','EDUCATION_SAFETRAIN_OFFICIAL_TYPE'],
  },
  //企业证书信息
  "/education/safetyCertificationTraining/enterpriseCertificateInformation": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['EDUCATION_SAFETRAIN_CER_TYPE','EDUCATION_SAFETRAIN_OFFICIAL_TYPE'],
  },
  //证书数量对比
  "/education/safetyCertificationTraining/certificateQuantityComparison": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['EDUCATION_SAFETRAIN_CER_TYPE'],
  },
  //外来方证书信息
  "/education/safetyCertificationTraining/foreignPartyCertificate": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chongzhi", "chaxun", "xinzeng"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ['EDUCATION_SAFETRAIN_CER_TYPE','EDUCATION_SAFETRAIN_OFFICIAL_TYPE','COMMON_JUDGE'],
  },

  // ----------------------日常培训-----------------
  // 培训计划
  // 培训需求调查
  "/education/dailyTraining/trainingPlan/trainingDemandSurvey": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["toupiao", "shanchu"],
    dictionary: [],
  },

  // 安全培训计划
  "/education/dailyTraining/trainingPlan/safetyTrainingPlan": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["daochu", "chaxun", "xinzeng"],
    operationButtons: ["chakan","shanchu","bianji"],
    dictionary: ["COMMON_JUDGE",'EDUCATION_DAILY_TRAIN_CATEGORY','EDUCATION_DAILY_TRAIN_TYPE'],
  },

  // ----------------------在线学习与考试-----------------
  //在线学习
  "/education/dailyTraining/onlineLearningAndExamination/onlineLearning": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: [],
    operationButtons: [],
    dictionary: [],
  },
  //在线考试
  "/education/dailyTraining/onlineLearningAndExamination/onlineExamination": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: [],
    operationButtons: [],
    dictionary: [],
  },
  // ----------------------日常培训记录-----------------
  //培训记录
  "/education/dailyTraining/dailyTrainingRecords": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["jiangcheng", "daochu", "chongzhi", "xinzeng", "chaxun"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: ["COMMON_JUDGE"],
  },
  // ----------------------日常培训统计-----------------
  //日常培训汇总
  "/education/dailyTraining/dailyTrainingStatistics/summary": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chongzhi", "chaxun"],
    operationButtons: [],
    dictionary: [],
  },
  //日常培训统计
  "/education/dailyTraining/dailyTrainingStatistics/statistics": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chongzhi", "chaxun"],
    operationButtons: [],
    dictionary: [],
  },
  // ----------------------日常培训档案-----------------
  // 个人培训档案
  "/education/dailyTraining/trainingFiles/personalTrainingFiles": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chongzhi", "chaxun"],
    operationButtons: ["chakan"],
    dictionary: [],
  },

  // 管理个人培训档案
  "/education/dailyTraining/trainingFiles/manageTrainingFiles": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chongzhi", "chaxun"],
    operationButtons: [],
    dictionary: [],
  },
  // ----------------------日常培训评估----------------
  //培训评估
  "/education/dailyTraining/trainingEffectEvaluation/trainingEvaluation": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chongzhi", "chaxun"],
    operationButtons: ["pinggu"],
    dictionary: [],
  },
  //培训设置
  "/education/dailyTraining/trainingEffectEvaluation/trainingEvaluationSet": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["xinzeng"],
    operationButtons: ["chakan"],
    dictionary: ["COMMON_JUDGE"],
    dictionary: [],
  },

  // ----------------------年度培训完成率----------------
  "/education/dailyTraining/annualTrainingCompletionRate": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ["chakan"],
    dictionary: [],
  },

  // -----------------------外来方培训--------------------------
  // 在线学习
  "/education/externalPartyTraining/curriculum": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: false,
    dictionary: ["COMMON_JUDGE"],
    dictionary: [],
  },
  // 在线考试
  "/education/externalPartyTraining/examination": {
    $leftWidth: 0,
    $rightWidth: 24,
    dictionary: ["COMMON_JUDGE"],
    dictionary: [],
  },
  // 培训记录
  "/education/externalPartyTraining/trainingRecords": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: false,
    headerButtons: ["daochu","xinzeng","chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [],
  },
  // 考试记录
  "/education/externalPartyTraining/examinationRecords": {
    $leftWidth: 0,
    $rightWidth: 24,
    headerButtons: ["daochu", "chaxun", "chongzhi"],
    operationButtons: ["chakan","pingzheng"],
    dictionary: [],
  },
 
};
