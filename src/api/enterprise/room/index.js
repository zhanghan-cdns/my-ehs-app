import request from '@/router/axios';

//一企一档-仓库-列表
export const roomListAPI = (params) => request({
  url: '/api/enterprise/room/list',
  method: 'get',
  params:params
});

//一企一档-仓库-新增
export const roomCreateAPI = (data) => request({
  url: '/api/enterprise/room/create',
  method: 'post',
  data:data
});

//一企一档-仓库-查看
export const roomViewAPI = (params) => request({
  url: '/api/enterprise/room/view',
  method: 'get',
  params:params
});

//一企一档-仓库-删除
export const roomDeleteAPI = (params) => request({
  url: '/api/enterprise/room/remove',
  method: 'delete',
  params:params
});

//一企一档-仓库-修改
export const roomUpdateAPI = (data) => request({
  url: '/api/enterprise/room/update',
  method: 'put',
  data:data
});


//一企一档-仓库-重大危险源
export const hazardBaseListAllAPI = (data) => request({
  url: '/api/hazard/hazardBase/listAll',
  method: 'get',
  params:data
});


