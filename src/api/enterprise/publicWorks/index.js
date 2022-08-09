import request from '@/router/axios';

//一企一档-公共工程-列表
export const publicWorksListAPI = (params) => request({
  url: '/api/enterprise/publicWorks/list',
  method: 'get',
  params:params
});

//一企一档-公共工程-创建
export const publicWorksCreateAPI = (params) => request({
  url: '/api/enterprise/publicWorks/create',
  method: 'post',
  data:params
});

//图片预览接口
export const entPersonnelPreviewAPI = (params) => request({
  url: '/api/resource/file/download/?url='+params,
  method: 'get',
  // params:params
});

//一企一档-公共工程-查看
export const publicWorksGetAPI = (params) => request({
  url: '/api/enterprise/publicWorks/view',
  method: 'get',
  params: params
});

// 一企一档-公共工程-修改
export const publicWorksUpdateAPI = (params) => request({
  url: '/api/enterprise/publicWorks/update',
  method: 'put',
  data: params
});

//一企一档-公共工程-删除
export const publicWorksRemoveAPI = (params) => request({
  url: '/api/enterprise/publicWorks/delete',
  method: 'delete',
  params: params
});

