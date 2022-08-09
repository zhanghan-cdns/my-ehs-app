import request from "@/router/axios";

const dcsInfoUrl = `/api/hazard/dcsInfo`

//目标职责-安全网络管理-列表
export const dcsInfoListAPI = (params) =>
  request({
    url: `${dcsInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-安全网络管理-创建
export const dcsInfoCreateAPI = (data) =>
  request({
    url: `${dcsInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-安全网络管理-查看
export const dcsInfoViewAPI = (params) =>
  request({
    url: `${dcsInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-安全网络管理-修改
export const dcsInfoUpdateAPI = (data) =>
  request({
    url: `${dcsInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-安全网络管理-删除
export const dcsInfoDeleteAPI = (params) =>
  request({
    url: `${dcsInfoUrl}/delete`,
    method: "delete",
    params: params,
  });
