
import request from "@/router/axios";

const  url = `/api/doubleprevention/riskanalysisunit`
//双预防-- 风险单元查看
export const riskanalysisunitViewAPI = (params) =>
  request({
    url: `${url}`,
    method: "get",
    params: params,
  });

//双预防-- 风险单元创建
export const riskanalysisunitCreateAPI = (params) =>
  request({
    url: `${url}`,
    method: "post",
    data: params,
  });

//双预防-- 风险单元修改
export const riskanalysisunitUpdateAPI = (params) =>
  request({
    url: `${url}`,
    method: "put",
    data: params,
  });

//双预防-- 风险单元删除
export const riskanalysisunitDeleteAPI = (params) =>
  request({
    url: `${url}`,
    method: "delete",
    params: params,
  });

//双预防-- 风险单元列表
export const riskanalysisunitListAPI = (params) =>
  request({
    url: `${url}/list`,
    method: "get",
    params: params,
  });

//双预防-- 风险单元分页列表
export const riskanalysisunitPageAPI = (params) =>
  request({
    url: `${url}/Page`,
    method: "get",
    params: params,
  });


