import request from "@/router/axios";

const eventInfoUrl = `/api/doubleprevention/lecrating`
const getwarninglabelsInfoUrl = `/api/doubleprevention/riskanalysisevents/getwarninglabels`
const riskEventUrl =`/api/doubleprevention/riskanalysisevents` //风险事件
const riskAnalysisUnit= `/api/doubleprevention/riskanalysisunit` //风险分析单元


//双预防-lec等级-列表
export const lecLevelListAPI = (params) =>
  request({
    url: `${eventInfoUrl}/list`,
    method: "get",
    params: params,
  });

//双预防-lec等级-创建
export const lecLevelCreateAPI = (data) =>
  request({
    url: `${eventInfoUrl}`,
    method: "post",
    data: data,
  });

//双预防-lec等级-查看
export const lecLevelViewAPI = () =>
  request({
    url: `${eventInfoUrl}`,
    method: "get",
  });

//双预防-lec等级-修改
export const lecLevelUpdateAPI = (data) =>
  request({
    url: `${eventInfoUrl}`,
    method: "put",
    data: data,
  });

//双预防-lec等级-删除
export const lecLevelDeleteAPI = (params) =>
  request({
    url: `${eventInfoUrl}`,
    method: "delete",
    params: params,
  });


//双预防-lec等级标志-删除
export const eventSignInfoDeleteAPI = () =>
  request({
    url: `${getwarninglabelsInfoUrl}`,
    method: "get",
  });


// 风险事件  --- 创建
export const riskEventCreateAPI = (data) =>
  request({
    url: `${riskEventUrl}`,
    method: "post",
    data
  });
// 风险事件  --- 修改
export const riskEventUpdateAPI = (data) =>
  request({
    url: `${riskEventUrl}`,
    method: "put",
    data
  });

// 风险事件  --- 查看
export const riskEventViewAPI = (params) =>
  request({
    url: `${riskEventUrl}`,
    method: "get",
    params: params
  });
// 风险事件  --- 删除
export const riskEventDeleteAPI = (params) =>
  request({
    url: `${riskEventUrl}`,
    method: "delete",
    params: params
  });

// 风险事件  --- 无分页列表
export const riskEventListAPI = (params) =>
  request({
    url: `${riskEventUrl}/list`,
    method: "get",
    params: params
  });
// 风险事件  --- 分页列表
export const riskEventPageAPI = (params) =>
  request({
    url: `${riskEventUrl}/page`,
    method: "get",
    params: params
  });
// 风险分析单元列表
export const riskAnalysisUnitListAPI = (params) =>
  request({
    url: `${riskAnalysisUnit}/list`,
    method: "get",
    params: params
  });

// 风险分析单元统计
export const riskAnalysisUnitTaskAPI = (params) =>
  request({
    url: `${riskAnalysisUnit}/geteventactiontask`,
    method: "get",
    params: params
  });

export const getcyclesbyunitidAPI = (params) =>
  request({
    url: `${riskAnalysisUnit}/getcyclesbyunitid`,
    method: "get",
    params: params
  });

