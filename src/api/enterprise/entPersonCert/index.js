import request from '@/router/axios';

//一企一档-人员证件信息-列表
export const entPersonListAPI = (params) => request({
  url: '/api/enterprise/entPersonCert/list',
  method: 'get',
  params:params
});

//一企一档-人员证件信息-创建
export const entPersonCreateAPI = (params) => request({
  url: '/api/enterprise/entPersonCert/create',
  method: 'post',
  data:params
});

//一企一档-人员证件信息-证书持有者查询
export const entPersonQueryAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/personNames',
  method: 'get',
  params:params
});

//图片预览接口
export const entPersonnelPreviewAPI = (params) => request({
  url: '/api/resource/file/download/?url='+params,
  method: 'get',
  // params:params
});

//一企一档-人员证件信息-查看
export const entPersonGetAPI = (params) => request({
  url: '/api/enterprise/entPersonCert/view',
  method: 'get',
  params: params
});

// 一企一档-人员证件信息-修改
export const entPersonUpdateAPI = (params) => request({
  url: '/api/enterprise/entPersonCert/update',
  method: 'put',
  data: params
});

//一企一档-人员证件信息-删除
export const entPersonRemoveAPI = (params) => request({
  url: '/api/enterprise/entPersonCert/remove',
  method: 'delete',
  params: params
});

