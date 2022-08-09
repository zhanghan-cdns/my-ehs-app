import request from "@/router/axios";

const dcuInfoUrl = `/api/enterprise/duty_cost_use`

//目标职责-费用使用-列表
export const dcuInfoListAPI = (params) =>
  request({
    url: `${dcuInfoUrl}/list`,
    method: "get",
    params: params,
  });

//目标职责-费用使用-创建
export const dcuInfoCreateAPI = (data) =>
  request({
    url: `${dcuInfoUrl}/create`,
    method: "post",
    data: data,
  });

//目标职责-费用使用-查看
export const dcuInfoViewAPI = (params) =>
  request({
    url: `${dcuInfoUrl}/view`,
    method: "get",
    params: params,
  });

//目标职责-费用使用-修改
export const dcuInfoUpdateAPI = (data) =>
  request({
    url: `${dcuInfoUrl}/update`,
    method: "put",
    data: data,
  });

//目标职责-费用使用-删除
export const dcuInfoDeleteAPI = (params) =>
  request({
    url: `${dcuInfoUrl}/delete`,
    method: "delete",
    params: params,
  });

//目标职责-费用使用 -获取用户列表
export const userListAPI = (params) => {
  return request({
      url: '/api/system/user/list',
      method: 'get',
      params: params
  })
}
