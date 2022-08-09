import request from '@/router/axios';

// 获取对象列表
export const thingsListAPI = (params) => request({
  url: "/api/location/things/list",
  method: 'get',
  params: params
})
