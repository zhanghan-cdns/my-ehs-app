export default {
  // 路由名称
  "/system/role": {
    // 左布局宽度
    $leftWidth: 0,
    // 右布局宽度
    $rightWidth: 24,
    // 是否为树
    isTree: true,
    // 头部按钮
    headerButtons: ["xinzeng","chaxun"],
    // 表格操作按钮
    operationButtons: ['fenpeiquanxian', 'bianji', 'shanchu'],
  },
  // 系统菜单
  "/system/permission": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng","chaxun",'chongzhi'],
    operationButtons: ['bianji', 'shanchu'],
    dictionary:["COMMON_JUDGE","SYSTEM_PERMISSION_TYPE","COMMON_USE","SYSTEM_REQ_TYPE"]
  },
  // 系统字典
  "/system/dict": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng", "chaxun", "chongzhi"],
    operationButtons: ['dictionary', 'bianji', 'shanchu'],
    dictionary:["COMMON_DATAORIGIN","COMMON_JUDGE"]
  },
  // 系统配置
  "/system/config": {
    $leftWidth: 0,
    $rightWidth: 24,
  },
  // 用户管理
  "/system/user": {
    $leftWidth: 4,
    $rightWidth: 20,
    isTree: true,
    headerButtons: ["piliangshanchu", "xinzeng", "chaxun", "chongzhi"],
    operationButtons: ['chongzhimima','xiugaimima', 'bianji', 'shanchu'],
  },
  // 部门组织管理
  "/system/organize": {
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ['piliangshanchu', 'xinzeng', 'chaxun', 'chongzhi'],
    operationButtons: ['zhidingfenguanlingdao', 'xinzengxiajibumen', 'bianji', 'shanchu'],
  },
  // 人员管理
  "/system/staff": {
    $leftWidth: 4,
    $rightWidth: 20,
    // isTree: true,
    headerButtons: ['piliangshanchu', 'xinzeng', "chaxun", "chongzhi", "daoru", "daochu"],
    operationButtons: ['chakan', 'bianji', 'shanchu', 'xinxituisong'],
  },
  "/roleDistribute":{

  }
}
