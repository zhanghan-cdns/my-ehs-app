import request from '@/router/axios';

const disposalTechnologyUrl = `/api/enterprise/emergency/disposalTechnology`

// 应急处置技术列表
export const disposalTechnologyListAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}/list`,
    method: 'get',
    params: params
  })
}

// 应急处置技术分页列表
export const disposalTechnologyPageAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}/page`,
    method: 'get',
    params: params
  })
}

// 应急处置技术创建
export const disposalTechnologyCreateAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}`,
    method: 'post',
    data: params
  })
}

// 应急处置技术查看
export const disposalTechnologyViewAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}`,
    method: 'get',
    params: params
  })
}

// 应急处置技术更新
export const disposalTechnologyUpdateAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}`,
    method: 'put',
    data: params
  })
}

// 应急处置技术删除
export const disposalTechnologyDeleteAPI = (params) => {
  return request({
    url: `${disposalTechnologyUrl}`,
    method: 'delete',
    params: params
  })
}