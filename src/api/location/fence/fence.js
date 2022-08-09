import request from '@/router/axios';
// 获取电子围栏列表
export const fenceListAPI = (params) => request({
  url: '/api/location/fence/list',
  method: 'get',
  params: params
});
// 获取电子围栏
export const fenceGetAPI = (params) => request({
  url: '/api/location/fence',
  method: 'get',
  params: params
});
// 创建电子围栏
export const fenceCreateAPI = (params) => request({
  url: '/api/location/fence',
  method: 'post',
  data: params
});
// 修改电子围栏
export const fenceUpdateAPI = (params) => request({
  url: '/api/location/fence',
  method: 'put',
  data: params
});
// 删除电子围栏
export const fenceBatchRemoveAPI = (params) => request({
  url: '/api/location/fence',
  method: 'delete',
  params: params
});
