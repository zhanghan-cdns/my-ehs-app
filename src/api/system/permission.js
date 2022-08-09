import request from '@/router/axios';
//获取菜单列表
export const permissionListAPI = (params) => {
  return request({
    url: '/api/system/permission/list',
    method: 'get',
    params: params
  })
}
// 创建权限菜单
export const permissionCreateAPI = (data) => {
  return request({
    url: '/api/system/permission',
    method: 'post',
    data: data
  })
}
// 查看菜单详情
export const permissionViewAPI = (params) => {
  return request({
    url: '/api/system/permission',
    method: 'get',
    params: params
  })
}
// 删除菜单
export const permissionDeleteAPI = (params) => {
  return request({
    url: '/api/system/permission',
    method: 'delete',
    params: params
  })
}
// 修改菜单
export const permissionUpdateAPI = (data) => {
  return request({
    url: '/api/system/permission',
    method: 'put',
    data: data
  })
}