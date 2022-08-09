import request from "@/router/axios";
let BASE_URL = `/api/education/outsideCertificateInfo`;

//外来方证书信息-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//外来方证书信息-创建
export const createAPI = (params) =>
request({
  url: `${BASE_URL}/create`,
  method: "POST",
  data: params,
});

//外来方证书信息-详情
export const getDetailAPI = (params) =>
request({
  url: `${BASE_URL}/view`,
  method: "GET",
  params: params,
});

//外来方证书信息-修改
export const updateAPI = (params) =>
request({
  url: `${BASE_URL}/update`,
  method: "PUT",
  data: params,
});

//外来方证书信息-删除
export const deleteAPI = (params) =>
request({
  url: `${BASE_URL}/delete`,
  method: "DELETE",
  params: params,
});








 
