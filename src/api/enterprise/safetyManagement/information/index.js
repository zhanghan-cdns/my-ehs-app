import request from "@/router/axios";

const informationUrl = `/api/enterprise/productionInfo`;

//安全设备设施-设备设施信息管理-列表
export const informationListAPI = params =>
  request({
    url: `${informationUrl}/list`,
    method: "get",
    params: params
  });

//安全设备设施-设备设施信息管理-创建
export const informationCreateAPI = data =>
  request({
    url: `${informationUrl}/create`,
    method: "post",
    data: data
  });

//安全设备设施-设备设施信息管理-查看
export const informationViewAPI = params =>
  request({
    url: `${informationUrl}/view`,
    method: "get",
    params: params
  });

//安全设备设施-设备设施信息管理-修改
export const informationUpdateAPI = data =>
  request({
    url: `${informationUrl}/update`,
    method: "put",
    data: data
  });

//安全设备设施-设备设施信息管理-删除
export const informationDeleteAPI = params =>
  request({
    url: `${informationUrl}/delete`,
    method: "delete",
    params: params
  });

//获取设备位号列表
export const productionFacilitiesListAPI = params =>
  request({
    url: `${informationUrl}/purpose`,
    method: "get",
    params: params
  });
