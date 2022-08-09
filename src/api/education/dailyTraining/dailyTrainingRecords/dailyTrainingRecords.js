import request from "@/router/axios";
let BASE_URL = `/api/education/dailyTrainRecords/delete`;

// 培训记录-删除
export const deleteAPI = (params) =>
  request({
    url: `${BASE_URL}/delete`,
    method: "DELETE",
    params: params,
  });
// 培训记录-考试记录
export const examRecordsAPI = (params) =>
  request({
    url: `${BASE_URL}/examRecords`,
    method: "GET",
    params: params,
  });
// 培训记录-学习进度
export const learnRateAPI = (params) =>
  request({
    url: `${BASE_URL}/learnRate`,
    method: "GET",
    params: params,
  });
// 培训记录-分页列表
export const listAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "GET",
    params: params,
  });
// 培训记录-修改
export const updateAPI = (params) =>
  request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: params,
  });
export const viewAPI = (params) =>
  request({
    url: `${BASE_URL}/view`,
    method: "GET",
    params: params,
  });
