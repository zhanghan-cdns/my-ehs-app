import request from "@/router/axios";

const inspectUrl = `/api/enterprise/checkInfo`;

//安全设备设施-检查-列表
export const inspectListAPI = (params) =>
  request({
    url: `${inspectUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-检查-查看列表
export const inspectListAllAPI = (params) =>
  request({
    url: `${inspectUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-检查-创建
export const inspectCreateAPI = (data) =>
  request({
    url: `${inspectUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-检查-查看
export const inspectViewAPI = (params) =>
  request({
    url: `${inspectUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-检查-修改
export const inspectUpdateAPI = (data) =>
  request({
    url: `${inspectUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-检查-删除
export const inspectDeleteAPI = (params) =>
  request({
    url: `${inspectUrl}/delete`,
    method: "delete",
    params: params,
  });
