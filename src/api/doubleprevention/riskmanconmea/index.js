import request from "@/router/axios";

const riskmanconmeaUrl = '/api/doubleprevention/riskmanconmea'

const conmeacheckcycle = '/api/doubleprevention/conmeacheckcycle'

//  风险管控措施 ---列表
export const riskmanconmeaListAPI = (params) =>
  request({
    url: `${riskmanconmeaUrl}/list`,
    method: "get",
    params: params,
  });
//  风险管控措施 ---分页列表
export const riskmanconmeaPageAPI = (params) =>
  request({
    url: `${riskmanconmeaUrl}/page`,
    method: "get",
    params: params,
  });

//  风险管控措施 --- 查看
export const riskmanconmeaViewAPI = (params) =>
  request({
    url: `${riskmanconmeaUrl}`,
    method: "get",
    params: params,
  });

//  风险管控措施 --- 创建
export const riskmanconmeaCreateAPI = (data) =>
  request({
    url: `${riskmanconmeaUrl}`,
    method: "post",
    data: data,
  });

//  风险管控措施 --- 修改
export const riskmanconmeaUpdateAPI = (data) =>
  request({
    url: `${riskmanconmeaUrl}`,
    method: "put",
    data: data,
  });

//  风险管控措施 --- 删除
export const riskmanconmeaDeleteAPI = (params) =>
  request({
    url: `${riskmanconmeaUrl}`,
    method: "delete",
    params: params,
  });
//  巡检周期 --- 查看
export const conmeacheckcycleViewAPI = (params) =>
  request({
    url: `${conmeacheckcycle}`,
    method: "get",
    params: params,
  });

//  巡检周期 --- 创建
export const conmeacheckcycleCreateAPI = (params) =>
  request({
    url: `${conmeacheckcycle}`,
    method: "post",
    data: params,
  });

//  巡检周期 --- 更新
export const conmeacheckcycleUpdateAPI = (params) =>
  request({
    url: `${conmeacheckcycle}`,
    method: "put",
    data: params,
  });

//  巡检周期 --- 删除
export const conmeacheckcycleDeleteAPI = (params) =>
  request({
    url: `${conmeacheckcycle}`,
    method: "delete",
    params: params,
  });

//  巡检周期 --- 列表
export const conmeacheckcycleListAPI = (params) =>
  request({
    url: `${conmeacheckcycle}/list`,
    method: "get",
    params: params,
  });

//  巡检周期 --- 分页列表
export const conmeacheckcyclePageAPI = (params) =>
  request({
    url: `${conmeacheckcycle}/page`,
    method: "get",
    params: params,
  });

//  巡检周期 --- 分页列表
export const conmeacheckcycleGetFulleventIdAPI = (params) =>
  request({
    url: `${conmeacheckcycle}/getfullinformationcategorybyeventid`,
    method: "get",
    params: params,
  });

export const conmeacheckcycleGetFullUnitIdAPI = (params) =>
  request({
    url: `/api/doubleprevention/riskmanconmea/getriskmanconmeabyunitid`,
    method: "get",
    params: params,
  });
