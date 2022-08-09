import request from '@/router/axios';
// 获取实体列表
export const entityListAPI = (params) => request({
  url: '/api/develop/gen/entity/list',
  method: 'get',
  params: params
});
// 获取实体
export const entityGetAPI = (params) => request({
  url: '/api/develop/gen/entity',
  method: 'get',
  params: params
});
// 创建实体
export const entityCreateAPI = (params) => request({
  url: '/api/develop/gen/entity',
  method: 'post',
  data: params
});
// 修改实体
export const entityUpdateAPI = (params) => request({
  url: '/api/develop/gen/entity',
  method: 'put',
  data: params
});
// 删除实体
export const entityBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/entity',
  method: 'delete',
  params: params
});
