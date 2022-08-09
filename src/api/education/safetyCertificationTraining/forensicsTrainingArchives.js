import request from "@/router/axios";
let BASE_URL = `/api/education/safeTrainInfo`;

//取证培训档案-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//取证培训档案-创建
export const createAPI = (params) =>
request({
  url: `${BASE_URL}/create`,
  method: "POST",
  data: params,
});

//取证培训档案-详情
export const getDetailAPI = (params) =>
request({
  url: `${BASE_URL}/view`,
  method: "GET",
  params: params,
});

//取证培训档案-创建
export const updateAPI = (params) =>
request({
  url: `${BASE_URL}/update`,
  method: "PUT",
  data: params,
});

//取证培训档案-删除
export const deleteAPI = (params) =>
request({
  url: `${BASE_URL}/delete`,
  method: "DELETE",
  params: params,
});






 
