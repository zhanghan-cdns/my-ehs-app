import request from '@/router/axios';

const maintainUrl = `/api/enterprise/emergency/equipmentMaintain`

// 应急装备/物资 保养列表
export const maintainListAPI = (params) => {
  return request({
    url: `${maintainUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急装备/物资 保养分页列表
export const maintainPageAPI = (params) => {
  return request({
    url: `${maintainUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急装备/物资 保养创建
export const maintainCreateAPI = (params) => {
  return request({
    url: `${maintainUrl}`,
    method: 'post',
    data: params
  })
}

// 应急装备/物资 保养查看
export const maintainViewAPI = (params) => {
  return request({
    url: `${maintainUrl}`,
    method: 'get',
    params: params
  })
}

// 应急装备/物资 保养更新
export const maintainUpdateAPI = (params) => {
  return request({
    url: `${maintainUrl}`,
    method: 'put',
    data: params
  })
}

// 应急装备/物资 保养删除
export const maintainDeleteAPI = (params) => {
  return request({
    url: `${maintainUrl}`,
    method: 'delete',
    params: params
  })
}