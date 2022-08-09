import request from '@/router/axios';
// 获取实体字段接口列表
export const entityFieldApiListAPI = (params) => request({
  url: '/api/develop/gen/entity/field/api/list',
  method: 'get',
  params: params
});
// 获取实体字段接口
export const entityFieldApiGetAPI = (params) => request({
  url: '/api/develop/gen/entity/field/api',
  method: 'get',
  params: params
});
// 创建实体字段接口
export const entityFieldApiCreateAPI = (params) => request({
  url: '/api/develop/gen/entity/field/api',
  method: 'post',
  data: params
});
// 修改实体字段接口
export const entityFieldApiUpdateAPI = (params) => request({
  url: '/api/develop/gen/entity/field/api',
  method: 'put',
  data: params
});
// 删除实体字段接口
export const entityFieldApiBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/entity/field/api',
  method: 'delete',
  params: params
});
