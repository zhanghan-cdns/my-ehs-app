import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/accidentReport`

const dcInfoUrl = `/api/enterprise/surveyInfo`//调查

//事故管理-事故快报-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//事故管理-事故快报-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//事故管理-事故快报-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//事故管理-事故快报-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//事故管理-事故快报-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

  //事故管理-事故快报-岗位
export const jobInfoListAPI = (params) =>
request({
  url: `/api/enterprise/job/list`,
  method: "get",
  params: params,
});

//事故管理-事故调查-创建
export const dcInfoCreateAPI = (data) => 
  request({
    url: `${dcInfoUrl}/create`,
    method: "post",
    data: data,
  });

//事故管理-事故调查-查看
export const dcInfoViewAPI = (params) =>
  request({
    url: `${dcInfoUrl}/view`,
    method: "get",
    params: params,
  });

//事故管理-事故调查-修改
export const dcInfoUpdateAPI = (data) =>
  request({
    url: `${dcInfoUrl}/update`,
    method: "put",
    data: data,
  });

//事故管理-伤亡人员-删除
export const casualDeleteAPI = (params) =>
request({
  url: `/api/enterprise/casualtiesInfo/delete`,
  method: "delete",
  params: params,
});



