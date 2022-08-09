import request from '@/router/axios';
// 获取服务列表
export const serverListAPI = (params) => request({
  url: '/api/auth/server/list',
  method: 'get',
  params: params
});
// 获取服务
export const serverGetAPI = (params) => request({
  url: '/api/auth/server',
  method: 'get',
  params: params
});
// 创建服务
export const serverCreateAPI = (params) => request({
  url: '/api/auth/server',
  method: 'post',
  data: params
});
// 修改服务
export const serverUpdateAPI = (params) => request({
  url: '/api/auth/server',
  method: 'put',
  data: params
});
// 删除服务
export const serverBatchRemoveAPI = (params) => request({
  url: '/api/auth/server',
  method: 'delete',
  params: params
});
