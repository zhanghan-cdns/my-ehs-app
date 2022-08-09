import request from '@/router/axios';
// 获取插件列表
export const pluginListAPI = (params) => request({
  url: '/api/develop/gen/plugin/list',
  method: 'get',
  params: params
});
// 获取插件
export const pluginGetAPI = (params) => request({
  url: '/api/develop/gen/plugin',
  method: 'get',
  params: params
});
// 创建插件
export const pluginCreateAPI = (params) => request({
  url: '/api/develop/gen/plugin',
  method: 'post',
  data: params
});
// 修改插件
export const pluginUpdateAPI = (params) => request({
  url: '/api/develop/gen/plugin',
  method: 'put',
  data: params
});
// 删除插件
export const pluginBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/plugin',
  method: 'delete',
  params: params
});
