import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/duty_standard_allocation`

//目标职责-指标分配-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-指标分配-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-指标分配-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-指标分配-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-指标分配-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

//目标职责-指标分配-责任部门
export const sdDepartmentAPI = (params) =>
request({
  url: `/api/enterprise/dept/list`,
  method: "get",
  params: params,
});
// //目标职责-指标分配-指配任务
export const sdListSelectAPI = (params) =>
request({
  url: `/api/enterprise/duty_standard_provide/list_select`,
  method: "get",
  params: params,
});


