
import request from "@/router/axios";

const mapInfoUrl = `/api/doubleprevention/riskmap`

//双预防-风险四色图-列表
export const mapInfoListAPI = (params) =>
  request({
    url: `${mapInfoUrl}/list`,
    method: "get",
    params: params,
  });

//双预防-风险四色图-创建
export const mapInfoCreateAPI = (data) =>
  request({
    url: `${mapInfoUrl}/create`,
    method: "post",
    data: data,
  });

//双预防-风险四色图-查看
export const mapInfoViewAPI = (params) =>
  request({
    url: `${mapInfoUrl}/view`,
    method: "get",
    params: params,
  });

//双预防-风险四色图-修改
export const mapInfoUpdateAPI = (data) =>
  request({
    url: `${mapInfoUrl}/update`,
    method: "put",
    data: data,
  });

//双预防-风险四色图-删除
export const mapInfoDeleteAPI = (params) =>
  request({
    url: `${mapInfoUrl}/delete`,
    method: "delete",
    params: params,
  });
