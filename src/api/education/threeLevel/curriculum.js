import request from "@/router/axios";
let BASE_URL = `/api/education/onlineLearn`;

// 三级安全培训-在线学习课程列表
export const courseListAPI = (params) =>
  request({
    url: `${BASE_URL}/courseList`,
    method: "get",
    params: params,
  });

// 结束学习，保存学习进度
export const saveProgressAPI = (params) =>
  request({
    url: `/api/education/learnSchedule/create`,
    method: "post",
    data: params,
  });

// 随机生成试卷
export const randomExamAPI = (params) =>
  request({
    url: `/api/education/onlineExam/randomExam`,
    method: "get",
    params: params,
  });

// 提交试卷
export const submitExamAPI = (params) =>
  request({
    url: `/api/education/examRecords/create`,
    method: "post",
    data: params,
  });
