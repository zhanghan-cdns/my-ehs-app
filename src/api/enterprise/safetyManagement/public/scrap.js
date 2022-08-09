import request from "@/router/axios";

const scrapUrl = `/api/enterprise/scrapInfo`;

//安全设备设施-报废-列表
export const scrapListAPI = (params) =>
  request({
    url: `${scrapUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-报废-查看列表
export const scrapListAllAPI = (params) =>
  request({
    url: `${scrapUrl}/listAll`,
    method: "get",
    params: params,
  });

//安全设备设施-报废-创建
export const scrapCreateAPI = (data) =>
  request({
    url: `${scrapUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-报废-查看
export const scrapViewAPI = (params) =>
  request({
    url: `${scrapUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-报废-修改
export const scrapUpdateAPI = (data) =>
  request({
    url: `${scrapUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-报废-删除
export const scrapDeleteAPI = (params) =>
  request({
    url: `${scrapUrl}/delete`,
    method: "delete",
    params: params,
  });
