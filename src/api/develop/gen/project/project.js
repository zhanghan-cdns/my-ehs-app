import request from '@/router/axios';
// 获取工程列表
export const projectListAPI = (params) => request({
  url: '/api/develop/gen/project/list',
  method: 'get',
  params: params
});
// 获取工程
export const projectGetAPI = (params) => request({
  url: '/api/develop/gen/project',
  method: 'get',
  params: params
});
// 创建工程
export const projectCreateAPI = (params) => request({
  url: '/api/develop/gen/project',
  method: 'post',
  data: params
});
// 修改工程
export const projectUpdateAPI = (params) => request({
  url: '/api/develop/gen/project',
  method: 'put',
  data: params
});
// 删除工程
export const projectBatchRemoveAPI = (params) => request({
  url: '/api/develop/gen/project',
  method: 'delete',
  params: params
});
// 预览代码
export const projectPreviewAPI = (params) => request({
  url: '/api/develop/gen/project/preview',
  method: 'get',
  params: params
});
// 下载工程
export const projectDownloadAPI = (params) => request({
  url: '/api/develop/gen/project/download',
  method: 'get',
  params: params
});
