import request from "@/router/axios";

const hazardBaseUrl = `/api/hazard/hazardBase`;

//重大危险源-基础信息-列表
export const hazardBaseListAPI = params =>
  request({
    url: `${hazardBaseUrl}/list`,
    method: "get",
    params: params
  });

//重大危险源-基础信息-创建
export const hazardBaseCreateAPI = data =>
  request({
    url: `${hazardBaseUrl}/create`,
    method: "post",
    data: data
  });

//重大危险源-基础信息-查看
export const hazardBaseViewAPI = params =>
  request({
    url: `${hazardBaseUrl}/view`,
    method: "get",
    params: params
  });

//重大危险源-基础信息-修改
export const hazardBaseUpdateAPI = data =>
  request({
    url: `${hazardBaseUrl}/update`,
    method: "put",
    data: data
  });

//重大危险源-基础信息-删除
export const hazardBaseDeleteAPI = params =>
  request({
    url: `${hazardBaseUrl}/delete`,
    method: "delete",
    params: params
  });

//重大危险源-基础信息-绑定DCS图片
export const bindDcsAPI = params =>
  request({
    url: `${hazardBaseUrl}/setDcsIds`,
    method: "put",
    params: params
  });

//重大危险源-基础信息-绑定视频
export const bindVideoAPI = params =>
  request({
    url: `${hazardBaseUrl}/setVoidIds`,
    method: "put",
    params: params
  });

//重大危险源-基础信息-保存计算值
export const setIdentificationAPI = data =>
  request({
    url: `${hazardBaseUrl}/setIdentification`,
    method: "put",
    data: data
  });

//重大危险源-基础信息-删除绑定dcs
export const updateDcsAPI = params =>
  request({
    url: `${hazardBaseUrl}/updateDcsIds`,
    method: "put",
    params: params
  });

//重大危险源-基础信息-删除绑定视频
export const updateVoidAPI = params =>
  request({
    url: `${hazardBaseUrl}/updateVoidIds`,
    method: "put",
    params: params
  });

//摄像头-重大危险源绑定摄像头列表
export const bindCameraListAPI = params =>
  request({
    url: `${hazardBaseUrl}/getCameraByIds`,
    method: "get",
    params: params
  });
