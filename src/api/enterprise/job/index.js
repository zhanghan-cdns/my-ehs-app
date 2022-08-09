import request from '@/router/axios';

const jobUrl = '/api/enterprise/job'
//岗位列表的信息-列表
export const jobListAPI = (params) => request({
  url: `${jobUrl}/list`,
  method: 'get',
  params: params
});

//岗位列表的信息-创建
export const jobCreateAPI = (params) => request({
  url: `${jobUrl}/create`,
  method: 'post',
  data: params
});

//岗位列表的信息-修改
export const jobUpdateAPI = (params) => request({
  url: `${jobUrl}/update`,
  method: 'put',
  data: params
});

//岗位列表的信息-查看
export const jobViewAPI = (params) => request({
  url: `${jobUrl}/view`,
  method: 'get',
  params  : params
});
