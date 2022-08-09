import request from "@/router/axios";
let BASE_URL = `/api/education/trainingRecords`;

//课程设置-创建
export const getListAPI = (params) =>
  request({
    url: `${BASE_URL}/list`,
    method: "get",
    params: params,
  });