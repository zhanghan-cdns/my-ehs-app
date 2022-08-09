import request from "@/router/axios";

const testUrl = `/api/enterprise/testInfo`;

//安全设备设施-检测-列表
export const testListAPI = (params) =>
  request({
    url: `${testUrl}/list`,
    method: "get",
    params: params,
  });
  
//安全设备设施-检测-查看列表
export const testListAllAPI = (params) =>
  request({
    url: `${testUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-检测-创建
export const testCreateAPI = (data) =>
  request({
    url: `${testUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-检测-查看
export const testViewAPI = (params) =>
  request({
    url: `${testUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-检测-修改
export const testUpdateAPI = (data) =>
  request({
    url: `${testUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-检测-删除
export const testDeleteAPI = (params) =>
  request({
    url: `${testUrl}/delete`,
    method: "delete",
    params: params,
  });
