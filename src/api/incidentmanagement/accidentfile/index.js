import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/`

//事故管理-事故档案-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//事故管理-事故档案-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//事故管理-事故档案-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//事故管理-事故档案-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//事故管理-事故档案-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

  //事故管理-事故档案-岗位
export const jobInfoListAPI = (params) =>
request({
  url: `/api/enterprise/job/list`,
  method: "get",
  params: params,
});

