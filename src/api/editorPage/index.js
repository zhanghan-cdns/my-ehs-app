import request from '@/router/axios';

// 企业-企业信息-创建
export const enterpriseAPI = (params) => request({
  url: '/api/enterprise/info/create-base',
  method: 'post',
  data:params
});

// 企业信息-企业位置

export const saveLocationAPI = (params) => request({
  url: '/api/enterprise/info/save-location',
  method: 'put',
  data:params
});


export const savePersonAPI = (params) => request({
  url: '/api/enterprise/info/save-person',
  method: 'put',
  data:params
});


export const saveOrgAPI = (params) => request({
  url: '/api/enterprise/info/save-org',
  method: 'put',
  data:params
});


export const saveNormalizationAPI = (params) => request({
  url: '/api/enterprise/info/save-normalization',
  method: 'put',
  data:params
});

export const saveDangerAPI = (params) => request({
  url: '/api/enterprise/info/save-danger',
  method: 'put',
  data:params
});

export const saveExtraAPI = (params) => request({
  url: '/api/enterprise/info/save-extra',
  method: 'put',
  data:params
});

