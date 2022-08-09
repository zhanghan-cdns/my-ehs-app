import request from "@/router/axios";

const majorHazardIdentificationUrl = `/api/hazard/majorHazardIdentification`;

//重大危险源-辨识信息-列表
export const majorHazardIdentificationListAPI = params =>
  request({
    url: `${majorHazardIdentificationUrl}/list`,
    method: "get",
    params: params
  });

//重大危险源-辨识信息-创建
export const majorHazardIdentificationCreateAPI = data =>
  request({
    url: `${majorHazardIdentificationUrl}/create`,
    method: "post",
    data: data
  });

//重大危险源-辨识信息-查看
export const majorHazardIdentificationViewAPI = params =>
  request({
    url: `${majorHazardIdentificationUrl}/view`,
    method: "get",
    params: params
  });

//重大危险源-辨识信息-修改
export const majorHazardIdentificationUpdateAPI = data =>
  request({
    url: `${majorHazardIdentificationUrl}/update`,
    method: "put",
    data: data
  });

//重大危险源-辨识信息-删除
export const majorHazardIdentificationDeleteAPI = params =>
  request({
    url: `${majorHazardIdentificationUrl}/delete`,
    method: "delete",
    params: params
  });

// 计算R值
export const setRValueAPI = params =>
  request({
    url: `${majorHazardIdentificationUrl}/setRValue`,
    method: "get",
    params: params
  });
