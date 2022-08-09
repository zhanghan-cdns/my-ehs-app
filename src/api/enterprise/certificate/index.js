import request from '@/router/axios';

//粉尘列表的信息-列表
export const certificateListAPI = (params) => request({
  url: '/api/enterprise/certificate/list',
  method: 'get',
  params:params
});

//粉尘列表的信息-详情
export const certificateViewAPI = (params) => request({
  url: '/api/enterprise/certificate/view',
  method: 'get',
  params: params
});

//粉尘列表的信息-创建
export const certificateCreateAPI = (data) => request({
  url: '/api/enterprise/certificate/create',
  method: 'post',
  data:data
});

//粉尘列表的信息-编辑
export const certificateUpdateAPI = (data) => request({
  url: '/api/enterprise/certificate/update',
  method: 'put',
  data:data
});

//粉尘列表的信息-删除
export const certificateDeleteAPI = (data) => request({
  url: '/api/enterprise/certificate/delete',
  method: 'delete',
  params:data
});

