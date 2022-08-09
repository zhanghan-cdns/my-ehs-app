import request from "@/router/axios";
let BASE_URL = `/api/education/dailyOnlineExam`;

// 在线考试-待学习
export const waitLearnAPI = (params) =>
  request({
    url: `${BASE_URL}/waitExam`,
    method: "GET",
    params: params,
  });
// 在线考试-已学完
export const finishedLearnAPI = (params) =>
  request({
    url: `${BASE_URL}/finishedExam`,
    method: "GET",
    params: params,
  });
// 在线考试-已过期
export const expiredLearnAPI = (params) =>
  request({
    url: `/api/education/dailyOnlineLearn/expiredLearn`,
    method: "GET",
    params: params,
  });
