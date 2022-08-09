import request from '@/router/axios';

//一企一档-生产装置-列表
export const prodUnitListAPI = (params) => request({
  url: '/api/enterprise/prod-unit/list',
  method: 'get',
  params:params
});

//一企一档-生产装置-创建
export const prodUnitCreateAPI = (data) => request({
  url: '/api/enterprise/prod-unit/create',
  method: 'post',
  data:data
});

//一企一档-生产装置-查看
export const prodUnitViewAPI = (params) => request({
  url: '/api/enterprise/prod-unit/view',
  method: 'get',
  params:params
});

//一企一档-生产装置-删除
export const prodUnitDeleteAPI = (params) => request({
  url: '/api/enterprise/prod-unit/delete',
  method: 'delete',
  params:params
});

//一企一档-生产装置-修改
export const prodUnitUpdateAPI = (data) => request({
  url: '/api/enterprise/prod-unit/update',
  method: 'put',
  data:data
});
