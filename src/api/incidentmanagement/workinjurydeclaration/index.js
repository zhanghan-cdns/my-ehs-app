import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/workInjuryDeclaration`

//事故管理-工伤申报-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//事故管理-工伤申报-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//事故管理-工伤申报-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//事故管理-工伤申报-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//事故管理-工伤申报-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

  //事故管理-工伤申报-岗位
export const jobInfoListAPI = (params) =>
request({
  url: `/api/enterprise/job/list`,
  method: "get",
  params: params,
});

