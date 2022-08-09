import request from '@/router/axios';
// 获取定位引擎配置列表
export const engineConfigListAPI = (params) => request({
  url: '/api/location/config/engine/list',
  method: 'get',
  params: params
});
// 获取定位引擎配置
export const engineConfigGetAPI = (params) => request({
  url: '/api/location/config/engine',
  method: 'get',
  params: params
});
// 创建定位引擎配置
export const engineConfigCreateAPI = (params) => request({
  url: '/api/location/config/engine',
  method: 'post',
  data: params
});
// 修改定位引擎配置
export const engineConfigUpdateAPI = (params) => request({
  url: '/api/location/config/engine',
  method: 'put',
  data: params
});
// 删除定位引擎配置
export const engineConfigBatchRemoveAPI = (params) => request({
  url: '/api/location/config/engine',
  method: 'delete',
  params: params
});
// 真趣订阅接口
export const engineSubscribeAPI = (params) => request({
  url: '/api/location/engine/joysuch/callback/subscribe',
  method: 'post',
  params: params
})
// 历史订阅记录
export const engineSubscribeLogAPI = (params) => request({
  url: '/api/location/engine/subscribe/list',
  method: 'get',
  params: params
})
