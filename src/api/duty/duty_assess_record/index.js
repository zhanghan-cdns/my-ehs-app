import request from "@/router/axios";

const sdpInfoUrl = `/api/enterprise/duty_assess_record`

//目标职责-考核奖惩-列表
export const adpInfoListAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-考核奖惩-创建
export const sdpInfoCreateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-考核奖惩-查看
export const sdpInfoViewAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-考核奖惩-修改
export const sdpInfoUpdateAPI = (data) =>
  request({
    url: `${sdpInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-考核奖惩-删除
export const sdpInfoDeleteAPI = (params) =>
  request({
    url: `${sdpInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

  //目标职责-考核奖惩-岗位
export const jobInfoListAPI = (params) =>
request({
  url: `/api/enterprise/job/list`,
  method: "get",
  params: params,
});

