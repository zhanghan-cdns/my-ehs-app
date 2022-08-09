import request from "@/router/axios";

const inspectionUrl = `/api/enterprise/inspectionStandard`;

//安全设备设施-巡检-列表
export const inspectionListAPI = (params) =>
  request({
    url: `${inspectionUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-巡检-列表
export const inspectionListAllAPI = (params) =>
  request({
    url: `${inspectionUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-巡检-创建
export const inspectionCreateAPI = (data) =>
  request({
    url: `${inspectionUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-巡检-创建列表
export const inspectionCreateListAPI = (data) =>
  request({
    url: `${inspectionUrl}/createList`,
    method: "post",
    data: data,
  });

//安全设备设施-巡检-查看
export const inspectionViewAPI = (params) =>
  request({
    url: `${inspectionUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-巡检-修改
export const inspectionUpdateAPI = (data) =>
  request({
    url: `${inspectionUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-巡检-删除
export const inspectionDeleteAPI = (params) =>
  request({
    url: `${inspectionUrl}/delete`,
    method: "delete",
    params: params,
  });
