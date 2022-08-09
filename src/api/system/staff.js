import request from '@/router/axios';

//获取员工列表
export const staffListAPI = (params) => {
    return request({
      url: '/api/person/staff/list',
      method: 'get',
      params: params
    })
}
// 员工数据回填
export const returnStaffDataAPI = (params) => {
    return request({
        url: '/api/person/staff/view',
        method: 'get',
        params: params
    })
}
// 员工新增保存
export const createStaffDataAPI = (params) => {
    return request({
        url: '/api/person/staff/create',
        method: 'post',
        data: params
    })
}
// 员工修改保存
export const updateStaffDataAPI = (params) => {
    return request({
        url: '/api/person/staff/update',
        method: 'put',
        data: params
    })
}
// 删除员工列表数据
export const deleteStaffDataAPI = (params) => {
    return request({
        url: '/api/person/staff/remove',
        method: 'delete',
        params: params
    })
}
// 员工导入
export const uploadStaffAPI = (params) => {
    return request({
        url: '/api/person/staff/importdata',
        method: 'post',
        data: params,
        headers:{
            'type': 'upload'
        },
    })
}