import request from '@/router/axios';

const equipmentUrl = `/api/enterprise/emergency/equipment`

// 应急装备列表
export const equipmentListAPI = (params) => {
  return request({
    url: `${equipmentUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急装备分页列表
export const equipmentPageAPI = (params) => {
  return request({
    url: `${equipmentUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急装备创建
export const equipmentCreateAPI = (params) => {
  return request({
    url: `${equipmentUrl}`,
    method: 'post',
    data: params
  })
}

// 应急装备查看
export const equipmentViewAPI = (params) => {
  return request({
    url: `${equipmentUrl}`,
    method: 'get',
    params: params
  })
}

// 应急装备更新
export const equipmentUpdateAPI = (params) => {
  return request({
    url: `${equipmentUrl}`,
    method: 'put',
    data: params
  })
}

// 应急装备删除
export const equipmentDeleteAPI = (params) => {
  return request({
    url: `${equipmentUrl}`,
    method: 'delete',
    params: params
  })
}


