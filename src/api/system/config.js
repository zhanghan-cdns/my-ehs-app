import request from '@/router/axios';
// 获取系统配置信息(登录前)
export const systemConfigAPI = (params) => request({
  url: '/api/system/config/load',
  method: 'get',
  params: params
});
// 系统配置修改
export const systemConfigUploadAPI = (data) => request({
  url: '/api/system/config',
  method: 'put',
  data: data
});
// 系统配置添加
export const systemConfigCreateAPI = (data) => request({
  url: '/api/system/config',
  method: 'post',
  data: data
});
// 系统配置获取
export const systemConfigViewAPI = (params) => request({
  url: '/api/system/config',
  method: 'get',
  params: params
});
