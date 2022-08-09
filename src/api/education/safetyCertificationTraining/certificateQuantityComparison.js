import request from "@/router/axios";
let BASE_URL = `/api/education/certificateComparison`;

//证书数量对比-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });

//证书数量对比-创建
export const createAPI = (params) =>
request({
  url: `${BASE_URL}/create`,
  method: "POST",
  data: params,
});

//证书数量对比-详情
export const getDetailAPI = (params) =>
request({
  url: `${BASE_URL}/view`,
  method: "GET",
  params: params,
});

//证书数量对比-修改
export const updateAPI = (params) =>
request({
  url: `${BASE_URL}/update`,
  method: "PUT",
  data: params,
});

//证书数量对比-删除
export const deleteAPI = (params) =>
request({
  url: `${BASE_URL}/delete`,
  method: "DELETE",
  params: params,
});

//岗位列表
export const getJobOptionAPI = (params) =>
request({
  url: '/api/enterprise/job/getJobOption',
  method: "GET",
  params: params,
});






 
