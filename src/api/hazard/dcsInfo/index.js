import request from "@/router/axios";

const dcsInfoUrl = `/api/hazard/dcsInfo`;

//重大危险源-DCS组态图-列表
export const dcsInfoListAPI = params =>
  request({
    url: `${dcsInfoUrl}/list`,
    method: "get",
    params: params
  });

//重大危险源-DCS组态图-创建
export const dcsInfoCreateAPI = data =>
  request({
    url: `${dcsInfoUrl}/create`,
    method: "post",
    data: data
  });

//重大危险源-DCS组态图-查看
export const dcsInfoViewAPI = params =>
  request({
    url: `${dcsInfoUrl}/view`,
    method: "get",
    params: params
  });

//重大危险源-DCS组态图-修改
export const dcsInfoUpdateAPI = data =>
  request({
    url: `${dcsInfoUrl}/update`,
    method: "put",
    data: data
  });

//重大危险源-DCS组态图-删除
export const dcsInfoDeleteAPI = params =>
  request({
    url: `${dcsInfoUrl}/delete`,
    method: "delete",
    params: params
  });

//重大危险源-绑定DCS组态图列表-列表
export const bindDcsListAPI = params =>
  request({
    url: `${dcsInfoUrl}/getDcsInfoByIds`,
    method: "get",
    params: params
  });


//重大危险源-指标绑定DCS组态图列表-列表
export const dcsInfoByIndexIdsAPI = params =>
  request({
    url: `${dcsInfoUrl}/getDcsInfoByIndexIds`,
    method: "get",
    params: params
  });
