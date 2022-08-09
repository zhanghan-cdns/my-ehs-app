import request from '@/router/axios';
// 获取定位告警列表
export const locationAlarmListAPI = (params) => request({
  url: '/api/location/alarm/list',
  method: 'get',
  params: params
});
// 获取定位告警
export const locationAlarmGetAPI = (params) => request({
  url: '/api/location/alarm',
  method: 'get',
  params: params
});
// 创建定位告警
export const locationAlarmCreateAPI = (params) => request({
  url: '/api/location/alarm',
  method: 'post',
  data: params
});
// 修改定位告警
export const locationAlarmUpdateAPI = (params) => request({
  url: '/api/location/alarm',
  method: 'put',
  data: params
});
// 删除定位告警
export const locationAlarmBatchRemoveAPI = (params) => request({
  url: '/api/location/alarm',
  method: 'delete',
  params: params
});
