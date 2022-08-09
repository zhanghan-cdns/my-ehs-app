import request from "@/router/axios";

const specialEquipmentUrl = `/api/enterprise/specialEquipment`

//安全设备设施-特种设备管理-列表
export const specialEquipmentListAPI = (params) =>
  request({
    url: `${specialEquipmentUrl}/list`,
    method: "get",
    params: params,
  });

//安全设备设施-特种设备管理-创建
export const specialEquipmentCreateAPI = (data) =>
  request({
    url: `${specialEquipmentUrl}/create`,
    method: "post",
    data: data,
  });

//安全设备设施-特种设备管理-查看
export const specialEquipmentViewAPI = (params) =>
  request({
    url: `${specialEquipmentUrl}/view`,
    method: "get",
    params: params,
  });

//安全设备设施-特种设备管理-修改
export const specialEquipmentUpdateAPI = (data) =>
  request({
    url: `${specialEquipmentUrl}/update`,
    method: "put",
    data: data,
  });

//安全设备设施-特种设备管理-删除
export const specialEquipmentDeleteAPI = (params) =>
  request({
    url: `${specialEquipmentUrl}/delete`,
    method: "delete",
    params: params,
  });
