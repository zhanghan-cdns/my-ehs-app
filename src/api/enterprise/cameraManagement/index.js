import request from '@/router/axios';

//摄像头-列表
export const cameraManagementListAPI = (params) => request({
  url: '/api/enterprise/cameraManagement/list',
  method: 'get',
  params:params
});

//摄像头-详情
export const cameraManagementViewAPI = (params) => request({
  url: '/api/enterprise/cameraManagement/view',
  method: 'get',
  params: params
});

//摄像头-创建
export const cameraManagementCreateAPI = (data) => request({
  url: '/api/enterprise/cameraManagement/create',
  method: 'post',
  data:data
});

//摄像头-编辑
export const cameraManagementUpdateAPI = (data) => request({
  url: '/api/enterprise/cameraManagement/update',
  method: 'put',
  data:data
});

//摄像头-删除
export const cameraManagementDeleteAPI = (data) => request({
  url: '/api/enterprise/cameraManagement/delete',
  method: 'delete',
  params:data
});

//摄像头-绑定区域
export const buildingareaListAPI = (params) => request({
  url: '/api/location/buildingarea/getBuildingAreaList',
  method: 'get',
  params:params
});


