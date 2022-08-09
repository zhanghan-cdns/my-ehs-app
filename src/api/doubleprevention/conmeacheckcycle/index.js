import request from "@/router/axios";

const  url = `/api/doubleprevention/conmeacheckcycle`
//双预防--巡检周期 -全列表
export const conmeacheckcycleListAPI = (params) =>
  request({
    url: `${url}/list`,
    method: "get",
    params: params,
  });

//双预防--巡检周期 -分页列表
export const conmeacheckcyclePageAPI = (params) =>
  request({
    url: `${url}/page`,
    method: "get",
    params: params,
  });

//双预防--巡检周期 - 查看
export const conmeacheckcycleViewAPI = (params) =>
  request({
    url: `${url}`,
    method: "get",
    params: params,
  });

//双预防--巡检周期 - 创建
export const conmeacheckcycleCreateAPI = (params) =>
  request({
    url: `${url}`,
    method: "post",
    data: params,
  });

//双预防--巡检周期 - 更新
export const conmeacheckcycleUpdateAPI = (params) =>
  request({
    url: `${url}`,
    method: "put",
    data: params,
  });

//双预防--巡检周期 - 删除
export const conmeacheckcycleDeleteAPI = (params) =>
  request({
    url: `${url}`,
    method: "delete",
    params: params,
  });

//巡检周期 完整信息
export const conmeacheckcycleFullListAPI = (params) =>
  request({
    url: `${url}/getfullinformationcategory`,
    method: "get",
    params: params,
  });
