import request from "@/router/axios";

const realDataUrl = `/api/hazard/api`;

//重大危险源-实时数据-储罐--列表
export const storageTankListAPI = params =>
  request({
    url: `${realDataUrl}/storageTankRealList`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-储罐--图形列表
export const storageTankGraphListAPI = params =>
  request({
    url: `${realDataUrl}/storageTankGraphicalData`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-气体--图形列表
export const gasGraphListAPI = params =>
  request({
    url: `${realDataUrl}/gasDetectionGraphicalData`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-高位工艺--图形列表
export const workmanshipGraphListAPI = params =>
  request({
    url: `${realDataUrl}/productionEquipmentGraphicalData`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-储罐历史查看--分页列表
export const storageTankHistoryListAPI = params =>
  request({
    url: `${realDataUrl}/hostPage`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-储罐历史查看--列表
export const storageTankHistoryChartListAPI = params =>
  request({
    url: `${realDataUrl}/hostList`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-储罐报警查看--列表
export const storageTankWarnListAPI = params =>
  request({
    url: `api/hazard/indexAlarm/viewByIndexId`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-高位工艺--列表
export const workmanshipListAPI = params =>
  request({
    url: `${realDataUrl}/productionEquipmentRealList`,
    method: "get",
    params: params
  });

//重大危险源-实时数据-气体--列表
export const gasListAPI = params =>
  request({
    url: `${realDataUrl}/gasDetectionRealList`,
    method: "get",
    params: params
  });
