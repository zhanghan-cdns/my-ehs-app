import request from '@/router/axios';

//获取用户列表
export const userListAPI = (params) => {
  return request({
      url: '/api/system/user/list',
      method: 'get',
      params: params
  })
}
// 用户表单数据回填
export const returnUserFormDataAPI = (params) => {
  return request({
      url: '/api/system/user/view',
      method: 'get',
      params: params
  })
}
// 用户表单新增保存
export const createUserFormDataAPI = (params) => {
  return request({
      url: '/api/system/user/create',
      method: 'post',
      data: params
  })
}
// 用户表单修改保存
export const updateUserFormDataAPI = (params) => {
  return request({
      url: '/api/system/user/update',
      method: 'put',
      data: params
  })
}
// 删除用户列表数据
export const deleteUserListDataAPI = (params) => {
  return request({
      url: '/api/system/user/remove',
      method: 'delete',
      params: params
  })
}
// 修改用户密码
export const changePasswordDataAPI = (params) => {
  return request({
      url: '/api/system/user/changepassword',
      method: 'get',
      params: params
  })
}
// 重置用户密码
export const resetPasswordDataAPI = (params) => {
  return request({
      url: '/api/system/user/resetpassword',
      method: 'get',
      params: params
  })
}
// 获取用户下拉
export const  useDepTreeListAPI = (params) => {
  return request({
      url: '/api/system/user/dep-tree-list',
      method: 'get',
      params: params
  })
}
// 获取企业名称
export const  getEntNameAPI = (params) => {
  return request({
      url: '/api/domain/organization/get-name-by-domain',
      method: 'get',
      params: params
  })
}
