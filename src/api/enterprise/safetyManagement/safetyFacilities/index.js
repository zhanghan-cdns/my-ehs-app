import request from "@/router/axios";

const safetyFacilitiesUrl = `/api/enterprise/safetyFacilities`

//安全设备设施-安全设施管理-列表
export const safetyFacilitiesListAPI = (params) =>
  request({
    url: `${safetyFacilitiesUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-安全设施管理-创建
export const safetyFacilitiesCreateAPI = (data) =>
  request({
    url: `${safetyFacilitiesUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-安全设施管理-查看
export const safetyFacilitiesViewAPI = (params) =>
  request({
    url: `${safetyFacilitiesUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-安全设施管理-修改
export const safetyFacilitiesUpdateAPI = (data) =>
  request({
    url: `${safetyFacilitiesUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-安全设施管理-删除
export const safetyFacilitiesDeleteAPI = (params) =>
  request({
    url: `${safetyFacilitiesUrl}/delete`,
    method: "delete",
    params: params,
  });
