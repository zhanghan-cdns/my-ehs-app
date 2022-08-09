import request from "@/router/axios";

const addressUrl = `/api/domain/admindivision/simple-list`;

// 获取注册地址下拉
export const addressListAPI = params => {
  return request({
    url: `${addressUrl}`,
    method: "get",
    params: params
  });
};
