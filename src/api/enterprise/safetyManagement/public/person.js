import request from "@/router/axios";

const personUrl = `/api/enterprise/entPersonnel/personNames`

// 获取人员列表
export const personListAPI = (params) =>
  request({
    url: `${personUrl}`,
    method: "get",
    params: params,
  });

