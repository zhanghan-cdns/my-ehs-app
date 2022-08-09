import request from "@/router/axios";
let BASE_URL = `/api/education/trainingRecords`;

//培训记录-列表
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "get",
    params: params,
  });

//培训记录-创建
export const createAPI = (params) =>
  request({
    url: `${BASE_URL}/create`,
    method: "POST",
    data: params,
  });

//培训记录-查看
export const viewAPI = (params) =>
  request({
    url: `${BASE_URL}/view`,
    method: "GET",
    params: params,
  });

//培训记录-更新
export const updateAPI = (params) =>
request({
  url: `${BASE_URL}/update`,
  method: "PUT",
  data: params,
});

//培训记录-更新
export const deleteAPI = (params) =>
  request({
    url: `${BASE_URL}/delete`,
    method: "DELETE",
    params: params,
});
//培训记录-统计
export const statisticsAPI = (params) =>
    request({
      url: `${BASE_URL}/statistics`,
      method: "GET",
      params: params,
});


  
  
