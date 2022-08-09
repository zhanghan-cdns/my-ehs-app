import request from "@/router/axios";

const maintainUrl = `/api/enterprise/maintInfo`;

//安全设备设施-保养-列表
export const maintainListAPI = (params) =>
  request({
    url: `${maintainUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-保养-查看列表
export const maintainListAllAPI = (params) =>
  request({
    url: `${maintainUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-保养-创建
export const maintainCreateAPI = (data) =>
  request({
    url: `${maintainUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-保养-查看
export const maintainViewAPI = (params) =>
  request({
    url: `${maintainUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-保养-修改
export const maintainUpdateAPI = (data) =>
  request({
    url: `${maintainUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-保养-删除
export const maintainDeleteAPI = (params) =>
  request({
    url: `${maintainUrl}/delete`,
    method: "delete",
    params: params,
  });
