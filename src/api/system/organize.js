import request from '@/router/axios';

// 获取部门树形列表
export const deptListTreeAPI = (params) => {
    return request({
        url: '/api/system/dept/listtree',
        method: 'get',
        params: params
    })
}
// 部门数据回填
export const returnDeptDataAPI = (params) => {
    return request({
        url: '/api/system/dept/view',
        method: 'get',
        params: params
    })
}
// 部门新增保存
export const createDeptDataAPI = (params) => {
    return request({
        url: '/api/system/dept/create',
        method: 'post',
        data: params
    })
}
// 部门修改保存
export const updateDeptDataAPI = (params) => {
    return request({
        url: '/api/system/dept/update',
        method: 'put',
        data: params
    })
}
// 删除部门列表数据
export const deleteDeptDataAPI = (params) => {
    return request({
        url: '/api/system/dept/remove',
        method: 'delete',
        params: params
    })
}
// 指定分管领导
export const confirmDespercharAPI = (params) => {
    return request({
        url: '/api/system/dept/desperchar',
        method: 'get',
        params: params
    })
}