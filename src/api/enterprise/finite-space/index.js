import request from '@/router/axios';

//有限空间列表的信息-列表
export const finiteSpaceListAPI = (params) => request({
  url: '/api/enterprise/finite-space/list',
  method: 'get',
  params:params
});

// 有限空间 新增
export const finiteSpaceCreateAPI = (data) => request({
  url: '/api/enterprise/finite-space/create',
  method: 'post',
  data:data
});

// 有限空间 获取详情
export const finiteSpaceViewAPI = (params) => request({
  url: '/api/enterprise/finite-space/view',
  method: 'get',
  params:params
});

// 有限空间 删除
export const finiteSpaceDeleteAPI = (params) => request({
  url: '/api/enterprise/finite-space/delete',
  method: 'delete',
  params:params
});

// 有限空间 修改
export const finiteSpaceUpdateAPI = (data) => request({
  url: '/api/enterprise/finite-space/update',
  method: 'put',
  data:data
});
