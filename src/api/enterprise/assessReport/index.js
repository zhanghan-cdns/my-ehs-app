import request from '@/router/axios';

//一企一档-评价报告-列表
export const assessListAPI = (params) => request({
  url: '/api/enterprise/assessReport/list',
  method: 'get',
  params:params
});

//一企一档-评价报告-创建
export const assessCreateAPI = (params) => request({
  url: '/api/enterprise/assessReport/create',
  method: 'post',
  data:params
});

//图片预览接口
export const entPersonnelPreviewAPI = (params) => request({
  url: '/api/resource/file/download/?url='+params,
  method: 'get',
  // params:params
});

//一企一档-评价报告-查看
export const assessGetAPI = (params) => request({
  url: '/api/enterprise/assessReport/view',
  method: 'get',
  params: params
});

// 一企一档-评价报告-修改
export const assessUpdateAPI = (params) => request({
  url: '/api/enterprise/assessReport/update',
  method: 'put',
  data: params
});

//一企一档-评价报告-删除
export const assessRemoveAPI = (params) => request({
  url: '/api/enterprise/assessReport/delete',
  method: 'delete',
  params: params
});

