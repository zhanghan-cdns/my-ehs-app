import request from "@/router/axios";

const assessmentInfoUrl = `/api/enterprise/duty_indicator`

//目标职责-自评分析-列表
export const astInfoListAPI = (params) =>
  request({
    url: `${assessmentInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-自评分析-创建
export const astInfoCreateAPI = (data) =>
  request({
    url: `${assessmentInfoUrl}/self`,
    method: "post",
    data: data,
  });

//目标职责-自评分析-查看
export const astInfoViewAPI = (params) =>
  request({
    url: `${assessmentInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-自评分析-修改
export const astInfoUpdateAPI = (data) =>
  request({
    url: `${assessmentInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-自评分析-删除
export const astInfoDeleteAPI = (params) =>
  request({
    url: `${assessmentInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

//目标职责-自评分析树列表-列表
export const treeInfoListAPI = (data) =>
  request({
    url: `${assessmentInfoUrl}/tree_list`,
    method: "get",
    data: data,
  });

 //目标职责-考核分析-创建
export const assessmentInfoCreateAPI = (data) =>
request({
  url: `${assessmentInfoUrl}/create`,
  method: "post",
  data: data,
});
