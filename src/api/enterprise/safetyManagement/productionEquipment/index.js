import request from "@/router/axios";

const productionEquipmentUrl = `/api/enterprise/productionEquipment`;

//安全设备设施-生产设备管理-列表
export const productionEquipmentListAPI = params =>
  request({
    url: `${productionEquipmentUrl}/list`,
    method: "get",
    params: params
  });

//安全设备设施-生产设备管理-创建
export const productionEquipmentCreateAPI = data =>
  request({
    url: `${productionEquipmentUrl}/create`,
    method: "post",
    data: data
  });

//安全设备设施-生产设备管理-查看
export const productionEquipmentViewAPI = params =>
  request({
    url: `${productionEquipmentUrl}/view`,
    method: "get",
    params: params
  });

//安全设备设施-生产设备管理-修改
export const productionEquipmentUpdateAPI = data =>
  request({
    url: `${productionEquipmentUrl}/update`,
    method: "put",
    data: data
  });

//安全设备设施-生产设备管理-删除
export const productionEquipmentDeleteAPI = params =>
  request({
    url: `${productionEquipmentUrl}/delete`,
    method: "delete",
    params: params
  });

//安全设备设施-生产设备管理-所属工艺列表
export const processInfoListAPI = params =>
  request({
    url: `/api/enterprise/process/info`,
    method: "get",
    params: params
  });
