import request from "@/router/axios";

const monitoringIndicatorsUrl = `/api/hazard/monitoringIndicators`;

//重大危险源-指标绑定设备-列表
export const monitoringIndicatorsListAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/list`,
    method: "get",
    params: params
  });

//重大危险源-指标绑定设备-创建
export const monitoringIndicatorsCreateAPI = data =>
  request({
    url: `${monitoringIndicatorsUrl}/create`,
    method: "post",
    data: data
  });

//重大危险源-指标绑定设备-查看
export const monitoringIndicatorsViewAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/view`,
    method: "get",
    params: params
  });

//重大危险源-指标绑定设备-修改
export const monitoringIndicatorsUpdateAPI = data =>
  request({
    url: `${monitoringIndicatorsUrl}/update`,
    method: "put",
    data: data
  });

//重大危险源-指标绑定设备-删除
export const monitoringIndicatorsDeleteAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/delete`,
    method: "delete",
    params: params
  });

//重大危险源-指标绑定设备-选择dcs图
export const choiceDcsAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/choicedcs`,
    method: "put",
    params: params
  });

//重大危险源-指标绑定设备-存储点位信息
export const dcsPointAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/dcsPoint`,
    method: "post",
    params: params
  });

//重大危险源-指标绑定设备-获取点位信息
export const selectDcsPointAPI = params =>
  request({
    url: `${monitoringIndicatorsUrl}/selectDcsPoint`,
    method: "get",
    params: params
  });
