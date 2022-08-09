//人员在岗在位接口
export default {
  "/location/config/map": {//定位配置-地图配置
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng","chaxun", "chongzhi"],
    operationButtons: ['bianji', 'shanchu'],
  },
  "/location/config/engine": {//定位配置-引擎配置
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng","chaxun", "chongzhi"],
    operationButtons: ['dingyue', 'bianji', 'shanchu'],
  },
  "/location/buildingarea": {//建筑区域管理
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng","chaxun", "chongzhi"],
    operationButtons: ['bianji', 'shanchu'],
  },
  "/location/alarm": {//定位报警
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["chaxun", "chongzhi"],
    operationButtons: ['bianji'],
  },
  "/location/fence": {//电子围栏
    $leftWidth: 0,
    $rightWidth: 24,
    isTree: true,
    headerButtons: ["xinzeng","chaxun", "chongzhi"],
    operationButtons: ['bianji', 'shanchu'],
  }
}
