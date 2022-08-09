import request from '@/router/axios';
// 获取实体关系列表
export const entityRelationListAPI = (params) => request({
  url: '/api/develop/gen/entity/relation/list',
  method: 'get',
  params: params
});
// 获取实体关系
export const entityRelationGetAPI = (params) => request({
  url: '/api/develop/gen/entity/relation',
  method: 'get',
  params: params
});
// 创建实体关系
export const entityRelationCreateAPI = (params) => request({
  url: '/api/develop/gen/entity/relation',
  method: 'post',
  data: params
});
// 修改实体关系
export const entityRelationUpdateAPI = (params) => request({
  url: '/api/develop/gen/entity/relation',
  method: 'put',
  data: params
});
// 删除实体关系
export const entityRelationBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/entity/relation',
  method: 'delete',
  params: params
});
