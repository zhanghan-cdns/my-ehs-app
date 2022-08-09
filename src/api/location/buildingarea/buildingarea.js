import request from '@/router/axios';
// 获取建筑区域配置列表
export const buildingAreaListAPI = (params) => request({
  url: '/api/location/buildingarea/list',
  method: 'get',
  params: params
});
// 获取建筑区域配置
export const buildingAreaGetAPI = (params) => request({
  url: '/api/location/buildingarea',
  method: 'get',
  params: params
});
// 创建建筑区域配置
export const buildingAreaCreateAPI = (params) => request({
  url: '/api/location/buildingarea',
  method: 'post',
  data: params
});
// 修改建筑区域配置
export const buildingAreaUpdateAPI = (params) => request({
  url: '/api/location/buildingarea',
  method: 'put',
  data: params
});
// 删除建筑区域配置
export const buildingAreaBatchRemoveAPI = (params) => request({
  url: '/api/location/buildingarea',
  method: 'delete',
  params: params
});
