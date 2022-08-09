import request from "@/router/axios";

//一企一档-储罐区-列表
export const tankFarmListAPI = (params) =>
  request({
    url: "/api/enterprise/tankFarm/list",
    method: "get",
    params: params,
  });

//一企一档-储罐区-所有列表
export const tankFarmListAllAPI = (params) =>
  request({
    url: "/api/enterprise/tankFarm/listAll",
    method: "get",
    params: params,
  });

//一企一档-储罐区-新增
export const tankFarmCreateAPI = (data) =>
  request({
    url: "/api/enterprise/tankFarm/create",
    method: "post",
    data: data,
  });

//一企一档-储罐区-查看
export const tankFarmViewAPI = (params) =>
  request({
    url: "/api/enterprise/tankFarm/view",
    method: "get",
    params: params,
  });

//一企一档-储罐区-删除
export const tankFarmDeleteAPI = (params) =>
  request({
    url: "/api/enterprise/tankFarm/remove",
    method: "delete",
    params: params,
  });

//一企一档-储罐区-修改
export const tankFarmUpdateAPI = (data) =>
  request({
    url: "/api/enterprise/tankFarm/update",
    method: "put",
    data: data,
  });
