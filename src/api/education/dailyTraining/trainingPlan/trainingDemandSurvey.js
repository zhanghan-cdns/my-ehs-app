import request from "@/router/axios";
let BASE_URL = `/api/education/surveyNeeds`;

//培训调查需求-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//培训调查需求-创建
export const createAPI = (params) =>
request({
  url: `${BASE_URL}/create`,
  method: "POST",
  data: params,
});

//培训调查需求-详情
export const getDetailAPI = (params) =>
request({
  url: `${BASE_URL}/view`,
  method: "GET",
  params: params,
});

//培训调查需求-修改
export const updateAPI = (params) =>
request({
  url: `${BASE_URL}/update`,
  method: "PUT",
  data: params,
});

//培训调查需求-删除
export const deleteAPI = (params) =>
request({
  url: `${BASE_URL}/delete`,
  method: "DELETE",
  params: params,
});

//培训调查需求-修改状态
export const updateStateAPI = (params) =>
request({
  url: `${BASE_URL}/updateState`,
  method: "POST",
  data: params,
});

//培训调查需求-投票
export const voteAPI = (params) =>
request({
  url: `${BASE_URL}/vote`,
  method: "POST",
  data: params,
});
