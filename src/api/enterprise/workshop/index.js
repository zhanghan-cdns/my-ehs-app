import request from '@/router/axios';


//车间信息列表的信息-列表
export const workshopListAPI = (params) => request({
  url: '/api/enterprise/workshop/list',
  method: 'get',
  params:params
});

// 车间信息 新增
export const workshopCreateAPI = (data) => request({
  url: '/api/enterprise/workshop/create',
  method: 'post',
  data:data
});

// 车间信息 获取详情
export const workshopViewAPI = (params) => request({
  url: '/api/enterprise/workshop/view',
  method: 'get',
  params:params
});

// 车间信息 删除
export const workshopDeleteAPI = (params) => request({
  url: '/api/enterprise/workshop/delete',
  method: 'delete',
  params:params
});

// 车间信息 修改
export const workshopUpdateAPI = (data) => request({
  url: '/api/enterprise/workshop/update',
  method: 'put',
  data:data
});
