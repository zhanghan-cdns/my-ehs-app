import request from '@/router/axios';

//获取角色列表
export const roleListAPI = (params) => {
  return request({
    url: '/api/system/role/list',
    method: 'get',
    params: params
  })
}
// 表单数据回填
export const returnFormDataAPI = (params) => {
  return request({
    url: '/api/system/role',
    method: 'get',
    params: params
  })
}
// 表单新增保存
export const createFormDataAPI = (params) => {
  return request({
    url: '/api/system/role',
    method: 'post',
    data: params
  })
}
// 表单修改保存
export const updateFormDataAPI = (params) => {
  return request({
    url: '/api/system/role',
    method: 'put',
    data: params
  })
}
// 删除列表数据
export const deleteListDataAPI = (params) => {
  return request({
    url: '/api/system/role',
    method: 'delete',
    params: params
  })
}
// 获取权限树
export const permissionsTreeDataAPI = (params) => {
  return request({
    url: '/api/system/role/permissions',
    method: 'get',
    params: params
  })
}
// 设置权限树
export const savePermissionsTreeDataAPI = (params) => {
  return request({
    url: '/api/system/role/permissions',
    method: 'post',
    data: params
  })
}

//获取角色下拉
export const roleListNopageAPI = (params) => {
  return request({
      url: '/api/system/role/listnopage',
      method: 'get',
      params: params
  })
}
