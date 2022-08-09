import request from "@/router/axios";

const objectInfoUrl = `/api/doubleprevention/riskanalysisobject`

const personInfoUrl = `/api/enterprise/entPersonnel/listAll`

const deptInfoUrl = `/api/enterprise/dept/list`
const userInfoUrl = `/api/enterprise/entPersonnel/listAll`
const riskareaInfoUrl = `/api/doubleprevention/riskarea/info`


const unitViewInfoUrl = `/api/doubleprevention/riskanalysisunit`

//双预防-风险对象-列表
export const objectInfoListAPI = (params) =>
  request({
    url: `${objectInfoUrl}/list`,
    method: "get",
    params: params,
  });

export const objectInfoAllListAPI = (params) =>
  request({
    url: `${objectInfoUrl}/listall`,
    method: "get",
    params: params,
  });


//双预防-风险对象-创建
export const objectInfoCreateAPI = (data) =>
  request({
    url: `${objectInfoUrl}`,
    method: "post",
    data: data,
  });

//双预防-风险对象-查看
export const objectInfoViewAPI = (params) =>
  request({
    url: `${objectInfoUrl}`,
    method: "get",
    params: params,
  });

//双预防-风险对象-修改
export const objectInfoUpdateAPI = (data) =>
  request({
    url: `${objectInfoUrl}`,
    method: "put",
    data: data,
  });

//双预防-风险对象-删除
export const objectInfoDeleteAPI = (params) =>
  request({
    url: `${objectInfoUrl}`,
    method: "delete",
    params: params,
  });

//双预防-责任人-列表
export const personAPI = () =>
  request({
    url: `${personInfoUrl}`,
    method: "get"
  });


//双预防-责任部门-列表
export const deptAPI = () =>
  request({
    url: `${deptInfoUrl}`,
    method: "get"
  });


//双预防-用户责任人-列表
export const userAPI = () =>
  request({
    url: `${userInfoUrl}`,
    method: "get"
  });


//双预防-风险分区-列表
export const riskAreaAPI = () =>
  request({
    url: `${riskareaInfoUrl}`,
    method: "get"
  });

//双预防-风险分区-列表
export const unitAPI = (params) =>
  request({
    url: `${unitViewInfoUrl}`,
    method: "get",
    params: params,
  });

// 双预防
export const getfullinformationcategorybyunitidAPI = (params) =>
  request({
    url: `/doubleprevention/conmeacheckcycle/getfullinformationcategorybyunitid`,
    method: "get",
    params: params,
  });





