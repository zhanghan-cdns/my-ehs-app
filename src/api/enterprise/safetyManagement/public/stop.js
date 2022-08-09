import request from "@/router/axios";

const stopUrl = `/api/enterprise/stopInfo`;

//安全设备设施-停用-列表
export const stopListAPI = (params) =>
  request({
    url: `${stopUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-停用-查看列表
export const stopListAllAPI = (params) =>
  request({
    url: `${stopUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-停用-创建
export const stopCreateAPI = (data) =>
  request({
    url: `${stopUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-停用-查看
export const stopViewAPI = (params) =>
  request({
    url: `${stopUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-停用-修改
export const stopUpdateAPI = (data) =>
  request({
    url: `${stopUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-停用-删除
export const stopDeleteAPI = (params) =>
  request({
    url: `${stopUrl}/delete`,
    method: "delete",
    params: params,
  });
