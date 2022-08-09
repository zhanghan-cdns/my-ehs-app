import request from '@/router/axios';
// 获取菜单列表
export const menuListAPI = (params) => request({
  url: '/api/system/user/menus',
  method: 'get',
  params: params
});
// 获取按钮权限列表
export const buttonListAPI = (params) => request({
  url: '/api/system/user/buttons',
  method: 'get',
  params: params
});
// 创建菜单权限
export const menuCreateAPI = (params) => request({
  url: '/api/system/permission/create',
  method: 'get',
  params: params
});