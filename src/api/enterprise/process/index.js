import request from '@/router/axios';

//一企一档-工艺信息-列表
export const processListAPI = (params) => request({
  url: '/api/enterprise/process/list',
  method: 'get',
  params:params
});

//一企一档-工艺信息-创建
export const processCreateAPI = (data) => request({
  url: '/api/enterprise/process/create',
  method: 'post',
  data:data
});

//一企一档-工艺信息-查看
export const processViewAPI = (params) => request({
  url: '/api/enterprise/process/view',
  method: 'get',
  params:params
});

//一企一档-工艺信息-删除
export const processDeleteAPI = (params) => request({
  url: '/api/enterprise/process/delete',
  method: 'delete',
  params:params
});

//一企一档-工艺信息-修改
export const processUpdateAPI = (data) => request({
  url: '/api/enterprise/process/update',
  method: 'put',
  data:data
});
