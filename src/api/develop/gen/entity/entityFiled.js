import request from '@/router/axios';
// 获取实体字段列表
export const entityFieldListAPI = (params) => request({
  url: '/api/develop/gen/entity/field/list',
  method: 'get',
  params: params
});
// 获取实体字段
export const entityFieldGetAPI = (params) => request({
  url: '/api/develop/gen/entity/field',
  method: 'get',
  params: params
});
// 创建实体字段
export const entityFieldCreateAPI = (params) => request({
  url: '/api/develop/gen/entity/field',
  method: 'post',
  data: params
});
// 修改实体字段
export const entityFieldUpdateAPI = (params) => request({
  url: '/api/develop/gen/entity/field',
  method: 'put',
  data: params
});
// 删除实体字段
export const entityFieldBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/entity/field',
  method: 'delete',
  params: params
});
