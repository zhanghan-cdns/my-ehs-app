import request from "@/router/axios";

//一企一档-物料信息-列表
export const materialsListAPI = (params) =>
  request({
    url: "/api/enterprise/materials/list",
    method: "get",
    params: params,
  });

//一企一档-物料信息-所有列表
export const materialsListAllAPI = (params) =>
  request({
    url: "/api/enterprise/materials/listAll",
    method: "get",
    params: params,
  });

//一企一档-物料信息-创建
export const materialsCreateAPI = (data) =>
  request({
    url: "/api/enterprise/materials/create",
    method: "post",
    data: data,
  });

//一企一档-物料信息-查看
export const materialsViewAPI = (params) =>
  request({
    url: "/api/enterprise/materials/view",
    method: "get",
    params: params,
  });

//一企一档-物料信息-删除
export const materialsDeleteAPI = (params) =>
  request({
    url: "/api/enterprise/materials/delete",
    method: "delete",
    params: params,
  });

//一企一档-物料信息-修改
export const materialsUpdateAPI = (data) =>
  request({
    url: "/api/enterprise/materials/update",
    method: "put",
    data: data,
  });

//一企一档-物料信息-获取工艺
export const processInfoAPI = (data) =>
  request({
    url: "/api/enterprise/process/info",
    method: "get",
    params: data,
  });
