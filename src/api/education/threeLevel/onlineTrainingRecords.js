import request from "@/router/axios";
let BASE_URL = `/api/education/onlineLearn`;

//线上培训记录
export const examListAPI = (params) =>
  request({
    url: `${BASE_URL}/examList`,
    method: "get",
    params: params,
  });

//线上培训-查看试卷
export const viewAPI = (params) =>
  request({
    url: "/api/education/examRecords/view",
    method: "get",
    params: params,
  });
//线上培训-培训时长统计
export const durationStatisticsAPI = (params) =>
  request({
    url: `/api/education/learnSchedule/onLearnSchedule`,
    method: "GET",
    params: params,
  });

  //线上培训-删除
export const deleteAPI = (params) =>
request({
  url: "/api/education/examRecords/delete",
  method: "DELETE",
  params: params,
});
