import request from "@/router/axios";

const storageTankUrl = `/api/enterprise/storageTank`;

//安全设备设施-储罐-列表
export const storageTankListAPI = (params) =>
  request({
    url: `${storageTankUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-储罐-创建
export const storageTankCreateAPI = (data) =>
  request({
    url: `${storageTankUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-储罐-查看
export const storageTankViewAPI = (params) =>
  request({
    url: `${storageTankUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-储罐-修改
export const storageTankUpdateAPI = (data) =>
  request({
    url: `${storageTankUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-储罐-删除
export const storageTankDeleteAPI = (params) =>
  request({
    url: `${storageTankUrl}/delete`,
    method: "delete",
    params: params,
  });
