import request from '@/router/axios';
//一企一档-危化品出入库-列表
export const chemicalsListAPI = (params) => request({
  url: '/api/enterprise/chemicals/list',
  method: 'get',
  params:params
});

// 一企一档-危化品出入库-新增
export const chemicalsCreateAPI = (data) => request({
  url: '/api/enterprise/chemicals/create',
  method: 'post',
  data:data
});

// 一企一档-危化品出入库-修改
export const chemicalsUpdateAPI = (data) => request({
  url: '/api/enterprise/chemicals/update',
  method: 'put',
  data:data
});

// 一企一档-危化品出入库-删除
export const chemicalsDeleteAPI = (data) => request({
  url: '/api/enterprise/chemicals/delete',
  method: 'delete',
  params:data
});

// 一企一档-危化品出入库-查看
export const chemicalsViewAPI = (data) => request({
  url: '/api/enterprise/chemicals/view',
  method: 'get',
  params:data
});

// 一企一档-危化品出入库-物料信息
export const chemicalsMaterialAPI = (data) => request({
  url: '/api/enterprise/materials/material-info',
  method: 'get',
  data:data
});
