import request from '@/router/axios';
// 获取模型列表
export const modelListAPI = (params) => request({
  url: '/api/develop/gen/model/list',
  method: 'get',
  params: params
});
// 获取模型
export const modelGetAPI = (params) => request({
  url: '/api/develop/gen/model',
  method: 'get',
  params: params
});
// 创建模型
export const modelCreateAPI = (params) => request({
  url: '/api/develop/gen/model',
  method: 'post',
  data: params
});
// 修改模型
export const modelUpdateAPI = (params) => request({
  url: '/api/develop/gen/model',
  method: 'put',
  data: params
});
// 删除模型
export const modelBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/model',
  method: 'delete',
  params: params
});
