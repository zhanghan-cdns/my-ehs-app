import request from "@/router/axios";

const dcbInfoUrl = `/api/enterprise/duty_cost_budget`

//目标职责-费用预算-列表
export const dcbInfoListAPI = (params) =>
  request({
    url: `${dcbInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-费用预算-创建
export const dcbInfoCreateAPI = (data) =>
  request({
    url: `${dcbInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-费用预算-查看
export const dcbInfoViewAPI = (params) =>
  request({
    url: `${dcbInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-费用预算-修改
export const dcbInfoUpdateAPI = (data) =>
  request({
    url: `${dcbInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-费用预算-删除
export const dcbInfoDeleteAPI = (params) =>
  request({
    url: `${dcbInfoUrl}/delete`,
    method: "delete",
    params: params,
  });
