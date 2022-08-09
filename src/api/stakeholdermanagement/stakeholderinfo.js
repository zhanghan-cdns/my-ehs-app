import request from "@/router/axios";
let BASE_URL = `/api/enterprise/relatedPartyInfo`;
let BASE_URL_QUA = `/api/enterprise/qualificationInfo`;

//相关方信息-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//相关方信息-创建
export const createAPI = (params) =>
  request({
    url: `${BASE_URL}/create`,
    method: "POST",
    data: params,
  });

//相关方信息-详情
export const getDetailAPI = (params) =>
  request({
    url: `${BASE_URL}/view`,
    method: "GET",
    params: params,
  });

//相关方信息-修改
export const updateAPI = (params) =>
  request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: params,
  });

//相关方信息-删除
export const deleteAPI = (params) =>
  request({
    url: `${BASE_URL}/delete`,
    method: "DELETE",
    params: params,
  });

// ---------------------

//资质信息-列表
export const getListQuaAPI = (params) =>
  request({
    url: `${BASE_URL_QUA}/list`,
    method: "GET",
    params: params,
  });

//资质信息-创建
export const createQuaAPI = (params) =>
  request({
    url: `${BASE_URL_QUA}/create`,
    method: "POST",
    data: params,
  });

//资质信息-详情
export const getDetailQuaAPI = (params) =>
  request({
    url: `${BASE_URL_QUA}/view`,
    method: "GET",
    params: params,
  });

//资质信息-修改
export const updateQuaAPI = (params) =>
  request({
    url: `${BASE_URL_QUA}/update`,
    method: "PUT",
    data: params,
  });

//资质信息-删除
export const deleteQuaAPI = (params) =>
  request({
    url: `${BASE_URL_QUA}/delete`,
    method: "DELETE",
    params: params,
  });
