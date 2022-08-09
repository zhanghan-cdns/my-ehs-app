import request from '@/router/axios';

//人员基本的信息-分页列表
export const entPersonnelListAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/list',
  method: 'get',
  params:params
});
//人员基本的信息-全列表
export const entPersonnelListAllAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/listAll',
  method: 'get',
  params:params
});

//人员基本的信息-创建
export const entPersonnelCreateAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/create',
  method: 'post',
  data:params
});

//图片预览接口
export const entPersonnelPreviewAPI = (params) => request({
  url: '/api/resource/file/download/?url='+params,
  method: 'get',
  // params:params
});

//人员基本的信息-查看
export const entPersonnelGetAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/view',
  method: 'get',
  params: params
});

// 人员信息修改
export const entPersonnelUpdateAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/update',
  method: 'put',
  data: params
});

//人员基本的信息-删除
export const entPersonnelRemoveAPI = (params) => request({
  url: '/api/enterprise/entPersonnel/remove',
  method: 'delete',
  params: params
});

