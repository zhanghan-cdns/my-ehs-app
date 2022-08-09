import request from "@/router/axios";

const dceInfoUrl = `/api/enterprise/duty_cost_extract`

//目标职责-费用提取-列表
export const dceInfoListAPI = (params) =>
  request({
    url: `${dceInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-费用提取-创建
export const dceInfoCreateAPI = (data) =>
  request({
    url: `${dceInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-费用提取-查看
export const dceInfoViewAPI = (params) =>
  request({
    url: `${dceInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-费用提取-修改
export const dceInfoUpdateAPI = (data) =>
  request({
    url: `${dceInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-费用提取-删除
export const dceInfoDeleteAPI = (params) =>
  request({
    url: `${dceInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

  //目标职责-费用提取-计算
export const dceInfoCountAPI = (params) =>
request({
  url: `${dceInfoUrl}/count`,
  method: "get",
  params: params,
});

