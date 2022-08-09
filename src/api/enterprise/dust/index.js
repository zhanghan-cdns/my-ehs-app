import request from '@/router/axios';

//粉尘列表的信息-列表
export const dustListAPI = (params) => request({
  url: '/api/enterprise/dust/list',
  method: 'get',
  params:params
});

//粉尘列表的信息-详情
export const dustViewAPI = (params) => request({
  url: '/api/enterprise/dust/view',
  method: 'get',
  params: params
});

//粉尘列表的信息-创建
export const dustCreateAPI = (data) => request({
  url: '/api/enterprise/dust/create',
  method: 'post',
  data:data
});

//粉尘列表的信息-编辑
export const dustUpdateAPI = (data) => request({
  url: '/api/enterprise/dust/update',
  method: 'post',
  data:data
});

//粉尘列表的信息-删除
export const dustDeleteAPI = (data) => request({
  url: '/api/enterprise/dust/delete',
  method: 'post',
  data:data
});

