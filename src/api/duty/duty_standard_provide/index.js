import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/duty_standard_provide`

//目标职责-指标配置-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-指标配置-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-指标配置-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-指标配置-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-指标配置-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

