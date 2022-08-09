export default {
  // 路由名称
  // 人员信息列表
  "/EAIM/PersonnelInfoList/index": {
    // 头部按钮
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    // 表格操作按钮
    operationButtons: ['chakan', 'bianji', 'shanchu', 'zuzhijiegou'],
    //列表左右容器宽度
    $leftWidth: 4,
    $rightWidth: 20,
    // 左侧搜索树是否需要切换 true为不需要 false为需要，不写为默认false
    // isTree:true
  },
  // 企业信息列表
  "/EAIM/EnterpriseinfoList/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    $leftWidth: 4,
    $rightWidth: 20,
    operationButtons: ['chakan', 'bianji', 'shanchu', 'zuzhijiegou'],

    // isTree:true
  },
  // 设备信息列表
  "/EAIM/DeviceInfoList/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    $leftWidth: 4,
    $rightWidth: 20,
    operationButtons: ['chakan', 'bianji', 'shanchu'],
  },
  // 设备基础信息
  "/EAIM/EquipmentBasicInfo/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    $leftWidth: 3,
    $rightWidth: 21,
    operationButtons: ['chakan', 'bianji', 'shanchu'],
  },
  // 字典基础信息
  "/EAIM/DictionaryBasicInfo/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    $leftWidth: 3,
    $rightWidth: 21,
    operationButtons: ['zidian', 'chakan', 'bianji', 'shanchu'],
  },
  // 系统配置
  "/EAIM/SystemConfiguration/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "chaxun"],
    $leftWidth: 0,
    $rightWidth: 24,
    operationButtons: ['chakan', 'bianji', 'shanchu'],
  },
  // 源信息列表
  "/EAIM/SourceInfomationList/index": {
    headerButtons: ["piliangshanchu", "xinzeng", "daoru", "daochu", "chaxun"],
    $leftWidth: 4,
    $rightWidth: 20,
    operationButtons: ['chakan', 'bianji', 'shanchu'],
  },
}
