import request from "@/router/axios";
let BASE_URL = `/api/education/dailyOnlineLearn`;

// 在线学习-待学习
export const waitLearnAPI = (params) =>
  request({
    url: `${BASE_URL}/waitLearn`,
    method: "GET",
    params: params,
  });
// 在线学习-已学完
export const finishedLearnAPI = (params) =>
  request({
    url: `${BASE_URL}/finishedLearn`,
    method: "GET",
    params: params,
  });
// 在线学习-已过期
export const expiredLearnAPI = (params) =>
  request({
    url: `${BASE_URL}/expiredLearn`,
    method: "GET",
    params: params,
  });
// 在线学习-保存学习记录
export const saveProgressAPI = (params) =>
  request({
    url: "/api/education/dailyTrainRecords/create",
    method: "POST",
    data: params,
  });
