import request from '@/router/axios';

//一企一档-三同时管理-列表
export const projectThreeSimListAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/list',
  method: 'get',
  params:params
});

//一企一档-三同时管理-创建
export const projectThreeSimCreateAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/create',
  method: 'post',
  data:params
});

//图片预览接口
export const projectThreeSimPreviewAPI = (params) => request({
  url: '/api/resource/file/download/?url='+params,
  method: 'get',
  // params:params
});

//一企一档-三同时管理-查看
export const projectThreeSimGetAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/view',
  method: 'get',
  params: params
});

// 一企一档-三同时管理-修改
export const projectThreeSimUpdateAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/update',
  method: 'put',
  data: params
});

//一企一档-三同时管理-删除
export const projectThreeSimRemoveAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/remove',
  method: 'delete',
  params: params
});

//一企一档-三同时管理-删除
export const projectThreeSimgetSimFileAPI = (params) => request({
  url: '/api/enterprise/projectThreeSim/getSimFile',
  method: 'get',
  params: params
});

