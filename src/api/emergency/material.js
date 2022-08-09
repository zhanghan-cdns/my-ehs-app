import request from '@/router/axios';

const materialUrl = `/api/enterprise/emergency/material`

// 应急物资列表
export const materialListAPI = (params) => {
  return request({
    url: `${materialUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急物资分页列表
export const materialPageAPI = (params) => {
  return request({
    url: `${materialUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急物资创建
export const materialCreateAPI = (params) => {
  return request({
    url: `${materialUrl}`,
    method: 'post',
    data: params
  })
}

// 应急物资查看
export const materialViewAPI = (params) => {
  return request({
    url: `${materialUrl}`,
    method: 'get',
    params: params
  })
}

// 应急物资更新
export const materialUpdateAPI = (params) => {
  return request({
    url: `${materialUrl}`,
    method: 'put',
    data: params
  })
}

// 应急物资删除
export const materialDeleteAPI = (params) => {
  return request({
    url: `${materialUrl}`,
    method: 'delete',
    params: params
  })
}