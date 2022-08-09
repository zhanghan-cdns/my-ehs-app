import request from '@/router/axios';

//一企一档-仓库区-列表
export const warehouseAreaListAPI = (params) => request({
  url: '/api/enterprise/warehouseArea/list',
  method: 'get',
  params:params
});

//一企一档-仓库区-创建
export const warehouseAreaCreateAPI = (data) => request({
  url: '/api/enterprise/warehouseArea/create',
  method: 'post',
  data:data
});

//一企一档-仓库区-查看
export const warehouseAreaViewAPI = (params) => request({
  url: '/api/enterprise/warehouseArea/view',
  method: 'get',
  params:params
});

//一企一档-仓库区-删除
export const warehouseAreaDeleteAPI = (params) => request({
  url: '/api/enterprise/warehouseArea/delete',
  method: 'delete',
  params:params
});

//一企一档-仓库区-修改
export const warehouseAreaUpdateAPI = (data) => request({
  url: '/api/enterprise/warehouseArea/update',
  method: 'put',
  data:data
});
