import request from "@/router/axios";

const recoveryUrl = `/api/enterprise/recoveryInfo`;

//安全设备设施-恢复-列表
export const recoveryListAPI = (params) =>
  request({
    url: `${recoveryUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-恢复-列表
export const recoveryListAllAPI = (params) =>
  request({
    url: `${recoveryUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-恢复-创建
export const recoveryCreateAPI = (data) =>
  request({
    url: `${recoveryUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-恢复-查看
export const recoveryViewAPI = (params) =>
  request({
    url: `${recoveryUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-恢复-修改
export const recoveryUpdateAPI = (data) =>
  request({
    url: `${recoveryUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-恢复-删除
export const recoveryDeleteAPI = (params) =>
  request({
    url: `${recoveryUrl}/delete`,
    method: "delete",
    params: params,
  });
