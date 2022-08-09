import request from "@/router/axios";

const safeInfoUrl = `/api/enterprise/duty_safety_manage`
const list_selectUrl = `/api/enterprise/duty_safety_manage/list_select`


//目标职责-安全网格-列表
export const safeInfoListAPI = (params) =>
  request({
    url: `${safeInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-安全网格-创建
export const safeInfoCreateAPI = (data) =>
  request({
    url: `${safeInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-安全网格-查看
export const safeInfoViewAPI = (params) =>
  request({
    url: `${safeInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-安全网格-修改
export const safeInfoUpdateAPI = (data) =>
  request({
    url: `${safeInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-安全网格-删除
export const safeInfoDeleteAPI = (params) =>
  request({
    url: `${safeInfoUrl}/delete`,
    method: "delete",
    params: params,
  });


//目标职责-安全网格-所属上级
export const listSelectAPI = (params) =>
request({
  url: `${list_selectUrl}`,
  method: "get",
  params: params,
});

