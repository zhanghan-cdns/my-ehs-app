export default {
  // 基础信息
  "/hazard/hazardBase": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu"],
    dictionary: [
      "ENT_HAZARD_BASEINFO_TYPE",
      "ENT_HAZARD_BASEINFO_LEVEL",
      "ENT_HAZARD_BASEINFO_MAINDANGER",
      "ENT_HAZARD_BASEINFO_ACCIDENTTYPE",
      "ENT_HAZARD_BASEINFO_HIDDENDANGERTYPE",
      "ENT_HAZARD_BASEINFO_PRODUCTIONTYPES",
      "ENT_HAZARD_BASEINFO_HAZARDOUSPROCESS",
      "ENT_HAZARD_BASEINFO_ENVIRONMENTAL",
      "ENT_HAZARD_BASEINFO_PRODUCTIONPROPERTY"
    ]
  },
  // 指标绑定设备
  "/hazard/monitoringIndicators": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "daoru", "chongzhi"],
    operationButtons: ["chakan", "bianji", "shanchu", "bangdingbiaodian"],
    dictionary: [
      "ENT_HAZARD_MONITORING_INDEXTYPE",
      "ENT_HAZARD_MONITORING_ALARMTYPE",
      "ENT_HAZARD_MONITORING_UNITMEASURE"
    ]
  },
  // 报警管理
  "/hazard/hazardEquipAlarm": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan"],
    dictionary: []
  },
  // 视频AI报警管理
  "/hazard/hazardVoidEquipAlarm": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan"],
    dictionary: []
  },
  // DCS组态图
  "/hazard/dcsInfo": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: [],
    operationButtons: [],
    dictionary: []
  },
  // 实时数据-储罐
  "/hazard/realtimeData/storageTank": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: [],
    dictionary: ["ENT_HAZARD_BASEINFO_TYPE"]
  },
  // 实时数据-气体
  "/hazard/realtimeData/gas": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan"],
    dictionary: []
  },
  // 实时数据-高位工艺
  "/hazard/realtimeData/workmanship": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun"],
    operationButtons: ["chakan"],
    dictionary: []
  }
};
