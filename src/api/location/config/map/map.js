import request from '@/router/axios';
// 获取定位地图配置列表
export const mapConfigListAPI = (params) => request({
  url: '/api/location/config/map/list',
  method: 'get',
  params: params
});
// 获取定位地图配置
export const mapConfigGetAPI = (params) => request({
  url: '/api/location/config/map',
  method: 'get',
  params: params
});
// 创建定位地图配置
export const mapConfigCreateAPI = (params) => request({
  url: '/api/location/config/map',
  method: 'post',
  data: params
});
// 修改定位地图配置
export const mapConfigUpdateAPI = (params) => request({
  url: '/api/location/config/map',
  method: 'put',
  data: params
});
// 删除定位地图配置
export const mapConfigBatchRemoveAPI = (params) => request({
  url: '/api/location/config/map',
  method: 'delete',
  params: params
});
