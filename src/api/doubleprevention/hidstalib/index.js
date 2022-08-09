import request from "@/router/axios";

const  url = `/api/doubleprevention/conmeacheckcycle`
//双预防--隐患标准库 -列表
export const conmeacheckcycleListAPI = (params) =>
  request({
    url: `${url}/list`,
    method: "get",
    params: params,
  });
