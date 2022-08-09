import request from "@/router/axios";

const repairUrl = `/api/enterprise/repairInfo`;

//安全设备设施-维修-列表
export const repairListAPI = (params) =>
  request({
    url: `${repairUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-维修-查看列表
export const repairListAllAPI = (params) =>
  request({
    url: `${repairUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-维修-创建
export const repairCreateAPI = (data) =>
  request({
    url: `${repairUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-维修-查看
export const repairViewAPI = (params) =>
  request({
    url: `${repairUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-维修-修改
export const repairUpdateAPI = (data) =>
  request({
    url: `${repairUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-维修-删除
export const repairDeleteAPI = (params) =>
  request({
    url: `${repairUrl}/delete`,
    method: "delete",
    params: params,
  });
