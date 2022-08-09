
import request from "@/router/axios";

const araeInfoUrl = `/api/doubleprevention/riskarea`
const personInfoUrl = `/api/enterprise/entPersonnel/listAll`


//双预防-风险分区-列表
export const araeInfoListAPI = (params) =>
  request({
    url: `${araeInfoUrl}/list`,
    method: "get",
    params: params,
  });

//双预防-风险分区-创建
export const araeInfoCreateAPI = (data) =>
  request({
    url: `${araeInfoUrl}`,
    method: "post",
    data: data,
  });

//双预防-风险分区-查看
export const araeInfoViewAPI = (params) =>
  request({
    url: `${araeInfoUrl}`,
    method: "get",
    params: params,
  });

//双预防-风险分区-修改
export const araeInfoUpdateAPI = (data) =>
  request({
    url: `${araeInfoUrl}`,
    method: "put",
    data: data,
  });

//双预防-风险分区-删除
export const araeInfoDeleteAPI = (params) =>
  request({
    url: `${araeInfoUrl}`,
    method: "delete",
    params: params,
  });

  //双预防-责任人-列表
export const personAPI = () =>
request({
  url: `${personInfoUrl}`,
  method: "get"
});
  
